const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    title: { type: String, required: [true, 'title is required'] },
    seller: { type: String, required: [true, 'seller is required'] },
    condition: { 
        type: String, 
        required: [true, 'condition is required'],
        enum: {
            values: ['New', 'Good', 'Resold', 'Other'],
            message: 'Condition must be either New, Good, Resold, or Other'
        }
    },
    price: { 
        type: Number, 
        required: [true, 'price is required'], 
        min: [0.01, 'Price must be greater than or equal to 0.01']
    },
    details: { type: String, required: [true, 'details is required'] },
    image: { type: String, required: [true, 'image is required'] },
    active: { type: Boolean, default: true }
},
{ timestamps: true });

//Collection name is items in the database
module.exports = mongoose.model('Items', itemsSchema);