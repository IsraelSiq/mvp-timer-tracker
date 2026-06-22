# Changelog

Todos os cambios notáveis neste projeto são documentados aqui.  
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [2.1.0] — 2026-06-22

### Added
- Base de MVPs expandida de 38 para **99+ MVPs únicos** (116+ entradas com múltiplos mapas)
- Cobertura completa do RO Renewal: Tumba da Honra, Illusory Dungeons, Guild Dungeons 2, Abyss Lake, etc.
- Novos MVPs de alto nível (nível 165–255): Aranha Rainha, Joialiant, Detale Esqueleto, Bruxa da Morte, Quimera Única, R001-Bestia, entre outros
- MVPs de instância/especial: Conde Drácula, Ktullanux de Cristal, Ilusão do Luar, Tao Gunka Ancestral, Maya Silente, Bafomé Caótico, Valquíria Ingrid, Valquíria Reginleif, Kraken Abismal, Bruxa do Mar, Ursinho Brilhante, Marechal Tartaruga
- Suporte a respawn `Instantâneo` (Aranha Mecânica)
- Badge de versão e contador de MVPs no README

### Changed
- README: tabela de MVPs dividida por faixa de nível para melhor leitura
- README: badge `version` atualizado para `2.1.0`, badge `MVPs` atualizado para `99+`
- `src/data/mvps.ts`: referência atualizada para refletir 99+ MVPs

---

## [2.0.0] — 2025-11-01

### Added
- **Supabase Realtime** — log compartilhado entre jogadores em tempo real
- **Autenticação Google OAuth** — login com conta Google via Supabase Auth
- **Modos de Objetivo** — 5 modos de ordenação (Padrão, MVP Points, Drops, Rotação Rápida, Grupo)
- **IA Gemini** — sugestão de alvo via Google Gemini 2.0 Flash
- Fallback `localStorage` quando Supabase não está configurado
- Kill por inimigo com horário customizável
- KPIs no topo do dashboard (janelas abertas, em breve, melhor alvo)
- Log público de kills (leitura sem login)

### Changed
- Migração completa do Skill Simulator para repositório dedicado `ro-skill-simulator`
- Stack atualizada: React 18 + TypeScript + Vite + Tailwind CSS
- Deploy movido para Vercel com CI/CD automático via GitHub Actions

### Removed
- Skill Simulator removido deste repositório

---

## [1.0.0] — 2025-06-01

### Added
- Timer de respawn com janela mínima/máxima
- Lista inicial de 12 MVPs clássicos
- Interface estilo dark tema Ragnarok
- Status visual: Vivo / Longe / Em breve / Janela aberta
- Busca por nome e mapa
- Export/Import JSON para persistência local
