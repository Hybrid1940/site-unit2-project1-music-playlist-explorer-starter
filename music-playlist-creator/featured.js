document.addEventListener("DOMContentLoaded", () => {
    let select = Math.floor(Math.random() * (playlists.length))
    console.log(select)
    document.getElementById("cover").src = playlists[select].playlistArt;
    document.getElementById("playlistName").innerText = playlists[select].playlist_name;
    for(const song in playlists[select].songs){
        console.log(playlists[select].songs[1]);
        const newSong = document.createElement('div');
        newSong.className = "modalSong"
        newSong.innerHTML = `<div class="modalSongImgContainer">
                            <img width="75x" src="${playlists[select].songs[song][0]}" class="songImage">
                        </div>
                        <div class="songDetails">
                            <h3>${playlists[select].songs[song][1]}</h3>
                            <p>${playlists[select].songs[song][2]}</p>
                            <p>${playlists[select].songs[song][3]}</p>
                            <p>${playlists[select].songs[song][4]}</p>
                        </div>`
        document.getElementById('songs').appendChild(newSong);
    }
});