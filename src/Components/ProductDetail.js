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
                  <img src={product.thumbnail} />
                </div>
                <div className='col-md-6'>
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                  <div className="product-info">
                    <p><strong>Price:</strong> <span className="rupee-icon">₹</span> {product.price || "not avalable"}</p>
                    <p><strong>Availability:</strong> {product.availabilityStatus || "not avalable"}</p>
                    <p><strong>Stock:</strong> {product.stock || "not avalable"}</p>
                  </div>
                  <div className="product-reviews">
                    <h3>Reviews</h3>
                    <ul>
                      {product.reviews ? product.reviews.map((review, index) => (
                        <li key={index}>
                          <p><strong>Rating:</strong> {review.rating}</p>
                          <p><strong>Comment:</strong> {review.comment}</p>
                          <p><strong>Reviewer:</strong> {review.reviewerName}</p>
                        </li>
                      ))
                      :
                      <h4>No reviews found</h4>
                    }
                    </ul>
                </div>
                </div>
              </div>
            }
        </div>
    </div>
  )
}

export default ProductDetail