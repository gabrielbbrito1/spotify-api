import React, { useState } from 'react'
import axios from 'axios'
import './app.css'

const Track = ({track, token}) => { 
  const [trackInfo, setTrackInfo] = useState()
  const [isTrackInfoShowing, setIsTrackInfoShowing] = useState(false)
/** Função que transforma milissegundos em minutos e segundos */
  const toMinutes = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const fetchTrack = async (id) => { // pega informações especificas da track //
    const trackResponse = await axios(`https://api.spotify.com/v1/tracks/${id}`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })

    console.log(trackResponse)
    const data = trackResponse.data
    const track = {
      name: data.name,
      duration: toMinutes(data.duration_ms),
      popularity: data.popularity,
      uri: data.uri
    }
    setTrackInfo(track)
  }

  const handleExpandTrack = (id) => {
    if (!isTrackInfoShowing) fetchTrack(id) // se track nao for visivel, realiza fetchtracks //
    setIsTrackInfoShowing(!isTrackInfoShowing) // faz a inversão se istrackvisible for true vira false e se for false vira true //
  }

  return (
    <>
    <div className='track' key={track.name} onClick={() => handleExpandTrack(track.id)}>{track.name} {toMinutes(track.duration)} {track.explicit && <div> 'Explícito' </div>} <button className='expandButton'>Expandir</button></div>
    {trackInfo && isTrackInfoShowing && <div className='trackInfo' key={trackInfo.name}>
        <div className='trackBox'>
            <div className='trackField'>Nome: {trackInfo.name}</div>
            <div className='trackField'>Duração: {trackInfo.duration}</div>
            <div className='trackField'>Popularidade: {trackInfo.popularity}</div>
            <div className='trackField'><button><a href={trackInfo.uri} className='buttonTrack'>Link no spotify</a></button></div>
        </div>
    </div>}
    </>
  )
}

export default Track