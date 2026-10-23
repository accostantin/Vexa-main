import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import roupas from './data/roupas.json'
import noticias from './data/conteudos.json'

const SRC = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC = path.resolve(SRC, '../public')

function arquivos(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? arquivos(path.join(dir, e.name)) : [path.join(dir, e.name)]
  )
}

describe('Dados', () => {
  it.each([
    ['roupas', roupas, ['id', 'titulo', 'autor', 'categoria', 'descricao', 'tags']],
    ['conteudos', noticias, ['id', 'titulo', 'autor', 'categoria', 'descricao', 'tags', 'link']],
  ])('%s: ids únicos e campos obrigatórios', (_, lista, campos) => {
    expect(new Set(lista.map((i) => i.id)).size).toBe(lista.length)
    for (const item of lista) for (const c of campos) expect(item[c], `${c} em id ${item.id}`).toBeTruthy()
  })

  it('toda capa de roupa existe em public/assets (com caixa exata)', () => {
    const existentes = new Set(fs.readdirSync(path.join(PUBLIC, 'assets')))
    for (const r of roupas.filter((r) => r.capa)) {
      expect(existentes, r.capa).toContain(path.basename(r.capa))
    }
  })
})

describe('Imports (sensíveis a maiúsculas/minúsculas, como no Linux/CI)', () => {
  const codigo = arquivos(SRC).filter((f) => /\.(jsx?|css)$/.test(f) && !f.includes('.test.'))

  function existeComCaixaExata(alvo) {
    const partes = path.relative('/', alvo).split(path.sep)
    let atual = '/'
    for (const p of partes) {
      if (!fs.existsSync(atual) || !fs.readdirSync(atual).includes(p)) return false
      atual = path.join(atual, p)
    }
    return true
  }

  it('todo import relativo resolve para um arquivo existente', () => {
    const quebrados = []
    for (const f of codigo) {
      const src = fs.readFileSync(f, 'utf8')
      for (const m of src.matchAll(/(?:from\s+|import\s+)['"](\.{1,2}\/[^'"]+)['"]/g)) {
        const base = path.resolve(path.dirname(f), m[1])
        const candidatos = [base, base + '.jsx', base + '.js', base + '.json']
        if (!candidatos.some(existeComCaixaExata)) quebrados.push(`${path.relative(SRC, f)} -> ${m[1]}`)
      }
    }
    expect(quebrados).toEqual([])
  })
})
