import React, { useState } from 'react'
import axios from 'axios'
import './app.css'

import Track from './Track'

function Album({album, token}) {
  const [albumTracks, setAlbumTracks] = useState([])
  const [isTracksVisible, setIsTracksVisible] = useState(false)

  const fetchTracks = async (id) => {
    const tracksResponse = await axios(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })

    const tracks = tracksResponse.data.items.map(track => ({name: track.name, duration: track.duration_ms, explicit: track.explicit, id: track.id})) // mapeia as tracks pegando nome, duração em ms e se é explicito //
    setAlbumTracks(tracks)
  }

  const handleShowTracks = (id) => {
    if (!isTracksVisible) fetchTracks(id) // se tracks nao for visivel, realiza fetchtracks //
    setIsTracksVisible(!isTracksVisible) // faz a inversão se istrackvisible for true vira false e se for false vira true //
  }

  return (
    <div className={album}>
      <div className = "caixaItem"> 
        <img src = {album.images[1].url}></img>
        <div className = "makeColumn">
          <div className = "infoText"><b>Artista:</b> {album.artists[0].name} </div>
          <div className = "infoText"><b> Nome do album:</b> {album.name}</div>
          <div className = "infoText"><b>Data de lançamento:</b> {album.release_date}</div>
          <div className = "infoText"><b>Número de músicas:</b> {album.total_tracks}</div>
          <div className = "infoText"><b>Link do album no spotify:</b><a href={album.external_urls.spotify}> {album.external_urls.spotify}</a></div> 
          <button className="tracksButton" onClick={(e) => handleShowTracks(album.id)}>Ver músicas</button>
         
        </div>
      </div> 
      {albumTracks && isTracksVisible && <div className='trackList'>{albumTracks.map(track => <Track track={track} token={token}/>)}</div>}
    </div>
  )
}

export default Album