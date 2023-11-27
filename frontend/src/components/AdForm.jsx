import { useState } from "react";
import { useAdsContext } from "../hooks/useAdsContext";
import { useNavigate } from 'react-router-dom';
import { tagOptions } from './tagOptions';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import './AdForm.css'

const AdForm = () => {
  let navigate = useNavigate();

  const {dispatch} = useAdsContext();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState('');
  const [price, setPrice] = useState(0);
  const [swapBook, setSwapBook] = useState("");
  const [priceEnabled, setPriceEnabled] = useState(true);

  const categoryOptions = [
    { value: 'Business', label: 'Business' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Education', label: 'Education' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Law', label: 'Law' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Medicine', label: 'Medicine' },
    { value: 'Natural Science', label: 'Natural Science' }
  ];

  const radioChanged = (e) => {
    if (e.target.id === "price_radio") setPriceEnabled(true);
    else setPriceEnabled(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ad = {title, description, files, category, location, tags, price, swapBook};

    const response = await fetch('http://localhost:4000/api/ads', {
      method: 'POST',
      body: JSON.stringify(ad),
      headers: {
        'Content-type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      console.log("error", json);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      setFiles([]);
      setCategory("");
      setLocation("");
      setTags('');
      setPrice(0);
      setSwapBook('');
      setError(null);
      setEmptyFields([]);
      dispatch({type: 'CREATE_AD', payload: json})

      navigate('/home');
    }
  }

  const handleImage = (e) => {
    if (e.target.files.length > 0) {
      let tempFiles = [];
      for (let i = 0; i < e.target.files.length; i++) {
        if (!files.some(file=>file.name === e.target.files[i].name)) {
          let temp = {
            name: e.target.files[i].name,
            src: URL.createObjectURL(e.target.files[i])
          }
          tempFiles.push(temp);
        }
      }
      setFiles([...files, ...tempFiles]);
    }
    e.target.value = null;
  }

  return (
    <form className="create_ad" onSubmit={handleSubmit}>
      <div className="ad_section">
        <div className="ad_main">
          <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Add Title"
          className={emptyFields.includes('title') ? 'input_field field_error' : 'input_field'}
          required
          />

          <textarea
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Description"
          className={emptyFields.includes('description') ? 'input_field field_error' : 'input_field'}
          required
          />

          <div className="ad_images">
            <p>Images</p>
            {files.map((file, i) => (
              <img key={i} src={file.src} alt="test"/>
            ))}
            <label id="upload_button" htmlFor="upload_image"></label>
            <input type="file" id="upload_image" style={{display: "none"}} onChange={handleImage}></input>
          </div>
        </div>
        <div className="ad_side">
          <Select 
            options={categoryOptions}
            onChange={(e) => setCategory(e.label)}
            value={categoryOptions.filter(function(opt) {
              return opt.value === category;
            })}
            className={emptyFields.includes('category') ? 'react-select-container select_field field_error' : 'react-select-container select_field'}
            classNamePrefix="react-select"
            placeholder="Select Category"
          />

          <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
            className={emptyFields.includes('location') ? 'input_field field_error' : 'input_field'}
            required
          />

          <CreatableSelect  
            isMulti
            options={tagOptions}
            className={emptyFields.includes('tags') ? 'react-select-container select_field field_error' : 'react-select-container select_field'}
            classNamePrefix="react-select"
            placeholder="Select Tags"
          />

          <div className="price_section">
            <p>Price / Swap</p>
            <div className="price_swap_section">
              <input id="price_radio" type="radio" name="price" onChange={radioChanged} checked={priceEnabled}></input>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                min={0}
                placeholder="Price"
                className={emptyFields.includes('price') ? 'input_field_price field_error' : 'input_field_price'}
                disabled={priceEnabled ? false : true}
              />
              <input id="swap_radio" type="radio" name="price" onChange={radioChanged}></input>
              <input
                type="text"
                onChange={(e) => setSwapBook(e.target.value)}
                value={swapBook}
                placeholder="Swap Book"
                className={emptyFields.includes('swap') ? 'input_field_swap field_error' : 'input_field_swap'}
                disabled={priceEnabled ? true : false}
              />
            </div>
          </div>
        </div>
      </div>
      <button className="post_button">Post Ad</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AdForm;