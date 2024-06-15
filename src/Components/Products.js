import React, { useEffect, useState } from 'react';
import { addProduct, fetchProductsList, updateProduct } from '../store/Products';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Products() {
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [productData, setProductData] = useState({ id: '', title: '', price: '', description: '', thumbnail: null });
    const [imagePreview, setImagePreview] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    const dispatch = useDispatch();
    const productsData = useSelector(state => state.products.Items);
    const status = useSelector((state) => state.products.status);
    const products = productsData.total > 0 ? productsData.products : [];

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProductsList());
        }
    }, [status, dispatch]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductData({ ...productData, thumbnail: reader.result });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOpenModal = (product = { id: '', title: '', price: '' }) => {
        setProductData(product);
        setEditMode(!!product.id);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setProductData({ id: '', title: '', price: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    // searched result
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // searched products or all products
    const FinalProducts = searchQuery ? filteredProducts : products

    //pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = FinalProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const handleSubmit = () => {
        if (editMode) {
            dispatch(updateProduct(productData));
        } else {
            dispatch(addProduct({ ...productData, id: Date.now() }));
        }
        handleCloseModal();
    };

  return (
    <div className='products m-5'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'>
                    <button className='btn btn-primary mb-5 add-product' onClick={() => handleOpenModal()}>Add Product</button>
                </div>
                <div className='col-md-9'>
                    <input type='text'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='form-control' 
                    placeholder='Search product....' />
                </div>
            </div>
            <div className='row'>
                {FinalProducts.length > 0 ? 
                    currentProducts.map((product, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                            <div className='white-box'>
                                <div className="product-img">
                                    <img src={product.thumbnail} alt={product.title}/>
                                    <div className='edit-product' onClick={() => handleOpenModal(product)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="product-bottom">
                                    <div className="product-name">{product.title}</div>
                                    <p>{product.description.substr(0, 40)}{product.description.length > 40 && "...."}</p>
                                    <div className="price">
                                        <span className="rupee-icon">₹</span> {product.price}
                                    </div>
                                    <Link to={`/product/${product.id}`} className="blue-btn">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <h3>No products found</h3>
                }
                <div className='col-md-12'>
                <div className="pagination">
                    {Array.from({ length: Math.ceil(FinalProducts.length / productsPerPage) }, (_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                            {index + 1}
                        </button>
                    ))}
                </div>
                </div>
                <div className='col-md-12'>
                    {modalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={handleCloseModal}>&times;</span>
                                <h2>{editMode ? 'Edit Product' : 'Add Product'}</h2>
                                <input
                                    type="text"
                                    name="title"
                                    className='form-control'
                                    placeholder="Title"
                                    value={productData.title}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    name="price"
                                    className='form-control'
                                    placeholder="Price"
                                    value={productData.price}
                                    onChange={handleChange}
                                />
                                <textarea
                                    type="text-area"
                                    name="description"
                                    className='form-control'
                                    placeholder="Description"
                                    value={productData.description}
                                    onChange={handleChange}
                                >
                                </textarea>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} />}
                                <button onClick={handleSubmit} className='btn btn-primary'>{editMode ? 'Update' : 'Add'}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Products