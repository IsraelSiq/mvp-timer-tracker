// Resistências dos MVPs — baseado no RO clássico
// element: qual elemento causa MAIS dano (use isso para atacar)
// weakTo: lista de elementos com bônus de dano
// resistTo: lista de elementos com penalidade
// race: raça do MVP
// size: tamanho

export interface MvpResistance {
  element: string        // elemento do MVP
  weakTo: string[]       // elementos que causam mais dano
  resistTo: string[]     // elementos que causam menos dano
  race: string
  size: string
  tips?: string          // dica extra
}

export const MVP_RESISTANCES: Record<number, MvpResistance> = {
  // Orc Hero
  1087: { element: 'Terra', weakTo: ['Vento'], resistTo: ['Terra', 'Elétrico'], race: 'Humano', size: 'Grande', tips: 'Use Wind Arrow ou skills de vento.' },
  // Moonlight Flower
  1150: { element: 'Terra', weakTo: ['Vento'], resistTo: ['Terra'], race: 'Animal', size: 'Médio' },
  // Osiris
  1038: { element: 'Morto-vivo', weakTo: ['Sagrado'], resistTo: ['Sombra', 'Veneno'], race: 'Morto-vivo', size: 'Médio', tips: 'Magnus Exorcismus / Heal causam dano.' },
  // Golden Thief Bug
  1086: { element: 'Veneno', weakTo: ['Sagrado', 'Fogo'], resistTo: ['Água', 'Veneno', 'Sombra'], race: 'Inseto', size: 'Médio', tips: 'Não reflete magia. Use Fire ou Holy.' },
  // Stormy Knight
  1251: { element: 'Vento', weakTo: ['Terra'], resistTo: ['Vento', 'Água'], race: 'Morto-vivo', size: 'Grande', tips: 'Imune a Frozen. Use skills de terra.' },
  // Turtle General
  1312: { element: 'Fogo', weakTo: ['Água'], resistTo: ['Fogo', 'Terra'], race: 'Humano', size: 'Grande' },
  // Dark Lord
  1272: { element: 'Sombra', weakTo: ['Sagrado'], resistTo: ['Sombra', 'Morto-vivo'], race: 'Morto-vivo', size: 'Grande', tips: 'Magnus Exorcismus ideal.' },
  // Dracula
  1389: { element: 'Morto-vivo', weakTo: ['Sagrado'], resistTo: ['Sombra', 'Veneno'], race: 'Morto-vivo', size: 'Médio', tips: 'Heal causa dano. Leva Ghost Panic.' },
  // Pharaoh
  1157: { element: 'Morto-vivo', weakTo: ['Sagrado'], resistTo: ['Sombra'], race: 'Morto-vivo', size: 'Médio' },
  // Amon Ra
  1511: { element: 'Morto-vivo', weakTo: ['Sagrado'], resistTo: ['Sombra', 'Veneno'], race: 'Morto-vivo', size: 'Grande', tips: 'Cast time curto — cuidado com Quagmire.' },
  // Evil Snake Lord
  1419: { element: 'Veneno', weakTo: ['Sagrado', 'Fogo'], resistTo: ['Veneno', 'Sombra'], race: 'Demônio', size: 'Grande' },
  // Incantation Samurai
  1658: { element: 'Sombra', weakTo: ['Sagrado'], resistTo: ['Sombra'], race: 'Morto-vivo', size: 'Grande' },
  // White Lady
  1623: { element: 'Morto-vivo', weakTo: ['Sagrado'], resistTo: ['Sombra', 'Veneno'], race: 'Morto-vivo', size: 'Médio' },
  // Ktullanux
  1630: { element: 'Água', weakTo: ['Terra', 'Fogo'], resistTo: ['Água', 'Vento'], race: 'Animal', size: 'Grande' },
  // Kiel-D-01
  1685: { element: 'Neutro', weakTo: ['Sagrado', 'Sombra'], resistTo: ['Neutro'], race: 'Formless', size: 'Médio', tips: 'Imune a Stun. Cuidado com AoE.' },
  // Vesper
  1688: { element: 'Neutro', weakTo: ['Sagrado', 'Sombra'], resistTo: ['Neutro'], race: 'Formless', size: 'Grande', tips: 'Reflete magia. Use físico.' },
  // Baphomet
  1039: { element: 'Sombra', weakTo: ['Sagrado'], resistTo: ['Sombra', 'Veneno'], race: 'Demônio', size: 'Grande', tips: 'Magnus Exorcismus ideal. Muito HP.' },
  // Eddga
  1115: { element: 'Fogo', weakTo: ['Água'], resistTo: ['Fogo', 'Terra'], race: 'Animal', size: 'Grande' },
  // Drake
  1112: { element: 'Morto-vivo', weakTo: ['Sagrado'], resistTo: ['Sombra'], race: 'Morto-vivo', size: 'Grande' },
  // Phreeoni
  1158: { element: 'Neutro', weakTo: ['Sagrado', 'Sombra'], resistTo: ['Neutro'], race: 'Animal', size: 'Grande' },
  // Mistress
  1059: { element: 'Vento', weakTo: ['Terra'], resistTo: ['Vento', 'Água'], race: 'Inseto', size: 'Médio' },
  // Doppelganger
  1046: { element: 'Sombra', weakTo: ['Sagrado'], resistTo: ['Sombra'], race: 'Demônio', size: 'Médio', tips: 'Cópia de personagem. Sagrado é melhor.' },
  // Maya
  1147: { element: 'Terra', weakTo: ['Vento', 'Fogo'], resistTo: ['Terra', 'Água'], race: 'Inseto', size: 'Grande', tips: 'Reflete magia. Use físico principalmente.' },
  // Orc Lord
  1190: { element: 'Terra', weakTo: ['Vento'], resistTo: ['Terra'], race: 'Humano', size: 'Grande' },
  // Fallen Bishop
  1871: { element: 'Morto-vivo', weakTo: ['Sagrado'], resistTo: ['Sombra', 'Veneno'], race: 'Morto-vivo', size: 'Médio', tips: 'Absorve SP. Use Minstrel/Bard para suporte.' },
  // Hatii
  1734: { element: 'Água', weakTo: ['Terra', 'Fogo'], resistTo: ['Água', 'Vento'], race: 'Animal', size: 'Grande' },
  // Egnigem Cenia
  1751: { element: 'Neutro', weakTo: ['Sagrado', 'Sombra'], resistTo: ['Neutro'], race: 'Humano', size: 'Médio', tips: 'Bio Labs — cuidado com skills especiais.' },
  // RSX-0806
  1768: { element: 'Neutro', weakTo: ['Sagrado', 'Sombra'], resistTo: ['Neutro'], race: 'Formless', size: 'Grande', tips: 'Imune a Knock-back.' },
  // Thanatos Phantom
  1873: { element: 'Neutro', weakTo: ['Sagrado', 'Sombra'], resistTo: ['Neutro'], race: 'Formless', size: 'Grande', tips: 'Use componentes para acessar Thanatos Tower.' },
  // Gloom Under Night
  1885: { element: 'Sombra', weakTo: ['Sagrado'], resistTo: ['Sombra', 'Veneno'], race: 'Demônio', size: 'Grande', tips: 'Debuffs pesados. Leve Paladin para devotion.' },
  // Tao Gunka
  1583: { element: 'Neutro', weakTo: ['Sagrado', 'Sombra'], resistTo: ['Neutro'], race: 'Demônio', size: 'Grande', tips: 'DEF altíssima. Use High Wizard com Stave Crasher.' },
  // Lord of Death
  1373: { element: 'Morto-vivo', weakTo: ['Sagrado'], resistTo: ['Sombra', 'Veneno'], race: 'Morto-vivo', size: 'Grande', tips: 'Causa vários status negativos.' },
  // Detardeurus
  1719: { element: 'Água', weakTo: ['Terra', 'Fogo'], resistTo: ['Água', 'Vento'], race: 'Dragon', size: 'Grande', tips: 'Usa Pneuma periodicamente.' },
  // Atroce
  1785: { element: 'Fogo', weakTo: ['Água'], resistTo: ['Fogo'], race: 'Demônio', size: 'Grande', tips: 'Muito veloz. Use Slow/Quagmire.' },
  // Lady Tanee
  1832: { element: 'Terra', weakTo: ['Vento', 'Fogo'], resistTo: ['Terra', 'Água'], race: 'Planta', size: 'Grande', tips: 'Alta MDEF. Prefer físico com Wind.' },
  // Valkyrie Randgris
  1917: { element: 'Sagrado', weakTo: ['Sombra'], resistTo: ['Sagrado', 'Neutro'], race: 'Anjo', size: 'Grande', tips: 'Dispels constantemente. Equips básicos.' },
  // Ifrit
  2068: { element: 'Fogo', weakTo: ['Água'], resistTo: ['Fogo', 'Terra'], race: 'Demônio', size: 'Grande', tips: 'AoE enorme. Mantenha distância.' },
  // Beelzebub
  1252: { element: 'Sombra', weakTo: ['Sagrado'], resistTo: ['Sombra', 'Veneno'], race: 'Demônio', size: 'Grande', tips: 'Transforma em mosca — prepara Dispel.' },
}
