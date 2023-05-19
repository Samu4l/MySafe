$(document).ready(function() {
    var pin = $("#pinInput");
    var btnFinger = $("fingerprintButton");
    pin.on("input", function() {
        var pinValue = pin.val();
        console.log(pinValue); // Correction : Utilisation de pinValue au lieu de pin.val dans console.log
        if (pinValue.length === 4) {
            getJsonData(connectSuccess, callbackError); // Ajout de pinValue comme argument pour getJsonData
        }
    });

    btnFinger.on("click",function(){
        if (window.PublicKeyCredential) {
            authenticateWithFingerprint(login);
        } else {
            console.log("L'authentification par empreinte digitale n'est pas prise en charge par votre navigateur.");
        }
    });

    function authenticateWithFingerprint(callback) {
        var publicKey = {
            challenge: new Uint8Array(32), // Générer un challenge sécurisé ici
            rp: {
                name: "MySafe"
            },
            user: {
                id: new Uint8Array(16), // Identifiant utilisateur unique ici
                name: "utilisateur"
            },
            authenticatorSelection: {
                authenticatorAttachment: "platform",
                userVerification: "required"
            },
            pubKeyCredParams: [
                {
                    type: "public-key",
                    alg: -7 // ECDSA with SHA-256
                }
            ]
        };

        navigator.credentials.get({ publicKey: publicKey })
            .then(function(credential) {
                console.log("Authentification réussie !");
                callback(true);
            })
            .catch(function(error) {
                console.log("Erreur d'authentification par empreinte digitale :", error);
                callback(false);
            });
    }

    function login(ok) {
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


