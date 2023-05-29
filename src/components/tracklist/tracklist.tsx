import { Checkbox, Sheet, Table } from "@mui/joy";
import { Track } from "../../domain/tracks";

type Props = {
    tracks: Track[]
    selectedTrackIds: number[]
    onSelectTrack: (id: number) => void
}

export default function ({ tracks, selectedTrackIds, onSelectTrack }: Props) {
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
                        <th><Checkbox onChange={() => onSelectTrack(track.id)} checked={selectedTrackIds.includes(track.id)}/></th>
                        <th>{track.name}</th>
                        <th>{track.genre.name}</th>
                        <th>{track.artists[0]?.name}</th>
                        <th>{track.bpm}</th>
                        <th>{`${track.key.camelot_number}${track.key.camelot_letter}`}</th>
                    </tr>))}
            </tbody>
        </Table>
    </Sheet>
}