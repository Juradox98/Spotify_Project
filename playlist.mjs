// elimino esto
// let codeVerifier = localStorage.getItem('code_verifier');

// agregue estas dos 
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');
//////

let body = new URLSearchParams({
  grant_type: 'authorization_code',
  code: code,
  redirect_uri: 'http://127.0.0.1:5500/Data/spotyV2/playlist.html',
  client_id: "d4c5a153520c4108a09b085d478cb21e",
  code_verifier: codeVerifier
});

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
    localStorage.setItem('access_token', data.access_token);
  })
  .catch(error => {
    console.error('Error:', error);
  });


  async function getProfile(accessToken) {
    let accessToken = localStorage.getItem('access_token');
  
    const response = await fetch('https://api.spotify.com/v1/playlists/5nRcIY7BnEqgzrTH3GehH2', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
    console.log(data);
  }
  