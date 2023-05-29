import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { playlistId } = req.query as { playlistId: string }
    
    const bpRes = await fetch(`https://api.beatport.com/v4/my/playlists/${playlistId}/tracks/bulk/`, {
        headers: {
            Authorization: `Bearer ${process.env.BEATPORT_TOKEN}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: req.body
    })

    if (!bpRes.ok) {
        const message = await bpRes.json()
        console.error({ message })
        return res.status(500).end()
    }

    return res.status(200).end()
}
