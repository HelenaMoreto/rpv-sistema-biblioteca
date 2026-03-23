import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'

/* ─── estante decorativa (igual ao Emprestimos) ─── */
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

/* ─── ícone de livro pixel art para a lista ─── */
function PixelBookIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 14 14" shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', flexShrink: 0 }}>
      <rect x="1" y="1" width="12" height="12" fill={color} />
      <rect x="1" y="1" width="2" height="12" fill="rgba(0,0,0,0.35)" />
      <rect x="3" y="1" width="10" height="1" fill="rgba(255,255,255,0.3)" />
      <rect x="4" y="4" width="7" height="1" fill="rgba(255,255,255,0.45)" />
      <rect x="4" y="6" width="7" height="1" fill="rgba(255,255,255,0.45)" />
      <rect x="4" y="8" width="5" height="1" fill="rgba(255,255,255,0.45)" />
      <rect x="1" y="12" width="12" height="1" fill="rgba(0,0,0,0.25)" />
    </svg>
  )
}

const SPINE_COLORS = [
  '#c0392b', '#2980b9', '#27ae60', '#8e44ad',
  '#d35400', '#16a085', '#f39c12', '#8B4513',
  '#2c3e50', '#b03060', '#1a6b3a', '#7B3F00',
]

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
    resolver: zodResolver(regras),
  })

  async function enviarFormulario(camposDoFormulario: TypeForm) {
    const resposta = await fetch('/api/create/livros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: camposDoFormulario.titulo,
        genero: camposDoFormulario.genero,
        autor: camposDoFormulario.autor,
        quantidade: camposDoFormulario.quantidade,
      }),
    })

    const dados = await resposta.json()

    if (resposta.ok) {
      setLivros((oldState) => [...oldState, dados.livro])
      formulario.reset()
    } else {
      alert(dados.mensagem)
    }
  }

  const erros = formulario.formState.errors

  return (
    <>
      <style>{css}</style>
      <div className="lv-root">

        {/* ── Header ── */}
        <header className="lv-header">
          <BookshelfDecor />
          <div className="lv-header-bar">
            <span className="lv-eyebrow">[ BIBLIOTECA / CADASTRO ]</span>
            <h1 className="lv-title">Cadastro de Livros</h1>
          </div>
        </header>

        {/* ── Conteúdo principal ── */}
        <main className="lv-main">

          {/* ── Formulário ── */}
          <div className="lv-panel">
            <div className="lv-panel-head">
              <h2 className="lv-panel-title">Novo livro</h2>
            </div>

            <div className="lv-panel-body">
              <form onSubmit={formulario.handleSubmit(enviarFormulario)} className="lv-form">

                <div className="lv-field">
                  <label className="lv-label">Título</label>
                  <input
                    type="text"
                    {...formulario.register('titulo')}
                    className={`lv-input ${erros.titulo ? 'lv-input--err' : ''}`}
                    placeholder="Ex: Dom Casmurro"
                  />
                  {erros.titulo && <span className="lv-err">{erros.titulo.message}</span>}
                </div>

                <div className="lv-field">
                  <label className="lv-label">Gênero</label>
                  <input
                    type="text"
                    {...formulario.register('genero')}
                    className={`lv-input ${erros.genero ? 'lv-input--err' : ''}`}
                    placeholder="Ex: Romance"
                  />
                  {erros.genero && <span className="lv-err">{erros.genero.message}</span>}
                </div>

                <div className="lv-field">
                  <label className="lv-label">Autor</label>
                  <input
                    type="text"
                    {...formulario.register('autor')}
                    className={`lv-input ${erros.autor ? 'lv-input--err' : ''}`}
                    placeholder="Ex: Machado de Assis"
                  />
                  {erros.autor && <span className="lv-err">{erros.autor.message}</span>}
                </div>

                <div className="lv-field">
                  <label className="lv-label">Quantidade</label>
                  <input
                    type="number"
                    {...formulario.register('quantidade', { valueAsNumber: true })}
                    className={`lv-input ${erros.quantidade ? 'lv-input--err' : ''}`}
                    placeholder="Ex: 5"
                    min={1}
                  />
                  {erros.quantidade && <span className="lv-err">{erros.quantidade.message}</span>}
                </div>

                <button type="submit" className="lv-btn-submit">
                  [ Cadastrar Livro ]
                </button>

              </form>
            </div>
          </div>

          {/* ── Lista de livros cadastrados ── */}
          {livros.length > 0 && (
            <div className="lv-panel lv-panel--lista">
              <div className="lv-panel-head">
                <h2 className="lv-panel-title">Cadastrados nesta sessão</h2>
                <span className="lv-panel-count">{livros.length} {livros.length === 1 ? 'livro' : 'livros'}</span>
              </div>

              <div className="lv-lista">
                {livros.map((livro, idx) => (
                  <div key={livro.id} className="lv-livro-item">
                    {/* lombada colorida */}
                    <div
                      className="lv-livro-spine"
                      style={{
                        background: SPINE_COLORS[idx % SPINE_COLORS.length],
                        backgroundImage: 'linear-gradient(180deg,rgba(255,255,255,.28) 0,rgba(255,255,255,.28) 1px,transparent 1px,transparent 3px)',
                        backgroundSize: '100% 4px',
                      }}
                    />

                    <PixelBookIcon color={SPINE_COLORS[idx % SPINE_COLORS.length]} />

                    <div className="lv-livro-info">
                      <span className="lv-livro-titulo">{livro.titulo}</span>
                      <span className="lv-livro-autor">{livro.autor}</span>
                      <span className="lv-livro-genero">{livro.genero}</span>
                    </div>

                    <div className="lv-livro-qtd">
                      <span className="lv-qtd-n">{livro.quantidade}</span>
                      <span className="lv-qtd-l">exemplares</span>
                    </div>

                    <div className="lv-livro-id">
                      <span className="lv-id-label">ID</span>
                      <span className="lv-id-val">{livro.id}</span>
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

.lv-root{
  min-height:100vh;
  background:var(--wd);
  background-image:
    repeating-linear-gradient(0deg,transparent,transparent 15px,rgba(0,0,0,.07) 15px,rgba(0,0,0,.07) 16px),
    repeating-linear-gradient(90deg,transparent,transparent 64px,rgba(255,255,255,.015) 64px,rgba(255,255,255,.015) 65px);
  font-family:var(--sr);
  color:var(--ink);
}

/* Header */
.lv-header{
  background:var(--wm);
  border-bottom:4px solid var(--wg);
  box-shadow:0 4px 0 var(--wd);
}
.lv-header-bar{
  padding:14px 32px 20px;
}
.lv-eyebrow{
  display:block;
  font-family:var(--px);
  font-size:6px;
  color:var(--pdd);
  letter-spacing:.1em;
  margin-bottom:8px;
}
.lv-title{
  font-family:var(--sr);
  font-size:clamp(1.4rem,3vw,2.2rem);
  font-weight:600;
  color:var(--p);
  text-shadow:2px 2px 0 var(--wd);
  line-height:1.1;
}

/* Main */
.lv-main{
  max-width:680px;
  margin:0 auto;
  padding:28px 24px 64px;
  display:flex;
  flex-direction:column;
  gap:24px;
}

/* Panel */
.lv-panel{
  background:var(--p);
  border:3px solid var(--wg);
  box-shadow:4px 4px 0 var(--wd), inset 0 0 0 1px rgba(255,255,255,.25);
}
.lv-panel--lista{}
.lv-panel-head{
  display:flex;
  align-items:baseline;
  justify-content:space-between;
  padding:14px 18px 12px;
  border-bottom:3px solid var(--wg);
  background:var(--pd);
}
.lv-panel-title{
  font-family:var(--px);
  font-size:9px;
  color:var(--ink);
  letter-spacing:.05em;
}
.lv-panel-count{
  font-family:var(--px);
  font-size:6px;
  color:var(--im);
}
.lv-panel-body{
  padding:22px 20px;
}

/* Form */
.lv-form{
  display:flex;
  flex-direction:column;
  gap:18px;
}
.lv-field{
  display:flex;
  flex-direction:column;
  gap:7px;
}
.lv-label{
  font-family:var(--px);
  font-size:7px;
  color:var(--im);
  letter-spacing:.12em;
  text-transform:uppercase;
}
.lv-input{
  width:100%;
  background:var(--pd);
  border:2px solid var(--wp);
  color:var(--ink);
  font-family:var(--sr);
  font-size:15px;
  padding:10px 12px;
  outline:none;
  border-radius:0;
  box-shadow:inset 2px 2px 0 rgba(0,0,0,.1), 2px 2px 0 var(--wg);
  transition:border-color .1s, box-shadow .1s;
  -webkit-appearance:none;
  appearance:none;
}
.lv-input::placeholder{
  color:var(--pdd);
  font-style:italic;
}
.lv-input:focus{
  border-color:var(--wg);
  background:var(--p);
  box-shadow:inset 1px 1px 0 rgba(0,0,0,.08), 2px 2px 0 var(--wd);
  outline:none;
}
.lv-input--err{
  border-color:var(--rok) !important;
  box-shadow:inset 1px 1px 0 rgba(160,32,32,.15), 2px 2px 0 var(--rok) !important;
  background:var(--rlk) !important;
}
.lv-err{
  font-family:var(--px);
  font-size:6px;
  color:var(--rok);
  letter-spacing:.06em;
  line-height:1.8;
  padding:4px 8px;
  background:var(--rlk);
  border-left:3px solid var(--rok);
}

/* Submit button */
.lv-btn-submit{
  margin-top:4px;
  width:100%;
  padding:13px 16px;
  font-family:var(--px);
  font-size:8px;
  letter-spacing:.05em;
  background:var(--wm);
  color:var(--p);
  border:3px solid var(--wd);
  cursor:pointer;
  box-shadow:3px 3px 0 var(--wd);
  transition:all .08s;
  line-height:1.8;
}
.lv-btn-submit:hover{
  background:var(--wl);
  transform:translate(-1px,-1px);
  box-shadow:4px 4px 0 var(--wd);
}
.lv-btn-submit:active{
  transform:translate(1px,1px);
  box-shadow:1px 1px 0 var(--wd);
}

/* Lista de livros cadastrados */
.lv-lista{
  display:flex;
  flex-direction:column;
  gap:0;
}
.lv-livro-item{
  display:flex;
  align-items:center;
  gap:12px;
  padding:12px 16px;
  border-bottom:1px solid var(--pdd);
  background:var(--p);
  transition:background .1s;
}
.lv-livro-item:last-child{ border-bottom:none; }
.lv-livro-item:hover{ background:var(--pd); }
.lv-livro-item:nth-child(even){ background:var(--pd); }
.lv-livro-item:nth-child(even):hover{ background:var(--pdd); }

.lv-livro-spine{
  width:6px;
  align-self:stretch;
  flex-shrink:0;
  border-radius:0;
}
.lv-livro-info{
  flex:1;
  display:flex;
  flex-direction:column;
  gap:3px;
  min-width:0;
}
.lv-livro-titulo{
  font-family:var(--sr);
  font-size:1rem;
  font-weight:600;
  color:var(--ink);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.lv-livro-autor{
  font-family:var(--sr);
  font-size:.8rem;
  font-style:italic;
  color:var(--im);
}
.lv-livro-genero{
  font-family:var(--px);
  font-size:6px;
  color:var(--pdd);
  letter-spacing:.1em;
  text-transform:uppercase;
}
.lv-livro-qtd{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:2px;
  flex-shrink:0;
  padding:0 8px;
  border-left:1px solid var(--pdd);
  border-right:1px solid var(--pdd);
}
.lv-qtd-n{
  font-family:var(--px);
  font-size:14px;
  color:var(--gok);
  line-height:1;
  text-shadow:1px 1px 0 rgba(0,0,0,.1);
}
.lv-qtd-l{
  font-family:var(--px);
  font-size:5px;
  color:var(--im);
  letter-spacing:.08em;
}
.lv-livro-id{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:2px;
  flex-shrink:0;
}
.lv-id-label{
  font-family:var(--px);
  font-size:5px;
  color:var(--pdd);
  letter-spacing:.1em;
}
.lv-id-val{
  font-family:var(--px);
  font-size:6px;
  color:var(--im);
  letter-spacing:.04em;
  max-width:64px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
`