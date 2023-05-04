export type Playlist = {
    id: string
    name: string
}

export type PlaylistGroups = Record<string, Playlist[]>