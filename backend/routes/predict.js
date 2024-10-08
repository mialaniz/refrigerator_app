const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFI_KEY}`);

function prediction(imageURL) {

    return new Promise((resolve, reject) => {
        stub.PostModelOutputs(
            {
                // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
                model_id: "aaa03c23b3724a16a56b629203edc62c",
                inputs: imageURL
            },
            metadata,
            (err, response) => {
                if (err) {
                    console.log("Error: " + err);
                    return;
                }
        
                if (response.status.code !== 10000) {
                    console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                    return;
                }
                
                let results = [];
                console.log("Predicted concepts, with confidence values:")
                
                // grabs the outputs of the data such as the name and the value.
                for (const c of response.outputs[0].data.concepts) {
                    results.push({ // makes the array with the values and names.
                        name: c.name,
                        value: c.value
                    })
                }
            }
        );
    })

}

router.post('/', async (req,res, next) => {
    try{
        const {imageURL} = req.body;
        const inputs = [{data:{image:{url: imageURL}}}];

        const results = await prediction(inputs);

        return res.send(results);
    } catch(err) {
        return res.status(400).send(err);

    }
})

module.exports = router;