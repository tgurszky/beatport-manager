import { List, ListDivider, ListItem, ListItemContent } from "@mui/joy"
import { Track } from "../../domain/tracks"

type Props = {
    track: Track
}

export default function TracklistItem({ track }: Props) {
    return <ListItem>
        <ListItemContent>
            <List orientation="horizontal">
                <ListItem>{track.name}</ListItem>
                <ListDivider />
                <ListItem>{track.artists[0]?.name}</ListItem>
                <ListDivider />
                <ListItem>{track.genre.name}</ListItem>
                <ListDivider />
                <ListItem>{track.bpm}</ListItem>
                <ListDivider />
                <ListItem>{`${track.key.camelot_number}${track.key.camelot_letter}`}</ListItem>
            </List>
        </ListItemContent>
    </ListItem>
}