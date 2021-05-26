import React, {useState, useEffect} from 'react';
import { Credentials } from './components/Credentials'
import axios from 'axios'
import './app.css'
import spotifyLogo from './image/spotify.png'
import Album from './Album'

function App() {
  const spotify = Credentials(); // pega meu client id e meu client secret// 
  const [token, setToken] = useState('');
  const [inputAlbum, setInputAlbum] = useState('')
  const [albumsList, setAlbumsList] = useState('')


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
  },  [spotify.ClientId, spotify.ClientSecret]) // a cada vez que o client id ou o client secret mudar, será executado novamente //

  useEffect(() => {
    const fetchAlbums = async () => {
      console.log(token)
      const albumsResponse = await axios(`https://api.spotify.com/v1/search?q=${inputAlbum}&type=album&limit=10`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
      })

      setAlbumsList(albumsResponse.data.albums.items)
    }
    fetchAlbums()
  }, [token, inputAlbum])

  return (

      <div>
        <img src={spotifyLogo} className="logoImg" alt = "logo spotify"></img>
        <h1 style ={{textAlign : "center", fontFamily : "sans-serif", color : "#1ED760"}}>Almostify</h1>
        <form>
          <input value={inputAlbum} className="albumInput" onChange={(e) => setInputAlbum(e.target.value)} placeholder="Digite o nome do album ou artista"/> 
        </form>
        {albumsList && albumsList.map(album => ( //percorre e mapeia a lista de albums se albumList maior que zero//
          <Album album={album} token={token} key={album.id}/> // chama o componente album //
        ))}
      </div>
   
  );
}

export default App;
