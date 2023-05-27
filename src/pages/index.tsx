import { NestedPlaylist } from '@/components/playlist/nested-playlist'
import { Grid, Stack, FormControl, Input, Button, List, ListItem } from '@mui/joy'
import { FormEvent, useEffect, useRef, useState } from 'react'

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
    const [isLoading, setLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const keydownHandler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault()
                inputRef.current?.focus()
            }
        }
        window.addEventListener('keydown', keydownHandler)
        return () => {
            window.removeEventListener('keydown', keydownHandler)
        }
    }, [])

    const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        const query = new URLSearchParams()
        query.append('search', trackSearch)
        try {
            const res = await fetch(`api/beatport/search?${query}`)
            if (res.ok) {
                const result = await res.json()
                setTracks(result)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid xs={8}>
                <Stack spacing={2}>
                    <form onSubmit={handleSearch}>
                        <FormControl>
                            <Input
                                slotProps={{ input: { ref: inputRef } }}
                                placeholder="Search for name and artist"
                                type="text"
                                required
                                value={trackSearch}
                                onChange={(e) => setTrackSearch(e.target.value)}
                                endDecorator={
                                    <Button
                                        variant="solid"
                                        color="primary"
                                        loading={isLoading}
                                        type="submit"
                                    >Search</Button>
                                }
                            />
                        </FormControl>
                    </form>
                    <List>
                        {tracks.map((track) => (
                            <ListItem key={track.id}>{`${track.artists[0]?.name ?? 'Unknown Artist'} - ${track.name}`}</ListItem>
                        ))}
                    </List>
                </Stack>
            </Grid>
            <Grid xs={4}>
                <NestedPlaylist />
            </Grid>
        </Grid>
    )
}
