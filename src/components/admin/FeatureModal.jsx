import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeatureProductModal = ({ isOpen, onClose, onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    // Clear fields when modal opens
    if (isOpen) {
      setSelectedCategory('');
      setSelectedProduct('');
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/admin/category');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // Fetch categories only when modal opens
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Fetch products when a category is selected
  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    if (categoryId) {
      try {
        const response = await axios.get(`/api/admin/product?categoryId=${categoryId}`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    } else {
      setProducts([]);
    }
  };

  const handleClose = () => {
    onClose(); // Just call onClose to hide the modal
  };

  return (
    <div
      className={`fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      style={{ transition: 'opacity 0.3s ease' }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" 
          onClick={handleClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Feature a Product</h2>

        <label htmlFor="category" className="block mt-4 mb-2">Select Category:</label>
        <select
          id="category"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {products.length > 0 && (
          <>
            <label htmlFor="product" className="block mt-4 mb-2">Select Product:</label>
            <select
              id="product"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </>
        )}

        <button
          className="mt-6 w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors"
          onClick={() => onSubmit({ productId: selectedProduct })}
          disabled={!selectedProduct} // Disable if no product is selected
        >
          Feature Product
        </button>
      </div>
    </div>
  );
};

export default FeatureProductModal;
