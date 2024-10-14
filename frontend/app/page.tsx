"use client";
import React, { useState } from "react";
import { FormControl, InputLabel, Input, Button } from "@mui/material";
import axios from "axios";
import { Londrina_Solid } from "next/font/google";

// Define the interface for food items
interface FoodItem {
  name: string;
}

const font = Londrina_Solid({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [image, setImageURL] = useState(
    "https://lg-sks-content.s3.us-west-1.amazonaws.com/2023-01/sks_48-frenchdoorrefrigerator_v1c_0.jpg"
  );
  
  const [foodData, setFoodData] = useState<FoodItem[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(e.target.value);
  };

  const predict = () => {
    axios.post<FoodItem[]>(`${process.env.NEXT_PUBLIC_SERVER}/predict`, {
        imageURL: image,
      })
      .then((res) => {
        setFoodData(res.data); 
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className={font.className}>
      <div className="flex pt-20 justify-between ml-36">
        <FormControl>
          <div>
            <InputLabel
              variant="outlined"
              htmlFor="my-input"
              className={`${font.className} bg-white ml-40`}
            >
              Enter an Image URL
            </InputLabel>
            <Input
              id="my-input"
              value={image}
              onChange={handleChange}
              className="ml-40"
            />

            <img className="pt-4" src={image} width="500" height="600" />

            <div className="flex pt-4">
              <Button
                onClick={predict}
                className={`${font.className} flex ml-48 justify-center`}
                variant="contained"
              >
                Submit
              </Button>
            </div>
          </div>
        </FormControl>

        <div className="mr-96">
          <div className={`${font.className} flex-row pt-6`}>
            <div className="text-black text-decoration-line: underline">
              Food in Refrigerator
            </div>
            <ul>
              {foodData.map((food, index) => (
                <li key={index}>
                  <div className="text-black flex pt-2">{food.name}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
