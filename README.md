This is a notification microservice used to Send notification to users through AWS SNS

1. git clone https://github.com/phaltankarvrushali/notification-service.git
2. cd <repo-name>
3. npm install
4. Set Up AWS Credentials AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY through aws configure
5. Create SNS Topic:
    Go to the AWS SNS console
    Create SNS topic named "notification-service"
6. Subscribe Email to SNS Topic:
    Select the created topic
    Click "Create subscription" and choose "Email" as protocol
    Enter your email address
7. Copy the ARN of the created SNS topic.
8. Update environment variables in .env file

    PORT=3000
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=
    SNS_TOPIC_ARN=

9.  Run the application: node app.js
10. Run: curl -X POST -H "Content-Type: application/json" -d '{"userId": "<user>", "message": "This is a test notification!", "userEmail": "<user-email>"}' http://localhost:3000/notify
