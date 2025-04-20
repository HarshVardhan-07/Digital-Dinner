import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import {connectMongo} from './config/mongo.js';
import sequelize from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import auth from './middleware/authMiddleware.js';


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => res.send('Digital Diner API running'));


app.use('/api/auth', authRoutes);
app.use('/api', menuRoutes);
app.use('/api', orderRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Connect MongoDB
connectMongo(process.env.MONGO_URI);

  // Connect PostgreSQL
try{
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('PostgreSQL connected and synced');
}catch (err) {
    console.error('PostgreSQL error:', err);
  }
});
