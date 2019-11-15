import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "./axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth().get(`http://localhost:5000/api/colors`)
    .then(response => {
      console.log(response);
      setColorList(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  },[])

  return (
    <div className="bubble-page-div">
      <ColorList colors={colorList} updateColors={setColorList} props={props} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;
