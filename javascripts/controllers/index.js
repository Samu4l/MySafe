

/**
* Traite la réponse de la requête Ajax de déconnexion et ferme la fenêtre actuelle et ouvre la page d'index si la déconnexion est réussie, affiche un message d'erreur sinon.
* @param {Object} data - Les données renvoyées par la requête Ajax.
* @param {string} text - Le code de statut de la réponse.
* @param {Object} jqXHR - L'objet jqXHR renvoyé par la requête Ajax.
*/
function disconnectSuccess(data, text, jqXHR) {
    if ($(data).find("result").text() == 'Deconnecter') {
        window.close();
        window.open('index.html', '_self');
    }
    else if ($(data).find("result").text() == 'Error') {

        alert("Vous n'avez rien a faire ici");


    } else {
        alert("Erreur de déconection");
    }
}


/**
 * Gère les erreurs lors d'une requête Ajax en affichant des alertes personnalisées en fonction du code de statut HTTP.
 * 
 * @param {number} request - Le code de statut HTTP de la requête.
 * @param {number} status - Le code de statut HTTP de la réponse.
 * @param {string} error - L'erreur de la requête.
 * @returns {void}
 */


function CallbackError(request, status, error) {
    switch (status) {
        case 400:
            alert("Requête incorrecte");
            break;
        case 401:
            alert("Non autorisé");
            break;
        case 403:
            alert("Interdit");
            break;
        case 404:
            alert("Page non trouvée");
            break;
        case 500:
            alert("Erreur interne du serveur");
            break;
        case 503:
            alert("Service indisponible");
            break;
        default:
            alert("Une erreur s'est produite");
    }

}

/**
 * Traite la réponse de la requête Ajax de connexion et ferme la fenêtre actuelle et ouvre la page de connexion si la connexion est réussie, affiche un message d'erreur sinon.
 * @param {Object} data - Les données renvoyées par la requête Ajax.
 * @param {string} text - Le code de statut de la réponse.
 * @param {Object} jqXHR - L'objet jqXHR renvoyé par la requête Ajax.
 */

function connectSuccess(data, text, jqXHR) {

    if ($(data).find("result").text() == 'true') {

        window.close();

        window.open('connecter.html ', '_self');



    } else {
        alert("Erreur lors du login : nom d'utilisateur ou mot de passe incorrecte");
    }

}

/**
 * Fonction de réussite de mot de passe. Cette fonction récupère le mot de passe du formulaire 
 * XML et le place dans la zone de texte de l'entrée.
 * @param {string} data - Les données renvoyées par la requête Ajax.
 * @param {string} text - Statut de la requête.
 * @param {object} jqXHR - L'objet XMLHttpRequest.
 */
function mdpSuccess(data, text, jqXHR) {
    var password = $(data).find("password").text();
    $("#input").val(password);

}
/**
 * Fonction de réussite d'inscription. Cette fonction vérifie
 *  si l'inscription est réussie ou non et affiche une alerte 
 * correspondante. Si l'inscription est réussie, elle ferme la 
 * fenêtre actuelle et ouvre la page de connexion.
 * @param {string} data - Les données renvoyées par la requête Ajax.
 * @param {string} text - Statut de la requête.
 * @param {object} jqXHR - L'objet XMLHttpRequest.
 */
function inscriptSuccess(data, text, jqXHR) {
    if ($(data).find("result").text() == 'true') {
        alert("Inscription réussite");
        window.close;
        window.open('login.html', '_self');
    } else {
        alert("Erreur lors de l'inscription, veuillez réessayer");
    }

}


/**
 * Fonction de réussite de chargement de données. Cette fonction
 *  crée des éléments HTML pour chaque champ de la table t_url et 
 * les ajoute à la page. Elle ajoute également des boutons pour modifier, supprimer et copier les données.
 * @param {string} data - Les données renvoyées par la requête Ajax.
 * @param {string} text - Statut de la requête.
 * @param {object} jqXHR - L'objet XMLHttpRequest.
 */

function chargerSuccess(data, text, jqXHR) {
 

    // Récupérer tous les éléments <item> du XML
    var items = $(data).find("item");

    // Créer la section HTML
    var section = $("<section>");

    // Parcourir tous les éléments <item> et ajouter des éléments HTML pour chaque colonne de la table t_url
    var counter = 0;
    items.each(function (index) {
        var div = $("<div>").attr("class", "chargerDonne").attr("id", "div" + counter);
        var pk = $(this).find("pk").text();

        var url = $(this).find("url").text();
        var password = $(this).find("mdp").text();

        // Créer les éléments HTML pour chaque champ de la table t_url
        var inputPK = $("<input>")
            .attr("type", "hidden")
            .attr("id", "pk" + counter)
            .val(pk);
        var labelUrl = $("<label>").attr("class", "url").text("URL");
        var inputUrl = $("<input>")
            .attr("type", "text")
            .attr("id", "url" + counter)

            .val(url);
        var labelPassword = $("<label>").attr("class", "password").text("Password");
        var inputPassword = $("<input>")
            .attr("type", "password")
            .attr("id", "password" + counter)
            .val(password);
        var buttonModifier = $("<button>").attr("class", "btnMo").text("modifier");
        var buttonEffacer = $("<button>").attr("class", "btnDe").text("effacer");
        var buttonCopier = $("<button>").attr("class", "btnCo").text("copier");
        var buttonOuvrir = $("<button>").attr("class", "btnOu").text("ouvrir");


        // Ajouter les éléments HTML à la section
        div
            .append(inputPK)
            .append(labelUrl)
            .append(inputUrl)
            .append("<br>")
            .append(labelPassword)
            .append(inputPassword)
            .append("<br>")
            .append(buttonModifier)
            .append(buttonEffacer)
            .append(buttonCopier)
            .append(buttonOuvrir);




        //permet d'acceder à l'url
        buttonOuvrir.on("click", function () {

            var urlValue = $(this).parent().find("input[type='text']").val();
            var url = urlValue;
            window.open(url, '_blank');

        });

        buttonModifier.on("click", function () {
            var pkValue = $(this).parent().find("input[type='hidden']").val();
            var urlValue = $(this).parent().find("input[type='text']").val();
            var passwordValue = $(this).parent().find("input[type='password']").val();
            if (urlValue != '' && passwordValue != '') {
                modifierDonne(pkValue, urlValue, passwordValue, modifierDataSuccess, CallbackError);

            } else {
                alert("Veuillez remplir tous les champs !");
            }
        });
        //permet de copier le mdp
        buttonCopier.on("click", function () {


            var passwordValue = $(this).parent().find("input[type='password']").val();

            // Créer un élément textarea temporaire
            const textarea = document.createElement('textarea');

            // Insérer la valeur de passwordValue dans le textarea
            textarea.value = passwordValue;

            // Ajouter le textarea à la page
            document.body.appendChild(textarea);

            // Sélectionner le contenu du textarea
            textarea.select();

            // Copier le contenu sélectionné dans le presse-papiers
            document.execCommand('copy');

            // Supprimer le textarea de la page
            document.body.removeChild(textarea);
        });

        //Permet d'effacer une entré 
        buttonEffacer.on("click", function () {
            var pkValue = $(this).parent().find("input[type='hidden']").val();
            deleteDonne(pkValue, deleteDataSuccess, CallbackError);
            $(this).parent().find("input[type='text']").val("");
            $(this).parent().find("input[type='password']").val("");

        });

        // Ajouter la section HTML à la page
        section.append(div);

        counter++;
    });
    $("#dataCharger").empty().append(section);
}


/**
 * Fonction appelée en cas de succès de la modification de données.
 *
 * @param {string} data - La réponse de la requête AJAX.
 * @param {string} text - Le statut de la réponse.
 * @param {jqXHR} jqXHR - L'objet jqXHR de la requête AJAX.
 * @returns {undefined}
 */

function modifierDataSuccess(data, text, jqXHR) {
    if ($(data).find("result").text() == 'true') {
        alert("modification réussite");
        charger(chargerSuccess, CallbackError);

    } else {
        alert("Erreur de modification");
    }

}

/**
 * Fonction appelée en cas de succès de la suppression de données.
 *
 * @param {string} data - La réponse de la requête AJAX.
 * @param {string} text - Le statut de la réponse.
 * @param {jqXHR} jqXHR - L'objet jqXHR de la requête AJAX.
 * @returns {undefined}
 */

function deleteDataSuccess(data, text, jqXHR) {
    if ($(data).find("result").text() == 'true') {
        alert("supression réussite");
        charger(chargerSuccess, CallbackError);
    } else {
        alert("Erreur de supression");
    }

}




/**
 * Fonction appelée en cas de succès de l'ajout de données.
 *
 * @param {string} data - La réponse de la requête AJAX.
 * @param {string} text - Le statut de la réponse.
 * @param {jqXHR} jqXHR - L'objet jqXHR de la requête AJAX.
 * @returns {undefined}
 */

function ajoutDataSucess(data, text, jqXHR) {
    if ($(data).find("result").text() == 'true') {
        alert("ajout réussit");
        document.getElementById("urlajout").value = "";
        document.getElementById("passwordajout").value = "";
        charger(chargerSuccess, CallbackError);

    } else {
        alert("Erreur lors de l'ajout");
    }
}

/**
 * Fonction de rappel appelée lorsque la requête de vérification de connexion est réussie.
 * Cette fonction extrait les données XML renvoyées par le serveur et vérifie la valeur du résultat.
 * Si le résultat est 'false', cela signifie que l'utilisateur n'est pas connecté.
 * Dans ce cas, une alerte est affichée pour informer l'utilisateur qu'il n'est pas connecté,
 * puis la page courante est fermée et la page de connexion (login.html) est ouverte dans la même fenêtre.
 *
 * @param {Object} data - Les données XML renvoyées par le serveur.
 * @param {string} text - Le statut de la requête.
 * @param {jqXHR} jqXHR - L'objet jqXHR (XMLHttpRequest) utilisé pour la requête Ajax.
 */

function estCoSuccess(data, text, jqXHR){
    var result = $(data).find('result').text();
    if (result === 'false') {
        alert("Vous n'êtes pas connecté !!!")
        window.close;
        window.open('login.html', '_self');
    }else{
        charger(chargerSuccess, CallbackError);
    }

}

$(document).ready(function () {
    var butConnect = $("#connect");
    var butDisconnect = $("#disconnect");
    var butInscrit = $("#inscription");
    var butMdp = $("#go");
    var valeur;
    var afficheData = $("#chargeData");
    var ajoutUrl = $("#ajoutUrl");
    var butModifier = $("#btnModif")
   


    $("#un").click(function () {
        valeur = 1;
        $(this).addClass("active");
        $("#deux, #trois").removeClass("active");
    });
    $("#deux").click(function () {
        valeur = 2;
        $(this).addClass("active");
        $("#un, #trois").removeClass("active");
    });
    $("#trois").click(function () {
        valeur = 3;
        $(this).addClass("active");
        $("#un, #deux").removeClass("active");
    });




    $.getScript("javascripts/services/servicesHttp.js", function () {
        console.log("servicesHttp.js chargé !");
    });

    if(window.location.href.includes('connecter.html')){
        estConnecter(estCoSuccess, CallbackError);
    }
    /**
     * Fonction appelée lors du click sur le bouton "Connecter"
     * @param {Event} event - L'événement click
     */

    butConnect.click(function (event) {
        if (document.getElementById("email").value != '' && document.getElementById("password").value != '') {
            connect(document.getElementById("email").value, document.getElementById("password").value, connectSuccess, CallbackError);

        } else {
            alert("Veuillez remplir tout les champs !");
        }
    });

    /**
     * Fonction appelée lors du click sur le bouton "S'inscrire"
     * @param {Event} event - L'événement click
     */
    butInscrit.click(function (event) {
        if (document.getElementById("nom").value != '' && document.getElementById("email").value != '' && document.getElementById("mdp").value != '') {
            inscrit(document.getElementById("nom").value, document.getElementById("email").value, document.getElementById("mdp").value, inscriptSuccess, CallbackError);
        } else {
            alert("Veuillez remplir tout les champs !");
        }
    });
    /**
     * Fonction appelée lors du click sur le bouton "Se déconnecter"
     * @param {Event} event - L'événement click
     */
    butDisconnect.click(function (event) {
        disconnect(disconnectSuccess, CallbackError);
    });
    /**
     * Fonction appelée lors du click sur le bouton "Charger mot de passe"
     * @param {Event} event - L'événement click
     */

    butMdp.click(function (event) {
        chargerMdp(valeur, mdpSuccess, CallbackError);


    });

    /**
     * Fonction appelée lors du click sur le bouton "Afficher données"
     * @param {Event} event - L'événement click
     */
    afficheData.click(function (event) {
        charger(chargerSuccess, CallbackError);

    });
    /**
     * Fonction appelée lors du click sur le bouton "Modifier"
     * @param {Event} event - L'événement click
     */
    butModifier.click(function (event) {
        modifierDonne(pk, urlValue, passwordValue, modifierDataSuccess, CallbackError);
    });

    /**
     * Fonction appelée lors du click sur le bouton "Ajouter URL"
     * @param {Event} event - L'événement click
     */
    ajoutUrl.click(function (event) {
        if (document.getElementById("urlajout").value != '' && document.getElementById("passwordajout").value != '') {
            ajouterUrl(document.getElementById("urlajout").value, document.getElementById("passwordajout").value, ajoutDataSucess, CallbackError)
        }
        else {
            console.log("Veuillez remplir les champs");
        }

    });

});