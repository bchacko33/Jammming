import React from 'react';
import './App.css';
import Spotify from '../../util/Spotify';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [{name: 'random name',
      artist: 'random artist',
      album: 'random album'}],
      playlistName: '',
      playlistTracks: [{name: 'random name',
      artist: 'random artist',
      album: 'random album'}]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    Spotify.getAccessToken();
}



addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!tracks.find(newtrack => newtrack.id ===track.id)){
    tracks.push(track);
    this.setState({playlistTracks: tracks});
    }
 }

 removeTrack(track) {
     let tracks = this.state.playlistTracks;
     const result = tracks.filter(newtrack => newtrack.id !==track.id);
     this.setState({
    playlistTracks: result});
}

updatePlaylistName(name) {
  this.setState({
 playlistName: name});
}

savePlaylist() {
   let trackURIs = this.state.playlistTracks.map(track => track.uri);
   Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
     this.setState({
    playlistName: 'New Playlist',
     playlistTracks: []
   });
 })
}

search(term) {
  console.log(term);
  Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
}

render () {
  return (
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search} />
    <div className="App-playlist">
      <h2> this.state.searchResults </h2> -->
      <SearchResults searchResults={this.state.searchResults} onAdd = {this.addTrack} />
      <Playlist playlistName={this.state.playlistName} playlistTracks={
        this.state.playlistTracks} onRemove={this.removeTrack}
        onNameChange={this.updatePlaylistName}
        onSave={this.savePlaylist}/>

    </div>
  </div>
</div>
);
}

}
export default App;
