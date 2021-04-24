import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import connectDB from './config/db.js'
import faker from 'faker'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()

    await User.insertMany(users)

    let productsArr = []

    for (let i = 0; i < 100; i++) {
      let product = new Product({
        name: faker.commerce.productName(),
        image: faker.image.image(),
        description: faker.commerce.productDescription(),
        brand: faker.company.companyName(),
        category: faker.commerce.department(),
        price: faker.commerce.price(),
        countInStock: Math.floor(Math.random() * 101),
      })
      productsArr.push(product)
      
    }
    await Product.insertMany(productsArr)
    productsArr = []
    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if(process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}