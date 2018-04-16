

function getCognitoCredential(accessToken) {

    return new Promise(function (resolve, reject) {

        AWS.config.region = 'eu-west-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'eu-west-1:d8d70349-d70e-4d7d-bd25-98e2dcaa5399',
            Logins: { 'graph.facebook.com': accessToken }
        });

        AWS.config.credentials.get(function (err) {
            if (err) return console.log("Error", err);
            resolve(AWS.config.credentials);
        });
    });

}

