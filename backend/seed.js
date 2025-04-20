import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MenuItem from './models/MenuItem.js';

dotenv.config();

const connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
};

const seedMenu = async () => {
  await connectMongo();

  const items = [
    {
      name: 'Margherita Pizza',
      category: 'Main Course',
      description: 'Classic cheese and tomato pizza.',
      price: 250,
      imageUrl: '',
    },
    {
      name: 'Coke',
      category: 'Drinks',
      description: 'Chilled Coca-Cola bottle (500ml)',
      price: 50,
      imageUrl: '',
    },
    {
      name: 'Chocolate Lava Cake',
      category: 'Desserts',
      description: 'Warm chocolate cake with a gooey center.',
      price: 120,
      imageUrl: '',
    },
    {
      name: 'Fries',
      category: 'Appetizers',
      description: 'Crispy golden fries.',
      price: 80,
      imageUrl: '',
    }
  ];

  await MenuItem.deleteMany(); // Clear existing data
  await MenuItem.insertMany(items);
  console.log('Menu seeded successfully');

  mongoose.connection.close();
};

seedMenu();
