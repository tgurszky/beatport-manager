export type Paginated<T> = {
    count: number
    next: Url | null
    previous: Url | null
    page: PageLabel
    per_page: number
    results: T[]
}

export type Url = string

export type PageLabel = string