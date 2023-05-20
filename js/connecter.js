$(document).ready(function() {
  var btnDeco = $("#logoutButton");

  var email = sessionStorage.getItem("email"); // Récupérer l'e-mail depuis le sessionStorage

  // Appeler la fonction pour récupérer les données JSON de l'utilisateur
  getJsonId(email)
  .then(userData => {
    // Vérifier si les données utilisateur existent
    if (userData) {
      var keyValuePairs = userData.keyValuePairs || [];
      var tableBody = $("#data");

      // Parcourir les éléments du tableau keyValuePairs
      keyValuePairs.forEach(function(pair) {
        var url = Object.keys(pair)[0];
        var password = pair[url];

        // Créer les éléments HTML pour chaque paire clé-valeur
        var row = $("<tr>");

        var urlCell = $("<td>");
        var urlDiv = $("<div>").addClass("d-flex align-items-center");
        var urlInput = $("<input>").attr("type", "text").val(url).addClass("form-control");
        urlDiv.append(urlInput);
        urlCell.append(urlDiv);

        var passwordCell = $("<td>");
        var passwordDiv = $("<div>").addClass("d-flex align-items-center");
        var passwordInput = $("<input>").attr("type", "password").val(password).addClass("form-control");
        passwordDiv.append(passwordInput);
        passwordCell.append(passwordDiv);

        var deleteButtonCell = $("<td>");
        var deleteDiv = $("<div>").addClass("d-flex justify-content-end");
        var deleteButton = $("<button>").text("Supprimer").addClass("btn btn-danger");
        deleteDiv.append(deleteButton);
        deleteButtonCell.append(deleteDiv);

        // Ajouter un gestionnaire d'événements pour le bouton de suppression
        deleteButton.on("click", function() {
          // Supprimer la paire clé-valeur du tableau et mettre à jour l'affichage
          var index = keyValuePairs.indexOf(pair);
          if (index > -1) {
            keyValuePairs.splice(index, 1);
            row.remove();
          }
        });

        // Ajouter les cellules à la ligne
        row.append(urlCell, passwordCell, deleteButtonCell);
        tableBody.append(row);
      });
    }
  })
  .catch(error => {
    console.log("Erreur lors de la récupération des données JSON :", error);
  });

  var shakeThreshold = 100; // Seuil de secousse (à ajuster selon vos besoins)
  var lastShakeTime = 0;

  // Événement devicemotion
  window.addEventListener('devicemotion', function(event) {
    var acceleration = event.accelerationIncludingGravity;
    var currentTime = new Date().getTime();

    // Calcul de l'accélération totale
    var accelerationMagnitude = Math.sqrt(
      Math.pow(acceleration.x, 2) +
      Math.pow(acceleration.y, 2) +
      Math.pow(acceleration.z, 2)
    );

    // Vérification si le téléphone a été secoué
    if (accelerationMagnitude > shakeThreshold) {
      // Vérification du délai entre les secousses (pour éviter les déconnexions accidentelles)
      if (currentTime - lastShakeTime > 1000) {
        logout();
        lastShakeTime = currentTime;
      }
    }
  });

  // Fonction de déconnexion
  function logout() {
    // Code de déconnexion ici
    // Par exemple, supprimer les informations d'authentification du sessionStorage
    sessionStorage.removeItem("email");
    // Rediriger vers la page de connexion
    window.location.href = "index.html";
  }

  btnDeco.on("click", function() {
    logout();
  });
});
