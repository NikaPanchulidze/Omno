const transactionSchema = {
  body: {
    type: 'object',
    required: ['amount', 'currency', 'hookUrl', 'callback', 'callbackFail', 'billing'],
    properties: {
      amount: { type: 'number', minimum: 1 },
      currency: { type: 'string' },
      lang: { type: 'string' },
      hookUrl: { type: 'string' },
      callback: { type: 'string' },
      callbackFail: { type: 'string' },
      billing: {
        type: 'object',
        required: ['firstName', 'lastName', 'address1', 'city', 'state', 'country', 'postalCode', 'phone', 'email'],
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          address1: { type: 'string' },
          city: { type: 'string' },
          state: { type: 'string' },
          country: { type: 'string', minLength: 2, maxLength: 2 },
          postalCode: { type: 'string' },
          phone: { type: 'string' },
          email: { type: 'string', format: 'email' },
          externalUserId: { type: 'string' },
          dateOfBirth: { type: 'string', format: 'date' }
        }
      },
      orderId: { type: 'string' },
      cardToken: { type: 'string' },
      payment3dsType: { type: 'string', enum: ['Redirection', 'Iframe'] },
      kycVerified: { type: 'boolean' },
      previousPaymentCount: { type: 'integer', minimum: 0 },
      cardData: {
        type: 'object',
        required: ['cardNumber', 'cardHolderName', 'cardExpiryDate', 'cardExpiryDate2', 'cardCvv'],
        properties: {
          cardNumber: { type: 'string' },
          cardHolderName: { type: 'string' },
          cardExpiryDate: { type: 'string' },
          cardExpiryDate2: { type: 'string' },
          cardCvv: { type: 'string', pattern: '^[0-9]{3,4}$' },
          browser: {
            type: 'object',
            properties: {
              colorDepth: { type: 'integer' },
              userAgent: { type: 'string' },
              language: { type: 'string' },
              timeZone: { type: 'string' },
              screenWidth: { type: 'integer' },
              javaEnabled: { type: 'boolean' },
              customerIp: { type: 'string', format: 'ipv4' },
              screenHeight: { type: 'integer' },
              windowHeight: { type: 'integer' },
              timeZoneOffset: { type: 'integer' },
              windowWidth: { type: 'integer' }
            }
          }
        }
      },
      saveCard: { type: 'boolean' },
      merchantInformation: {
        type: 'object',
        required: ['name'], 
        properties: {
          name: { type: 'string' },
          merchantName: { type: 'string' },
          country: { type: 'string', minLength: 2, maxLength: 2 },
          address1: { type: 'string' },
          administrativeArea: { type: 'string' },
          locality: { type: 'string' },
          postalCode: { type: 'string' },
          url: { type: 'string' },
          customerServicePhoneNumber: { type: 'string' },
          categoryCode: { type: 'string' },
          noteToBuyer: { type: 'string' }
        }
      }
    }
  }
};

module.exports = transactionSchema;