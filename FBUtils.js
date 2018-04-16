FB.init({
    appId: '833992716810696',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v2.8'
});

function initFB() {
    return new Promise(function (resolve, reject) {
        performFBLogin().then(function (authResponse) {
            FB.api('/me', { fields: 'id, name, email' }, function (response) {
                resolve(constructUserInfo(authResponse, response));
            });
        });
    });
}

function performFBLogin() {
    return new Promise(function (resolve, reject) {
        FB.getLoginStatus(function (response) {
            if (response.status != "connected") {
                FB.login(function (response) {
                    resolve(response.authResponse)
                }, { scope: 'email' });
            } else {
                resolve(response.authResponse)
            }
        });
    
    });
}

function constructUserInfo(authResponse, meResponse) {
    return {
        accessToken: authResponse.accessToken,
        id: authResponse.userID,
        name: meResponse.name,
        email: meResponse.email
    }
}


