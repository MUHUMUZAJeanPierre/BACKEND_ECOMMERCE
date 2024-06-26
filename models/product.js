const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    richDescription:{
        type: String,
        required: false,
        dafault: ''
    },
    image: {
        type: String,
        required: true,
    },
    images:[{
        type: String,
    }],
    brand:{
        type: String,
        default:''
    },
    price:{
        type: String,
        default: 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category', 
    },     
    countInStock:{
        type: Number,
        required: true,
        min:0,
        max: 255
    } ,
    rating:{
        type: Number,
        default: 0,
    },
    numberReviews:{
        type: Number,
        default: 0,
    },
    isFeatured:{
        type: Boolean,
        default: false,
    },
    dateCreated:{
        type:Date,
        default: Date.now,
    }
});

exports.Product = mongoose.model('Product', productSchema);