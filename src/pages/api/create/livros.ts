import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json')

type Livro = {
  id: string
  titulo: string
  genero: string
  autor: string
  quantidade: number
  qtdEmprestados: number
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido' })
  }

  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const parsed = JSON.parse(jsonData)

  const livros: Livro[] = parsed.livros ?? []

  const { titulo, genero, autor, quantidade } = req.body

  if (!titulo || typeof titulo !== 'string') {
    return res.status(400).json({ mensagem: 'Título do livro é obrigatório.' })
  }

  const jaExiste = livros.some(
    (livro) =>
      livro.titulo.trim().toLowerCase() === titulo.trim().toLowerCase()
  )

  if (jaExiste) {
    return res.status(400).json({ mensagem: 'Livro já cadastrado!' })
  }

  const novoLivro: Livro = {
    id: crypto.randomUUID(),
    titulo: titulo.trim(),
    genero,
    autor,
    quantidade,
    qtdEmprestados: 0
  }

  livros.push(novoLivro)

  parsed.livros = livros

  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2))

  return res.status(200).json({
    mensagem: 'Livro cadastrado com sucesso!',
    livro: novoLivro
  })
}