function getJsonData() {
    var token = '57bb25cf-0ea9-4132-8544-08fcd7c77d37';

    $.ajax({
      url: 'https://jsonbin.org/samu4l/',
      type: 'GET',
      headers: {
        'authorization': 'token ' + token
      },
      success: function(response) {
        console.log('Données récupérées avec succès !');
        console.log(response);

        // Afficher les informations dans le HTML
        var htmlOutput = 'id: ' + response.id + '<br>' +
                         'nom: ' + response.nom + '<br>' +
                         'prénom: ' + response.prenom;

        $('#jsonOutput').html(htmlOutput);
      },
      error: function(error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    });
  }

  function sendJsonData() {
    var token = '57bb25cf-0ea9-4132-8544-08fcd7c77d37';
    var data = {
      id: 'pute',
      nom: 'pute',
      prenom: 'pute'
    };

    $.ajax({
      url: 'https://jsonbin.org/samu4l/salope',
      type: 'POST',
      headers: {
        'authorization': 'token ' + token
      },
      data: data,
      success: function(response) {
        console.log('Données envoyées avec succès !');
        console.log(response);
      },
      error: function(error) {
        console.error('Erreur lors de l\'envoi des données :', error);
      }
    });
  }