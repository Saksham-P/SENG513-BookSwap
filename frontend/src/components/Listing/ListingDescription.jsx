import React from "react";
import "./ListingDetails.css";
import { FaRegEye } from "react-icons/fa";


export default function ListingDescription({ad}) {
  return (
    <div className="description-container">
      <div className="description-title">Description</div>
      <div className="description-contents">
        {ad.description}
      </div>
      <div className='description-views-container'>
        <FaRegEye color='#8ba5ff' size={30} />
        <div className='description-views'>20 views</div>
      </div>
    </div>
  );
}
