import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'

/* ─── estante decorativa ─── */
function BookshelfDecor() {
  const books = [
    { x: 2,  w: 5,  h: 14, color: '#c0392b' },
    { x: 8,  w: 4,  h: 12, color: '#8B4513' },
    { x: 13, w: 6,  h: 15, color: '#2980b9' },
    { x: 20, w: 4,  h: 11, color: '#27ae60' },
    { x: 25, w: 5,  h: 14, color: '#8e44ad' },
    { x: 31, w: 4,  h: 13, color: '#d35400' },
    { x: 36, w: 6,  h: 15, color: '#c0392b' },
    { x: 43, w: 4,  h: 10, color: '#16a085' },
    { x: 48, w: 5,  h: 14, color: '#f39c12' },
    { x: 54, w: 4,  h: 12, color: '#2c3e50' },
    { x: 59, w: 6,  h: 15, color: '#8B4513' },
    { x: 66, w: 4,  h: 11, color: '#c0392b' },
    { x: 71, w: 5,  h: 13, color: '#2980b9' },
    { x: 77, w: 4,  h: 14, color: '#27ae60' },
    { x: 82, w: 6,  h: 15, color: '#d35400' },
    { x: 89, w: 4,  h: 12, color: '#8e44ad' },
    { x: 94, w: 5,  h: 10, color: '#f39c12' },
  ]
  return (
    <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '48px', imageRendering: 'pixelated', display: 'block' }}
      shapeRendering="crispEdges">
      <rect x="0" y="16" width="100" height="4" fill="#5C3A1E" />
      <rect x="0" y="16" width="100" height="1" fill="#7A4E2D" />
      {books.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={16 - b.h} width={b.w} height={b.h} fill={b.color} />
          <rect x={b.x} y={16 - b.h} width={1} height={b.h} fill="rgba(255,255,255,0.22)" />
          <rect x={b.x + 1} y={16 - b.h + 3} width={b.w - 2} height={1} fill="rgba(0,0,0,0.28)" />
          <rect x={b.x + 1} y={16 - b.h + 5} width={b.w - 2} height={1} fill="rgba(0,0,0,0.15)" />
        </g>
      ))}
    </svg>
  )
}

/* ─── ícone de usuário pixel art ─── */
function PixelUserIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 16 16" shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
      {/* cabeça */}
      <rect x="5" y="1" width="6" height="6" fill={color} />
      <rect x="5" y="1" width="1" height="6" fill="rgba(0,0,0,0.25)" />
      <rect x="5" y="1" width="6" height="1" fill="rgba(255,255,255,0.3)" />
      {/* olhos */}
      <rect x="6" y="3" width="1" height="1" fill="rgba(0,0,0,0.5)" />
      <rect x="9" y="3" width="1" height="1" fill="rgba(0,0,0,0.5)" />
      {/* boca */}
      <rect x="7" y="5" width="2" height="1" fill="rgba(0,0,0,0.35)" />
      {/* corpo */}
      <rect x="4" y="8" width="8" height="6" fill={color} />
      <rect x="4" y="8" width="1" height="6" fill="rgba(0,0,0,0.2)" />
      <rect x="4" y="8" width="8" height="1" fill="rgba(255,255,255,0.2)" />
      {/* detalhe roupa */}
      <rect x="6" y="9" width="4" height="1" fill="rgba(255,255,255,0.3)" />
      <rect x="6" y="11" width="4" height="1" fill="rgba(0,0,0,0.15)" />
      {/* braços */}
      <rect x="2" y="8" width="2" height="5" fill={color} />
      <rect x="12" y="8" width="2" height="5" fill={color} />
      {/* pernas */}
      <rect x="4" y="14" width="3" height="2" fill={color} />
      <rect x="9" y="14" width="3" height="2" fill={color} />
    </svg>
  )
}

const AVATAR_COLORS = [
  '#2980b9', '#27ae60', '#8e44ad', '#d35400',
  '#16a085', '#c0392b', '#f39c12', '#8B4513',
  '#2c3e50', '#b03060', '#1a6b3a', '#7B3F00',
]

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([])

  const regras = z.object({
    nome: z.string().min(3, 'O nome deve conter pelo menos 3 caracteres'),
    email: z.string().email('Informe um e-mail válido'),
    telefone: z.string().regex(/^\d{10,11}$/, 'O telefone deve conter 10 ou 11 dígitos'),
  })

  type TypeForm = z.infer<typeof regras>

  const formulario = useForm<TypeForm>({
    resolver: zodResolver(regras),
  })

  async function enviarFormulario(camposDoFormulario: TypeForm) {
    const resposta = await fetch('/api/create/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: camposDoFormulario.nome,
        telefone: camposDoFormulario.telefone,
        email: camposDoFormulario.email,
      }),
    })

    const dados = await resposta.json()

    if (resposta.ok) {
      setUsuarios((old) => [...old, dados.usuario])
      formulario.reset()
    } else {
      alert(dados.mensagem)
    }
  }

  const erros = formulario.formState.errors

  return (
    <>
      <style>{css}</style>
      <div className="us-root">

        {/* ── Header ── */}
        <header className="us-header">
          <BookshelfDecor />
          <div className="us-header-bar">
            <span className="us-eyebrow">[ BIBLIOTECA / USUÁRIOS ]</span>
            <h1 className="us-title">Cadastro de Usuários</h1>
          </div>
        </header>

        {/* ── Conteúdo ── */}
        <main className="us-main">

          {/* ── Formulário ── */}
          <div className="us-panel">
            <div className="us-panel-head">
              <h2 className="us-panel-title">Novo usuário</h2>
            </div>

            <div className="us-panel-body">
              <form onSubmit={formulario.handleSubmit(enviarFormulario)} className="us-form">

                <div className="us-field">
                  <label className="us-label">Nome</label>
                  <input
                    type="text"
                    {...formulario.register('nome')}
                    className={`us-input ${erros.nome ? 'us-input--err' : ''}`}
                    placeholder="Ex: João da Silva"
                  />
                  {erros.nome && <span className="us-err">{erros.nome.message}</span>}
                </div>

                <div className="us-field">
                  <label className="us-label">Telefone</label>
                  <input
                    type="text"
                    {...formulario.register('telefone')}
                    className={`us-input ${erros.telefone ? 'us-input--err' : ''}`}
                    placeholder="Ex: 11999998888"
                  />
                  {erros.telefone && <span className="us-err">{erros.telefone.message}</span>}
                </div>

                <div className="us-field">
                  <label className="us-label">Email</label>
                  <input
                    type="email"
                    {...formulario.register('email')}
                    className={`us-input ${erros.email ? 'us-input--err' : ''}`}
                    placeholder="Ex: joao@email.com"
                  />
                  {erros.email && <span className="us-err">{erros.email.message}</span>}
                </div>

                <button type="submit" className="us-btn-submit">
                  [ Cadastrar Usuário ]
                </button>

              </form>
            </div>
          </div>

          {/* ── Lista ── */}
          {usuarios.length > 0 && (
            <div className="us-panel us-panel--lista">
              <div className="us-panel-head">
                <h2 className="us-panel-title">Cadastrados nesta sessão</h2>
                <span className="us-panel-count">
                  {usuarios.length} {usuarios.length === 1 ? 'usuário' : 'usuários'}
                </span>
              </div>

              <div className="us-lista">
                {usuarios.map((usuario, idx) => (
                  <div key={usuario.id} className="us-item">
                    <div
                      className="us-item-spine"
                      style={{
                        background: AVATAR_COLORS[idx % AVATAR_COLORS.length],
                        backgroundImage: 'linear-gradient(180deg,rgba(255,255,255,.28) 0,rgba(255,255,255,.28) 1px,transparent 1px,transparent 3px)',
                        backgroundSize: '100% 4px',
                      }}
                    />

                    <PixelUserIcon color={AVATAR_COLORS[idx % AVATAR_COLORS.length]} />

                    <div className="us-item-info">
                      <span className="us-item-nome">{usuario.nome}</span>
                      <span className="us-item-tel">{usuario.telefone}</span>
                      <span className="us-item-tel">{usuario.email}</span>
                    </div>

                    <div className="us-item-id">
                      <span className="us-id-label">ID</span>
                      <span className="us-id-val">{usuario.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  )
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --wd:#3B1F0E; --wm:#5C3217; --wl:#7A4A22; --wp:#8B5C2A; --wg:#4A2810;
  --p:#F2E6C8;  --pd:#E4D4A8; --pdd:#C8B47A;
  --ink:#1E0E05; --im:#7A5A38;
  --gok:#3A7D3A; --glk:#C8EAC8;
  --rok:#A02020; --rlk:#F0D0C8;
  --px:'Press Start 2P',monospace;
  --sr:'Lora',Georgia,serif;
}

.us-root{
  min-height:100vh;
  background:var(--wd);
  background-image:
    repeating-linear-gradient(0deg,transparent,transparent 15px,rgba(0,0,0,.07) 15px,rgba(0,0,0,.07) 16px),
    repeating-linear-gradient(90deg,transparent,transparent 64px,rgba(255,255,255,.015) 64px,rgba(255,255,255,.015) 65px);
  font-family:var(--sr);
  color:var(--ink);
}

/* Header */
.us-header{background:var(--wm);border-bottom:4px solid var(--wg);box-shadow:0 4px 0 var(--wd);}
.us-header-bar{padding:14px 32px 20px;}
.us-eyebrow{display:block;font-family:var(--px);font-size:6px;color:var(--pdd);letter-spacing:.1em;margin-bottom:8px;}
.us-title{font-family:var(--sr);font-size:clamp(1.4rem,3vw,2.2rem);font-weight:600;color:var(--p);text-shadow:2px 2px 0 var(--wd);line-height:1.1;}

/* Main */
.us-main{max-width:680px;margin:0 auto;padding:28px 24px 64px;display:flex;flex-direction:column;gap:24px;}

/* Panel */
.us-panel{background:var(--p);border:3px solid var(--wg);box-shadow:4px 4px 0 var(--wd),inset 0 0 0 1px rgba(255,255,255,.25);}
.us-panel-head{display:flex;align-items:baseline;justify-content:space-between;padding:14px 18px 12px;border-bottom:3px solid var(--wg);background:var(--pd);}
.us-panel-title{font-family:var(--px);font-size:9px;color:var(--ink);letter-spacing:.05em;}
.us-panel-count{font-family:var(--px);font-size:6px;color:var(--im);}
.us-panel-body{padding:22px 20px;}

/* Form */
.us-form{display:flex;flex-direction:column;gap:18px;}
.us-field{display:flex;flex-direction:column;gap:7px;}
.us-label{font-family:var(--px);font-size:7px;color:var(--im);letter-spacing:.12em;text-transform:uppercase;}
.us-input{
  width:100%;
  background:var(--pd);
  border:2px solid var(--wp);
  color:var(--ink);
  font-family:var(--sr);
  font-size:15px;
  padding:10px 12px;
  outline:none;
  border-radius:0;
  box-shadow:inset 2px 2px 0 rgba(0,0,0,.1),2px 2px 0 var(--wg);
  transition:border-color .1s,box-shadow .1s;
  -webkit-appearance:none;
  appearance:none;
}
.us-input::placeholder{color:var(--pdd);font-style:italic;}
.us-input:focus{
  border-color:var(--wg);
  background:var(--p);
  box-shadow:inset 1px 1px 0 rgba(0,0,0,.08),2px 2px 0 var(--wd);
  outline:none;
}
.us-input--err{
  border-color:var(--rok) !important;
  box-shadow:inset 1px 1px 0 rgba(160,32,32,.15),2px 2px 0 var(--rok) !important;
  background:var(--rlk) !important;
}
.us-err{
  font-family:var(--px);font-size:6px;color:var(--rok);
  letter-spacing:.06em;line-height:1.8;
  padding:4px 8px;background:var(--rlk);border-left:3px solid var(--rok);
}

/* Submit */
.us-btn-submit{
  margin-top:4px;width:100%;padding:13px 16px;
  font-family:var(--px);font-size:8px;letter-spacing:.05em;
  background:var(--wm);color:var(--p);
  border:3px solid var(--wd);cursor:pointer;
  box-shadow:3px 3px 0 var(--wd);transition:all .08s;line-height:1.8;
}
.us-btn-submit:hover{background:var(--wl);transform:translate(-1px,-1px);box-shadow:4px 4px 0 var(--wd);}
.us-btn-submit:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--wd);}

/* Lista */
.us-lista{display:flex;flex-direction:column;gap:0;}
.us-item{
  display:flex;align-items:center;gap:12px;
  padding:12px 16px;border-bottom:1px solid var(--pdd);
  background:var(--p);transition:background .1s;
}
.us-item:last-child{border-bottom:none;}
.us-item:hover{background:var(--pd);}
.us-item:nth-child(even){background:var(--pd);}
.us-item:nth-child(even):hover{background:var(--pdd);}

.us-item-spine{width:6px;align-self:stretch;flex-shrink:0;}
.us-item-info{flex:1;display:flex;flex-direction:column;gap:4px;min-width:0;}
.us-item-nome{font-family:var(--sr);font-size:1rem;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.us-item-tel{font-family:var(--px);font-size:7px;color:var(--im);letter-spacing:.06em;}

.us-item-id{display:flex;flex-direction:column;align-items:center;gap:2px;flex-shrink:0;}
.us-id-label{font-family:var(--px);font-size:5px;color:var(--pdd);letter-spacing:.1em;}
.us-id-val{font-family:var(--px);font-size:6px;color:var(--im);letter-spacing:.04em;max-width:64px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
`