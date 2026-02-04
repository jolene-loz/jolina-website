# Stripe Payment Integration Setup Guide

## 🎯 Overview
Your shop now has Stripe payment integration for all 6 products with variants!

## 📦 Products Configured
1. **Bucket Hat** - $25 (Yellow or Blue)
2. **Y2K T-Shirt** - $30 (S, M, or XL)
3. **Tote Bag** - $20
4. **Band-aids** - $8 (10 pack) or $20 (30 pack)
5. **Small Print** - $15
6. **Sticker** - $5

---

## 🚀 Setup Instructions

### Step 1: Create a Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Sign up for a free account
3. Complete the account setup

### Step 2: Get Your API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Developers** → **API Keys**
3. Copy your **Publishable key** (starts with `pk_test_...`)
4. Copy your **Secret key** (starts with `sk_test_...`)

### Step 3: Update the HTML File
Open `y2k-windows-site_3.html` and find this line (around line 1873):
```javascript
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
```

Replace `pk_test_YOUR_PUBLISHABLE_KEY_HERE` with your actual Publishable key.

### Step 4: Update the Server File
Open `stripe-server.js` and find this line (line 5):
```javascript
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY_HERE');
```

Replace `sk_test_YOUR_SECRET_KEY_HERE` with your actual Secret key.

### Step 5: Install Dependencies
In your terminal, navigate to the Downloads folder and run:
```bash
cd /Users/jolenelozano/Downloads
npm install express stripe cors
```

### Step 6: Start the Stripe Server
Run the backend server:
```bash
node stripe-server.js
```

You should see:
```
💳 Stripe server running on http://localhost:3000
📝 Make sure to update the Stripe keys in both files!
```

### Step 7: Keep Both Servers Running
You need TWO terminal windows:

**Terminal 1** - HTML Server (already running):
```bash
python3 -m http.server 8000
```

**Terminal 2** - Stripe Server (new):
```bash
node stripe-server.js
```

### Step 8: Test It Out!
1. Open http://localhost:8000/y2k-windows-site_3.html
2. Click the **Shop** icon
3. Choose a product and click **Buy Now**
4. You'll be redirected to Stripe's secure checkout page

---

## 🧪 Testing Payments

Use Stripe's test card numbers:

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Declined Payment:**
- Card: `4000 0000 0000 0002`

---

## 🎨 How It Works

1. User clicks "Buy Now" on a product
2. JavaScript calls `buyProduct(productType, variant)`
3. Frontend sends request to `/create-checkout-session` endpoint
4. Backend creates a Stripe Checkout Session
5. User is redirected to Stripe's secure payment page
6. After payment, user returns to your site with success/cancel status

---

## ⚠️ Important Notes

### Test Mode vs Live Mode
- Your keys have `test` in them - this means you're in **Test Mode**
- No real money is charged in test mode
- To go live, switch to your **Live** API keys (they start with `pk_live_` and `sk_live_`)

### Security
- **NEVER** commit your Secret key to GitHub or share it publicly
- The Secret key should ONLY be in `stripe-server.js` (backend)
- The Publishable key can be in the HTML (frontend) - it's safe to expose

### Production Deployment
When you're ready to deploy:
1. Change test keys to live keys
2. Update the success/cancel URLs to your actual domain
3. Deploy the backend to a hosting service (Heroku, Railway, Vercel, etc.)
4. Update the frontend to call your deployed backend URL

---

## 🎯 Next Steps (Optional)

### Add Product Images
In Stripe Dashboard, you can upload product images and they'll appear in checkout.

### Inventory Management
You can set inventory limits in Stripe Dashboard to prevent overselling.

### Shipping
Update the checkout session to include shipping address collection:
```javascript
shipping_address_collection: {
    allowed_countries: ['US', 'CA'],
},
```

### Webhooks (Advanced)
Set up webhooks to get notified when payments succeed, to automate order fulfillment.

---

## 💡 Troubleshooting

**"Stripe is not defined"**
- Make sure the Stripe script is loading: `<script src="https://js.stripe.com/v3/"></script>`

**"Cannot POST /create-checkout-session"**
- Make sure the Stripe server is running on port 3000

**"Invalid API key"**
- Double-check you copied the full key (no extra spaces)
- Make sure you're using the right key type (Publishable in HTML, Secret in server)

---

## 📞 Need Help?
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)

Happy selling! 🛍️✨
