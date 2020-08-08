var query = "";

var isActive = "Y"

var sport = "";

var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                // the typeahead jQuery plugin expects suggestions to a
                // JavaScript object, refer to typeahead docs for more info
                matches.push({
                    value: str
                });
            }
        });

        cb(matches);
    };
};

$("#searchBtn").on("click", function () {
    var q = document.getElementById("searchBar").value;
    getBaseballInfo(q, isActive);
});

function getBaseballInfo(query, isActive) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw=" + "'" + isActive + "'" + "&name_part='" + query + "%25'",
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        if (response.length > 1) {
            var row = row[0];

        } else {
            var row = row;
        }
        var name = response.search_player_all.queryResults.row.name_display_first_last;
        var team = response.search_player_all.queryResults.row.team_full;
        var position = response.search_player_all.queryResults.row.position;
        var teamIndex = teamPics.map(function (e) {
            return e.team;
        }).indexOf(team);
        var imgUrl = teamPics[teamIndex].imgUrl;
        var teamImg = document.getElementById("imgUrl");
        teamImg.setAttribute("src", imgUrl);
        console.log("NAME: " + name + " TEAM: " + team + " POSITION: " + position);
        $("#player").text("Player Name: " + name);
        $("#team").text("Player Team: " + team);
        $("#position").text("Position: " + position);

    });
};