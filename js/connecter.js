

$(document).ready(function() {
  const loading = $("#loading");
 loading.show();

var btnDeco = $("#logoutButton");
var btnAdd = $("#addData");
var url= $("#url");
var mdp= $("#mdp");
  var email = sessionStorage.getItem("email"); // Récupérer l'e-mail depuis le sessionStorage


  // Appeler la fonction pour récupérer les données JSON de l'utilisateur
  //function affiche(){

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

        passwordInput.on("click", function() {
          var password = $(this).val();
          
          navigator.clipboard.writeText(password)});

        urlInput.on("click", function() {
          var url = $(this).val();
           window.location.href = url;
        });

        // Ajouter un gestionnaire d'événements pour le bouton de suppression
        deleteButton.on("click", function() {
          // Obtenir les valeurs URL et mot de passe de l'entrée
          var urlValue = $(this).closest("tr").find("input[type='text']").val();
          var passwordValue = $(this).closest("tr").find("input[type='password']").val();
          // Appeler la fonction suppJson pour supprimer l'entrée de l'API
          suppJson(urlValue, passwordValue)
            .then(() => {
              // Supprimer la paire clé-valeur du tableau et mettre à jour l'affichage
              var index = keyValuePairs.indexOf(pair);
              if (index > -1) {
                keyValuePairs.splice(index, 1);
                row.remove();
              }
            })
            .catch(error => {
              console.log("Erreur lors de la suppression de l'entrée de l'API :", error);
            });
        });


        // Ajouter les cellules à la ligne
        row.append(urlCell, passwordCell, deleteButtonCell);
        tableBody.append(row);
      });
     
    }
    console.log("end loading");
    loading.hide();
  })
  .catch(error => {
    console.log("Erreur lors de la récupération des données JSON :", error);
  });
  
 // Créer les éléments HTML pour chaque paire clé-valeur  

  navigator.serviceWorker.addEventListener('message', function(event) {
    if (event.data.type === 'offline') {
      // Afficher une pop-up indiquant à l'utilisateur qu'il n'est pas connecté à Internet
      alert("Vous n'êtes pas connecté à Internet. Veuillez vérifier votre connexion.");
      loading.show();
    }
  });

  btnAdd.on("click", function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du bouton
    
    if (url.val() !== "" && mdp.val() !== "") {
      moJson(url.val(), mdp.val())
        .then(() => {
          location.reload(); // Recharger la page après l'ajout de données
        })
        .catch(error => {
          console.log('Erreur lors de l\'ajout des données JSON :', error);
        });
    } else {
      alert("Veuillez remplir les champs");
    }
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

