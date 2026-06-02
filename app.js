const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const dashboardRoutes = require('./routes/dashboard');
const settingsRoutes = require('./routes/settings');


app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/settings', settingsRoutes);


app.get('/', (req, res) => {
  res.send('Server is running');
});

const connectDB = require('./config/db');
connectDB();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running`);
});