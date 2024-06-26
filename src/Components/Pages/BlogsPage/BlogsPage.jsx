
//Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import "./blogspage.css";

import Navbar from "../../Navbar/Navbar";
import Heading from "../../Heading/Heading";
import BlogList from "../../BlogList/BlogList";
import Footer from "../../Footer/Footer";
import AddEditBlogModal from "../../AddEditBlogModal/AddEditBlogModal";
import Loading from "../../Loading/Loading";
import SuccessToast from "../../SuccessToast/SuccessToast";
import ErrorToast from "../../ErrorToast/ErrorToast";
import DeleteBlogModal from "../../DeleteBlogModal/DeleteBlogModal";


//Blogs Slice
import {
  setAddBlog,
  fetchBlogsByCategoryId,
  resetSuccessAndError as resetBlog,
} from "../../../features/blogsSlice";

//Cateogires Slice
import {
  fetchCategories,
  resetSuccessAndError as resetCategory,
}from "../../../features/categoriesSlice";


//Blogs Page
export default function BlogsPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const {
    blogs,
    isError: isBlogsError,
    isSuccess: isBlogSuccess,
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
    dispatch(fetchBlogsByCategoryId(categoryId));
  }, [categoryId]);

  const onBlogAdd = () => {
    dispatch(
      setAddBlog({
        title: "",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        categories: [],
        authorId: user._id,
        content: [
          {
            sectionHeader: "Introduction",
            sectionText:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
        ],
      })
    );
  };

  const AddButton = () => {
    if (!user || !user?.token) {
      return null;
    }
    return (
      <button className="btn btn-outline-dark m-3" onClick={onBlogAdd}>
        ADD BLOG
      </button>
    );
  };

  const CategoriesList = ({ categoryId }) => {
    if (!categories && !categories?.length) {
      return null;
    }
    return categories.map((category) => {
      return categoryId === category.id ? (
        <Link
          className="link"
          key={category.id}
          to={"/blogs/" + category.id}
          style={{ color: "blue" }}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      ) : (
        <Link
          className="link"
          key={category.id}
          to={"/blogs/" + category.id}
          style={{ color: "black" }}
        >
          <p key={category.id}>{category.title}</p>
        </Link>
      );
    });
  };

  if (isLoadingBlogs || isLoadingCategories) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Heading />
        <div className="scroll-menu">
          <CategoriesList categoryId={categoryId} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to='/blogs' className="page-subtitle">Blog Posts</Link>
        
          <AddButton />
        </div>
        <BlogList blogs={blogs} />
        <AddEditBlogModal />
        <DeleteBlogModal />
      </div>
      <Footer />  
      <SuccessToast
        show={isBlogSuccess || isCategoriesSuccess}
        message={blogsMessage || categoriesMessage}
        onClose={() => {
          dispatch(resetBlog());
          dispatch(resetCategory());
        }}
      />
      <ErrorToast
        show={isBlogsError || isCategoriesError}
        message={blogsMessage || categoriesMessage}
        onClose={() => {
          dispatch(resetBlog());
          dispatch(resetCategory());
        }}
      />
    </>
  );
}