
// JavaScript for Opening and Closing the Modal
const modal = document.getElementById("playListModal");
const span = document.getElementsByClassName("close")[0];

//method to open modal
function openModal(playlist) {
   document.getElementById('playListName').innerText = playlist.playlist_name;
   document.getElementById('playListAuthor').innerText = "Made by " + playlist.playlist_author;
   document.getElementById('playListImage').src = playlist.playlistArt;
   for(const song in playlist.songs){
        const newSong = document.createElement('div');
        newSong.className = "modalSong"
        newSong.innerHTML = `<div class="modalSongImgContainer">
                            <img width="75x" height="75x" src="${playlist.songs[song][0]}" class="songImage">
                        </div>
                        <div class="songDetails">
                            <h3>${playlist.songs[song][1]}</h3>
                            <p>${playlist.songs[song][2]}</p>
                            <p>${playlist.songs[song][3]}</p>
                            <p>${playlist.songs[song][4]}</p>
                        </div>`
        document.getElementById('songs').appendChild(newSong);
    }
   document.getElementById("shuffle").addEventListener("click", () => {
        shuffle(playlist.songs);
        console.log(playlist.songs[1])
        document.getElementById('songs').innerHTML="";
        for(const song in playlist.songs){
            const newSong = document.createElement('div');
            newSong.className = "modalSong"
            newSong.innerHTML = `<div class="modalSongImgContainer">
                                <img width="75x" height="75x" src="${playlist.songs[song][0]}" class="songImage">
                            </div>
                            <div class="songDetails">
                                <h3>${playlist.songs[song][1]}</h3>
                                <p>${playlist.songs[song][2]}</p>
                                <p>${playlist.songs[song][3]}</p>
                                <p>${playlist.songs[song][4]}</p>
                            </div>`
            document.getElementById('songs').appendChild(newSong);
        }
    });
   modal.style.display = "flex";
}

//close modal
span.onclick = function() {
   modal.style.display = "none";
   document.getElementById('songs').innerHTML = "";

}
//close modal outside of zone
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}

const stopProp = (event) => {
    event.stopPropagation();
}

const editPlaylistName = (event) => {
    console.log("hello");
    event.stopPropagation();
}
const editPlaylistAuthor = (event) => {
    console.log("hello");
    event.stopPropagation();
}

//Code to create playlist
const createPlaylist = (playlist) => {
    const playlistElement = document.createElement('div');
    playlistElement.className = 'playList';
    playlistElement.style.width = "25%";
    playlistElement.style.display = "flex";
    playlistElement.style.flexDirection = "column";
    playlistElement.style.borderRadius = "5px";
    playlistElement.style.alignItems = "center"
    playlistElement.style.marginTop = "25px"
    playlistElement.style.paddingTop = "10px"
    playlistElement.style.border = "solid #bf5700 3px"

    playlistElement.innerHTML= `
        <button class = "exit">X</button>
        <img style="max-width:75px; width:50%" src="${playlist.playlistArt}">
        <h4 class="playListName">${playlist.playlist_name}</h3>
        <form id="editNameForm">
            <label for="editName">Edit Name:</label>
            <textarea id="editName" name="editName" onClick=stopProp(event) required></textarea>
            <button type="submit" onClick=editPlaylistName(event)>Change Name</button>
        </form>
        <p class="playListAuthor"> Created by ${playlist.playlist_author}</p>
        <form id="editAuthorForm">
            <label for="editAuthor">Edit Name:</label>
            <textarea id="editAuthor" name="editAuthor" onClick=stopProp(event) required></textarea>
            <button type="submit" onClick="editPlaylistAuthor(event)">Change Author</button>
        </form>
    <div>
        <p class = "likes" style = "color: ${playlist.likesColor}">&#x2665  <span class = "likeCount">${playlist.likes}</span></p>
    </div>`
    ;

    let deleteButton = playlistElement.querySelector(".exit")
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            playlistElement.style.display = "none";
        });
    return playlistElement;
}

const loadPlaylists = () =>{
    const container = document.querySelector('#playListGrid');
    for(const playlist in playlists){
        const el = createPlaylist(playlists[playlist]);

        el.addEventListener("click", () => {
            openModal(playlists[playlist]);
        });

        let likeButton = el.querySelector(".likes");
        likeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            if(playlists[playlist].likesColor === "black"){
                playlists[playlist].likes +=1;
                playlists[playlist].likesColor = "red";
                likeButton.style.color = playlists[playlist].likesColor;
                likeButton.querySelector(".likeCount").innerHTML = playlists[playlist].likes;
            }else if(playlists[playlist].likesColor === "red") {
                playlists[playlist].likes -=1;
                playlists[playlist].likesColor = "black";
                likeButton.style.color = playlists[playlist].likesColor;
                likeButton.querySelector(".likeCount").innerHTML = playlists[playlist].likes;
            }
        });

        let deleteButton = el.querySelector(".exit")
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            el.style.display = "none";
        });

        container.appendChild(el);
        //stop propogation to stop modal from appearing
    }
}

function shuffle(songs){
    for(let i = 0; i <songs.length; i++){
        let j = Math.floor(Math.random() * (i + 1));
        var temp = songs[i];
        songs[i] = songs[j];
        songs[j] = temp;
    }
}

const handleSongSubmit = (event) =>{
    event.preventDefault();
    const songName = document.querySelector('#songName');
    const artist = document.querySelector('#songAuthor');
    const songImage = document.querySelector('#songImage');
    const songLength = document.querySelector('#songLength');
    const songVibe = document.querySelector('#songVibe');

    const newSong = document.createElement('div');
    newSong.className = "modalSong"
    newSong.innerHTML = `<div class="modalSongImgContainer">
                        <img width="75x" height="75x" src="${songImage.value}" class="songImage">
                    </div>
                    <div class="songDetails">
                        <h3>${songName.value}</h3>
                        <p>${artist.value}</p>
                        <p>${songLength.value}</p>
                        <p>${songVibe.value}</p>
                    </div>`
    document.getElementById('songs').appendChild(newSong);
}

const handleReviewSubmit = (event) =>{
    event.preventDefault();

    const playListName = document.querySelector('#newPlaylistTitle');
    const playListAuthor = document.querySelector('#newPlaylistAuthor');
    const playListImage = document.querySelector('#newPlaylistImage');
    let playList = {
        playlistID: 3,
        playlist_name: playListName.value,
        playlist_author: playListAuthor.value,
        playlistArt: playListImage.value,
        songs: "",
        likes: 0,
        likesColor: "black"
    };
    const newPlaylist = createPlaylist(playList);
    newPlaylist.addEventListener("click", () => {
        openModal(playList);
    });

    let likeButton = newPlaylist.querySelector(".likes");
    likeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        if(playList.likesColor === "black"){
            playList.likes +=1;
            playList.likesColor = "red";
            likeButton.style.color = playList.likesColor;
            likeButton.querySelector(".likeCount").innerHTML = playList.likes;
        }else if(playList.likesColor === "red") {
            playList.likes -=1;
            playList.likesColor = "black";
            likeButton.style.color = playList.likesColor;
            likeButton.querySelector(".likeCount").innerHTML = playList.likes;
        }
    });
    const reviewList = document.querySelector('#playListGrid');
    reviewList.appendChild(newPlaylist);
}

document.addEventListener("DOMContentLoaded", () => {
    loadPlaylists();
});



//Clear Button Functionality
let searchBar =  document.getElementById("search");
let clear =  document.getElementById("clear");
let searchButton =  document.getElementById("searchButton");
let grid =  document.getElementById("playListGrid");

clear.addEventListener("click", function(){
    searchBar.value = "";
})

searchButton.addEventListener("click", function(){
    event.preventDefault();
    const tiles = Array.from(document.getElementsByClassName('playList'));

    const newTiles = [];
    for(tile in tiles){
            if(tiles[tile].innerHTML.includes(searchBar.value)){

            }
    }

    searchBar.value = "";
    grid.innerHTML = "";
})