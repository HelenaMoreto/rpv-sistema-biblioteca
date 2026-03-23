import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'

const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json')

type Usuario = {
  id: string
  nome: string
  email?: string
  telefone: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido' })
  }

  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const parsed = JSON.parse(jsonData)

  const usuarios: Usuario[] = parsed.usuarios ?? []

  const { nome, email, telefone } = req.body

  if (!nome || typeof nome !== 'string') {
    return res.status(400).json({ mensagem: 'Nome é obrigatório' })
  }

  if (!telefone) {
    return res.status(400).json({ mensagem: 'Telefone é obrigatório' })
  }

  const jaExiste = usuarios.some(
    (user) =>
      user.nome.trim().toLowerCase() === nome.trim().toLowerCase()
  )

  if (jaExiste) {
    return res.status(400).json({ mensagem: 'Usuário já cadastrado!' })
  }

  const novoUsuario: Usuario = {
    id: crypto.randomUUID(),
    nome: nome.trim(),
    email,
    telefone,
  }

  usuarios.push(novoUsuario)

  parsed.usuarios = usuarios

  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2))

  return res.status(200).json({
    mensagem: 'Usuário cadastrado com sucesso!',
    usuario: novoUsuario
  })
}