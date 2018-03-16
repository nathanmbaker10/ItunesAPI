function callApi() {
    var term = $("#Artistselectbox").val();
    var limit = $("#limitBox").val();
    $.ajax({
        url: "https://itunes.apple.com/search?term=" + term + "&limit=" + limit,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            handleData(result);
        },
        error: function() { alert('Failed!'); }
    });
}
function handleData(result) {
    console.log(result);
    document.getElementById("dataTable").innerHTML = "";
    var firstRow = document.createElement("tr");
    var nameCell = document.createElement("th"); var previewCell = document.createElement("th"); var albumCell = document.createElement("th");
    nameCell.innerHTML = "Song";
    previewCell.innerHTML = "Preview";
    albumCell.innerHTML = "Album";
    firstRow.appendChild(nameCell); firstRow.appendChild(previewCell); firstRow.appendChild(albumCell);
    $("#dataTable").append(firstRow);
    for(var i = 0; i < result.resultCount; i++){
        var newSong = new SONG(result.results[i]);
        createRow(newSong);
        // document.getElementById("dataTable").appendChild(row);
    }
}
function SONG(songJSON) {
    this.title = songJSON.trackName;
    // this.artist = songJSON.artist;
    this.albumName = songJSON.collectionName;
    this.previewURL = songJSON.previewUrl;
    this.imageURL = songJSON.artworkUrl100;
    console.log(this.imageURL);
}
function createRow(song) {
    var row = document.createElement("tr");

    var albumImage = document.createElement("img");
    albumImage.src = song.imageURL;
    var albumCell = document.createElement("th");
    albumCell.append(song.albumName);
    albumCell.innerHTML += "<br>";
    albumCell.appendChild(albumImage);

    var songElement = document.createElement("audio");
    songElement.controls = true;
    songElement.type = "audio/m4a";
    songElement.src = song.previewURL;
    var songCell = document.createElement("th");
    songCell.appendChild(songElement);

    var nameCell = document.createElement("th");
    nameCell.innerHTML = song.title;

    row.appendChild(nameCell);
    row.appendChild(songCell);
    row.appendChild(albumCell);

    $("#dataTable").append(row);


}