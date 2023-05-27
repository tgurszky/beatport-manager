export type Track = {
    id: number
    name: string
    mix_name: string
    length: string
    bpm: number
    is_available_for_streaming: boolean
    artists: Artist[]
    genre: Genre
    key: Key
    sample_url: string
    sample_start_ms: number
    sample_end_ms: number
    sub_genre: Genre
}

export type Artist = {
    id: number
    name: string
}

export type Genre = {
    id: number
    name: string
}

export type Key = {
    id: number
    camelot_number: number
    camelot_letter: string,
}
