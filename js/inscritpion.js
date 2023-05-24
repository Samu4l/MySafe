const challenge = new Uint8Array(32);
crypto.getRandomValues(challenge);



const publicKeyOptions = {
  challenge,
  rp: { name: "MySafe", id: "www.ballamans.emf-informatique.ch" },
  user: { id: strToUint8("DE4DB33F"), displayName: "Ballaman Samuel", name: "Ballaman Samuel" },
  pubKeyCredParams: [{ alg: -7, type: "public-key" }, { type: "public-key", alg: -257 }],
  attestation: "direct",
};

function strToUint8(txt){
  return Uint8Array.from(txt, (s)=>s.charCodeAt(0));
}

$(document).ready(function() {
  // Récupérer les valeurs des inputs
  var email = $("#email");
  var nom = $("#nom");
  var prenom = $("#prenom");
  var pin = $("#pin");
  var password = $("#psw");
  var confirmPassword = $("#copsw");
  var btnInscrit = $("#inscrit");
  var btnFinger = $("#AddFinger");

  
  

  btnFinger.on("click", function(event) {
    navigator.credentials.create({ "publicKey": publicKeyOptions })
      .then(function(credential) { 
        localStorage.setItem('credentialid', credential.id);
        console.log(credential.id);
        localStorage.setItem('credential', credential.rawId);
        
        
      })
      .catch(function(error) {
        console.error(error);
      });
  });

  
  navigator.serviceWorker.addEventListener('message', function(event) {
    if (event.data.type === 'offline') {
      // Afficher une pop-up indiquant à l'utilisateur qu'il n'est pas connecté à Internet
      alert("Vous n'êtes pas connecté à Internet. Veuillez vérifier votre connexion.");
    }
  });

  btnInscrit.on("click", function (event) {
    try {
      if (password.val() !== confirmPassword.val()) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }
 
      var keyValuePairs = [
      ];
      console.log(email);
      console.log(nom);
      console.log(prenom);
      console.log(pin);
       // Utilisation de la fonction arrayBufferToBase64 pour convertir newCredentialInfo en une représentation JSON lisible
    var credentialJSON = localStorage.getItem("credential");

  
      // Utilisez newCredentialInfo pour obtenir l'identifiant unique du credential
      var ok = sendJson(email.val(), nom.val(), prenom.val(), pin.val(), password.val(), keyValuePairs, credentialJSON);
      if (ok) {
        window.location.href = "index.html";
      } else {
        console.log("error syntaxe");
      }
    } catch (error) {
      console.log("error:", error);
    }
  });
 
 
}); 

