import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'

export default function Livros() {

  const [livros, setLivros] = useState<any[]>([])

  const regras = z.object({
    titulo: z.string().min(3, 'O título deve conter pelo menos 3 caracteres'),
    genero: z.string().min(3, 'O gênero deve conter pelo menos 3 caracteres'),
    autor: z.string().min(3, 'O autor deve conter pelo menos 3 caracteres'),
    quantidade: z.number().min(1, 'A quantidade deve ser um número positivo'),
  })

  type TypeForm = z.infer<typeof regras>

  const formulario = useForm<TypeForm>({
    resolver: zodResolver(regras)
  })

  async function enviarFormulario(camposDoFormulario: TypeForm) {

    const resposta = await fetch('/api/create/livros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo: camposDoFormulario.titulo,
        genero: camposDoFormulario.genero,
        autor: camposDoFormulario.autor,
        quantidade: camposDoFormulario.quantidade
      })
    })

    const dados = await resposta.json()

    if (resposta.ok) {

      setLivros((oldState) => [
        ...oldState,
        dados.livro
      ])

      formulario.reset()

    } else {

      alert(dados.mensagem)

    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">

      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Cadastro livros
        </h1>

        <form
          onSubmit={formulario.handleSubmit(enviarFormulario)}
          className="space-y-6"
        >

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Título:
            </label>

            <input
              type="text"
              {...formulario.register('titulo')}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gênero:
            </label>

            <input
              type="text"
              {...formulario.register('genero')}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Autor:
            </label>

            <input
              type="text"
              {...formulario.register('autor')}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantidade:
            </label>

            <input
              type="number"
              {...formulario.register('quantidade', { valueAsNumber: true })}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Cadastrar Livro
          </button>

        </form>

        <div>

          {livros.map((livro) => (

            <div key={livro.id} className="mt-4 p-4 text-black bg-gray-100 rounded-lg">

              <p><strong>ID:</strong> {livro.id}</p>
              <p><strong>Título:</strong> {livro.titulo}</p>
              <p><strong>Gênero:</strong> {livro.genero}</p>
              <p><strong>Autor:</strong> {livro.autor}</p>
              <p><strong>Quantidade:</strong> {livro.quantidade}</p>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}