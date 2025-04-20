import express from 'express';
import { getAllMenuItems,addMenuItem, editMenuItem, getMenuItemById } from '../controllers/menuController.js';

const router = express.Router();

router.get('/menu', getAllMenuItems);

//Single Item info
router.get('/menu/:id', getMenuItemById);

// Route to add a new menu item (POST)
router.post('/menu', addMenuItem);

// Route to edit an existing menu item (PUT)
router.put('/menu/:id', editMenuItem);

export default router;