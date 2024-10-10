'use client'; 
import Button from '@/components/admin/Button';
import { useState, useEffect } from 'react';
import AddCategory from '@/components/admin/AddCat';
import AddProductModal from '@/components/admin/AddProductModal';
import AddDiscountModal from '@/components/admin/AddDiscountModal'; 
import FeatureProductModal from '@/components/admin/FeatureModal';
import DeleteProductModal from '@/components/admin/DeleteModal'; 
import axios from 'axios';
import { Router } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  let router=useRouter();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
    setIsProductModalOpen(false);
    setIsDiscountModalOpen(false);
    setIsFeatureModalOpen(false);
    setIsDeleteModalOpen(false); // Close delete modal if open
  };

  const handleOpenProductModal = () => {
    setIsProductModalOpen(true);
    setIsCategoryModalOpen(false);
    setIsDiscountModalOpen(false);
    setIsFeatureModalOpen(false);
    setIsDeleteModalOpen(false); // Close delete modal if open
  };

  const handleOpenDiscountModal = () => {
    setIsDiscountModalOpen(true);
    setIsCategoryModalOpen(false);
    setIsProductModalOpen(false);
    setIsFeatureModalOpen(false);
    setIsDeleteModalOpen(false); // Close delete modal if open
  };

  const handleOpenFeatureModal = () => {
    setIsFeatureModalOpen(true);
    setIsCategoryModalOpen(false);
    setIsProductModalOpen(false);
    setIsDiscountModalOpen(false);
    setIsDeleteModalOpen(false); // Close delete modal if open
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsCategoryModalOpen(false);
    setIsProductModalOpen(false);
    setIsDiscountModalOpen(false);
    setIsFeatureModalOpen(false); // Close feature modal if open
  };

  const handleCloseModal = () => {
    setIsCategoryModalOpen(false);
    setIsProductModalOpen(false);
    setIsDiscountModalOpen(false);
    setIsFeatureModalOpen(false);
    setIsDeleteModalOpen(false); // Close delete modal
  };

  const addCategory = async (formData:unknown) => {
    console.log('Form Data:', formData);
    try {
      let res = await axios.post('/api/admin/category', formData);
      if (res.data.success) {
        console.log('Category added successfully');
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleCloseModal(); 
    }
  };

  const addProduct = async (formData:unknown) => {
    console.log('Product Data:', formData);
    try {
      let res = await axios.post('/api/admin/product', formData);
      if (res.data.success) {
        console.log('Product added successfully');
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleCloseModal(); 
    }
  };

  const addDiscount = async (data:unknown) => {
    console.log('Discount Data:', data);
    try {
      let res = await axios.post('/api/admin/discount', data);
      if (res.data.success) {
        console.log('Discount added successfully');
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleCloseModal();
    }
  };

  const addFeature = async (data:unknown) => {
    console.log('Feature Data:', data);
    try {
      let res = await axios.post('/api/admin/feature-product', data);
      if (res.data.success) {
        console.log('Product featured successfully');
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleCloseModal(); 
    }
  };

  const deleteProduct = async (data:any) => {
    console.log('Delete Data:', data);
    try {
      let res = await axios.delete(`/api/admin/product/${data.productId}`);
      // Assuming your delete API endpoint follows this pattern
      if (res.data.success) {
        console.log('Product deleted successfully');
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleCloseModal(); // Close the modal after deletion
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 h-screen items-center justify-center">
      <AddCategory
        isOpen={isCategoryModalOpen}
        onClose={handleCloseModal}
        onSubmit={addCategory}
      />
      <AddProductModal
        isOpen={isProductModalOpen}
        onClose={handleCloseModal}
        onSubmit={addProduct}
      />
      <AddDiscountModal
        isOpen={isDiscountModalOpen}
        onClose={handleCloseModal}
        onSubmit={addDiscount}
      />
      <FeatureProductModal
        isOpen={isFeatureModalOpen}
        onClose={handleCloseModal}
        onSubmit={addFeature}
      />
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onSubmit={deleteProduct} // Pass the delete function
      />

      {/* Buttons to open modals */}
      <Button name={"Add a Category"} handler={handleOpenCategoryModal} />
      <Button name={"Add a Product"} handler={handleOpenProductModal} />
      <Button name={"Add Discount to a Product"} handler={handleOpenDiscountModal} />
      <Button name={"Feature a Product"} handler={handleOpenFeatureModal} />
      <Button name={"Delete a Product"} handler={handleOpenDeleteModal} /> {/* Open delete modal */}
      <Button name={"View Orders"} handler={() => console.log("View Orders")} />
      <Button name={"Change Order Status"} handler={() => console.log("Change Order Status")} />
      <button onClick={async()=>{
        let res=await axios.post("/api/admin/logout");
        if(res.data.success){
          console.log("Logged out successfully");
          router.push("/");
        }
      }}>
        LOGOUT
        </button>  
    </div>
  );
}
