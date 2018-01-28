import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.onNameChange = this.onNameChange.bind(this)
  }
  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }


  render() {
    return (
      <div className="Playlist">
  <input defaultValue={'New Playlist'}/>
  <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}
  onChange={this.handleNameChange}/>
  <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
</div>
    );
  }
}
export default Playlist;
