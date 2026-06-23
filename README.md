# Nile Merchant Help Center & Support Portal

A high-fidelity, responsive knowledge base and support ticket sync website custom-designed for **Nile** (https://nile.ng/).

## Design Language (Wise-Inspired)
- **Primary Accents**: High-contrast, neon lime green (`#90FF00` in dark mode, dynamically adjusted in light mode for readability) matching the Wise aesthetic.
- **Background System**: Sleek charcoal and slate navy mesh gradients (`#060913` to `#131929`), glassmorphism, and responsive CSS grids.
- **Typography**: `Outfit` for modern, premium headings and `Inter` for high-readability guide text.

## Features
1. **Real-Time Search Engine**: Scoring matches based on title and keyword indexing for instant support lookup.
2. **Dynamic Routing / Section Toggles**: Fast, single-page application routing without page refresh, retaining search context.
3. **8 Major Help Categories**: Fully populated with the June 2026 Nile Merchant User Guide.
4. **Helpful Feedback Widget**: Captures customer feedback directly and stores status in `localStorage`.
5. **Interactive Support Chat (Ash's API Integration)**:
   - Floating chat trigger with a pulsing halo indicator.
   - Smart response bot guiding merchants on setup.
   - Live ticket creation simulation with synchronization details.

---

## Local Development & Testing

To launch the project locally, run:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev # or npm start
```

This will run a local development server at `http://localhost:3000` (or the next available port) and open the page in your browser.

---

## Developers: Connecting Ash's In-App Chat Sync API

The support chat widget is designed to bridge directly with your developer **Ash's** in-app ticketing API. 

In `app.js`, we expose a global JavaScript event hook `escalateToLiveAgent()` that mockups ticket creation. To hook this up to your real ticket database:

1. **Replace the Mock Function**: Locate `escalateToLiveAgent()` in [app.js](file:///Users/oyekunle/Documents/nile%20knowledge%20base/app.js).
2. **Inject Your Webhook/Socket Client**:
   ```javascript
   function escalateToLiveAgent() {
     appendChatMessage('bot', `🚀 Connecting to Nile Live In-App Chat system...`);
     
     // Example socket or fetch call to Ash's ticket manager:
     fetch('https://api.nile.ng/support/tickets', {
       method: 'POST',
       body: JSON.stringify({
         storeName: localStorage.getItem('nile-store-name'),
         messages: getChatHistory() 
       })
     })
     .then(res => res.json())
     .then(data => {
       appendChatMessage('bot', `
         <strong>Ticket Created: #${data.ticketId}</strong><br>
         A support agent will respond directly in your dashboard or chat shortly.
       `);
     });
   }
   ```
