function getBasketballInfo() {

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://free-nba.p.rapidapi.com/players/3092",
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "free-nba.p.rapidapi.com",
      "x-rapidapi-key": "75707fa799msha4a06e78acf5fdcp1f1ec2jsn683a106045e2"
    }
  }
  
  $.ajax(settings).then(function (response) {
    console.log(response);
  });
}

function getSoccerInfo() {

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api-football-v1.p.rapidapi.com/v2/players/player/567",
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "75707fa799msha4a06e78acf5fdcp1f1ec2jsn683a106045e2"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

}

getBasketballInfo();
getSoccerInfo();
