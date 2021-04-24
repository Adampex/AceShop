import express from 'express'
const router = express.Router()
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// GET /api/products
router.get('/', asyncHandler(async(req, res) => {
  const pageSize = 20
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
}))

// GET /api/products/:id
router.get('/:id', asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
  
}))

export default router