
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
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données JSON");
        }
        return response.json();
      })
      .then(result => {
        var userData = null;
  
        result.records.forEach(function(item) {
          if (item.data.id === email) {
            userData = item.data;
          }
        });
  
        return userData; // Renvoyer la réponse JSON complète
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
        return result;
      })
      .catch(error => {
        console.log('error', error);
        return false;
      });
  }

  function moJson(key, value) {
    // Récupérer le JSON existant
    return getJsonId(sessionStorage.getItem("email"))
      .then(jsonData => {
        console.log(jsonData);
        var userData = { ...jsonData }; // Copier les données JSON existantes
  
        if (userData.id === sessionStorage.getItem("email")) {
          // Vérifier si keyValuePairs existe déjà dans le JSON
          if (userData.hasOwnProperty("keyValuePairs")) {
            // Ajouter la nouvelle entrée dans keyValuePairs
            userData.keyValuePairs.push({ [key]: value });
            console.log(userData.keyValuePairs);
          } else {
            // Créer keyValuePairs et ajouter la nouvelle entrée
            userData.keyValuePairs = [{ [key]: value }];
          }
        }
  
        return searchJsonId(sessionStorage.getItem("email"))
          .then(recordID => {
            console.log(recordID);
            var urlencoded = new URLSearchParams();
            urlencoded.append("jsonData", JSON.stringify(userData));
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("x-collection-access-token", "57b65250-1154-449e-9471-17fac2395079");
  
            var requestOptions = {
              method: 'PATCH',
              headers: myHeaders,
              body: urlencoded,
              redirect: 'follow'
            };
  
            return fetch("https://api.myjson.online/v1/records/"+recordID, requestOptions);
          })
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      });
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
        var userData = result.records.find(item => item.data.id === email);

        if (userData) {
          return userData.id;
        } else {
          throw new Error("ID introuvable");
        }
      })
      .catch(error => {
        console.log('Erreur lors de la récupération des données JSON :', error);
        throw error;
      });
  }
       
     

  function suppJson(key, value) {
     // Récupérer le JSON existant
     return getJsonId(sessionStorage.getItem("email"))
     .then(jsonData => {
       console.log(jsonData);
       var userData = { ...jsonData }; // Copier les données JSON existantes
 
       if (userData.id === sessionStorage.getItem("email")) {
         // Vérifier si keyValuePairs existe déjà dans le JSON
         if (userData.hasOwnProperty("keyValuePairs")) {
          // Supprimer l'entrée spécifique du tableau keyValuePairs
          userData.keyValuePairs = userData.keyValuePairs.filter(item => {
            return !(item.hasOwnProperty(key) && item[key] === value);
          });
          console.log(userData.keyValuePairs);
        }
      }
 
       return searchJsonId(sessionStorage.getItem("email"))
         .then(recordID => {
           console.log(recordID);
           var urlencoded = new URLSearchParams();
           urlencoded.append("jsonData", JSON.stringify(userData));
           var myHeaders = new Headers();
           myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
           myHeaders.append("x-collection-access-token", "57b65250-1154-449e-9471-17fac2395079");
 
           var requestOptions = {
             method: 'PATCH',
             headers: myHeaders,
             body: urlencoded,
             redirect: 'follow'
           };
 
           return fetch("https://api.myjson.online/v1/records/"+recordID, requestOptions);
         })
         .then(response => response.json())
         .then(result => console.log(result))
         .catch(error => console.log('error', error));
        
     });
    }
 
    
  
 