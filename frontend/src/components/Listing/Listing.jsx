import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegHeart, FaRegFlag } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import './Listing.css'

export default function Listing({ad, imageUrls}) {
 // Function to format the date
  const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) + ' at ' + date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

  return (
    <div className='listing-container'>
      <div className='listing-title'>{ad.title}</div>
      <div className='price-location-container'>
        <div className='listing-price'>{ad.price ? `$${ad.price}.00` : `${(ad.swapBook) ? `Trade for ${ad.swapBook}` : 'Free'}`}</div>
        <div className='map-icon'>
          <FaMapMarkerAlt color='grey' size={24}/>
        </div>
        <div className='ad-info-container'> 
          <div className='listing-date'>Post Date: {formatDate(ad.createdAt)}. </div>
          <div> Post Location: {ad.university} </div>
          <div className='course-codes'>Course Codes: {ad.tags}</div>
        </div>

      </div>

      <div className='listing-images-container'>
        {imageUrls && imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <img key={index} className='listing-image' src={url} alt={`Content ${index + 1}`} />
          ))
        ) : (
          // Placeholder image if there are no image URLs
          <img src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg" alt="Not available" />
        )}
      </div>

    </div>
  )
}
