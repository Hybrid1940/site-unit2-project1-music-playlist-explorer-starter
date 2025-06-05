
// JavaScript for Opening and Closing the Modal
const modal = document.getElementById("playListModal");
const span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
    console.log(playlist);
   document.getElementById('playListName').innerText = playlist.playlist_name;
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

   modal.style.display = "flex";
}

span.onclick = function() {
   modal.style.display = "none";
   document.getElementById('songs').innerHTML = "";

}
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}

//Code for Playlist rendering

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
        <img style="max-width:75px; width:50%" src="${playlists[playlist].playlistArt}">
        <h4>${playlists[playlist].playlist_name}</h3>
        <p> Created by ${playlists[playlist].playlist_author}</p>
    <div>
        <p class = "likes" style = "color: ${playlists[playlist].likesColor}">&#x2665  <span class = "likeCount">${playlists[playlist].likes}</span></p>
    </div>`
    ;
    return playlistElement;
}

const loadPlaylists = () =>{
    const container = document.querySelector('#playListGrid');
    for(const playlist in playlists){
        const el = createPlaylist(playlist);

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
        container.appendChild(el);
        //stop propogation to stop modal from appearing
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadPlaylists();
});