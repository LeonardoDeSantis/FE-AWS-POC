/* waitForFB = function () {
    for (i = 0; i < 5; i++) {
        if (typeof FB == 'undefined') {
            console.log("Wait for Facebook SDK to init");
            var millisecondsToWait = 1000;
            setTimeout(function () {
            }, millisecondsToWait);
        }
    }
} */





function initFB() {
    console.log("Initializing FB APIs...")
    FB.init({
        appId: '833992716810696',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.8'
    });

    FB.getLoginStatus(function (response) {
        console.log("getLoginStatus");
        console.log(response);
        if (response.status != "connected") {
          FB.login(function (response) {
            console.log("Login");
            console.log(response);    
            testAPI();
            return {
                accessToken: response.authResponse.accessToken,
                id: response.authResponse.userId
            }      
          });
        } else {
          testAPI();
          return {
              accessToken: response.authResponse.accessToken,
              id: response.authResponse.userId
          }
        }      
      });

       

}

function testAPI(response) {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log(response);
        console.log('Successful login for: ' + response.name);
    });
}

