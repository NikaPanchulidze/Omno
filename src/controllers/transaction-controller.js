const axios = require('axios');

exports.createTransaction = async function (request, reply) {
  try {
    const res = await axios.post('https://api.omno.com/transaction/create', request.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${request.token}`
      }
    });
    console.log("-----------------------------------------------------------")
    console.log(`Please click or copy the link to start payment: ${res.data.paymentUrl}`)
    console.log("-----------------------------------------------------------")

    reply.status(201).send(`Please click or copy the link to start payment: ${res.data.paymentUrl}`);
  } catch (error) {
    // console.error(error);
    reply.status(error.response.status).send({
      statusCode: error.response.status,
      message: error.response.statusText || 'An error occurred while processing the transaction.'
    });
  }
}

exports.webhook = async function (request, reply) {
  console.log(request.body)
  if (request.body.status === "Pending3DS") {
    const redirectUrl = request.body["3dsRedirectUrl"];
    console.log("-----------------------------------------------------------")
    console.log("Please click or copy the link to finish payment: ", redirectUrl)
  }

  reply.status(200).send("success");
}

exports.successfullyPaid = async function (request, reply) {
  reply.status(200).send("Successfully Paid");
}

exports.failedPaid  = async function (request, reply) {
  reply.status(400).send("Failed Payment");
}