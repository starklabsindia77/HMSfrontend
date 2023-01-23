const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    access: {
        type: Object,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        max: 255,
        min: 10
    },
    updatedBy: {
        type: String,
        max: 255,
        min: 10
    }

});

module.exports = mongoose.models.Role || mongoose.model('Role', roleSchema);