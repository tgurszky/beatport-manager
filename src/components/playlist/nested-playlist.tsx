import useSWR from 'swr'
import { List, ListItem, ListItemButton, ListItemContent, ListItemDecorator } from '@mui/joy'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { getPlaylists } from '@/fetchers/playlist'
import { useState } from 'react'
import { Playlist } from '../../domain/playlist'

type Props = {
    selectedPlaylist: Playlist | null
    onSelectionChanged: (playlist: Playlist) => void
}

export const NestedPlaylist = ({ selectedPlaylist, onSelectionChanged }: Props) => {
    const { data: playlists } = useSWR('playlists', () => getPlaylists('grouped'))
    const [openedKey, setOpenedKey] = useState('')

    const handleGroupClick = (groupKey: string) => {
        setOpenedKey(opened => opened === groupKey ? '' : groupKey)
    }

    if (!playlists) {
        return <span>Loading...</span>
    }

    return <List size='sm' >
        {Object.entries(playlists).map(([key, playlists]) => (
            <ListItem nested key={key}>
                <ListItem>
                    <ListItemButton
                        onClick={() => handleGroupClick(key)}
                        selected={openedKey === key}
                    >
                        <ListItemDecorator>
                            <KeyboardArrowDown
                                sx={{ transform: openedKey === key ? 'initial' : 'rotate(-90deg)' }}
                            />
                        </ListItemDecorator>
                        <ListItemContent>{key}</ListItemContent>
                    </ListItemButton>
                </ListItem>
                {openedKey === key ? (
                    <List sx={{ pl: 4 }}>
                        {playlists.map(playlist => (
                            <ListItem key={playlist.id}>
                                <ListItemButton
                                    onClick={() => onSelectionChanged(playlist)}
                                    selected={selectedPlaylist?.id === playlist.id}
                                >
                                    <ListItemContent>{playlist.name}</ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                ) : null}
            </ListItem>
        ))}
    </List>
}