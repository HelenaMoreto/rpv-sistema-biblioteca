import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ mensagem: 'Método não permitido' })
  }

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    const parsed = JSON.parse(jsonData)

    const usuarios = parsed.usuarios ?? []
    const livros = parsed.livros ?? []
    const emprestimos = parsed.emprestimos ?? []

    const statusFiltro = req.query.status

    let emprestimosFiltrados = emprestimos

    if (statusFiltro && typeof statusFiltro === 'string') {
      emprestimosFiltrados = emprestimos.filter((e: any) => e.status === statusFiltro)
    }

    const emprestimosFormatados = emprestimosFiltrados.map((emprestimo: any) => {
      const usuario = usuarios.find((u: any) => u.id === emprestimo.usuarioId) || null

      const livrosDevolvidosIds = Array.isArray(emprestimo.livrosDevolvidosIds)
        ? emprestimo.livrosDevolvidosIds
        : []

      const livrosDetalhados = (emprestimo.livrosIds ?? []).map((livroId: string) => {
        const livro = livros.find((l: any) => l.id === livroId)

        return {
          id: livroId,
          titulo: livro?.titulo ?? 'Livro não encontrado',
          autor: livro?.autor ?? '',
          genero: livro?.genero ?? '',
          devolvido: livrosDevolvidosIds.includes(livroId)
        }
      })

      return {
        ...emprestimo,
        usuario,
        livros: livrosDetalhados,
        livrosDevolvidosIds,
        livrosPendentesIds: (emprestimo.livrosIds ?? []).filter(
          (id: string) => !livrosDevolvidosIds.includes(id)
        )
      }
    })

    return res.status(200).json({
      emprestimos: emprestimosFormatados
    })
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao buscar empréstimos',
      erro: String(error)
    })
  }
}