
function getJson(mail, pin) {
    var myHeaders = new Headers();
    myHeaders.append("x-collection-access-token", "57b65250-1154-449e-9471-17fac2395079");
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    return fetch("https://api.myjson.online/v1/collections/4e329be0-f251-426e-9d68-4689f970aad8/records", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
  
        var found = false;
        result.records.forEach(function(item) {
          if (item.data.id === mail && item.data.pin === pin) {
            found = true;
          }
        });
  
        return found; // Renvoyer la valeur de la variable found
      })
      .catch(error => {
        console.log('error', error);
        return false;
      });
  }
  function getJsonId(email) {
    var myHeaders = new Headers();
    myHeaders.append("x-collection-access-token", "57b65250-1154-449e-9471-17fac2395079");
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    return fetch("https://api.myjson.online/v1/collections/4e329be0-f251-426e-9d68-4689f970aad8/records", requestOptions)
      .then(response => response.json())
      .then(result => {
        var userData = null;
  
        result.records.forEach(function(item) {
          if (item.data.id === email) {
            userData = item.data;
          }
        });
  
        return userData;
      })
      .catch(error => {
        console.log('Erreur lors de la récupération des données JSON :', error);
        return null;
      });
  }
  
/*
function getJsonId(id) {
  var myHeaders = new Headers();
  myHeaders.append("x-collection-access-token", "57b65250-1154-449e-9471-17fac2395079");

  var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  };

  fetch("https://api.myjson.online/v1/collections/4e329be0-f251-426e-9d68-4689f970aad8/"+ id, requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(result);

     
          return result;
      })
      .catch(error => console.log('error', error));
}


*/

function sendJson(email, nom, prenom, pin, mdp, keyValuePairs) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("x-collection-access-token", "57b65250-1154-449e-9471-17fac2395079");
  
    var data = {
      id: email,
      nom: nom,
      prenom: prenom,
      pin: pin,
      psw: mdp,
      keyValuePairs: keyValuePairs
    };
  
    var urlencoded = new URLSearchParams();
    urlencoded.append("jsonData", JSON.stringify(data));
    urlencoded.append("collectionId", "4e329be0-f251-426e-9d68-4689f970aad8");
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
  
    return fetch("https://api.myjson.online/v1/records", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        return true;
      })
      .catch(error => {
        console.log('error', error);
        return false;
      });
  }
  

