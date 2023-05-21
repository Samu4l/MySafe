
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


function sendJson(email, nom, prenom, pin, mdp, keyValuePairs, credential) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("x-collection-access-token", "57b65250-1154-449e-9471-17fac2395079");
  
    var data = {
      id: email,
      nom: nom,
      prenom: prenom,
      pin: pin,
      psw: mdp,
      keyValuePairs: keyValuePairs,
      credit: credential
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



  function moJson(key, value) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-collection-access-token", "57b65250-1154-449e-9471-17fac2395079");
  
    // Récupérer le JSON existant
    fetch("https://api.myjson.online/v1/records/" + searchJsonId(sessionStorage.getItem("email")), { method: 'GET', headers: myHeaders })
      .then(response => response.json())
      .then(jsonData => {
        // Vérifier si keyValuePairs existe déjà dans le JSON
        if (jsonData.hasOwnProperty("keyValuePairs")) {
          // Ajouter la nouvelle entrée dans keyValuePairs
          jsonData.keyValuePairs.push({ [key]: value });
        } else {
          // Créer keyValuePairs et ajouter la nouvelle entrée
          jsonData.keyValuePairs = [{ [key]: value }];
        }
  
        // Envoyer les données modifiées via l'API PATCH
        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: JSON.stringify(jsonData),
          redirect: 'follow'
        };
  
        return fetch("https://api.myjson.online/v1/records/" + searchJsonId(sessionStorage.getItem("email")), requestOptions);
      })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  

  function searchJsonId(email) {
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
            userData = item.id;
          }
        });
  
        return userData;
      })
      .catch(error => {
        console.log('Erreur lors de la récupération des données JSON :', error);
        return null;
      });
  }

  
  function suppJson(key, value) {
    var myHeaders = new Headers();
    myHeaders.append("x-collection-access-token", "57b65250-1154-449e-9471-17fac2395079");
  
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch("https://api.myjson.online/v1/records/" + searchJsonId(sessionStorage.getItem("email")), requestOptions)
      .then(response => response.json())
      .then(jsonData => {
        // Vérifier si keyValuePairs existe dans le JSON
        if (jsonData.hasOwnProperty("keyValuePairs")) {
          // Rechercher l'index de l'entrée spécifique à supprimer
          var index = jsonData.keyValuePairs.findIndex(item => {
            return item.hasOwnProperty(key) && item[key] === value;
          });
  
          // Supprimer l'entrée spécifique en utilisant l'index
          if (index !== -1) {
            jsonData.keyValuePairs.splice(index, 1);
          }
        }
  
        // Envoyer les données modifiées via l'API PATCH pour mettre à jour le JSON
        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: JSON.stringify(jsonData),
          redirect: 'follow'
        };
  
        return fetch("https://api.myjson.online/v1/records/" + searchJsonId(sessionStorage.getItem("email")), requestOptions);
      })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  