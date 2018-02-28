    myApiKey = 'AIzaSyA-alrA4NG9OOesuE1PE-Bb4Cpduujf0Hg';
    userAddress = document.getElementById('Input').value;        
    button = document.getElementById('findButton');
    
    var buttonPress = button.addEventListener("click", function( event ) {
        address.innerHTML = "" 
        NatOffices.innerHTML = "";
        StOffices.innerHTML = "";

        var userAddress = document.getElementById('Input').value;
        gapi.client.setApiKey(myApiKey);
        lookup(userAddress, renderResults);
        });
   
    //lookup(userAddress)
     function lookup(address, callback) {
     /*** @type {number}* @type {gapi.client.HttpRequest}**/
      var req = gapi.client.request({
        //   'path' : userAddress +'/civicinfo/v2/voterinfo',
        //   'params' : {'electionId' : electionId, 'address' : address}
        'path': userAddress + 'civicinfo/v2/representatives',
        'params' : {includeOffices: true, address: address}

      });
     req.execute(callback);
    }
//GOOGLE RENDER RESULTS
    /*** Render results in the DOM* @param {Object} response Response object returned by the API* @param {Object} rawResponse Raw response from the API.*/
    function renderResults(response, rawResponse) {
        var address = document.getElementById('address');
        var NatOffices = document.getElementById('NatOffices');
        var StOffices = document.getElementById('StOffices');

        if (!response || response.error) {
            el.appendChild(document.createTextNode(
                'Error while trying to fetch polling place'));
            return;
        }
        
        console.log(response);
        console.log(response.divisions);       
        console.log(response.offices);
     
///OFFICES TYPE
//////////////////////////////////////        
        var normalizedAddress = `
                <ul> 
                <li><b>Street: </b>${response.normalizedInput.line1}</li>
                <li><b>City: </b>${response.normalizedInput.city}</li>
                <li><b>State: </b>${response.normalizedInput.state}</li>                       
                <li><b>Zipcode: </b>${response.normalizedInput.zip}</li>
               </ul>
 
        `;


        var nationalOffices = "<h3>National Officials</h3>";
                    
        var nationalFunction = function(office, official) {
            
            nationalOffices +=`
                <div class="row">
                    <div class="col-6">
                        <ul>
                            <li><b>Office:</b> ${response.offices[office].name }</li>    
                            <li><b>Name:</b> ${response.officials[official].name}</li>
                            <li><b>Party:</b> ${response.officials[official].party}</li>
            
                        </ul>
                    </div>
                    <div class="col-6">
                        <img class="rounded mx-auto d-block" 
                        src="${response.officials[official].photoUrl}">
                    </div>
                </div>`
            }
        var natOffs = function(response) {
       
        
        for (var i = 0; i < 5; i++) {        
            if ( i > 2)  {
            official = i - 1;
            nationalFunction(official, i );
            } else {
            nationalFunction(i, i);
            }
        }
        return nationalOffices;
        }
    
        var stateOffices = "<h3>State Officials</h3>";
        var stateOffs = function(response) {
       
  

        for (var i = 4; i < 9; i++) {
            if (response.officials[i + 1].photoUrl === undefined) {
                var noPhoto = "images/image.png";
                var url = response.officials[i + 1].url;
                stateOffices +=`
                <div class="row">
                    <div class="col-6">
                        <ul>
                            <li><b>Office:</b> ${response.offices[i].name }</li>    
                            <li><b>Name:</b> ${response.officials[i + 1].name}</li>
                            <li><b>Party:</b> ${response.officials[i + 1].party}</li>
                            <li><b>Website</b>${url}</li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <img class="rounded mx-auto d-block" src="${noPhoto}">
                    </div>
                </div>`;       
                console.log(noPhoto);
                console.log("Hey:" + url);
            }
            else {
                let photo = response.officials[i + 1].photoUrl;
                stateOffices +=`
                <div class="row">
                    <div class="col-6">
                        <ul>
                            <li><b>Office:</b> ${response.offices[i].name }</li>    
                            <li><b>Name:</b> ${response.officials[i + 1].name}</li>
                            <li><b>Party:</b> ${response.officials[i + 1].party}</li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <img class="rounded mx-auto d-block" src="${response.officials[i + 1].photoUrl}">
                    </div>
                </div>`;
                console.log(photo);
            }

            } 
    
        return stateOffices;
        }
        natOffs(response);
        stateOffs(response);

        address.innerHTML = normalizedAddress; 
        NatOffices.innerHTML = nationalOffices;
        StOffices.innerHTML = stateOffices;


        var $table = $('#table');

        $(function () {
            $('table').addClass('table');
        });

    }
