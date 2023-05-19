$(document).ready(function() {
    var pin = $("#pinInput");
    var btnFinger = $("fingerprintButton");
    pin.on("input", function() {
        var pinValue = pin.val();
        console.log(pinValue); // Correction : Utilisation de pinValue au lieu de pin.val dans console.log
        if (pinValue.length === 6) {
            getJsonData(connectSuccess, callbackError); // Ajout de pinValue comme argument pour getJsonData
        }

    });

 var btnFinger = $("#fingerprintButton");

  btnFinger.on("click", function() {
    if (window.PublicKeyCredential) {
      var options = {
        publicKey: {
          challenge: new Uint8Array(32), // Générer un challenge sécurisé
          allowCredentials: [
            // Liste des empreintes enregistrées par l'utilisateur
            { type: "public-key", id: Uint8Array.from(/* ID de l'empreinte */) }
          ]
        }
      }
    


      navigator.credentials.get({ publicKey: options }).then(function(assertion) {
        // L'authentification biométrique est réussie
        // Faire quelque chose avec l'assertion retournée
      }).catch(function(error) {
        // L'authentification biométrique a échoué ou a été annulée par l'utilisateur
      });
    } else {
      // L'API n'est pas supportée par le navigateur
      alert("L'authentification par empreinte digitale n'est pas supportée par votre navigateur.");
    }
});

   

    function loginReussi(ok) {
        if (ok) {
            console.log("Connexion réussie !");
            login(ok);
        } else {
            console.log("Erreur : authentification échouée.");
        }
    }
});

    function connectSuccess(data) {
       var ok = false
        console.log(data);
        var pin = $("#pinInput");
        var pinValue = pin.val();
        console.log(pinValue);
        if (data.id === "'"+pin+"'") {
            ok = true
            console.log("Succès");
        } else {
            console.log("Erreur : mauvais code PIN");
        }

        login(ok);
    }

    function callbackError() {
        console.log("Erreur : mot de passe erroné");
    }


