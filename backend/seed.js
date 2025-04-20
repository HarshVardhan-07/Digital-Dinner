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
      imageUrl: 'https://i.pinimg.com/736x/57/e7/a1/57e7a19334571946391a7430fcb86202.jpg',
    },
    {
      name: 'Coke',
      category: 'Drinks',
      description: 'Chilled Coca-Cola bottle (500ml)',
      price: 50,
      imageUrl: 'https://www.coca-cola.com/content/dam/onexp/us/en/brands/coca-cola-multi-brand/coke-category-logos/v2/coca-cola.jpg',
    },
    {
      name: 'Chocolate Lava Cake',
      category: 'Desserts',
      description: 'Warm chocolate cake with a gooey center.',
      price: 120,
      imageUrl: 'https://bakewithshivesh.com/wp-content/uploads/2022/09/IMG_0484-scaled.jpg',
    },
    {
      name: 'Fries',
      category: 'Appetizers',
      description: 'Crispy golden fries.',
      price: 80,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/French_Fries.JPG',
    },
  ];
  

  await MenuItem.deleteMany(); // Clear existing data
  await MenuItem.insertMany(items);
  console.log('Menu seeded successfully');

  mongoose.connection.close();
};

seedMenu();
