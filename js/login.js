const challenge = new Uint8Array(32);
crypto.getRandomValues(challenge);
const publickey = localStorage.getItem("publicKey");
const publicKeyOptions = {
  challenge,
  rp: { name: "MySafe", id: "ballamans.emf-informatique.ch" },
  user: { id: strToUint8("DE4DB33F"), displayName: "Ballaman samuel", name: "Ballaman Samuel" },
  pubKeyCredParams: [{ alg: -7, type: "public-key" }],
  attestation: "direct",
  publicKey: publickey,
};

function strToUint8(txt) {
  return Uint8Array.from(txt, (s) => s.charCodeAt(0));
}

$(document).ready(function () {
  var mail = $("#email");
  var pin = $("#pinInput");
  var btnFinger = $("#finger");

  btnFinger.on("click", async function (event) {
    try {
      const credential = await navigator.credentials.get({ publicKey: publicKeyOptions });
      const newCredentialInfo = credential.rawId; // Stocker les informations de la nouvelle clé dans la variable globale

      arrayBufferToBase64(newCredentialInfo);

      const dossier = getJsonId(mail.val());
      dossier.array.forEach(element => {
        if (element.credit === newCredentialInfo) {
          sessionStorage.setItem("email", mail.val());
          window.location.href = "connecter.html";
        }
      });
    } catch (error) {
      // Gérez les erreurs de manière appropriée
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
});

  function arrayBufferToBase64(arrayBuffer) {
    const uint8Array = new Uint8Array(arrayBuffer);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    return base64String;
  }
  function strToUint8(txt){
    return Uint8Array.from(txt, (s)=>s.charCodeAt(0));
  }
