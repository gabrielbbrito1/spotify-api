import React, {useState, useEffect} from 'react';
import { Credentials } from './components/Credentials'
import axios from 'axios'
import './app.css'
import spotifyLogo from './image/spotify.png'

function App() {
  const spotify = Credentials();
  const [token, setToken] = useState('');
  const [inputAlbum, setInputAlbum] = useState('')
  const [albumsList, setAlbumsList] = useState('')
  const [tracksList, setTracksList] = useState('')


  useEffect(() => {
    const fetchToken = async () => {
      const tokenResponse = await axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })
      setToken(tokenResponse.data.access_token);
    }

    fetchToken()
  },  [spotify.ClientId, spotify.ClientSecret])

  useEffect(() => {
    const fetchAlbums = async () => {
      console.log(token)
      const albumsResponse = await axios(`https://api.spotify.com/v1/search?q=${inputAlbum}&type=album,track&limit=10`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
      })

      setAlbumsList(albumsResponse.data.albums.items)
      setTracksList(albumsResponse.data.tracks.items)
      console.log(albumsList)
      console.log(albumsResponse.data)
    }
    fetchAlbums()
  }, [token, inputAlbum])

  return (
    <form onSubmit = {() => {}}>
      <div>
        <img src={spotifyLogo} className="logoImg" alt = "logo spotify"></img>
        <h1 style ={{textAlign : "center", fontFamily : "sans-serif", color : "#1ED760"}}>Almostify</h1>
        <input value={inputAlbum} className="albumInput" onChange={(e) => setInputAlbum(e.target.value)} placeholder="Digite o nome do album ou artista"/>
        {albumsList && albumsList.map(album => (
        <div className={album}>
          <div className = "caixaItem"> 
            <img src = {album.images[1].url}></img>
            <div className = "makeColumn">
              <div className = "infoText"><b>Artista:</b> {album.artists[0].name} </div>
              <div className = "infoText"><b> Nome do album:</b> {album.name}</div>
              <div className = "infoText"><b>Data de lançamento:</b> {album.release_date}</div>
              <div className = "infoText"><b>Número de músicas:</b> {album.total_tracks}</div>
              <div className = "infoText"><b>Link do album no spotify:</b><a href={album.external_urls.spotify}> {album.external_urls.spotify}</a></div> 
            </div>
          </div> 
        </div>))}
      </div>
    </form>
   
  );
}

export default App;
