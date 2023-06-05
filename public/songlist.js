
    //default list for testing
    let songList = [
        {name:"I am a Microwave -The Inertia King", url:"https://www.youtube.com/watch?v=5bCXzPyKqSc"},
        {name:"American Moon - Sailship", url:"https://sailship.bandcamp.com/track/american-moon"}
    ];

    async function loadSongs () {
        try {
    const response = await fetch('/api/songList');
    scores = await response.json();

    // Save the scores in case we go offline in the future
    localStorage.setItem('songList', JSON.stringify(songList));
        } catch {
            const songsText = localStorage.getItem('songList');

            if (songsText) {
                songs = JSON.parse(songsText);
            }
        }

        displaySongs(songsText);
    }

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

//placeholder code until I can use DB 
//I want to display it on main after user authentication for the site owner
let songs = document.getElementById("songList");

songs.innerHTML = "";

 songList.forEach(function displaySongs(song) {
    let li = document.createElement("li");
    let a = document.createElement("a");

   a.href = song.url;
    a.textContent = song.name;

    li.appendChild(a);

    songs.appendChild(li);

 });
