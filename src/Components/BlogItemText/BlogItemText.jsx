// Imports
import React from 'react';
import Categories from '../Categories/Categories';
import './blogitemtext.css';
import PropTypes from "prop-types";

export default function BlogItemText({ blogPost, headerFontSize }) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <p className="date-author-text">
          {blogPost.author.firstName} 
        </p>
        <div className="dot-divider"></div>
        <p className="date-author-text">
         {blogPost.author.lastName}
        </p>
      </div>
      <p
        style={{
          fontSize: headerFontSize,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        {blogPost.title}
      </p>
      <p style={{ fontSize: "16px", color: "#667085", textAlign: "left" }}>
        {blogPost.description.substring(0, 100)}...
      </p>
      <Categories categories={blogPost.categories} />
      

    </div>
  );
}
BlogItemText.propTypes = {
  blogPost: PropTypes.object.isRequired,
  headerFontSize: PropTypes.string.isRequired,
};