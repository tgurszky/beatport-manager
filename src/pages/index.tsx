import { Box, Button, Input, List, ListItem } from '@mui/joy'
import { useState } from 'react'
import useSWR from 'swr'

type Artist = {
  name: string
}

type Track = {
  artists: Artist[]
  name: string
  id: number
}

type Playlist = {
  id: string
  name: string
}

export default function Home() {
  const [trackSearch, setTrackSearch] = useState('')
  const [playlistFilter, setPlaylistFilter] = useState('')
  const [tracks, setTracks] = useState<Track[]>([])
  const { data: playlists } = useSWR<Playlist[]>('api/beatport/getplaylists', async () => {
    const res = await fetch('api/beatport/getplaylists')
    return res.json()
  })

  const handleSearch = async () => {
    const query = new URLSearchParams()
    query.append('search', trackSearch)
    const res = await fetch(`api/beatport/search?${query}`)
    if (res.ok) {
      const result = await res.json()
      setTracks(result)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '50px 200px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Input value={trackSearch} onChange={(e) => setTrackSearch(e.target.value)} />
          <Button onClick={handleSearch}>Search</Button>
        </Box>
        <Box>
          <List>
            {tracks.map((track) => (
              <ListItem key={track.id}>{`${track.artists[0].name} - ${track.name}`}</ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box>
        <List>
          {playlists?.map((playlist) => (
            <ListItem key={playlist.id}>{`${playlist.name}`}</ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
