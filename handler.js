const AWS = require("aws-sdk");
const sqs = new AWS.SQS({
    region: "us-east-1",
});
exports.sqsSendQueue = (event, context, callback) => {
    console.info(event);
    const queueUrl = `http://localhost:4566/000000000000/local-queue`;
    // response and status of HTTP endpoint
    const responseBody = {
        message: ""
    };
    let responseCode = 200;
    // SQS message parameters
    const params = {
        MessageBody: "Batatinha frita 123",
        QueueUrl: queueUrl,
    };
    sqs.sendMessage(params, (error, data) => {
        if (error) {
            console.info("error:", `failed to send message${error}`);
            responseCode = 500;
        } else {
            console.info("data:", data.MessageId);
            responseBody.message = `Sent to ${queueUrl}`;
            responseBody.messageId = data.MessageId;
        }
        const response = {
            statusCode: responseCode,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(responseBody),
        };
        callback(null, response);
    });
};


exports.sqsReadQueue = (event, context, callback) => {
  const response = {
      statusCode: 200,
      body: JSON.stringify({
          message: "SQS event processed.",
          input: event,
      }),
  };
  console.info("event:", JSON.stringify(event));
  callback(null, response);
};