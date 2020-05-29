//var q = "";
// for testing
var q = "";
//var isActive = "";
//for testing
var isActive = "Y"
 
var sport = "";
 
 
// on click of dropdown (or options?) get selected option
$("#sportDropdown li").on("click", function() {
   sport = $(this).text();
   console.log(sport);
 
   if (sport == "MLB Baseball - Inactive") {
       isActive = "N";
 
   }
   if (sport == "MLB Baseball - Active") {
       isActive = "Y";
   }
 
   // close on click?
   //$('.dropdown-content').foundation('close');
})
 
// on click of search button, get search and based on sport selection, run api
$("#searchBtn").on("click", function() {
	// if sport empty, prompt alert
   console.log(sport);
   var q = document.getElementById("searchBar").value;
   //console.log(q);
   //isActive = document.getElementById("isActive").value;
 
   // check sport selection
   if (sport == "NBA Basketball") {
       console.log("basketball");
       getBasketballInfo(q);
   };
   if (sport == "MLB Baseball") {
       console.log("baseball");
       getBaseballInfo(q, isActive);
   };
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
       
   });
};
 
//function getSeason() {};
 
//getBasketballInfo(q);
//getBaseballInfo(q, isActive);
