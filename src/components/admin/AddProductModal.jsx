import axios from 'axios'; 
import { useState, useEffect } from 'react';

export default function AddProductModal({ isOpen, onClose, onSubmit }) {
  const [productName, setProductName] = useState('');
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState('');

  const [description, setDescription] = useState('');
  
  // Size quantities
  const [smallQty, setSmallQty] = useState('');
  const [mediumQty, setMediumQty] = useState('');
  const [largeQty, setLargeQty] = useState('');
  const [extraLargeQty, setExtraLargeQty] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProductName('');
      setPhotos([]);
      setDescription('');
      
      setSelectedCategory('');
      setPrice('');
      setSmallQty('');
      setMediumQty('');
      setLargeQty('');
      setExtraLargeQty('');
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/admin/category');
        const data = response.data;
        setCategories(data.categories); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);

    // Append all selected photos to formData
    photos.forEach((photo) => {
      formData.append('photo', photo);
    });

    formData.append('category', selectedCategory);
    formData.append('price', price);
  
    formData.append('description', description);

    // Append size quantities as an object
    const sizeData = {
      S: smallQty ? parseInt(smallQty, 10) : 0,
      M: mediumQty ? parseInt(mediumQty, 10) : 0,
      L: largeQty ? parseInt(largeQty, 10) : 0,
      XL: extraLargeQty ? parseInt(extraLargeQty, 10) : 0,
    };
    formData.append('size', JSON.stringify(sizeData));
    
    onSubmit(formData);
  };

  // Handle photo input change
  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Product</h2>
        <div className="max-h-[70vh] overflow-y-auto">
          <form id="addProductForm" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="mb-4">
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
              />
            </div>

            {/* Upload Photos */}
            <div className="mb-4">
              <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photos
              </label>
              <input
                type="file"
                id="photos"
                accept="image/*"
                onChange={handlePhotoChange}
                multiple
                required
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Dropdown */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>

          
            {/* Size and Quantity */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Size Quantities</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Small (S)"
                  value={smallQty}
                  onChange={(e) => setSmallQty(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Medium (M)"
                  value={mediumQty}
                  onChange={(e) => setMediumQty(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Large (L)"
                  value={largeQty}
                  onChange={(e) => setLargeQty(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Extra Large (XL)"
                  value={extraLargeQty}
                  onChange={(e) => setExtraLargeQty(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product description"
              />
            </div>
          </form>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="addProductForm"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
