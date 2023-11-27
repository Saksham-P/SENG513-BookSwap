import React, { useEffect } from 'react'
import './Listing.css'
import { FaMapMarkerAlt } from "react-icons/fa";
import Book1 from '../../assets/book1.jpg'
import Book2 from '../../assets/book2.jpg'
import Book3 from '../../assets/book3.jpg'
import { FaRegHeart, FaRegFlag } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";





export default function Listing({ad}) {
  useEffect(() => {
  },[])


  return (
    <div className='listing-container'>

      <div className='listing-directory'>Home &gt; Calgary &gt; Philosophy Textbooks &gt; Under $60</div>

      <div className='listing-title'>{ad.title}</div>

      <div className='price-location-container'>
        <div className='listing-price'>{`$${ad.price}.00`}</div>
        <div className='map-icon'>
          <FaMapMarkerAlt color='grey' size={24}/>
        </div>
        <div className='listing-location'>Posted 2 minutes ago, near University of Calgary</div>
      </div>

      <div className='listing-action-menu'>
        <div>
          <FaRegHeart size={30}/>
        </div>
        <div>
          <FaRegFlag size={30}/>
        </div>
        <div>
          <FaRegMessage size={30}/>
        </div>
        <div>
          <MdOutlineEmail size={30}/>
        </div>
      </div>

      <div className='listing-images-container'>
        <div className='images-left'>
          <img className='listing-image-left' src={Book1} alt='book1'/>
        </div>
        <div className='images-right'>
          <img className='listing-image-right' src={Book2} alt='book2'/>
          <img className='listing-image-right' src={Book3} alt='book3'/>
        </div>
      </div>

    </div>
  )
}
