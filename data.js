// --- DATA DATABASE: Shared Nile Merchant Dashboard Articles & Categories ---

const categories = [
  {
    id: 'setup',
    title: 'Account & Setup',
    desc: 'Setting up store details, currency settings, choosing subscription plans, and managing basic profile access.',
    icon: `<svg viewBox="0 0 24 24"><path d="M12.01 21.49L2.39 16.5c-.85-.44-.85-1.57 0-2.01l9.62-4.99c.85-.44 1.9-.44 2.75 0l9.62 4.99c.85.44.85 1.57 0 2.01l-9.62 4.99c-.85.44-1.9.44-2.75 0zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`
  },
  {
    id: 'storefront',
    title: 'Storefront & Design',
    desc: 'Activating Nubia, Luna, and Kuipid themes, configuring navigation menus, and modifying layout sections with the Website Builder.',
    icon: `<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.17 19.64 10.53 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 14H9v-2h2v2zm4-4h-6V9h6v4z"/></svg>`
  },
  {
    id: 'products',
    title: 'Product & Inventory',
    desc: 'Adding physical/digital products, generating color/size variants, configuring pre-orders, and importing inventory in bulk via CSV.',
    icon: `<svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-8-2h4v2h-4V4zm8 15H4V8h16v11z"/></svg>`
  },
  {
    id: 'payments',
    title: 'Payments & Gateway',
    desc: 'Enabling local bank transfers, activating credit cards (Paystack & Stripe integrations), and setting up Pay on Delivery.',
    icon: `<svg viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2-.9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`
  },
  {
    id: 'shipping',
    title: 'Shipping & Locations',
    desc: 'Configuring shipping zones (Lagos Mainland/Island, Nigeria, Global), adding flat-rates, weight classes, and free delivery thresholds.',
    icon: `<svg viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm11.5-5.5H15V9h2.5v4zm.5 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`
  },
  {
    id: 'orders',
    title: 'Orders & Invoices',
    desc: 'Managing order statuses (Processing, Shipped, Delivered), issuing cancellations or refunds, and auto-generating customer invoices.',
    icon: `<svg viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`
  },
  {
    id: 'customers',
    title: 'Customer Management',
    desc: 'Accessing purchase records, exporting contact files to CSV, creating VIP segments, and connecting third-party email tools.',
    icon: `<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & Support',
    desc: 'Resolving server 502 Bad Gateway outages, correcting theme collisions, fixing payment gateway failures, and ticket escalations.',
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm0-4h-2V7h2v7z"/></svg>`
  }
];

const defaultArticles = [
  // --- ACCOUNT & SETUP ---
  {
    id: 'login-access',
    category: 'setup',
    categoryName: 'Account & Setup',
    title: 'Login & Account Access',
    readTime: '3 min read',
    keywords: 'login sign in access email password reset forget app.nile.ng register plan selection starter growth premium subscription billing',
    screenshotUrl: '',
    videoUrl: '',
    content: `
      <p>Accessing your Nile Merchant Dashboard is the first step to managing your online store. Nile provides a responsive portal available on any modern browser.</p>
      
      <h2>1. Accessing the Login Portal</h2>
      <p>Navigate to the login portal by typing <a href="https://app.nile.ng" target="_blank">https://app.nile.ng</a> in your web browser. If you encounter any server loading errors, wait a moment and refresh the browser page.</p>
      
      <h2>2. Entering Your Credentials</h2>
      <p>On the login form, enter your registered email address and secure password. If you want to bypass entering your login credentials for the next 30 days, toggle <strong>Remember me</strong> before selecting the <strong>Login</strong> button.</p>
      
      <div class="alert alert-info">
        <strong>Forgot Password:</strong> If you are unable to recall your password, select the <em>Forgot password?</em> link. Provide your email, and Nile will trigger password reset instructions directly to your inbox.
      </div>
      
      <h2>3. Selecting a Subscription Plan</h2>
      <p>For first-time sign-ups, Nile will redirect you to a plan selection board. You can choose from three main tiers on a quarterly billing schedule:</p>
      <table>
        <thead>
          <tr>
            <th>Plan Tier</th>
            <th>Target Audience</th>
            <th>Billing Schedule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Starter</strong></td>
            <td>New brands testing storefront models</td>
            <td>Quarterly</td>
          </tr>
          <tr>
            <td><strong>Growth</strong></td>
            <td>Expanding businesses requiring variants & custom pages</td>
            <td>Quarterly</td>
          </tr>
          <tr>
            <td><strong>Premium</strong></td>
            <td>High-volume merchants wanting advanced SEO & invoicing</td>
            <td>Quarterly</td>
          </tr>
        </tbody>
      </table>
      <p>Once you select a plan tier, enter your billing details to activate your subscription and gain entry to the dashboard.</p>
    `
  },
  {
    id: 'dashboard-overview',
    category: 'setup',
    categoryName: 'Account & Setup',
    title: 'Dashboard Overview & Navigation',
    readTime: '2 min read',
    keywords: 'dashboard stats metrics visitors orders customers performance overview',
    screenshotUrl: '',
    videoUrl: '',
    content: `
      <p>The Nile Merchant Dashboard serves as your store command center. Upon logging in, you are greeted with a high-level overview of your business metrics.</p>
      
      <h2>Key Metrics Display Cards</h2>
      <p>The dashboard renders real-time performance summaries using modern graphic cards:</p>
      <ul>
        <li><strong>Total Orders:</strong> Summarizes total completed and pending orders. Click to open the detailed Order Fulfilment screen.</li>
        <li><strong>Sales Revenue:</strong> Tracks total income based on payment validations.</li>
        <li><strong>Customers:</strong> Displays counts of registered buyers. Link directs to the Customer Management segment.</li>
        <li><strong>Store Visitors:</strong> Displays analytics tracking traffic sources and session counts.</li>
      </ul>
      <div class="alert alert-tip">
        <strong>Quick Navigation:</strong> Use the sidebar menu to toggle between specific utility views like Invoices, Payments, Reviews, or Pages.
      </div>
    `
  },
  {
    id: 'store-info',
    category: 'setup',
    categoryName: 'Account & Setup',
    title: 'Setting Up Store & Business Info',
    readTime: '4 min read',
    keywords: 'storefront business details name headline social links address phone logo upload currency NGN USD',
    screenshotUrl: '',
    videoUrl: '',
    content: `
      <p>Setting up your storefront information is critical to creating a trust-worthy presence for your shoppers.</p>
      
      <h2>1. Basic Store Details</h2>
      <p>Navigate to the storefront configuration via <strong>Storefront → Launch Storefront</strong> or the <strong>Settings</strong> button. Complete the following mandatory fields:</p>
      <ul>
        <li><strong>Store Name:</strong> The name displayed in headers, billing slips, and browser titles.</li>
        <li><strong>Headline Message:</strong> A short description welcoming shoppers.</li>
        <li><strong>Store Notice:</strong> An optional announcement banner appearing at the top of the storefront (e.g., "Holiday shipping delays apply").</li>
        <li><strong>Social and Contact Links:</strong> Enter links for WhatsApp, Instagram, or Twitter. These will automatically compile into your storefront header/footer.</li>
      </ul>
      <p>Select <strong>Publish</strong> to register these details in the live storefront.</p>
      
      <h2>2. Business Details</h2>
      <p>Before customer checkouts, complete your corporate profile under <strong>Settings → Business Info</strong>:</p>
      <ul>
        <li><strong>Business Address:</strong> Required for accurate tax computation and shipping label prints.</li>
        <li><strong>Logo Upload:</strong> Provide a high-resolution logo. Nile automatically resizes it to fit email templates and receipt slips.</li>
        <li><strong>Store Currency:</strong> Select NGN, USD, or other default trading currency.</li>
      </ul>
      <div class="alert alert-warning">
        <strong>Currency Warnings:</strong> Avoid editing your base currency after your storefront is published, as currency adjustments do not auto-recalculate existing inventory prices.
      </div>
    `
  },
  // --- STOREFRONT & DESIGN ---
  {
    id: 'theme-selection',
    category: 'storefront',
    categoryName: 'Storefront & Design',
    title: 'Choosing & Activating Templates',
    readTime: '3 min read',
    keywords: 'themes template storefront nubia luna kuipid zuri make it live preview layout zuri active',
    screenshotUrl: '',
    videoUrl: '',
    content: `
      <p>Nile provides custom storefront templates to give your business a polished look. You don't need coding knowledge to apply them.</p>
      
      <h2>1. Available Storefront Themes</h2>
      <p>Access templates under the <strong>Storefront</strong> section in the dashboard sidebar. Nile offers three primary options:</p>
      <ul>
        <li><strong>Nubia:</strong> Bold imagery and typography, perfect for fashion brands.</li>
        <li><strong>Luna:</strong> Minimalist, clean grids ideal for tech accessories and home goods.</li>
        <li><strong>Kuipid (Zuri):</strong> Vibrant layouts suited for cosmetics and boutique items.</li>
      </ul>
      
      <h2>2. Theme Toggles & Activation</h2>
      <p>Each template displays a card with a toggle switch. Click the toggle to enable a theme.</p>
      <div class="alert alert-warning">
        <strong>UI Theme Conflict:</strong> The Nile UI currently allows you to toggle multiple themes to the "On" state simultaneously. Ensure you leave only <strong>one</strong> theme toggled active to prevent storefront render collisions.
      </div>
      
      <h2>3. Going Live</h2>
      <p>Once you choose a theme, scroll to the top of the storefront manager and enable the <strong>Make it Live</strong> switch. A confirmation alert will toast to indicate your storefront has updated.</p>
    `
  },
  {
    id: 'website-builder',
    category: 'storefront',
    categoryName: 'Storefront & Design',
    title: 'Using the Nile Website Builder',
    readTime: '5 min read',
    keywords: 'website builder canvas hero section collections drag and drop spacing responsive preview mobile grid',
    screenshotUrl: '',
    videoUrl: '',
    content: `
      <p>The Nile Website Builder allows merchants to design custom homepages using visual grids and content blocks.</p>
      
      <h2>1. Opening the Canvas</h2>
      <p>Go to <strong>Storefront → More Config → Open Website Builder</strong>. The builder opens a canvas which will initially show a blank template layout.</p>
      
      <h2>2. Adding Sections</h2>
      <p>Click on the triple-bar menu on the left side of the screen to open the section library. Choose from blocks such as:</p>
      <ul>
        <li><strong>Hero Block:</strong> Main top banner. Highlight new promotions, edit text, and link the Call-To-Action button to dynamic products.</li>
        <li><strong>Product Grids (Top Sellers/New Arrivals):</strong> Displays grids of products. You can specify margins, padding, and products per row.</li>
        <li><strong>Testimonials & Newsletter Sign-ups:</strong> Collect subscriber emails or display buyer quotes.</li>
      </ul>
      
      <div class="alert alert-tip">
        <strong>Mobile Responsive Grids:</strong> Always review the layout using the responsive preview buttons at the top. For mobile layouts, configure your product grids to display 1 or 2 items per row to keep text and photos readable.
      </div>
      
      <h2>3. Saving Your Layout</h2>
      <p>When you finish modifying components, select <strong>Save draft</strong> to record updates internally, or choose <strong>Publish</strong> to apply the builder layout to your public store.</p>
    `
  },
  {
    id: 'customise-fonts-colors',
    category: 'storefront',
    categoryName: 'Storefront & Design',
    title: 'Customizing Colors, Fonts, & CSS',
    readTime: '4 min read',
    keywords: 'colors custom css global styles theme settings buttons spacing forms fonts brand hex',
    screenshotUrl: '',
    videoUrl: '',
    content: `
      <p>You can custom brand your storefront templates by tweaking global style selectors or injecting custom styles.</p>
      
      <h2>1. Global Theme Settings</h2>
      <p>Open the Style panel in the website builder. Set the primary color (used for action buttons and accents), secondary color (background blocks), and neutral tone (text, borders, footer backgrounds). You can input precise Hex codes to match your brand palette.</p>
      
      <h2>2. Button and Form Editing</h2>
      <p>Adjust padding, border-radius (square vs. rounded buttons), and hover color effects. Ensure your input forms have clear labels and placeholder text to reduce checkout friction.</p>
      
      <h2>3. Advanced: Custom CSS</h2>
      <p>If you need custom animations or non-standard structures, input custom rules in the <strong>Custom CSS</strong> input box.</p>
      <div class="alert alert-warning">
        <strong>Warning:</strong> CSS errors can break checkout grids. Always test changes on multiple devices before launching promotions.
      </div>
    `
  },
  // --- PRODUCT & INVENTORY ---
  {
    id: 'add-product',
    category: 'products',
    categoryName: 'Product Inventory',
    title: 'Adding Products & Custom Fields',
    readTime: '4 min read',
    keywords: 'add product sku barcode weight seo stock quantity category images media inventory',
    screenshotUrl: '',
    videoUrl: '',
    content: `
      <p>Creating comprehensive product listings on Nile increases conversions and makes fulfillment easier.</p>
      
      <h2>1. Creating a Basic Product Listing</h2>
      <p>Navigate to <strong>Products → Add New Product</strong>. Complete the main product card details:</p>
      <ul>
        <li><strong>Product Name:</strong> Make it clear and search-engine friendly.</li>
        <li><strong>Category:</strong> Assign to an existing division or click to make a new one (e.g., Clothes, Accessories).</li>
        <li><strong>Selling Price:</strong> Base selling price. You can add a <em>Discount Price</em> to display sale badges.</li>
        <li><strong>Stock quantity:</strong> Enter the stock count. Enable <strong>Track inventory</strong> to prevent overselling.</li>
        <li><strong>Images:</strong> Drag & drop photos. The top-left image is automatically designated the primary thumbnail.</li>
      </ul>
      
      <h2>2. Advanced Product Fields</h2>
      <p>Depending on your plan tier, you can populate extra inventory descriptors:</p>
      <ul>
        <li><strong>SKU:</strong> Unique identifier. Helps sync inventory with shipping portals and accounting apps.</li>
        <li><strong>Barcode (UPC/EAN):</strong> Enter barcode digits if using barcode scanners.</li>
        <li><strong>Weight & Dimensions:</strong> Required for real-time shipping rate computations at checkout.</li>
        <li><strong>SEO Title & Description:</strong> Customize Google search card previews. Keep titles under 60 characters and meta descriptions under 160 characters.</li>
      </ul>
      <p>Select <strong>Publish</strong> to show the product on your live storefront.</p>
    `
  },
  {
    id: 'variable-products',
    category: 'products',
    categoryName: 'Product Inventory',
    title: 'Variable Products (Sizes & Colours)',
    readTime: '3 min read',
    keywords: 'variable products size colour attributes combinations sku variant price options',
    screenshotUrl: '',
    videoUrl: 'https://www.tiktok.com/@nile/video/how-to-add-variable-products',
    content: `
      <p>If your items have variations like sizes or colors, create them as variants under a single listing to keep your catalog clean.</p>
      
      <h2>1. Defining Variant Attributes</h2>
      <p>On the product listing form, scroll to and toggle <strong>Add Variants</strong>. Define attribute titles (e.g., Size, Colour) and type values separated by commas (e.g., <em>S, M, L</em> or <em>Red, Blue</em>).</p>
      
      <h2>2. Generating Variant Combinations</h2>
      <p>Nile will automatically generate a matrix of all possible combinations (e.g., Red-S, Red-M, Blue-L). For each variant, you can specify:</p>
      <ul>
        <li>Unique SKU codes</li>
        <li>Custom stock counts</li>
        <li>Varying price additions</li>
      </ul>
      <p>Enable <em>Use same price for all variants</em> if variations cost the same amount.</p>
    `
  },
  {
    id: 'sizes-colours-swatches',
    category: 'products',
    categoryName: 'Product Inventory',
    title: 'Customizing Color Swatches & Labels',
    readTime: '2 min read',
    keywords: 'swatches colour edit options hex image upload size label color',
    screenshotUrl: '',
    videoUrl: 'https://www.tiktok.com/@nile/video/how-to-add-sizes-and-colours',
    content: `
      <p>Give customers a visual preview of product styles by changing standard text drops into color swatches or image badges.</p>
      
      <h2>Setting Up Color Swatches</h2>
      <ol>
        <li>Under the product variants area, select <strong>Edit options</strong> adjacent to the color attribute.</li>
        <li>Select a precise Hex color code representing the shade (e.g., #000000 for black).</li>
        <li>If the product has a pattern (e.g., cheetah print), upload a small swatch thumbnail to display inside the selection circle at checkout.</li>
      </ol>
      <p>Ensure labels are spelled consistently across products to maintain neat filters on search menus.</p>
    `
  },
  {
    id: 'size-guides',
    category: 'products',
    categoryName: 'Product Inventory',
    title: 'Creating and Linking Size Guides',
    readTime: '3 min read',
    keywords: 'size guide measurement chart link pages modal link sizes',
    screenshotUrl: '',
    videoUrl: 'https://www.tiktok.com/@nile/video/how-to-add-size-guide',
    content: `
      <p>Adding size guides reduces return rates and improves customer satisfaction.</p>
      
      <h2>1. Designing the Guide Page</h2>
      <p>Go to the <strong>Pages</strong> tab in your dashboard and click <strong>Add New Page</strong>. Create a size chart table mapping standard dimensions (e.g., chest, waist, hips measurements for clothes) and publish it.</p>
      
      <h2>2. Linking to Products</h2>
      <p>In the product editor, look for the **Size Guide** selector under the advanced settings tab. Choose the guide page you created from the dropdown menu.</p>
      <p>Once linked, Nile automatically displays a clickable <strong>Size Guide</strong> link next to the size select button on that product page. When clicked, the guide will open in a light-weight modal.</p>
    `
  },
  {
    id: 'pre-order',
    category: 'products',
    categoryName: 'Product Inventory',
    title: 'Configuring Pre-Order Products',
    readTime: '3 min read',
    keywords: 'pre order reserve expected availability capture payment pre-order',
    screenshotUrl: '',
    videoUrl: 'https://www.tiktok.com/@nile/video/how-to-add-pre-order-products',
    content: `
      <p>Sell upcoming arrivals by enabling pre-orders, allowing buyers to reserve stock before it hits warehouses.</p>
      
      <h2>1. Activating Pre-orders</h2>
      <p>In the product listing form, select the <strong>Pre-order</strong> checkbox. Provide an expected ship date (e.g., "Available July 10, 2026") and state this date in the product description.</p>
      
      <h2>2. Billing Logistics</h2>
      <div class="alert alert-warning">
        <strong>Payment Gateway Note:</strong> Confirm whether your payment gateway supports delayed capture. If it does not, you will need to capture funds upfront when the order is placed.
      </div>
    `
  },
  {
    id: 'minimum-order-quantities',
    category: 'products',
    categoryName: 'Product Inventory',
    title: 'Minimum Order Quantities (MOQ)',
    readTime: '2 min read',
    keywords: 'moq minimum order quantity inventory limit wholesale bulk set minimum',
    screenshotUrl: '',
    videoUrl: 'https://www.tiktok.com/@nile/video/how-to-set-moq',
    content: `
      <p>If you run a wholesale business, you can enforce minimum order counts on specific listings.</p>
      
      <h2>Applying MOQ Settings</h2>
      <p>In the product editor, scroll to the <strong>Inventory</strong> panel. Look for the <strong>Minimum Order Quantity (MOQ)</strong> field and input the minimum allowed purchase amount (e.g., 5 units).</p>
      <p>Save changes. Checkout forms will display validation errors if buyers attempt to add fewer units to their shopping cart.</p>
    `
  },
  {
    id: 'bulk-import',
    category: 'products',
    categoryName: 'Product Inventory',
    title: 'Bulk Import via CSV Templates',
    readTime: '4 min read',
    keywords: 'bulk import csv excel file format image url utf-8 error log import products',
    screenshotUrl: '',
    videoUrl: '',
    content: `
      <p>Instead of manually keying in hundreds of products, use Nile's bulk CSV import tool to upload your inventory at once.</p>
      
      <h2>1. CSV Import Steps</h2>
      <ol>
        <li>Go to <strong>Products → Import</strong>.</li>
        <li>Download the standard Nile CSV template.</li>
        <li>Populate columns matching titles (Name, SKU, Price, Description, Stock) exactly.</li>
        <li>Save the document in <strong>UTF-8 CSV</strong> format to prevent character bugs.</li>
      </ol>
      
      <h2>2. Common Import Pitfalls</h2>
      <ul>
        <li><strong>Image URLs:</strong> Since you cannot upload media files via spreadsheet rows, host your product images on external portals (e.g., Imgur, Cloudinary) and paste direct link URLs in the spreadsheet's image column.</li>
        <li><strong>Variant Duplicate Entries:</strong> For products with variants, duplicate the base name and category columns in subsequent rows, altering only the variant attributes, price adjustments, and SKU fields.</li>
      </ul>
      <div class="alert alert-tip">
        <strong>Test Import First:</strong> Test the import with a sample sheet of 2 or 3 products first. Check the post-import log to verify no format flags are raised.
      </div>
    `
  },
  // --- PAYMENTS ---
  {
    id: 'payment-methods',
    category: 'payments',
    categoryName: 'Payments & Gateway',
    title: 'Activating & Editing Payment Gateways',
    readTime: '4 min read',
    keywords: 'payments paystack stripe bank details credentials card payment cash on delivery checkout partial payments',
    screenshotUrl: '',
    videoUrl: 'https://www.tiktok.com/@nile/video/how-to-add-payment-method',
    content: `
      <p>Provide secure, convenient payment options to reduce cart abandonment rates.</p>
      
      <h2>1. Bank Transfer (Default Method)</h2>
      <p>Bank transfers are enabled by default on Nile. To edit account details, go to <strong>Payments</strong>, click the edit pen icon on the Bank Transfer option, and enter your Account Name, Account Number, and Bank. Buyers will see these details at checkout and can upload proof of payment.</p>
      
      <h2>2. Card Payments (Paystack & Stripe)</h2>
      <p>Enable card checkout by toggling the <strong>Cards</strong> option. Enter the API secret keys generated from your Paystack or Stripe developer dashboards.</p>
      
      <h2>3. Pay on Delivery</h2>
      <p>If you support local couriers who handle cash collections, toggle <strong>Pay on Delivery</strong>. Ensure your shipping policies explain any cash limits.</p>
      
      <div class="alert alert-warning">
        <strong>Installments:</strong> Nile does not currently support installment payments or split-billing at checkout. Buyers must pay in full to complete orders.
      </div>
    `
  },
  // --- SHIPPING ---
  {
    id: 'shipping-options',
    category: 'shipping',
    categoryName: 'Shipping & Locations',
    title: 'Setting Up Shipping Rates & Zones',
    readTime: '4 min read',
    keywords: 'shipping flat rate free shipping zone lagos nigeria weight threshold shipping classes pickup',
    screenshotUrl: '',
    videoUrl: 'https://www.tiktok.com/@nile/video/how-to-set-shipping-fee',
    content: `
      <p>Configure clear shipping rates based on location, weight, and cart value.</p>
      
      <h2>1. Setting Up Shipping Methods</h2>
      <p>Go to <strong>Orders & Shipping → Shipping</strong>. Click <strong>Add Shipping Method</strong> to choose between:</p>
      <ul>
        <li><strong>Flat Rate Shipping:</strong> Charges fixed amounts per order.</li>
        <li><strong>Free Shipping:</strong> Waives charges. You can apply minimum purchase thresholds (e.g., free shipping on orders over ₦50,000).</li>
        <li><strong>Local Pick-up:</strong> Allows buyers to pick up items at physical store locations.</li>
      </ul>
      
      <h2>2. Configuring Shipping Zones</h2>
      <p>Define shipping areas under <strong>Advanced shipping settings</strong>. Create specific zones (e.g., Lagos Mainland, Lagos Island, Nigeria, International) with distinct prices. This ensures checkout calculates the correct rate based on the buyer's delivery address.</p>
      
      <h2>3. Bulky Shipping Classes</h2>
      <p>Assign weight classes to bulky or heavy products so checkout applies extra handling fees automatically.</p>
    `
  },
  // --- ORDERS & INVOICING ---
  {
    id: 'managing-orders',
    category: 'orders',
    categoryName: 'Orders & Invoicing',
    title: 'Managing Orders & Order Statuses',
    readTime: '3 min read',
    keywords: 'orders tracking number status pending processing shipped delivered cancelled refunded courier refunds cancellations',
    screenshotUrl: '',
    videoUrl: '',
    content: `
      <p>Keep your processing organized by updating order statuses as items are fulfilled.</p>
      
      <h2>1. Order Status Explanations</h2>
      <p>Nile orders transition through specific states:</p>
      <ul>
        <li><strong>Pending:</strong> Order placed. Awaiting bank transfer confirmation.</li>
        <li><strong>Processing:</strong> Payment confirmed. Items are being packed.</li>
        <li><strong>Shipped:</strong> Order handed to courier. Enter tracking digits so Nile can trigger tracking alerts to the buyer.</li>
        <li><strong>Delivered:</strong> Buyer has received the shipment.</li>
      </ul>
      
      <h2>2. Processing Refunds & Cancellations</h2>
      <p>Open the order detail page and select <strong>Issue Refund</strong>. You can refund orders partially or in full. Update the status to Cancelled or Refunded. Consider offering store credit codes as alternatives to maintain revenue.</p>
    `
  },
  {
    id: 'order-verification',
    category: 'orders',
    categoryName: 'Orders & Invoicing',
    title: 'Sending Order Verification Codes',
    readTime: '3 min read',
    keywords: 'verification code order verification sms email request verification fraud check verification link',
    screenshotUrl: '',
    videoUrl: 'https://www.tiktok.com/@nile/video/how-to-send-order-verification-to-customers',
    content: `
      <p>Nile features an order verification mechanism to prevent fraudulent checkout attempts.</p>
      
      <h2>How Order Verification Works</h2>
      <ol>
        <li>Open an order card in your dashboard's <strong>Orders</strong> list.</li>
        <li>Click **Send verification** (or *Request verification*).</li>
        <li>Nile triggers a secure SMS or email code to the buyer.</li>
        <li>The buyer enters this code at checkout to confirm purchase intent.</li>
      </ol>
      <p>Once verified, the order status transitions from <em>Pending</em> to <em>Verified</em>, and you can safely pack and ship the order.</p>
    `
  },
  {
    id: 'invoices',
    category: 'orders',
    categoryName: 'Orders & Invoicing',
    title: 'Generating & Automating Invoices',
    readTime: '3 min read',
    keywords: 'invoice auto generate invoice template pdf invoice download invoice billing',
    screenshotUrl: '',
    videoUrl: '',
    content: `
      <p>Create professional, printable invoice slips for record keeping or packaging.</p>
      
      <h2>1. Automatic Invoicing</h2>
      <p>Go to <strong>Settings → Invoices</strong> and toggle <strong>Auto-generate invoices</strong>. Nile will automatically generate a PDF invoice layout every time a customer completes a checkout.</p>
      
      <h2>2. Custom Invoice Slips</h2>
      <p>Customize invoice layouts by uploading your logo, writing standard corporate Terms & Conditions, and adding footer notes (e.g., "Thanks for shopping with us!"). You can download invoices as PDFs or trigger email copies directly to customers.</p>
    `
  },
  // --- CUSTOMERS ---
  {
    id: 'customers-management',
    category: 'customers',
    categoryName: 'Customer Management',
    title: 'Customer Segmentation & CSV Export',
    readTime: '3 min read',
    keywords: 'customers list csv export segment mailchimp list customer details notes spent',
    screenshotUrl: '',
    videoUrl: '',
    content: `
      <p>Manage customer relationships, track order histories, and run targeted marketing campaigns.</p>
      
      <h2>1. Customer Logs</h2>
      <p>Select <strong>Customers Management</strong> to view shopper profiles, contact emails, order history counts, and total amount spent.</p>
      
      <h2>2. Segmentation & Export</h2>
      <p>Filter customer logs to compile lists (e.g., "VIP customers" with >5 orders). Click <strong>Export CSV</strong> to download contacts. While Nile lacks built-in email marketing tools, you can upload this CSV to third-party newsletter apps like Mailchimp or HubSpot.</p>
    `
  },
  // --- STATIC PAGES ---
  {
    id: 'static-pages',
    category: 'setup',
    categoryName: 'Account & Setup',
    title: 'Adding Static Pages & Policies',
    readTime: '3 min read',
    keywords: 'pages static content refund policy about us faq privacy terms footer menu',
    screenshotUrl: '',
    videoUrl: 'https://www.tiktok.com/@nile/video/how-to-add-pages-like-about-us-refund-policy-and-other-pages',
    content: `
      <p>Create informational and legal pages such as About Us, Refund Policies, and FAQs to add key details to your storefront footer.</p>
      
      <h2>1. Creating a New Page</h2>
      <p>Navigate to <strong>Pages</strong> in your dashboard sidebar and click <strong>Add New Page</strong>. Provide a page title, draft your terms, and format text using the built-in rich text content builder.</p>
      
      <h2>2. Linking to Menus</h2>
      <p>Once published, attach the page link to navigation rails under <strong>Storefront → Navigation</strong> or <strong>Footer Settings</strong>. Rearrange link order by dragging rows into positions.</p>
    `
  },
  // --- TROUBLESHOOTING ---
  {
    id: 'troubleshooting-faq',
    category: 'troubleshooting',
    categoryName: 'Troubleshooting & Support',
    title: 'Troubleshooting & Common Outages',
    readTime: '4 min read',
    keywords: 'blank storefront multiple themes 502 bad gateway payment error expert support chat ticket outlet crash',
    screenshotUrl: '',
    videoUrl: '',
    content: `
      <p>Review solutions to common dashboard issues and support portal outages.</p>
      
      <h2>1. Blank Storefront After Going Live</h2>
      <p>If your storefront URL displays a blank screen or a placeholder title (like <em>__SEO_TITLE__</em>), verify that you have completed these settings:</p>
      <ul>
        <li>Filled out information in the **Launch Storefront** settings.</li>
        <li>Added a hero layout block in the **Website Builder** and clicked **Publish**.</li>
      </ul>
      
      <h2>2. Colliding Themes Error</h2>
      <p>If storefront design shifts randomly, check the theme selectors. Toggle off all template switches except your chosen design, and re-publish.</p>
      
      <h2>3. 502 Bad Gateway Server Outages</h2>
      <p>A "502 Bad Gateway" indicates a temporary server outage on the app's hosting servers. Wait a few minutes and refresh your dashboard. Your data is secure and no transactions will be lost during this interruption.</p>
      
      <h2>4. Escalating Issues to Expert Support</h2>
      <p>If you encounter payment errors or custom CSS rendering bugs, click the <strong>Expert Support</strong> chat bubble on the dashboard top bar to open a support ticket with the developer team.</p>
    `
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { categories, defaultArticles };
}
