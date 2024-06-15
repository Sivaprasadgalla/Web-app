import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { fetchProductDetail } from '../store/Products';

function ProductDetail() {
    const {id} = useParams();

    const products = useSelector((state) => state.products.Items);
    const product = products.total > 0 ? products.products.find((product) => product.id == id) : {};
    console.log(product);

  return (
    <div className='product-detail'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Link to='/' className='btn btn-primary'>View all products</Link>
            </div>
          </div>
            {
              product &&
              <div className='row'>
                <div className='col-md-6 product-img'>
                  <img src={product.images && product.images[0]} />
                </div>
                <div className='col-md-6'>
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                  <div className="price">
                      <span className="rupee-icon">₹</span> {product.price}
                  </div>
                </div>
              </div>
            }
        </div>
    </div>
  )
}

export default ProductDetail