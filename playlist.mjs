var playListFromSpoty;
let codeVerifier = localStorage.getItem('code_verifier');

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

let body = new URLSearchParams({
  grant_type: 'authorization_code',
  code: code,
  redirect_uri: 'http://127.0.0.1:5500/Data/spotyV2/playlist.html',
  client_id: "d4c5a153520c4108a09b085d478cb21e",
  code_verifier: codeVerifier
});

async function updateToken() {
const response = fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: body
})
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log("token: ", data);
    localStorage.setItem('access_token', data.access_token);
    getProfile()
  })
  .catch(error => {
    console.error('Error:', error);
  });

  console.log(response);
}

  async function getProfile() {
    let accessToken = localStorage.getItem('access_token');
  
    const response = await fetch('https://api.spotify.com/v1/playlists/5nRcIY7BnEqgzrTH3GehH2', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    const data = await response.json();
    playListFromSpoty = data
    showTable()
    showCards()
  }
  updateToken()
  
  
function showTable() {
  document.getElementById('playListTitle').textContent = playListFromSpoty.name
  
  playListFromSpoty.tracks.items.forEach(cancion => {
    const tr = document.createElement('tr')
    const tdCancion = document.createElement('td')
    const tdArtis = document.createElement('td')
    const tdAlbum = document.createElement('td')

    tdCancion.textContent = cancion.track.name
    cancion.track.artists.forEach(artista => {
      tdArtis.textContent = artista.name
    })

    console.log(cancion.track.album.name);
    tdAlbum.textContent = cancion.track.album.name

    tr.appendChild(tdCancion)
    tr.appendChild(tdArtis)
    tr.appendChild(tdAlbum)

    document.getElementById('playlist-content').appendChild(tr)

  });

}

function showCards() {
  playListFromSpoty.tracks.items.forEach(cancion => {
    let div = document.createElement('div').setAttribute('class', 'card')
  let h5 = document.createElement('h5').setAttribute('class', 'card-title').textContent = cancion.track.name

  div.appendChild(h5)
  
  document.getElementById('cardContent').appendChild(div)
  })
}