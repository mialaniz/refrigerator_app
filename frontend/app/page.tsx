"use client";

import React, {useState}from "react";
import Image from "next/image";
import { Paper, Typography, FormControl, InputLabel, Input, Button } from "@mui/material";
import fridge from "../public/fridge.jpg";
import axios from "axios";

export default function Home() {
  const [image, setImageURL] = useState("https://samples.clarifai.com/metro-north.jpg"); // default value. make sure to remove.
  const [foodData, setFoodData] = useState([]);

  const handleChange = (e) => {
    setImageURL(e.target.value);
  };

  const predict = () => {
    axios.post('http://localhost:8080/predict', {
      imageURL: image
    }).then((res) => {
      
      alert(JSON.stringify(res.data))
      setFoodData(res.data); // loads food data into a list

    }).catch((err) => {
      alert(err)
    });
  }

  return (
    <div className="flex flex-col items-center pt-56">
      <FormControl>
        <Input 
        value={image} 
        onChange={handleChange} 
        className="bg-white" id="my-input" aria-describedby="my-helper-text"/>
        
        <div className="pt-4">
          <Button 
          onClick={predict} 
          className="flex"variant="contained">Submit</Button>
        </div>

        <div className="pt-6">
          <ul>
            {foodData.map((food, index) => (
              <li key={index}>
                {food.name}: {food.value}
              </li>
            ))}
          </ul>
        </div>
      
      </FormControl>
    </div>
  );
}
