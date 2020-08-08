$(document).ready(function () {
    var API_KEY = "AIzaSyDjvb8UmKvqrksfJw0F0Kff3sdEz28jSIM"
    var video = ""
    $("#form").submit(function (event) {
        event.preventDefault()
        var search = $("#searchBar").val()
        videoSearch(API_KEY, search, 2)

    });

    function videoSearch(key, search, maxResults) {
        $("#videos").empty();

        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function (data) {
            console.log(data);

            data.items.forEach(item => {
                video = `
                <iframe width="300" height="275" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder= "0" allowfullscreen></iframe>
                `

                $("#videos").append(video);
            })
        });
    };
});