$(document).ready(function () {
  var mail = $("#email");
  var pin = $("#pinInput");
  var btnFinger = $("#finger");
  btnFinger.hide();

  btnFinger.on("click", async function(event) {
    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);
      
      const credentialstored = sessionStorage.getItem("credentialid");
      const publicKeyOptions = {
        challenge,
        allowCredentials: [{
          id: credentialstored ? strToUint8(credentialstored) : null,
          type: 'public-key',
        }],
      };
      
      function strToUint8(txt) {
        return Uint8Array.from(txt, (s) => s.charCodeAt(0));
      }
      
      const credential = await navigator.credentials.get({ "publicKey": publicKeyOptions });
      
      if (credential && credential.id === credentialstored) {
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
            window.location.href = "connecter.html";
          } else {
            console.log("Erreur de validation");
            pin.css("border-color", "red");
           
          }
        })
        .catch((error) => {
          console.log("error", error);
          
        });
    }
  });
});

  function arrayBufferToBase64(arrayBuffer) {
    const uint8Array = new Uint8Array(arrayBuffer);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    return base64String;
  }

