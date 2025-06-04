
// JavaScript for Opening and Closing the Modal
const modal = document.getElementById("playListModal");
const span = document.getElementsByClassName("close")[0];

function openModal(festival) {
   
   modal.style.display = "block";
}

span.onclick = function() {
   modal.style.display = "none";
}
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}

//Code for Playlist rendering

const createPlaylist = (playlist) => {
    console.log(playlist);
    const playlistElement = document.createElement('div');
    playlistElement.className = 'playList';
    playlistElement.onclick = "openModal()"
    playlistElement.innerHTML= `
    <img width="100px" src="playlist.png">
    <h4>${playlists[playlist].playlist_name}</h3>
    <h6>${playlists[playlist].playlist_author}</h6>
    <div class="likes">
        <h6>&#x2665</h6>
        <h6>${playlists[playlist].likes}</h6>
    </div>`
    ;
    return playlistElement;
}

const loadPlaylists = () =>{
    const container = document.querySelector('#playListGrid');
    for(const playlist in playlists){
        const el = createPlaylist(playlist);
        container.appendChild(el);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadPlaylists();
});