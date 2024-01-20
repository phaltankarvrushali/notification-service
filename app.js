const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const sns = new AWS.SNS();

const snsTopicArn = process.env.SNS_TOPIC_ARN; 

app.post('/notify', (req, res) => {
  try {
    const { userId, message, userEmail } = req.body;

    const params = {
      TopicArn: snsTopicArn,
      Message: `Notification for ${userId}: ${message}`,
      Subject: 'Push notification',
    };

    sns.publish(params, (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        console.log(`Email notification sent: ${JSON.stringify(data)}`);
        res.status(200).send('Notification sent successfully');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
