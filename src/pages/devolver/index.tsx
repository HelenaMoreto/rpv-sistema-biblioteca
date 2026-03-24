import { useEffect, useState } from 'react'

type LivroDoEmprestimo = {
  id: string
  titulo: string
  autor: string
}

type Emprestimo = {
  id: string
  usuarioId: string
  usuarioNome: string
  livrosIds: string[]
  livros: LivroDoEmprestimo[]
  dataEmprestimo: string
  dataDevolucao?: string
  status: 'ativo' | 'concluído'
}

export default function Devolver() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([])
  const [emprestimoSelecionado, setEmprestimoSelecionado] = useState<Emprestimo | null>(null)
  const [livrosSelecionados, setLivrosSelecionados] = useState<string[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    buscarEmprestimos()
  }, [])

  async function buscarEmprestimos() {
    try {
      setCarregando(true)

      const resposta = await fetch('/api/list/emprestimos')
      const dados = await resposta.json()

      if (!resposta.ok) {
        alert(dados.mensagem || 'Erro ao carregar empréstimos')
        return
      }

      const apenasAtivos = (dados.emprestimos || []).filter(
        (emprestimo: Emprestimo) => emprestimo.status === 'ativo'
      )

      setEmprestimos(apenasAtivos)
    } catch (error) {
      alert('Erro ao buscar empréstimos')
    } finally {
      setCarregando(false)
    }
  }

  function selecionarEmprestimo(emprestimo: Emprestimo) {
    setEmprestimoSelecionado(emprestimo)
    setLivrosSelecionados([])
  }

  function alternarLivroSelecionado(livroId: string) {
    setLivrosSelecionados((estadoAtual) => {
      if (estadoAtual.includes(livroId)) {
        return estadoAtual.filter((id) => id !== livroId)
      }

      return [...estadoAtual, livroId]
    })
  }

  async function devolverLivros() {
    if (!emprestimoSelecionado) {
      alert('Selecione um empréstimo')
      return
    }

    if (livrosSelecionados.length === 0) {
      alert('Selecione pelo menos um livro para devolver')
      return
    }

    try {
      const resposta = await fetch('/api/devolver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emprestimoId: emprestimoSelecionado.id,
          livrosIds: livrosSelecionados
        })
      })

      const dados = await resposta.json()

      if (!resposta.ok) {
        alert(dados.mensagem || 'Erro ao realizar devolução')
        return
      }

      alert(dados.mensagem)

      setEmprestimoSelecionado(null)
      setLivrosSelecionados([])

      await buscarEmprestimos()
    } catch (error) {
      alert('Erro ao realizar devolução')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Devolução de Livros
        </h1>

        {carregando ? (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            Carregando empréstimos...
          </div>
        ) : emprestimos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            Nenhum empréstimo ativo encontrado.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Empréstimos Ativos
              </h2>

              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {emprestimos.map((emprestimo) => (
                  <div
                    key={emprestimo.id}
                    className={`border rounded-lg p-4 cursor-pointer transition ${
                      emprestimoSelecionado?.id === emprestimo.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    onClick={() => selecionarEmprestimo(emprestimo)}
                  >
                    <p className="text-black"><strong>ID:</strong> {emprestimo.id}</p>
                    <p className="text-black"><strong>Usuário:</strong> {emprestimo.usuarioNome}</p>
                    <p className="text-black"><strong>Data do empréstimo:</strong> {emprestimo.dataEmprestimo}</p>
                    <p className="text-black"><strong>Status:</strong> {emprestimo.status}</p>
                    <p className="text-black mt-2">
                      <strong>Livros pendentes:</strong> {emprestimo.livros.length}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Selecionar Livros para Devolução
              </h2>

              {!emprestimoSelecionado ? (
                <p className="text-gray-600">
                  Selecione um empréstimo na lista ao lado.
                </p>
              ) : (
                <>
                  <div className="mb-4 text-black">
                    <p><strong>ID do empréstimo:</strong> {emprestimoSelecionado.id}</p>
                    <p><strong>Usuário:</strong> {emprestimoSelecionado.usuarioNome}</p>
                    <p><strong>Data do empréstimo:</strong> {emprestimoSelecionado.dataEmprestimo}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {emprestimoSelecionado.livros.map((livro) => (
                      <label
                        key={livro.id}
                        className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={livrosSelecionados.includes(livro.id)}
                          onChange={() => alternarLivroSelecionado(livro.id)}
                          className="mt-1"
                        />

                        <div className="text-black">
                          <p><strong>ID:</strong> {livro.id}</p>
                          <p><strong>Título:</strong> {livro.titulo}</p>
                          <p><strong>Autor:</strong> {livro.autor}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={devolverLivros}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg"
                  >
                    Devolver Livros Selecionados
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}