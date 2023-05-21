const challenge = new Uint8Array(32);
crypto.getRandomValues(challenge);

const publicKeyOptions = {
  challenge,
  rp: {name: "MySafe", id: "ballamans.emf-informatique.ch"},
  user:{id: strToUint8("DE4DB33F"), displayName: "Ballaman samuel", name:"Ballaman Samuel"},
  pubKeyCredParams: [{alg: -7, type:"public-key"}],
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

  
  var newCredentialInfo; // Déclarer la variable globale pour stocker les informations de la nouvelle clé

  btnFinger.on("click", function (event){
    navigator.credentials.create({ "publicKey": publicKeyOptions })
      .then(function(credential) {
        newCredentialInfo = credential.rawId; // Stocker les informations de la nouvelle clé dans la variable globale
        console.log(newCredentialInfo);
        localStorage.setItem('publicKey', credential.response.publicKey);

       
      })
      .catch(function(error) {
        // Gérez les erreurs de manière appropriée
        console.error(error);
      });
  });

  btnInscrit.on("click", function (event) {
    try {
      if (password.val() !== confirmPassword.val()) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }
  console.log(newCredentialInfo);
      var keyValuePairs = [
      ];
      console.log(email);
      console.log(nom);
      console.log(prenom);
      console.log(pin);
       // Utilisation de la fonction arrayBufferToBase64 pour convertir newCredentialInfo en une représentation JSON lisible
  var credentialJSON = arrayBufferToBase64(newCredentialInfo);

  
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

  function arrayBufferToBase64(arrayBuffer) {
    const uint8Array = new Uint8Array(arrayBuffer);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    return base64String;
  }
  
 
  });

