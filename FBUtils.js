console.log("Initializing FB APIs with...")
FB.init({
    appId: '833992716810696',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v2.8'
});

var FBLogin = new Promise(function (resolve, reject) {
    FB.getLoginStatus(function (response) {
        if (response.status != "connected") {
            FB.login(function (response) {
                resolve(response.authResponse)
            }, {scope: 'email'});
        } else {
            resolve(response.authResponse)
        }
    });

});

var initFB = new Promise(function (resolve, reject) {

    FBLogin.then(function (authResponse) {
        FB.api('/me', {  fields: 'id, name, email' }, function (response) {
            resolve(constructUserInfo(authResponse, response));
        });
    });

});

function constructUserInfo(authResponse, meResponse) {
    return {
        accessToken: authResponse.accessToken,
        id: authResponse.userID,
        name: meResponse.name,
        email: meResponse.email
    }
}


