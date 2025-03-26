const axios = require('axios');
const { AuthError } = require('../errors');

exports.authenticate = async (request, reply) => {
  try {
    const res = await axios.post("https://sso.omno.com/realms/omno/protocol/openid-connect/token", {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'client_credentials',
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (res.data && res.data.access_token) {
      // Store the token for future use
      request.token = res.data.access_token;  
      return;  
    }
  } catch (error) {
    console.error(error)
    throw new AuthError();
  }
}