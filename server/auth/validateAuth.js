const { CognitoJwtVerifier } = require("aws-jwt-verify");

//Initializing CognitoExpress constructor
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access", //Possible Values: access | id
  clientId: process.env.COGNITO_APP_CLIENT_ID,
});

exports.validateAuth = async (token) => {
  try {
    const payload = await verifier.verify(token);
    return {
      success: true,
      response: payload,
    };
  } catch {
    return {
      success: false,
      response: "Token is not valid",
    };
  }
};
