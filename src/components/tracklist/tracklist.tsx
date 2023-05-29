import PlayArrow from "@mui/icons-material/PlayArrow";
import Pause from "@mui/icons-material/Pause";
import { Button, Checkbox, Sheet, Stack, Table, Typography } from "@mui/joy";
import { Track } from "../../domain/tracks";

type Props = {
    tracks: Track[]
    selectedTrackIds: number[]
    onSelectTrack: (id: number) => void
    onSampleChanged: (track: Track) => void
    sample: Track | null
    isSamplePlaying: boolean
}

export default function ({ tracks, selectedTrackIds, onSelectTrack, onSampleChanged, sample, isSamplePlaying }: Props) {
    return <Sheet sx={{ height: 'calc(100vh - 72px)', overflow: 'auto' }}>
        <Table
            borderAxis="bothBetween"
            hoverRow
            stickyHeader
        >
            <thead>
                <tr>
                    <th style={{ width: '23px' }}></th>
                    <th>Track name</th>
                    <th>Genre</th>
                    <th style={{ width: '120px' }}>Artist</th>
                    <th style={{ width: '45px' }}>BPM</th>
                    <th style={{ width: '45px' }}>Key</th>
                </tr>
            </thead>
            <tbody>
                {tracks.map(track => (
                    <tr key={track.id}>
                        <th><Checkbox onChange={() => onSelectTrack(track.id)} checked={selectedTrackIds.includes(track.id)} /></th>
                        <th><Button
                            sx={{ width: '100%', textAlign: 'left' }}
                            variant={sample?.id === track.id ? "soft" : "outlined"}
                            startDecorator={sample?.id === track.id && isSamplePlaying ? <Pause /> : <PlayArrow />}
                            onClick={() => onSampleChanged(track)}
                        >
                            <Stack>
                                <Typography>{track.name}</Typography>
                                <Typography level="body3">{track.mix_name}</Typography>
                            </Stack>
                        </Button>

                        </th>
                        <th>{track.genre.name}</th>
                        <th>{track.artists[0]?.name}</th>
                        <th>{track.bpm}</th>
                        <th>{`${track.key.camelot_number}${track.key.camelot_letter}`}</th>
                    </tr>))}
            </tbody>
        </Table>
    </Sheet>
}