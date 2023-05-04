import { Paginated } from '@/domain/paginated'
import { Playlist } from '@/domain/playlist'
import { A, O, S, flow } from '@mobily/ts-belt'
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

  const { results } = await bpRes.json() as Paginated<Playlist>
  const { grouped } = req.query as { grouped?: string }

  return res.json(grouped === 'true' ? groupPlaylists(results) : results)
}

function groupPlaylists(playlists: Playlist[]) {
  const selectKey = flow(S.split('-'), A.head, O.getWithDefault<string>('Unknown'), S.trim)
  return A.groupBy(playlists, playlist => selectKey(playlist.name))
}