const mongoose = require('mongoose');
 
const auditSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    action: {
        type: String,   
        required: true,
     },

    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },  

    timestamp: {
        type: Date,
        default: Date.now,
    },

    ipAddress: String,
})

module.exports = mongoose.model('Audit', auditSchema);