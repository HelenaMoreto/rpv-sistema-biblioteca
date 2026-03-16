import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'

export default function Usuarios() {

  const [usuarios, setUsuarios] = useState<any[]>([])

  const regras = z.object({
    nome: z.string().min(3, 'O nome deve conter pelo menos 3 caracteres'),
    senha: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
    telefone: z.string().regex(/^\d{10,11}$/, 'O telefone deve conter 10 ou 11 dígitos'),
  })

  type TypeForm = z.infer<typeof regras>

  const formulario = useForm<TypeForm>({
    resolver: zodResolver(regras)
  })

  async function enviarFormulario(camposDoFormulario: TypeForm) {

    const resposta = await fetch('/api/create/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: camposDoFormulario.nome,
        telefone: camposDoFormulario.telefone,
        senha: camposDoFormulario.senha
      })
    })

    const dados = await resposta.json()

    if (resposta.ok) {

      setUsuarios((old) => [
        ...old,
        dados.usuario
      ])

      formulario.reset()

    } else {

      alert(dados.mensagem)

    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">

      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Usuários</h1>

        <form onSubmit={formulario.handleSubmit(enviarFormulario)} className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nome:</label>

            <input
              {...formulario.register('nome')}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
            />

            {formulario.formState.errors.nome &&
              <p className="text-red-500">{formulario.formState.errors.nome.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone:</label>

            <input
              {...formulario.register('telefone')}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
            />

            {formulario.formState.errors.telefone &&
              <p className="text-red-500">{formulario.formState.errors.telefone.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Cadastrar Usuário
          </button>

        </form>

        <div>

          {usuarios.map((usuario) => (

            <div key={usuario.id} className="mt-4 p-4 text-black bg-gray-100 rounded-lg">

             
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>Telefone:</strong> {usuario.telefone}</p>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}