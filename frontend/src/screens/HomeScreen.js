import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
import Paginate from '../components/Paginate'

const HomeScreen = ({ match }) => {
  const [products, setProducts] = useState([])
  const [pages, setPages] = useState([])
  const [page, setPage] = useState([])

  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  useEffect(() => {
    const fetchProducts = async (keyword='', pageNumber='') => {
      
      const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

      setProducts(data.products)
      setPages(data.pages)
      setPage(data.page)
    }
    
    fetchProducts(keyword, pageNumber)
  }, [keyword, pageNumber])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate 
        pages={pages} 
        page={page}
        keyword={keyword ? keyword : ''}
      />
    </>
  )
}

export default HomeScreen

