function getAthleteInfo() {

    var athlete = $(this).attr("data-name");
    var queryURL = "insert api" + athlete + "insert api key";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
    }
}

getAthleteInfo();