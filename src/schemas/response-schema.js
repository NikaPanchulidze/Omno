const paymentSchema = {
  body: {
    type: "object",
    properties: {
      id: { type: "string" },
      status: { type: "string" },
      amount: { type: "number" },
      currency: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
      psp: { type: "string" },
      cardMask: { type: "string" },
      cardholder: { type: "string" },
      expirationDate: { type: "string" },
      country: { type: "string" },
      cardBrand: { type: "string" },
      customerId: { type: "string" },
      paymentResult: { type: "string" },
      initialAmount: { type: "number" },
      initialCurrency: { type: "string" },
      isApm: { type: "boolean" },
      paymentLog: {
        type: "array",
        items: {
          type: "object",
          properties: {
            amount: { type: "number" },
            merchantId: { type: "string" },
            customerId: { type: "string" },
            currency: { type: "string" },
            paymentTransactionStatus: { type: "string" },
            transactionRequestType: { type: "string" },
            paymentId: { type: "string" },
            country: { type: "string" },
            hookUrl: { type: "string", format: "uri" },
            callback: { type: "string", format: "uri" },
            lang: { type: "string" },
            initialTransaction: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            orderId: { type: "string" },
            initialAmount: { type: "number" },
            initialCurrency: { type: "string" }
          }
        }
      },
      billingData: {
        type: "object",
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          address1: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          country: { type: "string" },
          postalCode: { type: "string" },
          phone: { type: "string" },
          email: { type: "string", format: "email" }
        }
      },
      paymentTransactionRequests: {
        type: "array",
        items: { type: "object" }
      },
      paymentSystemLog: {
        type: "array",
        items: {
          type: "object",
          properties: {
            paymentId: { type: "string" },
            type: { type: "string" },
            logData: {
              type: "object",
              properties: {
                result: { type: "boolean" },
                pspMaxTransactionCountPerDay: { type: "integer" },
                merchantId: { type: "string" },
                pspMaxTransactionCountPerMonth: { type: "integer" },
                transactionCountPerDay: { type: "integer" },
                transactionCountPerMonth: { type: "integer" },
                pspName: { type: "string" }
              }
            }
          }
        }
      },
      orderId: { type: "string" },
      "3dsRedirectUrl": { type: "string", format: "uri" }
    }
  }
};

module.exports = paymentSchema;