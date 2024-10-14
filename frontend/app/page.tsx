"use client";
import React, { useState } from "react";
import axios from "axios";
import { IBM_Plex_Mono } from "next/font/google";
import { Backdrop, CircularProgress } from "@mui/material";

// Define the interface for food items
interface FoodItem {
  name: string;
}

const font = IBM_Plex_Mono({ // Can be changed.
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [image, setImageURL] = useState(
    "https://lg-sks-content.s3.us-west-1.amazonaws.com/2023-01/sks_48-frenchdoorrefrigerator_v1c_0.jpg" // Default link.
  );
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(e.target.value);
  };

  // Calls the express backend and sends the link to the API.
  const predict = () => {
    setLoading(true); // Set loading to true when the request starts
    axios
      .post<FoodItem[]>(`${process.env.NEXT_PUBLIC_SERVER}/predict`, {
        imageURL: image,
      })
      .then((res) => {
        setFoodData(res.data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((err) => {
        alert(err);
        setLoading(false); // Set loading to false if there's an error
      });
  };

  return (
    <div className={`${font.className} container mx-auto py-20`}>
      <div className="flex flex-col md:flex-row justify-center items-start md:space-x-10">
        
        <div className="w-full md:w-1/2">
          <div className="bg-white shadow-md rounded-lg p-6">
            
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {/* Image */}
            <div className="mt-4">
              <img src={image} alt="Selected" className="w-full rounded-lg" />
            </div>
            
            {/* Submit Button */}
            <div className="mt-4 text-center">
              <button
                onClick={predict}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        
        {/* Food Data */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-black text-2xl font-semibold mb-4">
              Ingredients Available
            </h2>
            <ul>
              {foodData.map((food, index) => (
                <li key={index} className="text-black py-2 border-b">
                  {food.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Backdrop with CircularProgress */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading} // Show backdrop when loading is true
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
