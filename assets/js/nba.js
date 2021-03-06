// for testing
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

var allNbaNames = [];

$('#the-basics .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
}, {
    name: 'SportNames',
    displayKey: 'value',
    source: substringMatcher(allNbaNames)
});

function addAllNba() {
    var pagescount = 1;
    var totalPagesLength = 32;

    while (pagescount < totalPagesLength) {
        pagescount++;
        var settings = {
            "async": true,
            //"cache": false,
            "crossDomain": true,
            "url": "https://free-nba.p.rapidapi.com/players?page=" + pagescount + "&per_page=3268",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "free-nba.p.rapidapi.com",
                "x-rapidapi-key": "75707fa799msha4a06e78acf5fdcp1f1ec2jsn683a106045e2"
            },
        }

        $.ajax(settings).then(function (response) {
            //console.log(response);

            for (let i = 0; i < 100; i++) {
                var currentFirstName = response.data[i].first_name;
                var currentLastName = response.data[i].last_name;
                var fullName = currentFirstName + " " + currentLastName;

                allNbaNames.push(fullName);
            }
        });

    };

    // end of function
};

//typeaheadNbaSearch();
addAllNba();

$("#searchBtn").on("click", function () {
    var q = document.getElementById("searchBar").value;
    getBasketballInfo(q);
});

function getBasketballInfo(query) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://free-nba.p.rapidapi.com/players?page=0&per_page=25&search=" + query,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "free-nba.p.rapidapi.com",
            "x-rapidapi-key": "75707fa799msha4a06e78acf5fdcp1f1ec2jsn683a106045e2"
        }
    }

    $.ajax(settings).then(function (response) {
        console.log(response);
        var firstName = response.data[0].first_name;
        var lastName = response.data[0].last_name;
        var name = firstName + " " + lastName;
        var team = response.data[0].team.full_name;
        var teamIndex = teamPics.map(function (e) {
            return e.team;
        }).indexOf(team);
        var imgUrl = teamPics[teamIndex].imgUrl;
        console.log(imgUrl);
        var teamImg = document.getElementById("imgUrl");
        teamImg.setAttribute("src", imgUrl);

        //console.log(teamIndex);
        var position = response.data[0].position;
        console.log("NAME: " + name + " TEAM: " + team + " POSITION: " + position);
        $("#player").text("Player Name: " + name);
        $("#team").text("Player Team: " + team);
        $("#position").text("Position: " + position);

    });
};