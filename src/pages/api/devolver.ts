import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json')

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido' })
  }

  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const parsed = JSON.parse(jsonData)

  const { emprestimoId, livrosIds } = req.body

  const livros = parsed.livros ?? []
  const emprestimos = parsed.emprestimos ?? []


  // VALIDAR ENTRADA

  if (!emprestimoId || !Array.isArray(livrosIds) || livrosIds.length === 0) {
    return res.status(400).json({
      mensagem: 'emprestimoId e livrosIds são obrigatórios'
    })
  }


  // LOCALIZAR EMPRÉSTIMO

  const emprestimo = emprestimos.find((e: any) => e.id === emprestimoId)

  if (!emprestimo) {
    return res.status(400).json({
      mensagem: 'Empréstimo não encontrado'
    })
  }

  if (emprestimo.status !== 'ativo') {
    return res.status(400).json({
      mensagem: 'Este empréstimo já foi concluído'
    })
  }


  // VALIDAR QUE OS LIVROS PERTENCEM AO EMPRÉSTIMO

  for (const livroId of livrosIds) {
    if (!emprestimo.livrosIds.includes(livroId)) {
      return res.status(400).json({
        mensagem: `Livro "${livroId}" não pertence a este empréstimo`
      })
    }
  }


  // ATUALIZAR ESTOQUE — decrementar qtdEmprestados de cada livro devolvido

  for (const livroId of livrosIds) {
    const livro = livros.find((l: any) => l.id === livroId)

    if (livro && livro.qtdEmprestados > 0) {
      livro.qtdEmprestados -= 1
    }
  }


  // VERIFICAR SE TODOS OS LIVROS DO EMPRÉSTIMO FORAM DEVOLVIDOS
  // Controla quais livros já foram devolvidos acumulando nas devoluções parciais

  const jaDevolvidos: string[] = emprestimo.livrosDevolvidos ?? []
  const agoraDevolvidos = [...new Set([...jaDevolvidos, ...livrosIds])]

  emprestimo.livrosDevolvidos = agoraDevolvidos

  const todosDevolvidos = emprestimo.livrosIds.every((id: string) =>
    agoraDevolvidos.includes(id)
  )

  if (todosDevolvidos) {
    emprestimo.status = 'concluído'
    emprestimo.dataDevolucao = new Date().toISOString().split('T')[0]
  }


  // SALVAR

  parsed.emprestimos = emprestimos
  parsed.livros = livros

  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2))

  return res.status(200).json({
    mensagem: todosDevolvidos
      ? 'Todos os livros foram devolvidos. Empréstimo concluído!'
      : 'Devolução parcial registrada com sucesso.',
    emprestimo
  })
}