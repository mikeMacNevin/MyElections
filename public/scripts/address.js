    myApiKey = 'AIzaSyA-alrA4NG9OOesuE1PE-Bb4Cpduujf0Hg';
    userAddress = document.getElementById('Input').value;        
    button = document.getElementById('findButton');
    
    var buttonPress = button.addEventListener("click", function( event ) {
        address.innerHTML = "" 
        NewButton.innerHTML = "" ;
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

        var newSearch = `
        <div class="text-center">
        <a href="/">
            <button id="NewSearch" class="btn btn-lg">
            <i class="fas fa-arrow-left"></i>
                New Search</button>
        </a>
        </div>
        `;


        var nationalOffices = "<h3> National Officials</h3>";
                    
        var nationalFunction = function(office, official) {
            
            nationalOffices +=
            `      <!--Card-->
                  <div class="card address-card my-1">        
                      <div class="container">
                      <h5 class="card-title"><u>${response.offices[office].name}</u></h5> 
                          <div class="row">                    
                              <div class="col-4 ">
                                  <div class="h-80 d-flex align-items-center px-1" >
                                      <img src="${response.officials[official].photoUrl}" >
                                  </div>            
                              </div>
                              <div class="col-8">
                                  <div class="card-body">
                                      <!--Name-->
                                                  
                                      <ul class="list-unstyled">
                                          <li>Name: ${response.officials[official].name}</li>
                                          <li>Party: ${response.officials[official].party}</li>
                                          <li>Phone: ${response.officials[official].phones[0]}</li>
                                          <a href=${response.officials[official].urls[0]}>    
                                              <button class="btn text-center">Website</button>
                                          </a>
                                      </ul>
                                  </div>
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
    
        var stateOffices = "<h3> State Officials</h3>";
        var stateOffs = function(response) {
       
  

            for (var i = 4; i < 9; i++) {
                if (response.officials[i + 1].photoUrl === undefined) {
                    var noPhoto = "images/image.png";
                    var url = response.officials[i + 1].url;

                    stateOffices +=`
                    <div class="card address-card  my-1">    
                        <div class="container">
                        <h4 class="card-title"><u>${response.offices[i].name }</u></h4>                    
                            <div class="row">
                                <div class="col-4">
                                    <div class="mx-auto h-80 d-flex align-items-center px-1" >
                                        <img src="${noPhoto}">
                                    </div>            
                                </div>
                                <div class="col-8">
                                    <div class="card-body">
                                        <ul class="list-unstyled">
                                            <li>Name: ${response.officials[i + 1].name}</li>
                                            <li>Party: ${response.officials[i + 1].party}</li>
                                            <li>Phone: ${response.officials[i + 1].phones[0]}</li>
                                            <a href=${response.officials[i + 1].urls[0]}>    
                                                <button class="btn text-center">Website</button>
                                            </a>
                                        </ul>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>

                    `
                }
                else {
                    let photo = response.officials[i + 1].photoUrl;
                    stateOffices +=`
                    <div class="card address-card my-1">        

                    <div class="container">
                    <u><h4> ${response.offices[i].name }</h4> </u>   

                        <div class="row">
                            <div class="col-4">
                                <div class="mx-auto h-80 d-flex align-items-center px-1">
                                    <img class="" src="${response.officials[i + 1].photoUrl}">
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="card-body">
                                <ul class="list-unstyled">
                                <li>Name: ${response.officials[i + 1].name}</li>
                                <li>Party: ${response.officials[i + 1].party}</li>
                                <li>Phone: ${response.officials[i + 1].phones[0]}</li>
                                <a href=${response.officials[i + 1].urls[0]}>    
                                    <button class="btn text-center">Website</button>
                                </a>
                            </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>`
                    console.log(photo);
                } 
            }         
            return stateOffices;
    
        }

        JumbotronHtml.innerHTML = "";
        NavigationCardsHtml.innerHTML = "";
        ObamaVoting.innerHTML = "";
        OldCongress.display= "none";

        natOffs(response);
        stateOffs(response);

        address.innerHTML = normalizedAddress; 
        NatOffices.innerHTML = nationalOffices;
        StOffices.innerHTML = stateOffices;
        NewButton.innerHTML = newSearch;


    }
