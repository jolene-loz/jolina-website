// Stripe Payment Server for JOLINA Shop
// Install dependencies: npm install express stripe cors

const express = require('express');
const stripe = require('stripe')('sk_test_51SvpVYBTG0ZECeEby77ky9JxwgWjIDGiYEW9IlrUZ8BxsZCXxrGKl6EH9R8Ah6M3lPDvhuHHXEYpmzy3nisEfOl300dQN3ZJDb'); // Test secret key
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// Product prices mapping (you'll need to create these in your Stripe Dashboard)
const PRICES = {
    // Bucket Hats
    'price_YELLOW_BUCKET_HAT': { amount: 2500, name: 'Bucket Hat (Yellow)' },
    'price_BLUE_BUCKET_HAT': { amount: 2500, name: 'Bucket Hat (Blue)' },

    // T-Shirts
    'price_TSHIRT_S': { amount: 3000, name: 'Y2K T-Shirt (Small)' },
    'price_TSHIRT_M': { amount: 3000, name: 'Y2K T-Shirt (Medium)' },
    'price_TSHIRT_XL': { amount: 3000, name: 'Y2K T-Shirt (XL)' },

    // Tote Bag
    'price_TOTE_BAG': { amount: 2000, name: 'Tote Bag' },

    // Band-aids
    'price_BANDAIDS_10': { amount: 800, name: 'Band-aids (10 Pack)' },
    'price_BANDAIDS_30': { amount: 2000, name: 'Band-aids (30 Pack)' },

    // Print
    'price_SMALL_PRINT': { amount: 1500, name: 'Small Print (8x10)' },

    // Sticker
    'price_STICKER': { amount: 500, name: 'Vinyl Sticker' }
};

// Create checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { priceId, productName } = req.body;

        // Validate price ID
        if (!PRICES[priceId]) {
            return res.status(400).json({ error: 'Invalid price ID' });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: productName,
                        },
                        unit_amount: PRICES[priceId].amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/index.html?success=true`,
            cancel_url: `http://localhost:3000/index.html?canceled=true`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`💳 Stripe server running on http://localhost:${PORT}`);
    console.log('📝 Make sure to update the Stripe keys in both files!');
});
