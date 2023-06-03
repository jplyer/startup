
    let songList = [];

document.getElementById("submitSong").addEventListener("click", function addSong() {
    let songName = document.getElementById("songNameEntry").value;
    let songURL = document.getElementById("songURLEntry").value;

    let song = {
        name: songName,
        url: songURL
    };

    songList.push(song);
    alert("Song submitted");
});

//placeholder code until I use node.js
// let songs = document.getElementById("songList");

// songs.innerHTML = "";

// songList.forEach(function(song) {
//     let li = document.createElement("li");
//     let a = document.createElement("a");

//     a.href = song.url;
//     a.textContent = song.name;

//     li.appendChild(a);

//     songs.appendChild(li);

// });
