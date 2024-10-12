"use client";

import React, {useState}from "react";
import Image from "next/image";
import { Paper, Typography, FormControl, InputLabel, Input, Button } from "@mui/material";
import fridge from "../public/fridge.jpg";
import axios from "axios";

export default function Home() {
  const [image, setImageURL] = useState("https://lg-sks-content.s3.us-west-1.amazonaws.com/2023-01/sks_48-frenchdoorrefrigerator_v1c_0.jpg"); // default value. make sure to remove.
  const [foodData, setFoodData] = useState([]);

  const handleChange = (e) => {
    setImageURL(e.target.value);
  };

  const predict = () => {
    axios.post('http://localhost:8080/predict', {
      imageURL: image
    }).then((res) => {
      setFoodData(res.data); // loads food data into a list
    }).catch((err) => {
      alert(err)
    });
  }

  return (
      <div className="flex pt-20 justify-between ml-36">
    <FormControl>
      <div>
      <InputLabel variant="outlined" htmlFor="my-input" className="bg-white ml-40">
        Enter an Image URL
      </InputLabel>
      <Input
        id="my-input"
        value={image}
        onChange={handleChange}
        className="ml-40"
      />

        <img 
        className="pt-4"
        src={image} 
        width="500" 
        height="600"/>
      

        <div className="pt-4">
          <Button 
            onClick={predict} 
            className="flex ml-48 justify-center" 
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
    </FormControl>

    <div className="mr-96">
      <div className="flex-row pt-6">
          <Typography className="text-black font-black text-decoration-line: underline">
            Food in Refrigerator
          </Typography>
          <ul>
            {foodData.map((food, index) => (
              <li key={index}>
                <div className="flex pt-4">
                  <Paper>
                    {food.name}
                  </Paper>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
