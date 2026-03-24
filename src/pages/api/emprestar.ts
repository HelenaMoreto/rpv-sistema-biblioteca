import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'

const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json')

type Livro = {
  id: string
  titulo: string
  autor: string
  genero: string
  quantidade: number
  qtdEmprestados: number
}

type Usuario = {
  id: string
  nome: string
  email: string
  telefone: string
}

type Emprestimo = {
  id: string
  usuarioId: string
  livrosIds: string[]
  dataEmprestimo: string
  status: 'ativo' | 'concluído'
  livrosDevolvidosIds?: string[]
  dataDevolucao?: string
}

type Banco = {
  livros: Livro[]
  usuarios: Usuario[]
  emprestimos: Emprestimo[]
  historicoEmprestimos?: any[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido' })
  }

  try {
    const { usuarioId, livrosIds, dataEmprestimo } = req.body

    if (!usuarioId || !livrosIds || !dataEmprestimo) {
      return res.status(400).json({
        mensagem: 'Campos obrigatórios: usuarioId, livrosIds e dataEmprestimo'
      })
    }

    if (!Array.isArray(livrosIds) || livrosIds.length === 0) {
      return res.status(400).json({
        mensagem: 'livrosIds deve ser um array com pelo menos um livro'
      })
    }

    const jsonData = fs.readFileSync(filePath, 'utf-8')
    const banco: Banco = JSON.parse(jsonData)

    const usuarioExiste = banco.usuarios.some((usuario) => usuario.id === usuarioId)

    if (!usuarioExiste) {
      return res.status(404).json({
        mensagem: 'Usuário não encontrado'
      })
    }

    const livrosSelecionados: Livro[] = []

    for (const livroId of livrosIds) {
      const livro = banco.livros.find((item) => item.id === livroId)

      if (!livro) {
        return res.status(404).json({
          mensagem: `Livro com ID ${livroId} não encontrado`
        })
      }

      const disponiveis = livro.quantidade - livro.qtdEmprestados

      if (disponiveis <= 0) {
        return res.status(400).json({
          mensagem: `O livro "${livro.titulo}" não possui exemplares disponíveis`
        })
      }

      livrosSelecionados.push(livro)
    }

    for (const livro of livrosSelecionados) {
      livro.qtdEmprestados += 1
    }

    const novoEmprestimo: Emprestimo = {
      id: crypto.randomUUID(),
      usuarioId,
      livrosIds,
      dataEmprestimo,
      status: 'ativo',
      livrosDevolvidosIds: []
    }

    banco.emprestimos.push(novoEmprestimo)

    fs.writeFileSync(filePath, JSON.stringify(banco, null, 2))

    return res.status(201).json({
      mensagem: 'Empréstimo realizado com sucesso',
      emprestimo: novoEmprestimo
    })
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao realizar empréstimo',
      erro: String(error)
    })
  }
}