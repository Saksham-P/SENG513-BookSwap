import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import logo from '../assets/logo_large.png'
import locationIcon from '../assets/location_icon.png'

import './Navbar.css'
import { useLogout } from "../hooks/useLogout";

import { CgProfile } from "react-icons/cg";


const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useLogout();
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const { user } = useAuthContext();
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(null)
  const [admin, setAdmin] = useState()
  const [adminFetched, setAdminFetched] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the query parameters
        const response = await fetch(`http://localhost:4000/api/user/isAdmin/${user.id}`);
        const data = await response.json();

        if (response.ok) {
          setAdmin(data);
          setAdminFetched(true)
        } else {
          throw new Error(data.error || "Failed to fetch results");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    window.location.reload(); // This will reload the page
    console.log('User logged out');
    navigate('/');
  };

  const handleSearchSubmit = () => {
    const searchURL = searchQuery.trim()
      ? `/search?query=${encodeURIComponent(searchQuery.trim())}`
      : "/search";
    navigate(searchURL);
  };

  /* Handle clicks around toggle for user account so toggle button is hidden */
  const handleClickOutside = (event) => {
    // If the click is outside the dropdown, close it
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleLinkClick = () => {
    setShowDropdown(false); // Close the dropdown when a link is clicked
  };

  function keyboardHandler(e) {
    const input = document.getElementById("navbar_logged_in_search")
    if (input.contains(e.target) && e.key === 'Enter') {
      handleSearchSubmit();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyboardHandler)
    return () => { document.removeEventListener('keydown', keyboardHandler) }
  })

  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);


  return (
    <header>
      <div className="navbar_container">
        <div className="navbar_top">
          <Link to="/"><img className='navbar_logo' src={logo} alt='Logo'></img></Link>
          <div className="navbar_search_section">
            <input
              id="navbar_logged_in_search"
              className='navbar_searchbar'
              type='text'
              placeholder='Search for any textbook'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}>
            </input>
            <Link to="/search"><button className='navbar_search_button'>Search</button></Link>
          </div>
          <div className="navbar_acc_section">
            <div className="right-side-container">
              <div className="profile-dropdown-container" ref={dropdownRef}>
                <div id="profile-icon" ref={dropdownRef}>
                  <CgProfile fontSize={50} onClick={() => setShowDropdown(!showDropdown)}  color="#8BA5FFFF"/>
                </div>
                {showDropdown && (
                  <div className="profile-dropdown">
                    <Link to="/search" onClick={toggleDropdown}>View Listings</Link>
                    <Link to="/myads" onClick={handleLinkClick}>My Ads</Link>                   
                    <Link to="/change-password" onClick={handleLinkClick}>Change Password</Link>
                    <Link to="/myfavorites" onClick={handleLinkClick}>My Favorites</Link>
                    <Link id="test" to="/create" onClick={handleLinkClick}>Post Ad</Link>
                    {admin && <Link to="/admin" onClick={handleLinkClick}>Administrator</Link>}
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                )}
              </div>
              <Link to="/create"><button className='navbar_login_button'>Post Ad</button></Link>
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}

export default Navbar;