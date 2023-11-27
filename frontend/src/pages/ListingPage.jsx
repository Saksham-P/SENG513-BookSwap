import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Listing from '../components/Listing/Listing';
import ListingDetails from '../components/Listing/ListingDetails';
import '../components/Listing/Listing.css';
import { useAdsContext } from '../hooks/useAdsContext';

export default function ListingPage() {
  const [id, setId] = useState();
  const { ads, dispatch } = useAdsContext();
  const { id: routeId } = useParams();
  const [adItem, setAdItem] = useState({
    id: null,
    title: null,
    description: '',
    location: '',
    createdAt: '',
    price:null,
    category:'',
  });

  // on load get the id from the page parameters
  useEffect(() => {
    setId(routeId);
  }, [routeId]);

  // on load get the listing
  useEffect(() => {
    const fetchAd = async () => {
      try {
        //get the ad and return the details
        const response = await fetch(`http://localhost:4000/api/ads/${id}`);
        const json = await response.json();
        return json;
        //in case of error just console log for now
      } catch (error) {
        console.error('Error fetching ad:', error);
        return null;
      }
    };

    // fetch the ad only if the ID is available
    if (id) {
      //wait to get the ad and then set the aditem
      (async () => {
        const ad = await fetchAd();
        if (ad) {
          console.log('ad',ad);
          setAdItem({
            id: ad._id,
            title: ad.title,
            price: ad.price,
            description: ad.description,
            location: ad.location,
            createdAt: ad.createdAt,
            category: ad.category,
          });
        } else {
          console.log('ad not found');
          // Redirect to ad not found page
        }
      })();
    }
  }, [id]);

  // for debugging, log the adItem to be passed to children props
  useEffect(() => {
    console.log(adItem);
  }, [adItem]);

  return (
    <div className="main-container">
      {adItem.title && <Listing ad={adItem} />}
      {adItem.title && <ListingDetails ad={adItem} />}
    </div>
  );
}
