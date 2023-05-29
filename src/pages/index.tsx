import { NestedPlaylist } from '@/components/playlist/nested-playlist'
import { Grid, Stack, FormControl, Input, Button, Sheet } from '@mui/joy'
import { FormEvent, useEffect, useRef, useState } from 'react'
import Tracklist from '../components/tracklist/tracklist'
import { Playlist } from '../domain/playlist'
import { Track } from '../domain/tracks'

export default function Home() {
    const [trackSearch, setTrackSearch] = useState('')
    const [tracks, setTracks] = useState<Track[]>([])
    const [selectedTrackIds, setSelectedTrackIds] = useState<number[]>([])
    const [isLoading, setLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const [sampleTrack, setSampleTrack] = useState<Track | null>(null)
    const [isSamplePlaying, setSamplePlaying] = useState(false)
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
    const audioRef = useRef<HTMLAudioElement>(null)

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

    useEffect(() => {
        const canplayHandler = () => {
            audioRef.current?.play()
            setSamplePlaying(true)
        }
        const pauseHandler = () => {
            setSamplePlaying(false)
        }
        const playHandler = () => {
            setSamplePlaying(true)
        }
        audioRef.current?.addEventListener('canplay', canplayHandler)
        audioRef.current?.addEventListener('pause', pauseHandler)
        audioRef.current?.addEventListener('play', playHandler)
        return () => {
            audioRef.current?.removeEventListener('canplay', canplayHandler)
            audioRef.current?.removeEventListener('pause', pauseHandler)
            audioRef.current?.removeEventListener('play', playHandler)
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
                    <Tracklist tracks={tracks} selectedTrackIds={selectedTrackIds}
                        onSelectTrack={(trackId) => setSelectedTrackIds((ids) => ids.includes(trackId) ?
                            ids.filter(i => i != trackId) :
                            [...ids, trackId])}
                        onSampleChanged={(newSample) => {
                            if (sampleTrack?.id === newSample.id) {
                                if (isSamplePlaying) {
                                    audioRef.current?.pause()
                                } else {
                                    audioRef.current?.play()
                                }
                            } else {
                                setSampleTrack(newSample)
                            }
                        }}
                        sample={sampleTrack}
                        isSamplePlaying={isSamplePlaying}
                    />
                </Stack>
            </Grid>
            <Grid xs={4}>
                <Sheet>
                    <audio ref={audioRef} style={{ width: '100%' }} src={sampleTrack?.sample_url} controls />
                    <Button
                        sx={{ width: '100%' }}
                        disabled={selectedTrackIds.length === 0 || selectedPlaylist === null}>
                        {`Add ${selectedTrackIds.length} selected to ${selectedPlaylist?.name}`}</Button>
                    <NestedPlaylist
                        selectedPlaylist={selectedPlaylist}
                        onSelectionChanged={setSelectedPlaylist}
                    />
                </Sheet>
            </Grid>
        </Grid>
    )
}
