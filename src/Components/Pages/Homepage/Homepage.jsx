// Imports
import React, { useEffect, useState } from 'react';
import Heading from '../../Heading/Heading';
import Navbar from '../../Navbar/Navbar';
import BlogGrid from '../../Bloggrid/Bloggrid'; 
import Footer from '../../Footer/Footer';
import Subheading from '../../Subheading/Subheading';
import CategoryList from '../../Categorylist/CategoryList';
// Animation
import Loading from '../../Loading/Loading';
import SuccessToast from '../../SuccessToast/SuccessToast';
import ErrorToast from '../../ErrorToast/ErrorToast';

// API Data
import BlogService from '../../../Services/BlogService';
import categoriesService from '../../../Services/CategoriesService';

// Redux Action
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, reset as resetBlogs } from '../../../features/blogsSlice';
import { fetchCategories, reset as resetCategory } from '../../../features/categoriesSlice';

// Home Page
export default function HomePage() {
  const dispatch = useDispatch();

  const {
    blogs,
    isError: isBlogsError,
    isSuccess: isBlogsSuccess, 
    isLoading: isLoadingBlogs,
    message: blogsMessage,
  } = useSelector((state) => state.blogs);

  const {
    categories,
    isError: isCategoriesError,
    isSuccess: isCategoriesSuccess,
    isLoading: isLoadingCategories,
    message: categoriesMessage,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBlogs());
    return () => {
      dispatch(resetBlogs()); 
      dispatch(resetCategory());
    };
  }, [dispatch]);

  if (isLoadingCategories || isLoadingBlogs) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <Subheading subHeading={"Recent Blog Posts"} />
        <BlogGrid blogPosts={blogs}></BlogGrid>
        <Subheading subHeading={"Categories"} />
        <CategoryList categories={categories}></CategoryList>
        <Footer />
      </div>
      <SuccessToast
        show={isBlogsSuccess || isCategoriesSuccess} 
        message={blogsMessage || categoriesMessage}
        onClose={() => {
          dispatch(resetBlogs()); 
          dispatch(resetCategory());
        }}
      />
      <ErrorToast
        show={isBlogsError || isCategoriesError}
        message={blogsMessage || categoriesMessage}
        onClose={() => {
          dispatch(resetBlogs()); 
          dispatch(resetCategory());
        }}
      />
    </>
  );
}
