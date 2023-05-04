import { Playlist, PlaylistGroups } from "../domain/playlist"

const url = 'api/beatport/getplaylists'

type Variant = 'flat' | 'grouped'
type PlaylistResult<T extends Variant> = T extends 'grouped' ? PlaylistGroups : Playlist[]

export async function getPlaylists<T extends Variant>(grouped: T): Promise<PlaylistResult<T>> {
    const params = new URLSearchParams()
    params.append('grouped', JSON.stringify(grouped === 'grouped'))

    const res = await fetch(url + `?${params}`)
    return res.json()
}