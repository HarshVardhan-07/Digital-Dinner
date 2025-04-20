import MenuItem from '../models/MenuItem.js';

// GET /api/menu
export const getAllMenuItems = async (req, res) => {
  try {
      const { category } = req.query;  // Extract category from query parameters
      
      let menuItems;
      
      if (category) {
          // If a category is provided, filter menu items by that category
          menuItems = await MenuItem.find({ category: category });
      } else {
          // If no category is provided, return all menu items
          menuItems = await MenuItem.find();
      }

      if (menuItems.length === 0) {
          return res.status(404).json({ message: 'No menu items found' });
      }

      res.json(menuItems);  // Return the filtered (or all) menu items
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving menu items' });
  }
};

// Get a single menu item by ID
export const getMenuItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error fetching menu item', error: error.message });
  }
};

// Add a new menu item
export const addMenuItem = async (req, res) => {
  const { name, category, description, price, imageUrl, available } = req.body;

  // Create a new menu item using the validated data
  try {
      const newMenuItem = new MenuItem({
          name,
          category,
          description,
          price,
          imageUrl,
          available
      });

      // Save the new menu item to the database
      await newMenuItem.save();
      res.status(201).json(newMenuItem);
  } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error adding menu item', error: error.message });
  }
};

// Edit an existing menu item
export const editMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, imageUrl, available } = req.body;

  try {
      // Find the menu item by its ID
      const menuItem = await MenuItem.findById(id);

      if (!menuItem) {
          return res.status(404).json({ message: 'Menu item not found' });
      }

      // Update the menu item fields with the new data
      menuItem.name = name || menuItem.name;
      menuItem.category = category || menuItem.category;
      menuItem.description = description || menuItem.description;
      menuItem.price = price || menuItem.price;
      menuItem.imageUrl = imageUrl || menuItem.imageUrl;
      menuItem.available = available !== undefined ? available : menuItem.available;

      // Save the updated menu item to the database
      await menuItem.save();
      res.json(menuItem);
  } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error updating menu item', error: error.message });
  }
};