require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving
app.use(express.static(path.join(__dirname)));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    seedDatabase();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Article Schema & Model
const articleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  categoryName: { type: String, required: true },
  title: { type: String, required: true },
  readTime: { type: String, default: '3 min read' },
  keywords: { type: String, default: '' },
  screenshotUrl: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  content: { type: String, required: true }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

// Database Seeding Logic
async function seedDatabase() {
  try {
    const count = await Article.countDocuments();
    if (count === 0) {
      console.log('Article collection is empty. Seeding defaults from data.js...');
      const { defaultArticles } = require('./data.js');
      await Article.insertMany(defaultArticles);
      console.log(`Database seeded with ${defaultArticles.length} default guides.`);
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Storage in Memory
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// --- REST API ENDPOINTS ---

// GET: Retrieve all articles
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    console.error('Error retrieving articles:', err);
    res.status(500).json({ error: 'Failed to retrieve articles' });
  }
});

// POST: Create or update an article
app.post('/api/articles', async (req, res) => {
  try {
    const { id, title, category, categoryName, readTime, keywords, screenshotUrl, videoUrl, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    let articleId = id;
    if (!articleId) {
      articleId = 'art-' + Math.floor(1000 + Math.random() * 9000);
    }
    
    const articleData = {
      id: articleId,
      title,
      category,
      categoryName,
      readTime: readTime || '3 min read',
      keywords: keywords || title.toLowerCase(),
      screenshotUrl: screenshotUrl || '',
      videoUrl: videoUrl || '',
      content
    };
    
    const updated = await Article.findOneAndUpdate(
      { id: articleId },
      articleData,
      { new: true, upsert: true }
    );
    
    res.json(updated);
  } catch (err) {
    console.error('Error saving article:', err);
    res.status(500).json({ error: 'Failed to save article' });
  }
});

// DELETE: Delete an article
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const result = await Article.findOneAndDelete({ id: req.params.id });
    if (!result) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ success: true, message: 'Article successfully deleted' });
  } catch (err) {
    console.error('Error deleting article:', err);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// POST: Reset/Restore default database guidelines
app.post('/api/reset', async (req, res) => {
  try {
    await Article.deleteMany({});
    const { defaultArticles } = require('./data.js');
    await Article.insertMany(defaultArticles);
    console.log('Database successfully reset to default June 2026 guidelines.');
    res.json({ success: true, message: 'Database successfully reset to defaults' });
  } catch (err) {
    console.error('Error resetting database:', err);
    res.status(500).json({ error: 'Failed to reset database' });
  }
});

// POST: Upload image to Cloudinary
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
  
  // Create upload stream
  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: 'nile_support_portal' },
    (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
      }
      res.json({ url: result.secure_url });
    }
  );
  
  // Write buffer to stream
  uploadStream.end(req.file.buffer);
});

// Serve frontend main pages explicitly if requested directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start Server
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Nile Support Portal server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
