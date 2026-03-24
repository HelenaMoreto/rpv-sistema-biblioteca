import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json')

type Livro = {
  id: string
  titulo: string
  genero: string
  autor: string
  quantidade: number
  qtdEmprestados: number
}

type Emprestimo = {
  id: string
  usuarioId: string
  livrosIds: string[]
  dataEmprestimo: string
  dataDevolucao?: string
  status: 'ativo' | 'concluído'
}

type Banco = {
  usuarios: any[]
  livros: Livro[]
  emprestimos: Emprestimo[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido' })
  }

  try {
    const { emprestimoId, livrosIds } = req.body

    if (!emprestimoId || !livrosIds) {
      return res.status(400).json({
        mensagem: 'Os campos emprestimoId e livrosIds são obrigatórios'
      })
    }

    if (!Array.isArray(livrosIds) || livrosIds.length === 0) {
      return res.status(400).json({
        mensagem: 'livrosIds deve ser um array com pelo menos um livro'
      })
    }

    const jsonData = fs.readFileSync(filePath, 'utf-8')
    const banco: Banco = JSON.parse(jsonData)

    const emprestimo = banco.emprestimos.find(
      (item) => item.id === emprestimoId
    )

    if (!emprestimo) {
      return res.status(404).json({
        mensagem: 'Empréstimo não encontrado'
      })
    }

    if (emprestimo.status !== 'ativo') {
      return res.status(400).json({
        mensagem: 'Esse empréstimo não está ativo'
      })
    }

    for (const livroId of livrosIds) {
      if (!emprestimo.livrosIds.includes(livroId)) {
        return res.status(400).json({
          mensagem: `O livro com ID ${livroId} não pertence a este empréstimo ou já foi devolvido`
        })
      }
    }

    for (const livroId of livrosIds) {
      const livro = banco.livros.find((item) => item.id === livroId)

      if (!livro) {
        return res.status(404).json({
          mensagem: `Livro com ID ${livroId} não encontrado`
        })
      }

      if (livro.qtdEmprestados <= 0) {
        return res.status(400).json({
          mensagem: `O livro "${livro.titulo}" não possui exemplares emprestados para devolução`
        })
      }

      livro.qtdEmprestados -= 1
    }

    emprestimo.livrosIds = emprestimo.livrosIds.filter(
      (id) => !livrosIds.includes(id)
    )

    if (emprestimo.livrosIds.length === 0) {
      emprestimo.status = 'concluído'
      emprestimo.dataDevolucao = new Date().toISOString().split('T')[0]
    }

    fs.writeFileSync(filePath, JSON.stringify(banco, null, 2))

    return res.status(200).json({
      mensagem: emprestimo.status === 'concluído'
        ? 'Devolução realizada e empréstimo concluído com sucesso'
        : 'Devolução parcial realizada com sucesso',
      emprestimo
    })

  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro interno ao processar devolução'
    })
  }
}