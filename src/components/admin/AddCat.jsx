import { useEffect, useState } from 'react';

export default function AddCategory({ isOpen, onClose, onSubmit }) {
  const [categoryName, setCategoryName] = useState('');
  const [photo, setPhoto] = useState(null);
  
  useEffect(() => {
    if (isOpen) {
      setCategoryName('');
      setPhoto(null);
    }
  }, [isOpen]);
 
  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('photo', photo);

    onSubmit(formData);
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 transform transition-transform duration-300 scale-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={handleCategoryChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter category name"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
              Upload a Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              required
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
