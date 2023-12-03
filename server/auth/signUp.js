require("dotenv").config();

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_APP_CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const client = new CognitoIdentityProviderClient({
  region: "ca-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.signUpPublic = async function (email, password) {
  const body = await new Promise((resolve, reject) => {
    console.log("signUp");
    userPool.signUp(email, password, [], null, async function (err, result) {
      if (err) {
        console.log("inside error");
        reject({
          success: false,
          message: err.message || JSON.stringify(err),
        });
      } else {
        const input = {
          UserPoolId: process.env.COGNITO_USER_POOL_ID,
          Username: email,
          GroupName: "Public",
        };

        const command = new AdminAddUserToGroupCommand(input);

        await client.send(command);

        resolve({
          success: true,
          message: result,
        });
      }
    });
  });

  return body;
};
