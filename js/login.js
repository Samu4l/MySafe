$(document).ready(function () {
  var mail = $("#email");
  var pin = $("#pinInput");
  var btnFinger = $("#finger");
  btnFinger.hide();
  const registerButton = $("#registerButton");

  // Ajoutez un gestionnaire d'événements au clic sur le bouton
  
  registerButton.on("click", function() {
    // Redirigez l'utilisateur vers la page "register.html"
    window.location.href = "register.html";
  
  });

  btnFinger.on("click", async function(event) {
    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);
      
      const credentialstored = sessionStorage.getItem("credentialrawID");
      const publicKeyOptions = {
        challenge,
        allowCredentials: [{
          id: base64ToArrayBuffer(credentialstored),
          type: 'public-key',
        }],
        timeout: 60000,
      };
      function strToUint8(txt){
        return Uint8Array.from(txt, (s)=>s.charCodeAt(0));
      }
         
      const credential = await navigator.credentials.get({ "publicKey": publicKeyOptions });
      var id = localStorage.getItem("credentialid");
      if (credential.id === id) {
        sessionStorage.setItem("email", mail.val());
        window.location.href = "connecter.html";
      } else {
        console.log("Invalid credential");
      }
    } catch (error) {
      console.error(error);
    }
  });




  mail.on("input", function() {
    if (mail.val() !== '') {
    btnFinger.show();
    } else {
   
    }
  });

  navigator.serviceWorker.addEventListener('message', function(event) {
    if (event.data.type === 'offline') {
      // Afficher une pop-up indiquant à l'utilisateur qu'il n'est pas connecté à Internet
      alert("Vous n'êtes pas connecté à Internet. Veuillez vérifier votre connexion.");
     
    }
  });


  
  pin.on("input", function () {
    var pinValue = pin.val();
    if (pinValue.length === 6) {
    
     
      getJson(mail.val(), pin.val())
        .then((a) => {
          console.log(a);
          if (a === true) {
            sessionStorage.setItem("email", mail.val());          
            window.location.href = "mail.html";
          } else {
            console.log("Erreur de validation");
            pin.css("border-color", "red");
           
              console.log("Erreur de validation");
              pin.css("border-color", "red");
              setTimeout(function() {
                  pin.css("border-color", "");
                  pin.val(""); // Effacer le contenu de l'input
              }, 1000);
                  // Réinitialiser la couleur du contour après 1 seconde            
          }
        })
        .catch((error) => {
          console.log("error", error);
          
        });
    }
  });
});

function base64ToArrayBuffer(base64String) {
  const binaryString = atob(base64String);
  const length = binaryString.length;
  const uint8Array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return uint8Array.buffer;
}
  

