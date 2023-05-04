import useSWR from 'swr'
import { List, ListItem, ListItemButton, ListItemContent, ListItemDecorator } from '@mui/joy'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { getPlaylists } from '@/fetchers/playlist'
import { useState } from 'react'

export const NestedPlaylist = () => {
    const { data: playlists } = useSWR('playlists', () => getPlaylists('grouped'))
    const [openedKey, setOpenedKey] = useState('')
    const [selected, setSelected] = useState('')

    const handleGroupClick = (groupKey: string) => {
        setOpenedKey(opened => opened === groupKey ? '' : groupKey)
    }

    const handlePlaylistClick = (playlistId: string) => {
        setSelected(selected => selected === playlistId ? '' : playlistId)
    }

    if (!playlists) {
        return <span>Loading...</span>
    }

    return <List size='sm' >
        {Object.entries(playlists).map(([key, playlists]) => (
            <ListItem nested>
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
                                    onClick={() => handlePlaylistClick(playlist.id)}
                                    selected={selected === playlist.id}
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