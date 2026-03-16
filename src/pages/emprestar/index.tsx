import { useEffect, useMemo, useState } from 'react'

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
  telefone: string
  email?: string
}

export default function Emprestimos() {
  const [livros, setLivros] = useState<Livro[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [mochila, setMochila] = useState<Livro[]>([])
  const [usuarioId, setUsuarioId] = useState('')
  const [dataEmprestimo, setDataEmprestimo] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  async function carregarDados() {
    try {
      setCarregando(true)
      setErro('')
      setMensagem('')

      const [resLivros, resUsuarios] = await Promise.all([
        fetch('/api/list/livros'),
        fetch('/api/list/usuarios')
      ])

      const dadosLivros = await resLivros.json()
      const dadosUsuarios = await resUsuarios.json()

      if (!resLivros.ok) {
        throw new Error(dadosLivros.mensagem || 'Erro ao buscar livros')
      }

      if (!resUsuarios.ok) {
        throw new Error(dadosUsuarios.mensagem || 'Erro ao buscar usuários')
      }

      setLivros(dadosLivros.livros || [])
      setUsuarios(dadosUsuarios.usuarios || [])
    } catch (error: any) {
      setErro(error.message || 'Erro ao carregar dados')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  function disponibilidadeDoLivro(livro: Livro) {
    return livro.quantidade - livro.qtdEmprestados
  }

  function livroJaEstaNaMochila(livroId: string) {
    return mochila.some((livro) => livro.id === livroId)
  }

  function adicionarNaMochila(livro: Livro) {
    setMensagem('')
    setErro('')

    if (disponibilidadeDoLivro(livro) <= 0) {
      setErro(`O livro "${livro.titulo}" não tem exemplares disponíveis.`)
      return
    }

    if (livroJaEstaNaMochila(livro.id)) {
      setErro(`O livro "${livro.titulo}" já está na mochila.`)
      return
    }

    setMochila((estadoAtual) => [...estadoAtual, livro])
  }

  function removerDaMochila(livroId: string) {
    setMensagem('')
    setErro('')
    setMochila((estadoAtual) => estadoAtual.filter((livro) => livro.id !== livroId))
  }

  async function realizarEmprestimo() {
    try {
      setErro('')
      setMensagem('')

      if (!usuarioId) {
        setErro('Selecione um usuário antes de realizar o empréstimo.')
        return
      }

      if (!dataEmprestimo) {
        setErro('Informe a data do empréstimo.')
        return
      }

      if (mochila.length === 0) {
        setErro('Adicione pelo menos um livro na mochila.')
        return
      }

      setEnviando(true)

      const resposta = await fetch('/api/emprestar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuarioId,
          livrosIds: mochila.map((livro) => livro.id),
          dataEmprestimo
        })
      })

      const dados = await resposta.json()

      if (!resposta.ok) {
        throw new Error(dados.mensagem || 'Erro ao realizar empréstimo')
      }

      setMensagem('Empréstimo realizado com sucesso.')
      setMochila([])
      setUsuarioId('')
      setDataEmprestimo(new Date().toISOString().split('T')[0])

      await carregarDados()
    } catch (error: any) {
      setErro(error.message || 'Erro ao realizar empréstimo')
    } finally {
      setEnviando(false)
    }
  }

  const quantidadeTotalNaMochila = mochila.length

  const usuarioSelecionado = useMemo(() => {
    return usuarios.find((usuario) => usuario.id === usuarioId)
  }, [usuarios, usuarioId])

  if (carregando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl text-center">
          <h1 className="text-2xl font-bold text-gray-800">Carregando dados...</h1>
          <p className="text-gray-600 mt-2">
            Porque até biblioteca precisa sofrer um pouco antes de funcionar.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Realizar Empréstimo</h1>
          <p className="text-gray-600 mt-2">
            Escolha os livros, jogue na mochila e registre o empréstimo sem transformar isso
            numa bagunça maior do que já é.
          </p>
        </div>

        {mensagem && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700 font-medium">
            {mensagem}
          </div>
        )}

        {erro && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 font-medium">
            {erro}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Livros disponíveis</h2>
              <button
                onClick={carregarDados}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Atualizar lista
              </button>
            </div>

            {livros.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                Não há livros cadastrados. O sistema fica lindo sem dados, só que inútil.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {livros.map((livro) => {
                  const disponiveis = disponibilidadeDoLivro(livro)
                  const indisponivel = disponiveis <= 0
                  const jaNaMochila = livroJaEstaNaMochila(livro.id)

                  return (
                    <div
                      key={livro.id}
                      className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                    >
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-gray-800">{livro.titulo}</h3>
                        <p className="text-sm text-gray-600">Autor: {livro.autor}</p>
                        <p className="text-sm text-gray-600">Gênero: {livro.genero}</p>
                      </div>

                      <div className="space-y-1 text-sm text-gray-700 mb-4">
                        <p>
                          <strong>Quantidade:</strong> {livro.quantidade}
                        </p>
                        <p>
                          <strong>Emprestados:</strong> {livro.qtdEmprestados}
                        </p>
                        <p>
                          <strong>Disponíveis:</strong> {disponiveis}
                        </p>
                      </div>

                      <button
                        onClick={() => adicionarNaMochila(livro)}
                        disabled={indisponivel || jaNaMochila}
                        className={`w-full py-2 px-4 rounded-lg font-bold transition ${
                          indisponivel || jaNaMochila
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {indisponivel
                          ? 'Indisponível'
                          : jaNaMochila
                          ? 'Já está na mochila'
                          : 'Adicionar à mochila'}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mochila</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Usuário
                </label>
                <select
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                >
                  <option value="">Selecione um usuário</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nome}
                    </option>
                  ))}
                </select>

                {usuarioSelecionado && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      <strong>Telefone:</strong> {usuarioSelecionado.telefone}
                    </p>
                    {usuarioSelecionado.email && (
                      <p>
                        <strong>Email:</strong> {usuarioSelecionado.email}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Data do empréstimo
                </label>
                <input
                  type="date"
                  value={dataEmprestimo}
                  onChange={(e) => setDataEmprestimo(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                />
              </div>

              <div className="border-t pt-4">
                <p className="text-gray-700 font-semibold mb-3">
                  Livros na mochila: {quantidadeTotalNaMochila}
                </p>

                {mochila.length === 0 ? (
                  <div className="rounded-lg bg-gray-50 border border-dashed border-gray-300 p-4 text-sm text-gray-500">
                    Nenhum livro adicionado ainda. A mochila está tão vazia quanto promessa de prazo cumprido.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mochila.map((livro) => (
                      <div
                        key={livro.id}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                      >
                        <p className="font-bold text-gray-800">{livro.titulo}</p>
                        <p className="text-sm text-gray-600">{livro.autor}</p>

                        <button
                          onClick={() => removerDaMochila(livro.id)}
                          className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={realizarEmprestimo}
                disabled={enviando}
                className={`w-full py-3 rounded-lg font-bold transition ${
                  enviando
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {enviando ? 'Realizando empréstimo...' : 'Realizar empréstimo'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}