//var q = "";
// for testing
var q = "James";
//var isActive = "";
//for testing
var isActive = "Y"
 
var sport = "";
 
 
// on click of dropdown (or options?) get selected option
$("#sportDropdown li").on("click", function() {
   sport = $(this).text();
   sportID = this.id
   console.log(sport);
 
   if (sportID == "inactive") {
       isActive = "N";
 
   }
   if (sportID == "active") {
       isActive = "Y";
   }
 
   // close on click?
   //$('.dropdown-content').foundation('close');
})
 
// on click of search button, get search and based on sport selection, run api
$("#searchBtn").on("click", function() {
	// if sport empty, prompt alert
   var q = document.getElementById("searchBar").value;
   //console.log(q);
   //isActive = document.getElementById("isActive").value;
 
   // check sport selection
   if (sportID == "NBA") {
       getBasketballInfo(q);
   } else if (sportID == "active" || sportID == "inactive") {
       getBaseballInfo(q, isActive);
   } else {
       alert("Please select a sport.");
   }
 
});
 
// basketball player search
function getBasketballInfo(q) {
   var settings = {
       "async": true,
       "crossDomain": true,
       "url": "https://free-nba.p.rapidapi.com/players?page=0&per_page=25&search=" + q,
       "method": "GET",
       "headers": {
           "x-rapidapi-host": "free-nba.p.rapidapi.com",
           "x-rapidapi-key": "75707fa799msha4a06e78acf5fdcp1f1ec2jsn683a106045e2"
       }
   }
 
   $.ajax(settings).then(function(response) {
       console.log(response);
       var firstName = response.data[0].first_name;
       var lastName = response.data[0].last_name;
       var name = firstName + " " + lastName;
       var team = response.data[0].team.full_name;
       var position = response.data[0].position;
       console.log("NAME: " + name + " TEAM: " + team + " POSITION: " + position);
       $("#player").text(name);
       $("#team").text(team);
       $("#position").text(position);
   });
}
 
//baseball player search
function getBaseballInfo(q, isActive) {
   var settings = {
       "async": true,
       "crossDomain": true,
       "url": "http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw=" + "'" + isActive + "'" + "&name_part='" + q + "%25'",
   }
   $.ajax(settings).done(function(response) {
       console.log(response);
       if (response.length > 1) {
           var row = row[0];

        } else {
           var row = row;
        }
       var name = response.search_player_all.queryResults.row.name_display_first_last;
       var team = response.search_player_all.queryResults.row.team_full;
       var position = response.search_player_all.queryResults.row.position;
       console.log("NAME: " + name + " TEAM: " + team + " POSITION: " + position);

   });
};
 
//function getSeason() {};
 
//getBasketballInfo(q);
//getBaseballInfo(q, isActive);
 
 
