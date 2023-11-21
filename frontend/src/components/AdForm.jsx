import { useState } from "react";
import { useAdsContext } from "../hooks/useAdsContext";

import './AdForm.css'

const AdForm = () => {
  const {dispatch} = useAdsContext();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState('');
  const [price, setPrice] = useState(undefined);
  const [swapBook, setSwapBook] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ad = {title, description, price};

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
      setPrice(undefined);
      setError(null);
      setEmptyFields([]);
      dispatch({type: 'CREATE_AD', payload: json})
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
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            placeholder="Select Category"
            className={emptyFields.includes('category') ? 'input_field field_error' : 'input_field'}
            required
          />

          <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
            className={emptyFields.includes('location') ? 'input_field field_error' : 'input_field'}
            required
          />

          <input
            type="text"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            placeholder="Tags (optional)"
            className={emptyFields.includes('tags') ? 'input_field field_error' : 'input_field'}
          />
          <div className="price_section">
            <p>Price / Swap</p>
            <div className="price_swap_section">
              <input type="radio"></input>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Price"
                className={emptyFields.includes('price') ? 'input_field_price field_error' : 'input_field_price'}
              />
              <input type="radio"></input>
              <input
                type="text"
                onChange={(e) => setSwapBook(e.target.value)}
                value={swapBook}
                placeholder="Swap Book"
                className={emptyFields.includes('swap') ? 'input_field_swap field_error' : 'input_field_swap'}
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