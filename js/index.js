

$(document).ready(function() {
const registerButton = $("#registerButton");

// Ajoutez un gestionnaire d'événements au clic sur le bouton
registerButton.on("click", function() {
  // Redirigez l'utilisateur vers la page "register.html"
  window.location.href = "register.html";

});

function loginOK(){    
  log("ça avance bb");
  window.location.href="connecter.html";
}

});