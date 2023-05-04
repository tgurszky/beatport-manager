import { NestedPlaylist } from '@/components/playlist/nested-playlist'
import { Grid, Button, Input, List, ListItem } from '@mui/joy'
import { useState } from 'react'

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
  const [tracks, setTracks] = useState<Track[]>([])


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
    <Grid container spacing={2}>
      <Grid xs={8} container spacing={2}>
        <Grid xs={9}>
          <Input sx={{ width: '100%' }} value={trackSearch} onChange={(e) => setTrackSearch(e.target.value)} />
        </Grid>
        <Grid xs={3}>
          <Button sx={{ width: '100%' }} onClick={handleSearch}>Search</Button>
        </Grid>
        <Grid xs={12}>
          <List sx={{ width: '100%' }}>
            {tracks.map((track) => (
              <ListItem key={track.id}>{`${track.artists[0]?.name ?? 'Unknown Artist'} - ${track.name}`}</ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Grid xs={4}>
        <NestedPlaylist />
      </Grid>
    </Grid>
  )
}
