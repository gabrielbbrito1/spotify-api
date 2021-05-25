import React, {useState, useEffect} from 'react';
import { Credentials } from './components/Credentials'
import axios from 'axios'
import './app.css'

function App() {
  const spotify = Credentials();
  const [token, setToken] = useState('');
  const [inputAlbum, setInputAlbum] = useState('')
  const [albumsList, setAlbumsList] = useState('')

  const data =[
    {value: 1, name: 'a'},
    {value: 2, name: 'b'},
    {value: 3, name: 'c'},
  ]

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
  },  [])

  useEffect(() => {
    const fetchAlbums = async () => {
      console.log(token)
      const albumsResponse = await axios(`https://api.spotify.com/v1/search?q=${inputAlbum}&type=album`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
      })

      setAlbumsList(albumsResponse.data.albums.items)
      console.log(albumsList)
    }

    fetchAlbums()
  }, [token, inputAlbum])

  return (
    <form onSubmit = {() => {}}>
      <div>
      <input value={inputAlbum} onChange={(e) => setInputAlbum(e.target.value)}/>
      {albumsList && albumsList.map(album => (<div className={album}>
        <strong>{album.name}</strong>
        <div>Data de lançamento: {album.release_date}</div>
        <div>Número de músicas: {album.total_tracks}</div>
      </div>))}
      </div>
    </form>
   
  );
}

export default App;
