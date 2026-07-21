export function formatImageUrl(url: string | null | undefined): string {
  if (!url || !url.trim()) return ''
  const trimmed = url.trim()

  // Google Drive file ID pattern 1: /file/d/FILE_ID/view
  const match1 = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (match1 && match1[1]) {
    return `https://lh3.googleusercontent.com/d/${match1[1]}`
  }

  // Google Drive file ID pattern 2: ?id=FILE_ID or &id=FILE_ID
  const match2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (match2 && match2[1] && (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com'))) {
    return `https://lh3.googleusercontent.com/d/${match2[1]}`
  }

  return trimmed
}

export function encodeTrainerPhilosophy(philosophyText: string | undefined, packages?: { name: string; price: number }[]): string {
  const cleanPhil = philosophyText || ''
  if (!packages || packages.length === 0) return cleanPhil
  return `[PKG_JSON]:${JSON.stringify({ text: cleanPhil, packages })}`
}

export function decodeTrainerPhilosophy(philosophyDb: string | undefined): { text: string; packages: { name: string; price: number }[] } {
  if (!philosophyDb) return { text: '', packages: [] }
  if (philosophyDb.startsWith('[PKG_JSON]:')) {
    try {
      const jsonStr = philosophyDb.slice('[PKG_JSON]:'.length)
      const data = JSON.parse(jsonStr)
      return {
        text: data.text || '',
        packages: Array.isArray(data.packages) ? data.packages : []
      }
    } catch {
      return { text: philosophyDb, packages: [] }
    }
  }
  return { text: philosophyDb, packages: [] }
}

export function encodePhotoDesc(photoUrl: string | undefined, descText: string | undefined): string {
  const cleanPhoto = (photoUrl || '').trim()
  const cleanDesc = descText || ''
  if (!cleanPhoto) return cleanDesc
  return `[PHOTO_URL]:${cleanPhoto}:::${cleanDesc}`
}

export function decodePhotoDesc(descDb: string | undefined): { photo: string; desc: string } {
  if (!descDb) return { photo: '', desc: '' }
  if (descDb.startsWith('[PHOTO_URL]:')) {
    const rest = descDb.slice('[PHOTO_URL]:'.length)
    const idx = rest.indexOf(':::')
    if (idx !== -1) {
      return {
        photo: rest.slice(0, idx),
        desc: rest.slice(idx + 3)
      }
    }
  }
  return { photo: '', desc: descDb }
}
