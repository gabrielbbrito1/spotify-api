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
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
    },
    data  : 'grant_type = client_credentials',
    method : 'POST'
    })
    .then(tokenResponse => {
      console.log(tokenResponse.data.access_token);
      setToken(tokenResponse.data.access_token);

      axios('GET https://api.spotify.com/v1/browse/categories?locale=pt_BR',{
        method : 'GET',
        headers: {'Authorization' : 'Bearer' + tokenResponse.data.access_token}
      })
      .then(genreResponse =>{
        setGenres(genreResponse.data.categories.items)
      })
    });

  }, []);

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
