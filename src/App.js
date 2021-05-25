import React, {useState, useEffect} from 'react';
import Dropdown from './components/Dropdown'
import { Credentials } from './components/Credentials'
import axios from 'axios'

function App() {
  const spotify = Credentials();
  const [token, setToken] = useState('');
  const [genres, setGenres] = useState('')

  const data =[
    {value: 1, name: 'a'},
    {value: 2, name: 'b'},
    {value: 3, name: 'c'},
  ]

  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);

      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (genreResponse => {        
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items
        })
      });
      
    });

  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]); 


  return (
    <form onSubmit = {() => {}}>
      <div className="container">
      <Dropdown options={data} />
      <Dropdown options={data} />
      <button type = 'submit'>
      Search
      </button>
      </div>
    </form>
   
  );
}

export default App;
