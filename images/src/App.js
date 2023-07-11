import React, { useState, useEffect } from "react";
import axios from "axios";
const App = () => {

  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:4000")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(data)

  const submit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("upload", file);
    axios
      .post("http://localhost:4000", fd)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    
  };

  
  return (
    <>
      <form onSubmit={submit}>
        <label htmlFor=""> Select File </label>
        <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      {data && data?.map((item,index) => (
        <React.Fragment key={index}>
        <img src={`data:image/jpeg;base64,${btoa(item?.avatar?.data)}`} alt="" height ="100px" width="100px"/>
        </React.Fragment>
      ))}

    </>
  );
};

export default App;



// const ImageComponent = ({ bufferData }) => {
//   const [imageURL, setImageURL] = useState('');

//   const convertBufferToImage = () => {
//     const buffer = Buffer.from(bufferData); // Convert buffer data to Buffer object
//     const blob = new Blob([buffer], { type: 'image/jpeg' }); // Create a Blob from the Buffer object
//     const url = URL.createObjectURL(blob); // Create temporary URL for the Blob

//     setImageURL(url); // Set the image URL in the component state
//   };

//   // Call the conversion function when the component is rendered
//   React.useEffect(() => {
//     convertBufferToImage();
//   }, []);

//   return <img src={imageURL} alt="Converted Image" />;
// };


