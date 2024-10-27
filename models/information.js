const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const casesSchema = new Schema({
    caseTitle: { type: String, required: [true, 'case title is required'] },
    threatType: { 
        type: String,
        required: [true, 'threat type is required'],
        enum: {
            values: ['Non-Urgent', 'Medium', 'Urgent', 'Critical'],
            message: 'Condition must be either Non-Urgent, Medium, Urgent, or Critical'
        }
    },
    details: { type: String, required: [true, 'details is required'] },
    active: { type: Boolean, default: true }
},
{ timestamps: true });

//Collection name is items in the database
module.exports = mongoose.model('Items', casesSchema);