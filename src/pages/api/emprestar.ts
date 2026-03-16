import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

const filePath = path.join(process.cwd(), 'src', 'pages', 'api', 'bd.json')

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido' })
  }

  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const parsed = JSON.parse(jsonData)

  const { usuarioId, livrosIds, dataEmprestimo } = req.body

  const usuarios = parsed.usuarios ?? []
  const livros = parsed.livros ?? []
  const emprestimos = parsed.emprestimos ?? []

 
  // VERIFICAR USUÁRIO
  
  const usuarioExiste = usuarios.find((u: any) => u.id === usuarioId)

  if (!usuarioExiste) {
    return res.status(400).json({
      mensagem: 'Usuário não encontrado'
    })
  }


  // VERIFICAR LIVROS

  const livrosSelecionados = livrosIds.map((id: string) =>
    livros.find((l: any) => l.id === id)
  )

  if (livrosSelecionados.includes(undefined)) {
    return res.status(400).json({
      mensagem: 'Um ou mais livros não existem'
    })
  }

  
  // VERIFICAR DISPONIBILIDADE

  for (const livro of livrosSelecionados) {
    if (livro.qtdEmprestados >= livro.quantidade) {
      return res.status(400).json({
        mensagem: `Livro "${livro.titulo}" sem estoque disponível`
      })
    }
  }

  
  // ATUALIZAR ESTOQUE
 
  livrosSelecionados.forEach((livro: any) => {
    livro.qtdEmprestados += 1
  })

 
  // CRIAR EMPRÉSTIMO

  const novoEmprestimo = {
    id: crypto.randomUUID(),
    usuarioId,
    livrosIds,
    dataEmprestimo,
    status: "ativo"
  }

  emprestimos.push(novoEmprestimo)

  parsed.emprestimos = emprestimos
  parsed.livros = livros

  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2))

  return res.status(200).json({
    mensagem: 'Empréstimo realizado com sucesso',
    emprestimo: novoEmprestimo
  })
}