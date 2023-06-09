import type { NextApiRequest, NextApiResponse } from 'next'

const searchUrl = 'https://api.beatport.com/v4/catalog/search/'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { search } = req.query as { search: string }

    const params = new URLSearchParams()
    params.append('q', search)
    params.append('type', 'tracks')
    params.append('page', '1')
    params.append('per_page', '50')
    params.append('is_available_for_streaming', 'true')
    const bpRes = await fetch(`${searchUrl}?${params}`, {
        headers: {
            Authorization: `Bearer ${process.env.BEATPORT_TOKEN}`,
        },
    })

    if (!bpRes.ok) {
        const message = await bpRes.json()
        console.error({ message })
        return res.status(500).end()
    }

    const { tracks } = await bpRes.json()
    return res.json(tracks)
}
