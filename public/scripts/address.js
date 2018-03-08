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
            <h4><b>Your Address:</b><br>  
                ${response.normalizedInput.line1}
                ${response.normalizedInput.city},
                ${response.normalizedInput.state}                      
                ${response.normalizedInput.zip}
            </h4>
        <br>
        `;


        var nationalOffices = "<h3>National Officials</h3>";
                    
        var nationalFunction = function(office, official) {
            
            nationalOffices +=
  
      `      <!--Card-->
            <div class="card testimonial-card my-1">        
                <div class="row">
                    <div class="col-2">
                        <div class="avatar mx-auto white px-1" ><img src="${response.officials[official].photoUrl}" class="rounded-circle"></div>            
                    </div>
                    <div class="col-10">
                        <div class="card-body">
                            <!--Name-->
                            <h4 class="card-title"><u>${response.offices[office].name }</u></h4>                
                            <p>${response.officials[official].name}</p>
                            <p>${response.officials[official].party}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
            }
        var natOffs = function(response) {
       
        
        for (var i = 4; i >= 0; i--) {        
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
                    <div class="card testimonial-card my-1">        
                        <div class="row">
                            <div class="col-4">
                                <div class="avatar mx-auto white px-1" ><img src="${noPhoto}" class="rounded-circle"></div>            
                            </div>
                            <div class="col-8">
                                <div class="card-body">
                                    <!--Name-->
                                    <h4 class="card-title"><u>${response.offices[i].name }</u></h4>                
                                    <p>${response.officials[i + 1].name}</p>
                                    <p>${response.officials[i + 1].party}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    `
                }
                else {
                    let photo = response.officials[i + 1].photoUrl;
                    stateOffices +=`
                    <div class="card testimonial-card my-1">        

                        <div class="row">
                            <div class="col-4">
                                <div class="avatar mx-auto white px-1" ><img class="rounded mx-auto d-block" src="${response.officials[i + 1].photoUrl}"></div>
                            </div>
                            <div class="col-8">
                                <div class="card-body">
                                    <h4> ${response.offices[i].name }</h4>    
                                    <p>${response.officials[i + 1].name}</p>
                                    <p>${response.officials[i + 1].party}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>`
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
