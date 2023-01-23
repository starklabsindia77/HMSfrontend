const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    phoneNumber: {
        type: String,
        max: 255,
        min: 10
    },
    role: {
        type: Object,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
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
    },
    country: {
        type: String,
        max: 255,
        min: 6
    },
    address: {
        type: String,
        max: 255,
        min: 6
    },
    state: {
        type: String,
        max: 255,
        min: 6
    },
    city: {
        type: String,
        max: 255,
        min: 6
    },
    zipCode: {
        type: String,
        max: 255,
        min: 6
    },
    about: {
        type: String,
        max: 255,
        min: 6
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    isVerified :{
        type: Boolean,
        default: true
    },
    status:{
        type: String,
        max: 255,
        min: 6,
        default:'active'
    },
    photoURL: {
        type: String,
        default: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_default.jpg",
        max: 255,
        min: 6
    },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);