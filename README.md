# Food Ingredient Detection App
https://refrigerator-app.vercel.app/

## Overview

This project is a web application for detecting food ingredients from uploaded the image URL. The application consists of a frontend and a backend that communicate through APIs. The backend leverages the Clarifai API for food image recognition.


## How It Works
Enter a link to an image of a refrigerator. This will then send the link to the Clarifai model. After this is done, it will output the ingredients/food that the it contains. It has the default link:
https://lg-sks-content.s3.us-west-1.amazonaws.com/2023-01/sks_48-frenchdoorrefrigerator_v1c_0.jpg, but it can easily be changed to your own link. 


### Frontend
- **globals.css**: Contains global styles using Tailwind CSS.
- **layout.tsx**: Layout structure for the frontend.
- **page.tsx**: Main page of the frontend.

### Backend
- **index.js**: The main entry point for the backend Express.js server.
- **predict.js**: Handles image prediction logic with Clarifai's API.
- **package.json**: Lists dependencies like `express`, `cors`, and `clarifai-nodejs-grpc`.
- **vercel.json**: Configuration file for Vercel deployment.

## Technologies Used

### Frontend
- **Next.js**: Used for building the user interface.
- **Tailwind CSS**: For styling.

### Backend
- **Express.js**: Handles server-side logic.
- **Clarifai API**: For food item recognition from images.
- **dotenv**: For managing environment variables like API keys.
- **Vercel**: For deployment.

## Setup and Installation

### Prerequisites
- Node.js and npm installed.
- A Clarifai API key for the backend.

### Environment Variables
The `.env` file should contain:
```bash
CLARIFI_KEY=<Your Clarifai API Key>

