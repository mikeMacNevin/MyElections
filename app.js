
// // curl "https://www.googleapis.com/civicinfo/v2/voterinfo?key=<YOUR_API_KEY>&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000"

// /**
//      * Build and execute request to look up voter info for provided address.
//      * @param {string} address Address for which to fetch voter info.
//      * @param {function(Object)} callback Function which takes the
//      *     response object as a parameter.
//      */

//     myApiKey = 'AIzaSyA-alrA4NG9OOesuE1PE-Bb4Cpduujf0Hg';
//     userAddress = document.getElementById('Input').value;        

//     var button = document.getElementById('findButton');
//     var buttonPress = button.addEventListener("click", function( event ) {
//         var userAddress = document.getElementById('Input').value; 
//         gapi.client.setApiKey(myApiKey);
//         lookup(userAddress, renderResults);
//         });

   
//     //lookup(userAddress)
//      function lookup(address, callback) {
//      /**
//       * 
//        * Election ID for which to fetch voter info.
//        * @type {number}
//        */
//       var electionId = 2000;

//       /**
//        * Request object for given parameters.
//        * @type {gapi.client.HttpRequest}
//        */
//       var req = gapi.client.request({
//         //   'path' : userAddress +'/civicinfo/v2/voterinfo',
//         //   'params' : {'electionId' : electionId, 'address' : address}
//         'path': userAddress + 'civicinfo/v2/representatives',
//         'params' : {includeOffices: true, address: address}

//       });
//      req.execute(callback);
//     }

//     /**
//      * Render results in the DOM.
//      * @param {Object} response Response object returned by the API.
//      * @param {Object} rawResponse Raw response from the API.
//      */
//     function renderResults(response, rawResponse) {
//         var el = document.getElementById('results');

//         if (!response || response.error) {
//             el.appendChild(document.createTextNode(
//                 'Error while trying to fetch polling place'));
//             return response;
//         }
//     ;
       

//             var normalizedAddress = 
//                 response.line1 + ' ' +
//                 response.normalizedInput.city + ', ' +
//                 response.normalizedInput.state + ' ' +
//                 response.normalizedInput.zip;

          
//     }
//     <script src="https://apis.google.com/js/client.js?onload=load"></script>