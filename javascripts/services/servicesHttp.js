var BASE_URL = "../Serveur/server.php";
/**
 * Charge le mot de passe en fonction du niveau de sécurité via une requête Ajax.
 *
 * @param {number} levelSecurity - Le niveau de sécurité pour récupérer le mot de passe.
 * @param {function} successCallback - La fonction de rappel à appeler en cas de succès.
 * @param {function} errorCallback - La fonction de rappel à appeler en cas d'erreur.
 * @returns {void}
 */

function chargerMdp(levelSecurity, successCallback, errorCallback) {
   
  $.ajax({
      type: "GET",
      dataType: "xml",
      url: BASE_URL,
      data: { 
     levelSecurity: levelSecurity
},
      success: successCallback,
      error: errorCallback
  });
}
  
/**
 * Effectue une requête Ajax de type POST pour inscrire un utilisateur.
 *
 * @param {string} nom - Le nom de l'utilisateur à inscrire.
 * @param {string} mail - L'adresse e-mail de l'utilisateur à inscrire.
 * @param {string} mdp - Le mot de passe de l'utilisateur à inscrire.
 * @param {function} successCallback - La fonction de rappel à appeler en cas de succès.
 * @param {function} errorCallback - La fonction de rappel à appeler en cas d'erreur.
 * @returns {void}
 */

function inscrit(nom, mail, mdp, successCallback, errorCallback) {
  $.ajax({
      type: "POST",
      dataType: "xml",
      url: BASE_URL,
      data:{ 
      action: 'inscrit',
      Nom: nom,
      email: mail,
      password: mdp
  },
      success: successCallback,
      error: errorCallback
  });
}
/**
 * Effectue une requête Ajax de type POST pour connecter un utilisateur.
 *
 * @param {string} mail - L'adresse e-mail de l'utilisateur à connecter.
 * @param {string} mdp - Le mot de passe de l'utilisateur à connecter.
 * @param {function} successCallback - La fonction de rappel à appeler en cas de succès.
 * @param {function} errorCallback - La fonction de rappel à appeler en cas d'erreur.
 * @returns {void}
 */

  function connect(mail,mdp, successCallback, errorCallback) {
    console.log('connect');
    $.ajax({
        type: "POST",
        dataType: "xml",
        url: BASE_URL,
        data:{ 
        action: 'connect',
        email: mail,
        password: mdp
    },
        success: successCallback,
        error: errorCallback
    });
  }
/**
 * Effectue une requête Ajax de type POST pour déconnecter l'utilisateur.
 *
 * @param {function} successCallback - La fonction de rappel à appeler en cas de succès.
 * @param {function} errorCallback - La fonction de rappel à appeler en cas d'erreur.
 * @returns {void}
 */

    function disconnect(successCallback, errorCallback) {
      $.ajax({
          type: "POST",
          dataType: "xml",
          url: BASE_URL,
          data:{ 
          action: 'disconnect',
         },
          success: successCallback,
          error: errorCallback
      });
  

}

/**
 * Charge les données via une requête Ajax de type GET.
 *
 * @param {function} successCallback - La fonction de rappel à appeler en cas de succès.
 * @param {function} errorCallback - La fonction de rappel à appeler en cas d'erreur.
 * @returns {void}
 */

function charger(successCallback, errorCallback) {
  $.ajax({
      type: "GET",
      dataType: "xml",
      url: BASE_URL,
      data:{ 
      action: 'charger',
     
  },
      success: successCallback,
      error: errorCallback
  });
  
}
/**
 * Ajoute une URL avec un mot de passe via une requête Ajax de type POST.
 *
 * @param {string} url - L'URL à ajouter.
 * @param {string} psw - Le mot de passe associé à l'URL.
 * @param {function} successCallback - La fonction de rappel à appeler en cas de succès.
 * @param {function} errorCallback - La fonction de rappel à appeler en cas d'erreur.
 * @returns {void}
 */
function ajouterUrl(url,psw, successCallback,errorCallback){
  $.ajax({
    type: "POST",
    dataType: "xml",
    url: BASE_URL,
    data:{ 
    action: 'ajoutUrl',
    
    Url: url,
    password: psw,
},
    success: successCallback,
    error: errorCallback
});
}
/**
 * Modifie les données d'une URL spécifiée via une requête Ajax de type PUT.
 *
 * @param {string} pk - La clé primaire de l'URL à modifier.
 * @param {string} url - La nouvelle URL.
 * @param {string} psw - Le nouveau mot de passe associé à l'URL.
 * @param {function} successCallback - La fonction de rappel à appeler en cas de succès.
 * @param {function} errorCallback - La fonction de rappel à appeler en cas d'erreur.
 * @returns {void}
 */
function  modifierDonne(pk,url,psw, successCallback,errorCallback){

    $.ajax({
    type: "PUT",
    dataType: "xml",
    url: BASE_URL,
    data:{ 
    action: 'modifierUrl',
    ID: pk,
    Url: url,
    password: psw,
},
    success: successCallback,
    error: errorCallback
});
}
  
/**
 * Supprime les données d'une URL spécifiée via une requête Ajax de type DELETE.
 *
 * @param {string} pkValue - La valeur de la clé primaire de l'URL à supprimer.
 * @param {function} successCallback - La fonction de rappel à appeler en cas de succès.
 * @param {function} errorCallback - La fonction de rappel à appeler en cas d'erreur.
 * @returns {void}
 */

function  deleteDonne(pkValue,  successCallback,errorCallback){
    $.ajax({
    type: "DELETE",
    dataType: "xml",
    url: BASE_URL,
    data:{ 
    action: 'deleteUrl',
    ID: pkValue,
    
},
    success: successCallback,
    error: errorCallback
});
}
/**
 * Vérifie si l'utilisateur est connecté en effectuant une requête Ajax au serveur.
 * Cette méthode envoie une requête GET à l'URL de base spécifiée, avec l'action 'co' pour vérifier la connexion.
 * Si la requête réussit, le rappel de réussite (successCallback) est appelé avec les données XML renvoyées par le serveur.
 * Si la requête échoue, le rappel d'erreur (errorCallback) est appelé avec les détails de l'erreur.
 *
 * @param {function} successCallback - Le rappel à exécuter si la requête réussit. Ce rappel prend les données XML renvoyées par le serveur en tant que paramètre.
 * @param {function} errorCallback - Le rappel à exécuter si la requête échoue. Ce rappel prend les détails de l'erreur (requête, statut, erreur) en tant que paramètres.
 */

function estConnecter(successCallback,errorCallback){
    $.ajax({
        type: "GET",
        dataType: "xml",
        url: BASE_URL,
        data:{ 
        action: 'co',
       
    },
        success: successCallback,
        error: errorCallback
    });
}