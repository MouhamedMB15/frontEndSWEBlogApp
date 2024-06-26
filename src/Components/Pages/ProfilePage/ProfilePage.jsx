


//Imports
import { useState, useEffect} from "react";
import Navbar from "../../Navbar/Navbar";
import Loading from "../../Loading/Loading";
import ErrorToast from "../../ErrorToast/ErrorToast";
import SuccessToast from "../../SuccessToast/SuccessToast";
import BlogList from '../../BlogList/BlogList';
import AddEditBlogModal from '../../AddEditBlogModal/AddEditBlogModal';
import DeleteBlogModal from '../../DeleteBlogModal/DeleteBlogModal';
import Footer from '../../Footer/Footer';
import { useParams } from "react-router-dom";
import blogService from "../../../Services/BlogService";
import authService from "../../../Services/authService";





//Profile Page

export default function ProfilePage() {
  const { authorId } = useParams();

  const [author, setAuthor] = useState();
  const [blogs, setBlogs] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAuthorBlogs = async () => {
      try {
        setIsLoading(true);
        const author = await authService.getUser(authorId);
        const blogs = await blogService.fetchBlogsByAuthorId(authorId);
        setBlogs(blogs.data);
        setAuthor(author.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        setMessage(error.message || error);
      }
    };
    fetchAuthorBlogs();
  }, [authorId]);

  const resetSuccess = () => {
    setIsSuccess(false);
    setMessage("");
  };

  const resetError = () => {
    setIsError(false);
    setMessage("");
  };

  const AuthorDetails = () => {
    return (
      <div className="col-md-8 col-lg-6 col-xl-4 mx-auto">
        <div className="position-sticky my-5" style={{ top: "2rem" }}>
          <div className="p-4 mb-3 bg-light rounded">
            <h4 className="fst-italic">
              {author.firstName} {author.lastName}
            </h4>
            <img src={author.image} className="avatar" alt="..." />
            <p>{author.bio.substring(0, 100)}...</p>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading || !author || !blogs) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <AuthorDetails />
        <p className="page-subtitle">Author Blog Posts</p>
        <BlogList blogs={blogs} />
        <Footer />
      </div>
      <AddEditBlogModal />
      <DeleteBlogModal />
      <SuccessToast show={isSuccess} message={message} onClose={resetSuccess} />
      <ErrorToast show={isError} message={message} onClose={resetError} />
    </>
  );
}