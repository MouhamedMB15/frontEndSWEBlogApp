// Import necessary icons from react-icons
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
// import React from 'react';

// // EditButtons Component
// export default function EditButtons({ onEdit, onDelete }) {
//   return (
//     <>
//       <button 
//         style={{
//           position: "absolute",
//           top: "10px",
//           right: "60px",
//           zIndex: 1,
//         }}
//         type="button"
//         className="btn btn-primary"
//         onClick={onEdit}
//       >
//         <FaEdit />  
//       </button>
//       <button
//         style={{
//           position: "absolute",
//           top: "10px",
//           right: "10px",
//           zIndex: 1,
//         }}
//         type="button"
//         className="btn btn-secondary"
//         onClick={onDelete}
//       >
//         <FaTrashAlt /> 
//       </button>
//     </>
//   );
// }

import React from "react";

export default function EditButtons({ onEdit, onDelete, onNavigate }) {
  return (
    <>
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "60px",
          border: "none",
          zIndex: 1,
        }}
        type="button"
        className="btn"
        onClick={onEdit}
      >
        <i className="bi bi-pencil-fill"></i>
      </button>
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "35px",
          border: "none",
          zIndex: 1,
        }}
        type="button"
        className="btn"
        onClick={onDelete}
      >
        <i className="bi bi-trash-fill"></i>
      </button>
      <button
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        border: "none",
        zIndex: 1,
      }}
      type="button"
      className="btn"
      onClick={onNavigate}
    >
      <i className="bi bi-arrows-fullscreen"></i>
    </button>
    </>
  );
}



