import { List } from "@mui/joy";
import { Track } from "../../domain/tracks";
import TracklistItem from "./tracklist-item";

type Props = {
    tracks: Track[]
}

export default function ({ tracks }: Props) {
    return <List>
        {tracks
            .filter(t => t.is_available_for_streaming)
            .map(t => <TracklistItem key={t.id} track={t} />)}
    </List>
}