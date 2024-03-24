import React, { useState } from "react";
import "./App.css";

const URLAPI = `/api`;

function App() {
  const [data, setData] = useState();
  const [image, setImage] = useState(
    "https://img.freepik.com/free-vector/editable-text-effect-modern-3d-creative-minimal-font-style_314614-1151.jpg"
  );

  const handleOnChange = (event) => {
    setImage(event.target.value);
  };

  const handleClickImage = async (event) => {
    event.preventDefault();
    console.log("click");
    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: image,
        }),
      };

      const resp = await fetch(`${URLAPI}/describe`, fetchOptions);
      const resDescrip = await resp.json();
      console.log(resDescrip.data);
      setData(resDescrip.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Azure Cognitive Services with React!</p>
        <p>Image URL:</p>
        <div className="containerFile">
          <input
            className="inputFile"
            placeholder="Upload image"
            onChange={handleOnChange}
            value={image}
            style={{ width: "450px" }}
          />
          <button className="buttonFile" onClick={handleClickImage}>
            Upload &amp; Check
          </button>
        </div>
        <h4 className="titleAtribute">Image text: </h4>
        <p>
          {data &&
            data.regions[0].lines.map((item) =>
              item.words.map((word) => <>{word.text}, </>)
            )}
        </p>
        <img src={image} width={220} height={180} alt={image} />
        Link of the image:{" "}
        <a
          className="App-link"
          href={image}
          target="_blank"
          rel="noopener noreferrer"
        >
          {image}
        </a>
      </header>
    </div>
  );
}

export default App;
