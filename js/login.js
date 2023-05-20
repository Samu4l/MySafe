$(document).ready(function () {
  var mail = $("#email");
  var pin = $("#pinInput");
  var btnFinger = $("#finger");
  var creditExistant; // Déclarer la variable globale pour stocker l'identifiant unique du credential existant

  btnFinger.on("click", async function (event) {
    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);


      const publicKeyOptions = {
        challenge,
        rp: { name: "MySafe", id: "ballamans.emf-informatique.ch" },
        user: { id: strToUint8("DE4DB33F"), displayName: "Ballaman samuel", name: "Ballaman Samuel" },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        attestation: "direct"
      };

      const credential2 = await navigator.credentials.get({ publicKey: publicKeyOptions });
      creditExistant = credential2.rawId; // Stocker l'identifiant unique du credential existant
      arrayBufferToBase64(creditExistant);

      const dossier = getJsonId(mail.val());
      dossier.array.forEach(element => {
        if (element.credit === creditExistant) {
          sessionStorage.setItem("email", mail.val());
          window.location.href = "connecter.html";
        }
      });
      
    } catch (error) {
      console.error(error);
    }
  });

  pin.on("input", function () {
    var pinValue = pin.val();
    console.log(pinValue);

    if (pinValue.length === 6) {
      getJson(mail.val(), pin.val())
        .then((a) => {
          console.log(a);
          if (a === true) {
            sessionStorage.setItem("email", mail.val());
            window.location.href = "connecter.html";
          } else {
            console.log("Erreur de validation");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  });
  function arrayBufferToBase64(arrayBuffer) {
    const uint8Array = new Uint8Array(arrayBuffer);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    return base64String;
  }
  function strToUint8(txt){
    return Uint8Array.from(txt, (s)=>s.charCodeAt(0));
  }
});
