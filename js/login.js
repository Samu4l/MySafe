$(document).ready(function() {
    var pin = $("#pinInput");
    var btnFinger =$("#fingerprintButton");
    var btnInscription = $("#registerButton");
    
    
    
    butInscrit.click(function (event) {
        if (pin.val != '' ) {
            inscrit(document.getElementById("nom").value, document.getElementById("email").value, document.getElementById("mdp").value, inscriptSuccess, CallbackError);
        } else {
            alert("Veuillez remplir tout les champs !");
        }
    });
});
