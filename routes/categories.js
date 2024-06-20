const express = require('express')
const router = express.Router();
const { Category } = require('../models/category')


//get all categories 
router.get('/', async (req, res) => {
    const categoryList = await Category.find()
    if (!categoryList) {
        return res.status(404).json({
            message: 'No categories found'
        })
    } else {
        res.send(categoryList);
    }
});

//get single categories
router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id)

    try {        
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            })
        } else {
            res.send(category);
            res.status(200).json({message: 'Category successfully', success:true})
        }
    } catch (error) {
        res.status(400).json({messege:"Invalid category data error" , error:error, success:false});
    }
});

//create category
router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });
    if (!category) {
        return res.status(400).json({
            message: 'Invalid category data'
        })
    } else {
        const savedCategory = await category.save();
        res.send(savedCategory);
    }
});

//delete category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            })
        }else {
            res.status(200).json({message:`Category deleted successfully ${category}`, success:true})
        }
    } catch (error) {
        res.status(400).json({message:"Invalid category data error" , error:error, success:false});
    }
});

//update category one by one by using specific id of category
router.put('/:id', async (req, res) => {

    try {        
        const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name, 
            icon: req.body.icon,
            color: req.body.color,
        }, { new: true })
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            })
        } else {
            res.send(category);
            res.status(200).json({message: 'Category successfully updated', success:true})
        }
    } catch (error) {
    res.status(400).json({messege:"Invalid category data error" , error:error, success:false});
    }
});

module.exports = router