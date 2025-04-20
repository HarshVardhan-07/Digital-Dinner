import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define('Order', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Name is required' },
      len: {
        args: [3, 255],
        msg: 'Name must be between 3 and 255 characters long'
      }
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Phone number is required' },
      isNumeric: { msg: 'Phone number must only contain numbers' },
      len: {
        args: [10, 15], // Assuming phone numbers are between 10-15 characters long
        msg: 'Phone number must be between 10 and 15 digits long'
      }
    }
  },
  items: {
    type: DataTypes.JSONB,
    allowNull: false,
    validate: {
      isValidJSON(value) {
        if (!Array.isArray(value) || value.length === 0) {
          throw new Error('Items must be a non-empty array');
        }
      }
    }
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: 'Total price must be a valid number' },
      min: {
        args: [0],
        msg: 'Total price must be greater than or equal to 0',
      }
    }
  },
}, {
  timestamps: true,
});

export default Order;