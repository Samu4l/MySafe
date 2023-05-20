$(document).ready(function() {
  var mail = $("#email");
    var pin = $("#pinInput");
    
      var btnFinger = $("#finger");
    
      
    pin.on("input", function() {
        var pinValue = pin.val();
        console.log(pinValue); // Correction : Utilisation de pinValue au lieu de pin.val dans console.log
        if (pinValue.length === 6) {
          getJson(mail.val(), pin.val())
          .then(a => {
            // Masquer le message de chargement lorsque l'appel est terminé
          
        
            console.log(a);
        
            // Validation du résultat
            if (a === true) {
              console.log("ok222");
              sessionStorage.setItem("email", mail.val());
              window.location.href = "connecter.html";
            } else {
              console.log("Erreur de validation");
            }
          })
          .catch(error => {
            console.log('error', error);
            // Masquer le message de chargement en cas d'erreur
           
          });
         }
        
        });
      });

  

 
   

    
