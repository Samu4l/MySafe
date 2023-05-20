

const challenge = new Uint8Array(32);
crypto.getRandomValues(challenge);
const publicKeyOptions = {
  challenge,
  rp: {name: "MySafe", id: "ballamans.emf-informatique.ch/A30/"},
  user:{id: strToUint8("DE4DB33F"), displayName: "Ballaman samuel", name:"Ballaman Samuel"},
  pubKeyCredParams: [{alg: -7, type:"public-key"}],
  attestation: "direct"
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
  // Vérifier si les mots de passe correspondent
 
btnFinger.on("click", async function (event){
  
  try {
    const credential = await navigator.credentials.create({publicKey: publicKeyOptions});
    console.log(credential);
  } catch (error) {
    console.log("Erreur ", error);
  }
   
  

});




  btnFinger.on("click", function (event){
 navigator.credentials.create({ "publicKey": publicKeyOptions })
.then(function(newCredentialInfo) {
  // Envoyez les informations de la nouvelle clé au serveur pour vérification et enregistrement
  console.log(newCredentialInfo);
})
.catch(function(error) {
  // Gérez les erreurs de manière appropriée
  console.error(error);
});
});



  btnInscrit.on("click", function(event) {
    if (password.val() !== confirmPassword.val()) {
      alert("Les mots de passe ne correspondent pas");
  
    }

    var keyValuePairs = "";
    console.log(email);
    console.log(nom);
    console.log(prenom);
    console.log(pin);
 
    sendJson(email.val(), nom.val(), prenom.val(), pin.val(), password.val(), keyValuePairs)
      .then(function(ok) {
        if (ok) {
         window.location.href = "index.html";
        } else {
          console.log("error syntaxe");
        }
      })
      .catch(function(error) {
        console.log("error:", error);
      });
  });

});