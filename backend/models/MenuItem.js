import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizers', 'Main Course', 'Desserts', 'Drinks'], // Ensuring the category is valid
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'], // Ensuring positive price
  },
  imageUrl: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});
  const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
  
  export default MenuItem;

