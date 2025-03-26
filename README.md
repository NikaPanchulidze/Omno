Fastify-based API that integrates with the Omno API to create a transaction and handle a 3DS payment process

## Tech Stack

- **NodeJs**
- **Fastify**

## Technologies
- **Docker**
- **Swagger**
- **Ngrok**

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/NikaPanchulidze/Omno

2. **Navigate to the Project Directory:**
   ```
   cd Omno
3. **Download necessary libraries:**
   ```
   npm i
4. **Start project locally:**
   ```
   npm start
## Project Structure

- **`src/`**
  - **`controllers/`**: Contains logic for handling requests, processing data, and returning responses.
  - **`errors/`**: Contains custom error classes and handlers for managing application-specific errors.
  - **`routes/`**: Defines application routes and maps them to corresponding controllers.
  - **`schemas/`**: Defines data validation schemas to ensure correct request and response structures.
  - **`app.js`**: Initializes Fastify, registers routes.
  - **`server.js`**: Starts the Fastify server and handles server-related configurations.
- **`Dockerfile`**: Defines the instructions for building the Docker image of the application.
- **`config.env`**: Stores environment variables

## How to use application

There are two POST routes you can use. First one to create transaction and other one for server to receive webhooks. You can you http://localhost:3000/documentation (localhost can be different in your case) in your browser to use swagger in order to send POST requests. 

Ngrok is needed to receive webhooks locally. When you create a transaction, Omno server sends webhook. If we want to catch it, we need to make our localhost reachable from outside world. That's why we use Ngrok to get public address for localhost.

## How to install Ngrok

1. **Go to Ngrok.com**

2. **Register or sign in**

3. **Setup & Installation**

4. **Find right command to install for you OS**

(I have WSL2 on windows 11 and use it insdead or command prompt)

## ⚠️ **ATTENTION:** 
Make sure node application and ngrok run from same command prompt. For example mixing wsl2 with windows terminal can cause different localhost addresses and Ngrok will not work.

## How to use Ngrok
Now, when you have already started node server, you should start Ngrok in your command line.

**Start Ngrok:**
```
ngrok http http://127.0.0.1:3000
```

Make sure (http://127.0.0.1:3000) this part is same as your node server host address.

After you run command, you should get screen like this:

![Ngrok succress image](/images/ngrok.jpg)

## ⚠️ **ATTENTION:** 
Make sure you do not close that tab because we will need https frowarding link later for webhooks.

## How to use Swagger

Now we can already test API.

1. **Open http://localhost:3000/documentation in your browser**

![swagger opened image](/images/swagger.jpg)

2. **Open /create-transaction route and click "Try it out"**

3. **Write following test case:**

## ⚠️ **ATTENTION:** 
You must change "hookUrl", "callback" and "callbackFail with Ngrok forwarding url which we talked about earlier.

```json
{
    "amount": 1000,
    "currency": "USD",
    "lang": "en",
    "hookUrl": "<REPLACE WITH INGROK FORWARDING URL>/webhook",
    "callback": "<REPLACE WITH INGROK FORWARDING URL>/webhook/success",
    "callbackFail": "<REPLACE WITH INGROK FORWARDING URL>/webhook/fail",
    "billing": {
        "firstName": "John",
        "lastName": "Doe",
        "address1": "123 Street",
        "city": "Cityville",
        "state": "State",
        "country": "US",
        "postalCode": "12345",
        "phone": "1234567890",
        "email": "john.doe@example.com",
        "externalUserId": "user123",
        "dateOfBirth": "1980-01-01"
    },
    "orderId": "order123",
    "cardToken": "token123",
    "payment3dsType": "Redirection",
    "kycVerified": true,
    "previousPaymentCount": 5,
    "cardData": {
        "cardNumber": "4539148803436467",
        "cardHolderName": "John Doe",
        "cardExpiryDate": "12",
        "cardExpiryDate2": "2029",
        "cardCvv": "123",
        "browser": {
            "colorDepth": 24,
            "userAgent": "Mozilla/5.0",
            "language": "en-US",
            "timeZone": "-300",
            "screenWidth": 1920,
            "javaEnabled": true,
            "customerIp": "192.168.1.1",
            "screenHeight": 1080,
            "windowHeight": 800,
            "timeZoneOffset": -300,
            "windowWidth": 1200
        }
    },
    "saveCard": true,
    "merchantInformation": {
        "name": "Example Merchant",
        "merchantName": "testAcc",
        "country": "US",
        "address1": "123 Example St.",
        "administrativeArea": "CA",
        "locality": "Example City",
        "postalCode": "12345",
        "url": "<https://example.com>",
        "customerServicePhoneNumber": "123-456-7890",
        "categoryCode": "5533",
        "noteToBuyer": "Thank you for your purchase!"
    }
}
```

4. **Click execute and check the response below**

![create-transaction response](/images/testcase.jpg)

5. **Copy the link and pase in seperate tab in browser**

6. **Click "Pay with other card"**

Now you have three options:

1 - If you want successful payment  
2 - If you want failed payment  
3 - If you want to use 3DS to confirm or reject payment  

1. Successful Transaction:
Card Number: 4539 1488 0343 6467  
Expiry Date: 12/29  
CVC: 123  
Cardholder Name: Anything  
Outcome: Transaction will be processed successfully.  
2. Failed Transaction:
Card Number: 6011 1111 1111 1117  
Expiry Date: 12/29  
CVC: 123  
Cardholder Name: Anything  
Outcome: Transaction will fail.  
3. 3D Secure Authentication Required:  
Card Number: 3782 8224 6310 005  
Expiry Date: 12/29  
CVC: 123  
Cardholder Name: Anything  
Outcome: Transaction will require 3D Secure authentication.  

If you choose first or second one, after you click "Pay" you will be redirected to relevant page.

You can check terminal to see webhook details.

## **Option 3 - 3DS payment methods** 

If you chose thrid option, after clicking pay, you should be redirected to accept or decline.

## ⚠️ **ATTENTION:** 
If you do not get redirected, make sure to check terminal and manually open the link in new tab.

You can see all the responses from webhook in terminal.

## Docker

You can use docker to run node application. 

## ⚠️ **ATTENTION:** 
In server.js HOST MUST BE 0.0.0.0
If you use docker, you must not run the node application locally.

1. **Make sure you have right folder path selected /yourpath/Omno**

2. **Make sure you have docker installed**

3. **Build docker image:**
   ```bash
   docker build .

4. **Build docker image:**
   ```bash
   docker run -p 3000:3000 --env-file config.env <YOUR DOCKER IMAGE ID>