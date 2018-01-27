const client_id = '9658abcad1614f719040331d2ea1bc86';
const redirect_uri = 'http://localhost:3000/';
let accessToken;
let Spotify = {
  getAccessToken() {
      if (accessToken) {
        return accessToken;
      }
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
        return accessToken;
      } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
        window.location = accessUrl;
      }
    },

    search(term) {
      const accessToken = Spotify.getAccessToken();
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
}).then(response => {
  return response.json();
}).then(jsonResponse => {
  if (!jsonResponse.tracks) {
    return [];
  }
   return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
});
  },
  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    }
    const userId
    return fetch('https://api.spotify.com/v1/me', {headers: headers}
  ).then(response => {
    return response.json();
  }).then(jsonResponse => {
    userId = jsonResponse.id;
  return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      })
    }).then(response => response.json()
    let playlistID = response;
    );
}

}

/*
  getAccessToken() {
    if (token) {
      return token;
    } else if
      (window.location.href.match(/access_token=([^&]*).+expires_in=([^&]*)/))
    {

    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');}
  }

  if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
        return accessToken;
      } else {
        const accessUrl = https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri};
        window.location = accessUrl;
      }


 };
*/
export default Spotify;
