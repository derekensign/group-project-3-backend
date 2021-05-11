const express = require('express')
const app = express()
require('dotenv').config()

app.use(require('morgan')('tiny'))
const routesReport = require('rowdy-logger').begin(app)

app.use(express.json())
app.use(require('cors')())

const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)

const productRoutes = require('./routes/productRoutes')
app.use('/products', productRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  routesReport.print()
})

const stripe = require('stripe')('sk_test_51IoVLqKFmp10dkyr3aVLdxWbdGSy7Z0TDmIAoKU67jHYkXdE2fqXLjA7295at1Pa6v6UjuVGJFZsjTNxauYc82vM00UHKLL30A');
app.use(express.static('.'));

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
  const cart = req.body.cart
  const line_items = cart.map(item => (
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name
        },
        unit_amount: parseFloat(item.price) * 100 // "9.99" => 999
      },
      quantity: 1
    }
  ))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA']
    },
    line_items: line_items,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/canceled`,
  });

  res.json({ id: session.id });
});