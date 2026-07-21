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

export function encodeTrainerPhilosophy(
  philosophyText: string | undefined,
  packages?: { name: string; price: number; original_price?: number | null }[],
  originalPrice?: number | null
): string {
  const cleanPhil = philosophyText || ''
  if ((!packages || packages.length === 0) && !originalPrice) return cleanPhil
  return `[PKG_JSON]:${JSON.stringify({ text: cleanPhil, packages, original_price: originalPrice })}`
}

export function decodeTrainerPhilosophy(philosophyDb: string | undefined): {
  text: string
  packages: { name: string; price: number; original_price?: number | null }[]
  original_price?: number | null
} {
  if (!philosophyDb) return { text: '', packages: [], original_price: null }
  if (philosophyDb.startsWith('[PKG_JSON]:')) {
    try {
      const jsonStr = philosophyDb.slice('[PKG_JSON]:'.length)
      const data = JSON.parse(jsonStr)
      return {
        text: data.text || '',
        packages: Array.isArray(data.packages) ? data.packages : [],
        original_price: data.original_price != null ? Number(data.original_price) : null
      }
    } catch {
      return { text: philosophyDb, packages: [], original_price: null }
    }
  }
  return { text: philosophyDb, packages: [], original_price: null }
}

export function encodePhotoDesc(
  photoUrl: string | undefined,
  descText: string | undefined,
  originalPrice?: number | null
): string {
  const cleanPhoto = (photoUrl || '').trim()
  const cleanDesc = descText || ''
  const origPriceTag = originalPrice ? `:::ORIG_PRICE:${originalPrice}` : ''
  if (!cleanPhoto && !originalPrice) return cleanDesc
  return `[PHOTO_URL]:${cleanPhoto}:::${cleanDesc}${origPriceTag}`
}

export function decodePhotoDesc(descDb: string | undefined): {
  photo: string
  desc: string
  original_price?: number | null
} {
  if (!descDb) return { photo: '', desc: '', original_price: null }
  let original_price: number | null = null
  let workStr = descDb

  if (workStr.includes(':::ORIG_PRICE:')) {
    const parts = workStr.split(':::ORIG_PRICE:')
    workStr = parts[0]
    original_price = Number(parts[1]) || null
  }

  if (workStr.startsWith('[PHOTO_URL]:')) {
    const rest = workStr.slice('[PHOTO_URL]:'.length)
    const idx = rest.indexOf(':::')
    if (idx !== -1) {
      return {
        photo: rest.slice(0, idx),
        desc: rest.slice(idx + 3),
        original_price
      }
    }
  }
  return { photo: '', desc: workStr, original_price }
}
