import { Box, Button, Input, List, ListItem } from "@mui/joy";
import { useState } from "react";

type Artist = {
  name: string
}

type Track = {
  artists: Artist[]
  name: string
  id: number
}

export default function Home() {
  const [trackSearch, setTrackSearch] = useState('')
  const [playlistFilter, setPlaylistFilter] = useState('')
  const [tracks, setTracks] = useState<Track[]>([])

  const handleSearch = async () => {
    const query = new URLSearchParams()
    query.append('search', trackSearch)
    const res = await fetch(`api/bp?${query}`)
    if (res.ok) {
      const result = await res.json()
      setTracks(result)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Input value={trackSearch} onChange={(e) => setTrackSearch(e.target.value)} />
        <Button onClick={handleSearch}>Search</Button>
      </Box>
      <Box>
        <List>
          {tracks.map(track => <ListItem key={track.id}>{`${track.artists[0].name} - ${track.name}`}</ListItem>)}
        </List>
      </Box>
    </Box>

  )
}
