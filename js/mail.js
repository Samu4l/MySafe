$(document).ready(function() {
    var email = sessionStorage.getItem('email');
  var btnResend =$("#resendEmailBtn");
    var pin = $("#validation");
    var code;
    var sendGridApiKey = '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';
    var sendGridUrl = 'https://api.sendgrid.com/v3/mail/send';

    // Fonction pour envoyer l'e-mail avec le code de validation
    function sendEmail() {
     code = generateRandomCode(6);
         
    var subject = 'Code de validation';
    var body = 'Votre code de validation est : ' + code;
      // Créer l'objet de requête AJAX
      var request = {
        method: 'POST',
        url: sendGridUrl,
        headers: {
          Authorization: 'Bearer ' + sendGridApiKey,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          personalizations: [{
            to: [{ email: email }],
            subject: subject
          }],
          from: { email: 'samuel.ballaman01@studentfr.ch' },
          content: [{
            type: 'text/plain',
            value: body
          }]
        })
      };

      // Envoyer la requête AJAX pour envoyer l'e-mail
      $.ajax(request)
        .done(function(response) {
          console.log('E-mail envoyé avec succès !');
        })
        .fail(function(error) {
          console.error("Erreur lors de l'envoi de l'e-mail :", error);
        });
    }

    // Envoyer l'e-mail initial avec le code de validation
    sendEmail();

    btnResend.on("click", function() {
      // Envoyer à nouveau l'e-mail avec le code de validation
      sendEmail();
   
      alert("Un nouvel e-mail de confirmation vous a été envoyé !");
    });

    pin.on("input", function() {
      var pinValue = pin.val();
      if(pinValue.length===6){
      if (pinValue === code) {
        window.location.href = "connecter.html";
      } else {
        console.log("Erreur de validation");
        pin.css("border-color", "red");
        setTimeout(function() {
            pin.css("border-color", "");
            pin.val(""); // Effacer le contenu de l'input
        }, 1000);
             // Réinitialiser la couleur du contour après 1 seconde
        
      }
    }
    });

    function generateRandomCode(length) {
      var code = '';
      for (var i = 0; i < length; i++) {
        code += Math.floor(Math.random() * 10);
      }
      return code;
    }
  });