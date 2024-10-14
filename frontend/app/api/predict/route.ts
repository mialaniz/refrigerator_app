import { NextResponse } from 'next/server';
const Clarifai = require('clarifai');

export async function POST(request: Request) {
  try {


    const clarifaiApp = new Clarifai.App({
      apiKey: process.env.CLARIFAI_KEY,
    });
    
    // Log the API key for debugging purposes
    const body = await request.json();
    const { imageURL } = body;

    // Initialize Clarifai App inside the handler

    const response = await clarifaiApp.models.predict(
      {
        id: 'general-image-recognition',
        version: 'aa7f35c01e0642fda5cf400f543e7c40',
      },
      imageURL
    );

    const concepts = response.outputs[0].data.concepts;

    const results = concepts.map((c: any) => ({
      name: c.name,
      value: c.value,
    }));

    return NextResponse.json(results);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || 'An error occurred' },
      { status: 400 }
    );
  }
}
