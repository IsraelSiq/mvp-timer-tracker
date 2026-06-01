/**
 * MVP sprite images from Divine-Pride / rAthena public CDN.
 * Format: monster ID from the RO database.
 * Fallback to a generic boss icon if not found.
 */
export const MVP_IMAGES: Record<string, string> = {
  'Orc Hero':         'https://db.irowiki.org/image/monster/1087.gif',
  'Moonlight Flower': 'https://db.irowiki.org/image/monster/1150.gif',
  'Osiris':           'https://db.irowiki.org/image/monster/1038.gif',
  'Golden Thief Bug': 'https://db.irowiki.org/image/monster/1086.gif',
  'Stormy Knight':    'https://db.irowiki.org/image/monster/1251.gif',
  'Turtle General':   'https://db.irowiki.org/image/monster/1312.gif',
  'Dark Lord':        'https://db.irowiki.org/image/monster/1272.gif',
  'Dracula':          'https://db.irowiki.org/image/monster/1389.gif',
  'Pharaoh':          'https://db.irowiki.org/image/monster/1157.gif',
  'Amon Ra':          'https://db.irowiki.org/image/monster/1511.gif',
  'Evil Snake Lord':  'https://db.irowiki.org/image/monster/1419.gif',
  'Baphomet':         'https://db.irowiki.org/image/monster/1039.gif',
  'Eddga':            'https://db.irowiki.org/image/monster/1115.gif',
  'Drake':            'https://db.irowiki.org/image/monster/1112.gif',
  'Phreeoni':         'https://db.irowiki.org/image/monster/1158.gif',
  'Mistress':         'https://db.irowiki.org/image/monster/1059.gif',
  'Doppelganger':     'https://db.irowiki.org/image/monster/1046.gif',
  'Maya':             'https://db.irowiki.org/image/monster/1147.gif',
  'Orc Lord':         'https://db.irowiki.org/image/monster/1190.gif',
  'Fallen Bishop':    'https://db.irowiki.org/image/monster/1871.gif',
  'Tao Gunka':        'https://db.irowiki.org/image/monster/1583.gif',
  'Lord of Death':    'https://db.irowiki.org/image/monster/1373.gif',
  'Detardeurus':      'https://db.irowiki.org/image/monster/1719.gif',
  'Atroce':           'https://db.irowiki.org/image/monster/1785.gif',
}

export function getMvpImage(name: string): string {
  return MVP_IMAGES[name] ?? ''
}
