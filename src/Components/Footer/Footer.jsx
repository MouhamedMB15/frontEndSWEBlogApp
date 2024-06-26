

//Import
import React from 'react';
import './footer.css';
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  //user
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <nav className="footer-nav">
        <ul>
          <Link to='/'>Home</Link>
          <Link to='/blogs'>Blogs</Link>
          <Link to={user && user._id ? `/profile/${user._id}` : '/'}>About</Link>
        </ul>
      </nav>
      <hr className="footer-divider" />
      <p className="footer-copy">&copy; 2024 The Blog App, Inc</p>
    </footer>
  );
}
