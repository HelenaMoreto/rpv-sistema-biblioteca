import { useEffect, useState } from 'react'

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

type Emprestimo = {
  id: string
  usuarioId: string
  livrosIds: string[]
  livrosDevolvidos?: string[]
  dataEmprestimo: string
  dataDevolucao?: string
  status: 'ativo' | 'concluído'
}

/* ─── pixel book ─── */
function PixelBook({ color }: { color: string }) {
  return (
    <svg width="75%" height="75%" viewBox="0 0 14 14" shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', display: 'block' }}>
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

/* ─── baú ─── */
function ChestIcon({ open }: { open: boolean }) {
  return (
    <svg width="64" height="56" viewBox="0 0 32 28" shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', display: 'block' }}>
      <rect x="1" y="14" width="30" height="13" fill="#8B5C2A" />
      <rect x="2" y="15" width="28" height="11" fill="#A0722A" />
      <rect x="2" y="15" width="28" height="1" fill="rgba(0,0,0,0.3)" />
      <rect x="1" y="14" width="1" height="13" fill="#5C3A10" />
      <rect x="30" y="14" width="1" height="13" fill="#5C3A10" />
      <rect x="1" y="26" width="30" height="1" fill="#5C3A10" />
      <rect x="2" y="27" width="4" height="1" fill="#6B4418" />
      <rect x="26" y="27" width="4" height="1" fill="#6B4418" />
      <rect x="13" y="18" width="6" height="5" fill="#C8A84A" />
      <rect x="14" y="17" width="4" height="1" fill="#C8A84A" />
      <rect x="14" y="19" width="4" height="2" fill="#8B6914" />
      <rect x="15" y="21" width="2" height="1" fill="#8B6914" />
      <g style={{
        transformOrigin: '16px 14px',
        transform: open ? 'rotateX(-50deg)' : 'rotateX(0deg)',
        transition: 'transform 0.25s ease',
      }}>
        <rect x="1" y="6" width="30" height="9" fill="#8B5C2A" />
        <rect x="2" y="7" width="28" height="7" fill="#A0722A" />
        <rect x="2" y="6" width="28" height="1" fill="#C8904A" />
        <rect x="1" y="6" width="1" height="9" fill="#5C3A10" />
        <rect x="30" y="6" width="1" height="9" fill="#5C3A10" />
        <rect x="5" y="13" width="3" height="2" fill="#7A5020" />
        <rect x="24" y="13" width="3" height="2" fill="#7A5020" />
        <rect x="3" y="4" width="26" height="2" fill="#8B5C2A" />
        <rect x="4" y="3" width="24" height="1" fill="#8B5C2A" />
        <rect x="2" y="4" width="28" height="1" fill="#C8904A" />
      </g>
    </svg>
  )
}

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

function PixelRefresh() {
  return (
    <svg width="12" height="12" viewBox="0 0 8 8" shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated' }}>
      <rect x="3" y="0" width="2" height="1" fill="currentColor" />
      <rect x="5" y="1" width="2" height="1" fill="currentColor" />
      <rect x="6" y="2" width="1" height="2" fill="currentColor" />
      <rect x="0" y="4" width="1" height="2" fill="currentColor" />
      <rect x="1" y="6" width="2" height="1" fill="currentColor" />
      <rect x="3" y="6" width="2" height="1" fill="currentColor" />
      <rect x="1" y="2" width="1" height="2" fill="currentColor" />
      <rect x="2" y="1" width="1" height="1" fill="currentColor" />
    </svg>
  )
}

const SPINE_COLORS = [
  '#c0392b', '#8B4513', '#2980b9', '#27ae60',
  '#8e44ad', '#d35400', '#16a085', '#f39c12',
  '#2c3e50', '#b03060', '#1a6b3a', '#7B3F00',
  '#c0392b', '#2980b9', '#27ae60', '#8e44ad',
  '#d35400', '#f39c12',
]

const CHEST_COLS = 9
const CHEST_ROWS = 3
const CHEST_SLOTS = CHEST_COLS * CHEST_ROWS

export default function Devolucao() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([])
  const [livros, setLivros]           = useState<Livro[]>([])
  const [usuarios, setUsuarios]       = useState<Usuario[]>([])

  const [emprestimoId, setEmprestimoId] = useState('')
  const [selecionados, setSelecionados] = useState<string[]>([])

  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando]     = useState(false)
  const [mensagem, setMensagem]     = useState('')
  const [erro, setErro]             = useState('')
  const [bauAberto, setBauAberto]   = useState(false)
  const [slotHover, setSlotHover]   = useState<number | null>(null)

  async function carregarDados() {
    try {
      setCarregando(true); setErro(''); setMensagem('')
      const [resEmp, resLiv, resUsu] = await Promise.all([
        fetch('/api/list/emprestimos'),
        fetch('/api/list/livros'),
        fetch('/api/list/usuarios'),
      ])
      const dEmp = await resEmp.json()
      const dLiv = await resLiv.json()
      const dUsu = await resUsu.json()
      if (!resEmp.ok) throw new Error(dEmp.mensagem || 'Erro ao buscar empréstimos')
      if (!resLiv.ok) throw new Error(dLiv.mensagem || 'Erro ao buscar livros')
      if (!resUsu.ok) throw new Error(dUsu.mensagem || 'Erro ao buscar usuários')
      setEmprestimos(dEmp.emprestimos || [])
      setLivros(dLiv.livros || [])
      setUsuarios(dUsu.usuarios || [])
    } catch (e: any) {
      setErro(e.message || 'Erro ao carregar dados')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => { carregarDados() }, [])

  /* empréstimos ativos */
  const emprestimosAtivos = emprestimos.filter(e => e.status === 'ativo')

  /* empréstimo selecionado */
  const emprestimoAtual = emprestimosAtivos.find(e => e.id === emprestimoId) ?? null

  /* livros ainda não devolvidos do empréstimo selecionado */
  const livrosPendentes = emprestimoAtual
    ? emprestimoAtual.livrosIds
        .filter(id => !(emprestimoAtual.livrosDevolvidos ?? []).includes(id))
        .map(id => livros.find(l => l.id === id))
        .filter(Boolean) as Livro[]
    : []

  /* usuário do empréstimo */
  const usuarioDoEmprestimo = emprestimoAtual
    ? usuarios.find(u => u.id === emprestimoAtual.usuarioId)
    : null

  function toggleSelecionado(livroId: string) {
    setMensagem(''); setErro('')
    setSelecionados(prev =>
      prev.includes(livroId)
        ? prev.filter(id => id !== livroId)
        : [...prev, livroId]
    )
  }

  function selecionarTodos() {
    setSelecionados(livrosPendentes.map(l => l.id))
    setBauAberto(true)
  }

  async function realizarDevolucao() {
    try {
      setErro(''); setMensagem('')
      if (!emprestimoId) { setErro('Selecione um empréstimo.'); return }
      if (selecionados.length === 0) { setErro('Selecione pelo menos um livro para devolver.'); return }
      setEnviando(true)

      const resposta = await fetch('/api/devolver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emprestimoId, livrosIds: selecionados }),
      })
      const dados = await resposta.json()
      if (!resposta.ok) throw new Error(dados.mensagem || 'Erro ao realizar devolução')

      setMensagem(dados.mensagem)
      setSelecionados([])
      setEmprestimoId('')
      setBauAberto(false)
      await carregarDados()
    } catch (e: any) {
      setErro(e.message || 'Erro ao realizar devolução')
    } finally {
      setEnviando(false)
    }
  }

  /* slots do baú: livros pendentes preenchem, resto vazio */
  const slots = Array.from({ length: CHEST_SLOTS }, (_, i) =>
    livrosPendentes[i] ?? null
  )

  if (carregando) {
    return (
      <>
        <style>{css}</style>
        <div className="dv-loading">
          <div style={{ width: 360 }}><BookshelfDecor /></div>
          <p className="dv-loading-text">carregando empréstimos...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{css}</style>
      <div className="dv-root">

        {/* ── Header ── */}
        <header className="dv-header">
          <BookshelfDecor />
          <div className="dv-header-bar">
            <div>
              <span className="dv-eyebrow">[ BIBLIOTECA / DEVOLUÇÃO ]</span>
              <h1 className="dv-header-title">Realizar Devolução</h1>
            </div>
            <button onClick={carregarDados} className="dv-btn-refresh">
              <PixelRefresh /> Atualizar
            </button>
          </div>
        </header>

        {mensagem && (
          <div className="dv-alert dv-alert--ok">
            <span className="dv-alert-badge">OK</span>{mensagem}
          </div>
        )}
        {erro && (
          <div className="dv-alert dv-alert--err">
            <span className="dv-alert-badge">!</span>{erro}
          </div>
        )}

        <div className="dv-layout">

          {/* ── Painel de empréstimos ativos ── */}
          <section className="dv-panel">
            <div className="dv-panel-head">
              <h2 className="dv-panel-title">Empréstimos ativos</h2>
              <span className="dv-panel-count">{emprestimosAtivos.length} ativos</span>
            </div>

            {emprestimosAtivos.length === 0 ? (
              <p className="dv-empty">Nenhum empréstimo ativo no momento.</p>
            ) : (
              <div className="dv-emp-lista">
                {emprestimosAtivos.map(emp => {
                  const usuario = usuarios.find(u => u.id === emp.usuarioId)
                  const pendentes = emp.livrosIds.filter(
                    id => !(emp.livrosDevolvidos ?? []).includes(id)
                  ).length
                  const selecionado = emp.id === emprestimoId

                  return (
                    <button
                      key={emp.id}
                      className={`dv-emp-card ${selecionado ? 'dv-emp-card--sel' : ''}`}
                      onClick={() => {
                        setEmprestimoId(emp.id)
                        setSelecionados([])
                        setBauAberto(false)
                        setMensagem(''); setErro('')
                      }}
                    >
                      {/* lombada */}
                      <div className="dv-emp-spine" />

                      <div className="dv-emp-info">
                        <span className="dv-emp-usuario">{usuario?.nome ?? '—'}</span>
                        <span className="dv-emp-data">Emprestado em {emp.dataEmprestimo}</span>
                        <span className="dv-emp-livros">
                          {emp.livrosIds.length} livro{emp.livrosIds.length !== 1 ? 's' : ''} —{' '}
                          {pendentes} pendente{pendentes !== 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className={`dv-emp-status ${selecionado ? 'dv-emp-status--sel' : ''}`}>
                        {selecionado ? '▶' : '○'}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </section>

          {/* ── Sidebar: baú de devolução ── */}
          <aside className="dv-sidebar">
            <BookshelfDecor />
            <div className="dv-sidebar-body">

              {/* info do leitor */}
              {usuarioDoEmprestimo ? (
                <div className="dv-leitor-box">
                  <span className="dv-fl">Leitor</span>
                  <span className="dv-leitor-nome">{usuarioDoEmprestimo.nome}</span>
                  <span className="dv-leitor-tel">{usuarioDoEmprestimo.telefone}</span>
                  {usuarioDoEmprestimo.email && (
                    <span className="dv-leitor-tel">{usuarioDoEmprestimo.email}</span>
                  )}
                </div>
              ) : (
                <div className="dv-leitor-box dv-leitor-box--empty">
                  <span className="dv-fl">Leitor</span>
                  <span className="dv-leitor-hint">Selecione um empréstimo</span>
                </div>
              )}

              {/* data empréstimo */}
              {emprestimoAtual && (
                <div className="dv-info-row">
                  <span className="dv-fl">Data do empréstimo</span>
                  <span className="dv-info-val">{emprestimoAtual.dataEmprestimo}</span>
                </div>
              )}

              {/* ── BAÚ ── */}
              <div className="dv-bau-wrapper">
                <div className="dv-bau-header">
                  <button
                    className="dv-bau-toggle"
                    onClick={() => setBauAberto(v => !v)}
                    disabled={!emprestimoAtual}
                    title={bauAberto ? 'Fechar baú' : 'Abrir baú'}
                  >
                    <ChestIcon open={bauAberto} />
                  </button>
                  <div className="dv-bau-meta">
                    <span className="dv-bau-title">Devolver</span>
                    <span className="dv-bau-count">
                      {selecionados.length}/{livrosPendentes.length} selecionados
                    </span>
                    {emprestimoAtual && livrosPendentes.length > 0 && (
                      <button className="dv-btn-todos" onClick={selecionarTodos}>
                        selecionar todos
                      </button>
                    )}
                  </div>
                </div>

                {/* inventário */}
                <div className={`dv-inventory ${bauAberto ? 'dv-inventory--open' : ''}`}>
                  <div className="dv-inv-label">Livros do empréstimo</div>
                  <div className="dv-inv-grid">
                    {slots.map((livro, i) => {
                      const cor = livro
                        ? SPINE_COLORS[livrosPendentes.indexOf(livro) % SPINE_COLORS.length]
                        : null
                      const marcado = livro ? selecionados.includes(livro.id) : false

                      return (
                        <div
                          key={i}
                          className={`dv-slot ${livro ? 'dv-slot--filled' : ''} ${marcado ? 'dv-slot--marked' : ''} ${slotHover === i && livro ? 'dv-slot--hover' : ''}`}
                          onMouseEnter={() => setSlotHover(i)}
                          onMouseLeave={() => setSlotHover(null)}
                          onClick={() => livro && toggleSelecionado(livro.id)}
                          title={livro ? `${livro.titulo} — clique para ${marcado ? 'desmarcar' : 'devolver'}` : ''}
                        >
                          {livro && cor && (
                            <>
                              <PixelBook color={marcado ? '#3A7D3A' : cor} />
                              {/* check verde se marcado */}
                              {marcado && (
                                <div className="dv-slot-check">✓</div>
                              )}
                              {slotHover === i && !marcado && (
                                <div className="dv-slot-tooltip">
                                  <span className="dv-tt-titulo">{livro.titulo}</span>
                                  <span className="dv-tt-autor">{livro.autor}</span>
                                  <span className="dv-tt-action">Clique para devolver</span>
                                </div>
                              )}
                              {slotHover === i && marcado && (
                                <div className="dv-slot-tooltip dv-slot-tooltip--unmark">
                                  <span className="dv-tt-titulo">{livro.titulo}</span>
                                  <span className="dv-tt-action" style={{ color: '#FF5555' }}>Clique para desmarcar</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div className="dv-inv-label" style={{ marginTop: 8 }}>Inventário</div>
                  <div className="dv-hotbar">
                    {Array.from({ length: 9 }, (_, i) => (
                      <div key={i} className="dv-slot" />
                    ))}
                  </div>
                </div>

                {/* lista compacta quando fechado */}
                {!bauAberto && selecionados.length > 0 && (
                  <div className="dv-closed-list">
                    {selecionados.map(id => {
                      const livro = livros.find(l => l.id === id)
                      const idx = livrosPendentes.findIndex(l => l.id === id)
                      return (
                        <div key={id} className="dv-cl-item">
                          <div className="dv-cl-spine"
                            style={{ background: SPINE_COLORS[idx % SPINE_COLORS.length] }} />
                          <span className="dv-cl-titulo">{livro?.titulo ?? id}</span>
                          <button onClick={() => toggleSelecionado(id)} className="dv-cl-rm">×</button>
                        </div>
                      )
                    })}
                  </div>
                )}

                {!bauAberto && !emprestimoAtual && (
                  <div className="dv-bau-hint">Selecione um empréstimo para abrir o baú</div>
                )}

                {!bauAberto && emprestimoAtual && selecionados.length === 0 && (
                  <div className="dv-bau-hint">Clique no baú para ver os livros</div>
                )}
              </div>

              <button
                onClick={realizarDevolucao}
                disabled={enviando || selecionados.length === 0}
                className={`dv-btn-confirmar ${enviando || selecionados.length === 0 ? 'dv-btn--disabled' : ''}`}
              >
                {enviando ? '[ processando... ]' : '[ Confirmar devolução ]'}
              </button>

            </div>
          </aside>
        </div>
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
.dv-root{
  min-height:100vh;
  background:var(--wd);
  background-image:
    repeating-linear-gradient(0deg,transparent,transparent 15px,rgba(0,0,0,.07) 15px,rgba(0,0,0,.07) 16px),
    repeating-linear-gradient(90deg,transparent,transparent 64px,rgba(255,255,255,.015) 64px,rgba(255,255,255,.015) 65px);
  color:var(--ink);font-family:var(--sr);
}

/* Loading */
.dv-loading{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;background:var(--wd);}
.dv-loading-text{font-family:var(--px);font-size:8px;color:var(--p);letter-spacing:.06em;animation:blink 1s step-end infinite;}
@keyframes blink{50%{opacity:0;}}

/* Header */
.dv-header{background:var(--wm);border-bottom:4px solid var(--wg);box-shadow:0 4px 0 var(--wd);}
.dv-header-bar{display:flex;align-items:center;justify-content:space-between;padding:14px 28px 18px;gap:16px;}
.dv-eyebrow{display:block;font-family:var(--px);font-size:6px;color:var(--pdd);letter-spacing:.1em;margin-bottom:8px;}
.dv-header-title{font-family:var(--sr);font-size:clamp(1.3rem,3vw,1.9rem);font-weight:600;color:var(--p);text-shadow:2px 2px 0 var(--wd);line-height:1.1;}
.dv-btn-refresh{display:flex;align-items:center;gap:8px;font-family:var(--px);font-size:6px;color:var(--p);background:var(--wg);border:2px solid var(--pdd);padding:8px 14px;cursor:pointer;letter-spacing:.05em;box-shadow:2px 2px 0 rgba(0,0,0,.5);transition:all .08s;white-space:nowrap;}
.dv-btn-refresh:hover{background:var(--wl);transform:translate(-1px,-1px);box-shadow:3px 3px 0 rgba(0,0,0,.5);}
.dv-btn-refresh:active{transform:translate(1px,1px);box-shadow:1px 1px 0 rgba(0,0,0,.5);}

/* Alerts */
.dv-alert{margin:12px 28px 0;padding:10px 16px;display:flex;align-items:center;gap:10px;font-family:var(--px);font-size:6.5px;letter-spacing:.04em;line-height:2;border:2px solid;box-shadow:3px 3px 0 rgba(0,0,0,.4);}
.dv-alert--ok{background:var(--glk);color:var(--gok);border-color:var(--gok);}
.dv-alert--err{background:var(--rlk);color:var(--rok);border-color:var(--rok);}
.dv-alert-badge{font-weight:bold;padding:2px 6px;border:1px solid currentColor;flex-shrink:0;}

/* Layout */
.dv-layout{display:grid;grid-template-columns:1fr 430px;gap:20px;max-width:1560px;margin:0 auto;padding:20px 28px 48px;align-items:start;}
@media(max-width:1050px){.dv-layout{grid-template-columns:1fr;padding:16px;}}

/* Panel */
.dv-panel{background:var(--p);border:3px solid var(--wg);box-shadow:4px 4px 0 var(--wd),inset 0 0 0 1px rgba(255,255,255,.25);}
.dv-panel-head{display:flex;align-items:baseline;justify-content:space-between;padding:14px 18px 12px;border-bottom:3px solid var(--wg);background:var(--pd);}
.dv-panel-title{font-family:var(--px);font-size:9px;color:var(--ink);letter-spacing:.05em;}
.dv-panel-count{font-family:var(--px);font-size:6px;color:var(--im);}
.dv-empty{padding:40px 24px;text-align:center;font-family:var(--px);font-size:7px;color:var(--im);line-height:2.2;}

/* Lista de empréstimos */
.dv-emp-lista{padding:14px;display:flex;flex-direction:column;gap:8px;}
.dv-emp-card{
  display:flex;align-items:center;gap:0;
  background:var(--pd);border:2px solid var(--wp);
  box-shadow:3px 3px 0 var(--wg);
  cursor:pointer;text-align:left;
  transition:transform .08s,box-shadow .08s;
  overflow:hidden;width:100%;
}
.dv-emp-card:hover{transform:translate(-1px,-2px);box-shadow:4px 5px 0 var(--wg);}
.dv-emp-card--sel{border-color:var(--rok);box-shadow:3px 3px 0 var(--rok);}
.dv-emp-spine{
  width:7px;align-self:stretch;flex-shrink:0;
  background:#c0392b;
  background-image:linear-gradient(180deg,rgba(255,255,255,.28) 0,rgba(255,255,255,.28) 1px,transparent 1px,transparent 3px);
  background-size:100% 4px;
}
.dv-emp-card--sel .dv-emp-spine{background:var(--rok);}
.dv-emp-info{flex:1;padding:12px 14px;display:flex;flex-direction:column;gap:4px;}
.dv-emp-usuario{font-family:var(--sr);font-size:1rem;font-weight:600;color:var(--ink);}
.dv-emp-data{font-family:var(--px);font-size:6px;color:var(--im);letter-spacing:.06em;}
.dv-emp-livros{font-family:var(--px);font-size:6px;color:var(--rok);letter-spacing:.05em;}
.dv-emp-status{font-family:var(--px);font-size:10px;color:var(--pdd);padding:0 14px;flex-shrink:0;}
.dv-emp-status--sel{color:var(--rok);}

/* Sidebar */
.dv-sidebar{position:sticky;top:16px;}
.dv-sidebar-body{background:var(--wm);border:3px solid var(--wg);border-top:none;box-shadow:4px 4px 0 var(--wd);padding:18px 16px;display:flex;flex-direction:column;gap:16px;}

.dv-fl{font-family:var(--px);font-size:5.5px;color:var(--pdd);letter-spacing:.12em;text-transform:uppercase;display:block;margin-bottom:6px;}
.dv-leitor-box{display:flex;flex-direction:column;gap:3px;padding:10px 12px;background:rgba(0,0,0,.15);border:1px solid var(--wg);}
.dv-leitor-box--empty{}
.dv-leitor-nome{font-family:var(--sr);font-size:1rem;font-weight:600;color:var(--p);}
.dv-leitor-tel{font-family:var(--px);font-size:6px;color:var(--pdd);letter-spacing:.06em;}
.dv-leitor-hint{font-family:var(--px);font-size:6px;color:var(--wl);letter-spacing:.06em;line-height:2;}
.dv-info-row{display:flex;flex-direction:column;gap:4px;}
.dv-info-val{font-family:var(--px);font-size:8px;color:var(--p);letter-spacing:.04em;}

/* BAÚ */
.dv-bau-wrapper{display:flex;flex-direction:column;gap:0;}
.dv-bau-header{display:flex;align-items:center;gap:12px;padding:10px 12px;background:#3C3C3C;border:3px solid;border-color:#FFF #373737 #373737 #FFF;}
.dv-bau-toggle{background:none;border:none;padding:0;cursor:pointer;display:flex;align-items:center;filter:drop-shadow(2px 2px 0 rgba(0,0,0,.6));transition:filter .08s;}
.dv-bau-toggle:hover:not(:disabled){filter:drop-shadow(2px 2px 0 rgba(255,100,80,.5));}
.dv-bau-toggle:disabled{opacity:.4;cursor:not-allowed;}
.dv-bau-meta{display:flex;flex-direction:column;gap:4px;}
.dv-bau-title{font-family:var(--px);font-size:9px;color:#FFF;text-shadow:1px 1px 0 #000;letter-spacing:.04em;}
.dv-bau-count{font-family:var(--px);font-size:6px;color:#AAAAAA;letter-spacing:.06em;}
.dv-btn-todos{
  font-family:var(--px);font-size:5.5px;color:#FFCC44;
  background:none;border:1px solid #FFCC44;padding:3px 6px;
  cursor:pointer;letter-spacing:.04em;margin-top:2px;
  transition:all .08s;
}
.dv-btn-todos:hover{background:rgba(255,204,68,.15);}

/* Inventário */
.dv-inventory{
  display:none;flex-direction:column;gap:6px;
  background:#C6C6C6;border:3px solid;
  border-color:#FFF #373737 #373737 #FFF;
  padding:10px;image-rendering:pixelated;
  box-sizing:border-box;width:100%;
}
.dv-inventory--open{display:flex;}
.dv-inv-label{font-family:var(--px);font-size:6px;color:#1E1E1E;letter-spacing:.04em;margin-bottom:2px;}
.dv-inv-grid{display:grid;grid-template-columns:repeat(9,1fr);grid-auto-rows:1fr;aspect-ratio:9/3;gap:2px;width:100%;}
.dv-slot{
  background:#8B8B8B;border:2px solid;
  border-color:#373737 #FFF #FFF #373737;
  display:flex;align-items:center;justify-content:center;
  position:relative;cursor:default;
  transition:background .05s;aspect-ratio:1;min-width:0;overflow:visible;
}
.dv-slot--filled{cursor:pointer;}
.dv-slot--hover{background:#FFF8C0 !important;border-color:#FFF #373737 #373737 #FFF !important;}
.dv-slot--marked{background:#1a3a1a !important;border-color:#3A7D3A #1a3a1a #1a3a1a #3A7D3A !important;}
.dv-slot-check{
  position:absolute;bottom:1px;right:2px;
  font-family:var(--px);font-size:7px;color:#5FE05F;
  text-shadow:1px 1px 0 #000;pointer-events:none;
}
.dv-slot-tooltip{
  position:absolute;bottom:calc(100% + 4px);left:50%;transform:translateX(-50%);
  background:#100010;border:2px solid #5A005A;
  padding:4px 8px;z-index:99;white-space:nowrap;pointer-events:none;
  display:flex;flex-direction:column;gap:2px;box-shadow:2px 2px 0 rgba(0,0,0,.8);
}
.dv-slot-tooltip--unmark{border-color:#5A0000;}
.dv-tt-titulo{font-family:var(--px);font-size:5.5px;color:#FFF;letter-spacing:.04em;}
.dv-tt-autor{font-family:var(--px);font-size:5px;color:#AAAAFF;letter-spacing:.03em;}
.dv-tt-action{font-family:var(--px);font-size:4.5px;color:#55FF55;letter-spacing:.03em;margin-top:2px;}
.dv-hotbar{display:grid;grid-template-columns:repeat(9,1fr);gap:2px;width:100%;margin-top:2px;border-top:2px solid #373737;padding-top:6px;}

/* Lista compacta */
.dv-closed-list{display:flex;flex-direction:column;gap:2px;background:#5A5A5A;border:2px solid;border-color:#373737 #FFF #FFF #373737;border-top:none;padding:6px;}
.dv-cl-item{display:flex;align-items:center;gap:6px;background:#4A4A4A;border:1px solid #373737;padding:4px 6px;}
.dv-cl-spine{width:4px;align-self:stretch;flex-shrink:0;background-image:linear-gradient(180deg,rgba(255,255,255,.3) 0,rgba(255,255,255,.3) 1px,transparent 1px,transparent 3px);background-size:100% 4px;}
.dv-cl-titulo{flex:1;font-family:var(--px);font-size:5.5px;color:#FFF;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.03em;}
.dv-cl-rm{background:none;border:none;color:#AAAAAA;font-size:14px;cursor:pointer;padding:0 2px;line-height:1;transition:color .1s;}
.dv-cl-rm:hover{color:#FF5555;}
.dv-bau-hint{background:#4A4A4A;border:2px solid;border-color:#373737 #FFF #FFF #373737;border-top:none;padding:10px;font-family:var(--px);font-size:5.5px;color:#999;text-align:center;line-height:2.2;letter-spacing:.04em;}

/* Botão confirmar */
.dv-btn-confirmar{width:100%;padding:12px 14px;font-family:var(--px);font-size:7px;letter-spacing:.04em;background:var(--p);color:var(--ink);border:3px solid var(--wd);cursor:pointer;box-shadow:3px 3px 0 var(--wd);transition:all .08s;line-height:1.8;}
.dv-btn-confirmar:hover:not(.dv-btn--disabled){background:var(--glk);color:var(--gok);border-color:var(--gok);box-shadow:3px 3px 0 var(--gok);transform:translate(-1px,-1px);}
.dv-btn-confirmar:active:not(.dv-btn--disabled){transform:translate(1px,1px);box-shadow:1px 1px 0 var(--wd);}
.dv-btn--disabled{background:var(--pdd);color:var(--im);cursor:not-allowed;box-shadow:1px 1px 0 var(--wd);animation:blink 1s step-end infinite;}
`