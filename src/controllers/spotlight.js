import AWS from 'aws-sdk'
// const { promisify } = require('util');
import {promisify} from 'util'
// const request = require('request');
import request from 'request'

// Configure AWS SDK
AWS.config.update({
    region: 'us-east-1',
  });
  
const rekognition = new AWS.Rekognition();
const dynamodb = new AWS.DynamoDB();
const Spotlight=async(req,res,next)=>{
    console.log('testing')
    try {
        const imageDataUrl = req.body.imageDataUrl;
    
        // Extract the base64-encoded image data
        const [, encodedData] = imageDataUrl.split(',', 1);
        const imageBuffer = Buffer.from(encodedData, 'base64');
    
        // Image recognition with AWS Rekognition
        const params = {
          CollectionId: 'thubemployees',
          Image: {
            Bytes: imageBuffer,
          },
        };
    
        const response = await rekognition.searchFacesByImage(params).promise();
    
        let found = false;
    
        for (const match of response.FaceMatches) {
          const face = await dynamodb.getItem({
            TableName: 'facerecognition',
            Key: { RekognitionId: { S: match.Face.FaceId } },
          }).promise();
    
          if (face.Item) {
            const email = face.Item.FullName.S;
    
            // Make a request to your API endpoint
            const api_url = 'https://dev.technicalhub.io/codemind/api/thub_app/anniversary_api.php';
            const apiParams = {
              Action: 'Details',
              Email: email,
            };
    
            try {
              const response = await promisify(request.post)({
                url: api_url,
                json: apiParams,
                rejectUnauthorized: false,
              });
    
              if (response.statusCode === 200) {
                return res.json(response.body);
              } else {
                return res.status(500).json({ error: `API request failed with status code ${response.statusCode}` });
              }
            } catch (error) {
              return res.status(500).json({ error: `An error occurred: ${error.message}` });
            }
    
            found = true;
          }
        }
    
        if (!found) {
          return res.json({});
        }
    
        return res.send('Image captured successfully');
      } catch (error) {
        return res.status(500).send(`Error capturing and saving image: ${error.message}`);
      }
}

export default Spotlight;
