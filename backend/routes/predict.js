const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

//Processes the API Key.
//Calls the enviroment variables.
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFI_KEY}`);

//Function that makes the call to the Clarifai API.
function prediction(inputs) {
    return new Promise((resolve, reject) => {
        stub.PostModelOutputs( 
            //This information can be changed and adjusted in order to make a call to a different model.
            {
                user_app_id: {
                    "user_id": 'clarifai',
                    "app_id": 'main'
                },
                model_id: 'food-item-recognition', 
                version_id: '1d5fd481e0cf4826aa72ec3ff049e044',
                inputs: inputs
            },
            metadata,
            (err, response) => {
                if (err) {
                    reject("Error: " + err);
                    return;
                }

                if (response.status.code !== 10000) {
                    reject("Received failed status: " + response.status.description + "\n" + response.status.details);
                    return;
                }

                let results = [];
                console.log("Predicted concepts, with confidence values:");
                
                //Pushes name of object and predictability value to the results.
                //Currently, this project only uses the name. 
                for (const c of response.outputs[0].data.concepts) {
                    results.push({
                        name: c.name,
                        value: c.value
                    });
                }

                resolve(results);
            }
        );
    });
}

router.post('/', async (req, res, next) => {
    try {
        const { imageURL } = req.body;
        const inputs = [
            {
                data: {
                    image: {
                        url: imageURL,
                        allow_duplicate_url: true
                    }
                }
            }
        ];

        const results = await prediction(inputs);

        return res.send(results);
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;
