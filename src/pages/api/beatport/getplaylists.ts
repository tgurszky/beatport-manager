import type { NextApiRequest, NextApiResponse } from 'next'

const url = 'https://api.beatport.com/v4/my/playlists/'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = new URLSearchParams()
  params.append('type', 'tracks')
  params.append('page', '1')
  params.append('per_page', '100')
  const bpRes = await fetch(`${url}?${params}`, {
    headers: {
      Authorization: `Bearer ${process.env.BEATPORT_TOKEN}`,
    },
  })

  if (!bpRes.ok) {
    const message = await bpRes.json()
    console.error({ message })
    return res.status(500).end()
  }

  const { results } = await bpRes.json()
  return res.json(results)
}
