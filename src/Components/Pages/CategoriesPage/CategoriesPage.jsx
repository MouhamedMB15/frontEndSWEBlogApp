

// Third party
import React from "react";

// Components
import Navbar from  '../../Navbar/Navbar';
import Heading from '../../Heading/Heading';
import CategoryList from '../../Categorylist/CategoryList';
import Footer from '../../Footer/Footer';
import Subheading from "../../Subheading/Subheading";
import { useState, useEffect } from "react";
import Loading from "../../Loading/Loading";
import ErrorToast from "../../ErrorToast/ErrorToast";
import SuccessToast from "../../SuccessToast/SuccessToast";
import AddEditBlogModal from "../../AddEditBlogModal/AddEditBlogModal";
import AddEditCategoryModal from '../../AddEditCategoryModal/AddEditCategoryModal';
import DeleteCategoryModal from '../../DeleteCategoryModal/DeleteCategoryModal';

// Styles


// dummy data
// import data from '../../../dummy-data.json';
// const categories = data.categories;


// Services
import categoriesService from '../../../Services/CategoriesService';

// Categories Page
export default function CategoriesPage() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState();
  const [editCategory, setEditCategory] = useState();
  const [deleteCategory, setDeleteCategory] = useState();

  const [loading, setLoading] = useState();
  const [message, setMessage] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [isError, setIsError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesRes = await categoriesService.fetchCategories();
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (err) {
        setIsError(true);
        setMessage(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onCategoryAdd = () => {
    setAddCategory({
      title: "",
      description: "",
      color: "#000000",
    });
  };

  const onCategoryUpdate = (category) => {
    setEditCategory(category);
  };

  const onCategoryDelete = (category) => {
    setDeleteCategory(category);
  };

  const createCategory = async (category) => {
    try {
      const newCategory = await categoriesService.createCategory(category);
      setIsSuccess(true);
      setMessage(newCategory.message);
      setCategories((prev) => {
        return [...prev, newCategory.data];
      });
    } catch (err) {
      setIsError(true);
      setMessage(err);
    }
    setAddCategory(null);
  };

  const updateCategory = async (category) => {
    try {
      const updatedCategory = await categoriesService.updateCategory(category);
      setIsSuccess(true);
      setMessage(updatedCategory.message);
      setCategories((prev) => {
        const index = prev.findIndex((x) => x.id === updatedCategory.data.id);
        prev[index] = updatedCategory.data;
        return prev;
      });
    } catch (err) {
      setIsError(true);
      setMessage(err);
    }
    setEditCategory(null);
  };

  const removeCategory = async (category) => {
    try {
      const newBlog = await categoriesService.deleteCategory(category.id);
      setIsSuccess(true);
      setMessage(newBlog.message);
      setCategories((prev) => prev.filter((x) => x.id !== category.id));
    } catch (err) {
      setIsError(true);
      setMessage(err);
    }
    setDeleteCategory(null);
  };

  const AddButton = () => {
    if(!user || !user.token) {
      return null;
    }
    return (
      <button className="btn btn-outline-dark h-75" onClick={onCategoryAdd}>
        ADD CATEGORY
      </button>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className="page-subtitle">Categories</p>
          <AddButton />
        </div>
        <CategoryList
          categories={categories}
          onEdit={onCategoryUpdate}
          onDelete={onCategoryDelete}
        ></CategoryList> 
      </div>
      <Footer />
      <AddEditCategoryModal
        addCategory={addCategory}
        editCategory={editCategory}
        createCategory={createCategory}
        updateCategory={updateCategory}
        onClose={() => {
          setAddCategory(null);
          setEditCategory(null);
        }}
      />
      <DeleteCategoryModal
        deleteCategory={deleteCategory}
        removeCategory={removeCategory}
        onClose={() => setDeleteCategory(null)}
      />
      <SuccessToast
        show={isSuccess}
        message={message}
        onClose={() => {
          setIsSuccess(false);
          setMessage("");
        }}
      />
      <ErrorToast
        show={isError}
        message={message}
        onClose={() => {
          setIsError(false);
          setMessage("");
        }}
      />
    </>
  );
}