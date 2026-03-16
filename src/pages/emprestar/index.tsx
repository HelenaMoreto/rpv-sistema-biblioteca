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

/* ─── pixel book icon (para os slots do baú) ─── */
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

/* ─── baú SVG (frontal, pixel art) ─── */
function ChestIcon({ open }: { open: boolean }) {
  return (
    <svg width="64" height="56" viewBox="0 0 32 28" shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', display: 'block' }}>
      {/* ── corpo (parte de baixo) ── */}
      <rect x="1" y="14" width="30" height="13" fill="#8B5C2A" />
      {/* face frontal corpo */}
      <rect x="2" y="15" width="28" height="11" fill="#A0722A" />
      {/* sombra interna topo corpo */}
      <rect x="2" y="15" width="28" height="1" fill="rgba(0,0,0,0.3)" />
      {/* borda esq corpo */}
      <rect x="1" y="14" width="1" height="13" fill="#5C3A10" />
      {/* borda dir corpo */}
      <rect x="30" y="14" width="1" height="13" fill="#5C3A10" />
      {/* borda base */}
      <rect x="1" y="26" width="30" height="1" fill="#5C3A10" />
      {/* pés */}
      <rect x="2" y="27" width="4" height="1" fill="#6B4418" />
      <rect x="26" y="27" width="4" height="1" fill="#6B4418" />
      {/* fecho (cadeado) */}
      <rect x="13" y="18" width="6" height="5" fill="#C8A84A" />
      <rect x="14" y="17" width="4" height="1" fill="#C8A84A" />
      <rect x="14" y="19" width="4" height="2" fill="#8B6914" />
      <rect x="15" y="21" width="2" height="1" fill="#8B6914" />

      {/* ── tampa ── */}
      <g style={{
        transformOrigin: '16px 14px',
        transform: open ? 'rotateX(-50deg)' : 'rotateX(0deg)',
        transition: 'transform 0.25s ease',
      }}>
        {/* base da tampa */}
        <rect x="1" y="6" width="30" height="9" fill="#8B5C2A" />
        {/* face frontal tampa */}
        <rect x="2" y="7" width="28" height="7" fill="#A0722A" />
        {/* highlight topo tampa */}
        <rect x="2" y="6" width="28" height="1" fill="#C8904A" />
        {/* borda esq tampa */}
        <rect x="1" y="6" width="1" height="9" fill="#5C3A10" />
        {/* borda dir tampa */}
        <rect x="30" y="6" width="1" height="9" fill="#5C3A10" />
        {/* dobradiças */}
        <rect x="5" y="13" width="3" height="2" fill="#7A5020" />
        <rect x="24" y="13" width="3" height="2" fill="#7A5020" />
        {/* topo arredondado (pixel) */}
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
    <svg width="12" height="12" viewBox="0 0 8 8" shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
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

/* slots totais do baú do Minecraft: 27 (3 linhas × 9 colunas) */
const CHEST_ROWS = 3
const CHEST_COLS = 9
const CHEST_SLOTS = CHEST_ROWS * CHEST_COLS

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
  const [bauAberto, setBauAberto] = useState(false)
  const [slotHover, setSlotHover] = useState<number | null>(null)

  async function carregarDados() {
    try {
      setCarregando(true); setErro(''); setMensagem('')
      const [resLivros, resUsuarios] = await Promise.all([
        fetch('/api/list/livros'),
        fetch('/api/list/usuarios'),
      ])
      const dadosLivros = await resLivros.json()
      const dadosUsuarios = await resUsuarios.json()
      if (!resLivros.ok) throw new Error(dadosLivros.mensagem || 'Erro ao buscar livros')
      if (!resUsuarios.ok) throw new Error(dadosUsuarios.mensagem || 'Erro ao buscar usuários')
      setLivros(dadosLivros.livros || [])
      setUsuarios(dadosUsuarios.usuarios || [])
    } catch (error: any) {
      setErro(error.message || 'Erro ao carregar dados')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => { carregarDados() }, [])

  function disponibilidadeDoLivro(livro: Livro) {
    return livro.quantidade - livro.qtdEmprestados
  }

  function livroJaEstaNaMochila(livroId: string) {
    return mochila.some((l) => l.id === livroId)
  }

  function adicionarNaMochila(livro: Livro) {
    setMensagem(''); setErro('')
    if (disponibilidadeDoLivro(livro) <= 0) {
      setErro(`O livro "${livro.titulo}" não tem exemplares disponíveis.`); return
    }
    if (livroJaEstaNaMochila(livro.id)) {
      setErro(`O livro "${livro.titulo}" já está no baú.`); return
    }
    if (mochila.length >= CHEST_SLOTS) {
      setErro('O baú está cheio! Máximo de 27 livros.'); return
    }
    setMochila((prev) => [...prev, livro])
    setBauAberto(true)
  }

  function removerDaMochila(livroId: string) {
    setMensagem(''); setErro('')
    setMochila((prev) => prev.filter((l) => l.id !== livroId))
  }

  async function realizarEmprestimo() {
    try {
      setErro(''); setMensagem('')
      if (!usuarioId) { setErro('Selecione um usuário antes de realizar o empréstimo.'); return }
      if (!dataEmprestimo) { setErro('Informe a data do empréstimo.'); return }
      if (mochila.length === 0) { setErro('Adicione pelo menos um livro no baú.'); return }
      setEnviando(true)
      const resposta = await fetch('/api/emprestar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId, livrosIds: mochila.map((l) => l.id), dataEmprestimo }),
      })
      const dados = await resposta.json()
      if (!resposta.ok) throw new Error(dados.mensagem || 'Erro ao realizar empréstimo')
      setMensagem('Empréstimo realizado com sucesso.')
      setMochila([]); setUsuarioId('')
      setDataEmprestimo(new Date().toISOString().split('T')[0])
      setBauAberto(false)
      await carregarDados()
    } catch (error: any) {
      setErro(error.message || 'Erro ao realizar empréstimo')
    } finally {
      setEnviando(false)
    }
  }

  const quantidadeTotalNaMochila = mochila.length
  const usuarioSelecionado = useMemo(
    () => usuarios.find((u) => u.id === usuarioId),
    [usuarios, usuarioId]
  )

  /* monta array de 27 slots */
  const slots = Array.from({ length: CHEST_SLOTS }, (_, i) => mochila[i] ?? null)

  if (carregando) {
    return (
      <>
        <style>{css}</style>
        <div className="loading-screen">
          <div style={{ width: 360 }}><BookshelfDecor /></div>
          <p className="loading-text">carregando acervo...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{css}</style>
      <div className="root">

        {/* ── Header ── */}
        <header className="header">
          <BookshelfDecor />
          <div className="header-bar">
            <div>
              <span className="eyebrow">[ BIBLIOTECA / EMPRÉSTIMOS ]</span>
              <h1 className="header-title">Registrar Empréstimo</h1>
            </div>
            <button onClick={carregarDados} className="btn-refresh">
              <PixelRefresh /> Atualizar
            </button>
          </div>
        </header>

        {mensagem && (
          <div className="alert alert--ok">
            <span className="alert-badge">OK</span>{mensagem}
          </div>
        )}
        {erro && (
          <div className="alert alert--err">
            <span className="alert-badge">!</span>{erro}
          </div>
        )}

        <div className="layout">

          {/* ── Livros ── */}
          <section className="panel">
            <div className="panel-head">
              <h2 className="panel-title">Acervo disponível</h2>
              <span className="panel-count">{livros.length} títulos</span>
            </div>

            {livros.length === 0 ? (
              <p className="empty">Nenhum livro no acervo.</p>
            ) : (
              <div className="livros-grid">
                {livros.map((livro, idx) => {
                  const disponiveis = disponibilidadeDoLivro(livro)
                  const indisponivel = disponiveis <= 0
                  const jaNaMochila = livroJaEstaNaMochila(livro.id)
                  const cor = SPINE_COLORS[idx % SPINE_COLORS.length]
                  return (
                    <article
                      key={livro.id}
                      className={`livro ${indisponivel ? 'livro--out' : ''} ${jaNaMochila ? 'livro--sel' : ''}`}
                    >
                      <div className="livro-spine" style={{ background: cor }} />
                      <div className="livro-body">
                        <span className="livro-genero">{livro.genero}</span>
                        <h3 className="livro-titulo">{livro.titulo}</h3>
                        <p className="livro-autor">{livro.autor}</p>
                        <div className="stats">
                          <div className="stat"><span className="sn">{livro.quantidade}</span><span className="sl">total</span></div>
                          <div className="sdot">·</div>
                          <div className="stat"><span className="sn">{livro.qtdEmprestados}</span><span className="sl">fora</span></div>
                          <div className="sdot">·</div>
                          <div className="stat">
                            <span className={`sn ${disponiveis > 0 ? 'sn--ok' : 'sn--no'}`}>{disponiveis}</span>
                            <span className="sl">livre</span>
                          </div>
                        </div>
                        <button
                          onClick={() => adicionarNaMochila(livro)}
                          disabled={indisponivel || jaNaMochila}
                          className={`livro-btn ${indisponivel ? 'lb--out' : jaNaMochila ? 'lb--done' : 'lb--add'}`}
                        >
                          {indisponivel ? 'Indisponível' : jaNaMochila ? '✓ No baú' : '+ Guardar no baú'}
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </section>

          {/* ── Sidebar / Baú ── */}
          <aside className="sidebar">
            <BookshelfDecor />

            <div className="sidebar-body">

              {/* campos de usuário e data */}
              <div className="fg">
                <label className="fl">Leitor</label>
                <select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} className="fi">
                  <option value="">— selecione —</option>
                  {usuarios.map((u) => (
                    <option key={u.id} value={u.id}>{u.nome}</option>
                  ))}
                </select>
                {usuarioSelecionado && (
                  <div className="user-info">
                    <span>{usuarioSelecionado.telefone}</span>
                    {usuarioSelecionado.email && <span>{usuarioSelecionado.email}</span>}
                  </div>
                )}
              </div>

              <div className="fg">
                <label className="fl">Data do empréstimo</label>
                <input
                  type="date"
                  value={dataEmprestimo}
                  onChange={(e) => setDataEmprestimo(e.target.value)}
                  className="fi"
                />
              </div>

              {/* ══ BAÚ DO MINECRAFT ══ */}
              <div className="bau-wrapper">

                {/* cabeçalho do baú */}
                <div className="bau-header">
                  <button
                    className="bau-toggle"
                    onClick={() => setBauAberto((v) => !v)}
                    title={bauAberto ? 'Fechar baú' : 'Abrir baú'}
                  >
                    <ChestIcon open={bauAberto} />
                  </button>
                  <div className="bau-meta">
                    <span className="bau-title">Baú</span>
                    <span className="bau-slots-count">{quantidadeTotalNaMochila}/{CHEST_SLOTS}</span>
                  </div>
                </div>

                {/* ── inventário do baú (abre/fecha) ── */}
                <div className={`bau-inventory ${bauAberto ? 'bau-inventory--open' : ''}`}>
                  <div className="inv-label">Baú</div>

                  {/* grade 3×9 */}
                  <div className="inv-grid">
                    {slots.map((livro, i) => {
                      const cor = livro ? SPINE_COLORS[mochila.indexOf(livro) % SPINE_COLORS.length] : null
                      return (
                        <div
                          key={i}
                          className={`inv-slot ${livro ? 'inv-slot--filled' : ''} ${slotHover === i && livro ? 'inv-slot--hover' : ''}`}
                          onMouseEnter={() => setSlotHover(i)}
                          onMouseLeave={() => setSlotHover(null)}
                          onClick={() => livro && removerDaMochila(livro.id)}
                          title={livro ? `${livro.titulo} — clique para remover` : ''}
                        >
                          {livro && cor && (
                            <>
                              <PixelBook color={cor} />
                              {slotHover === i && (
                                <div className="slot-tooltip">
                                  <span className="tt-titulo">{livro.titulo}</span>
                                  <span className="tt-autor">{livro.autor}</span>
                                  <span className="tt-remove">Clique para remover</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* divisor inventário do jogador */}
                  <div className="inv-label" style={{ marginTop: 8 }}>Inventário</div>
                  {/* barra quente (hotbar) decorativa */}
                  <div className="hotbar">
                    {Array.from({ length: 9 }, (_, i) => (
                      <div key={i} className="inv-slot inv-slot--hotbar" />
                    ))}
                  </div>
                </div>

                {/* baú fechado: lista compacta */}
                {!bauAberto && mochila.length > 0 && (
                  <div className="bau-closed-list">
                    {mochila.map((livro, idx) => (
                      <div key={livro.id} className="bcl-item">
                        <div className="bcl-spine" style={{ background: SPINE_COLORS[idx % SPINE_COLORS.length] }} />
                        <span className="bcl-titulo">{livro.titulo}</span>
                        <button onClick={() => removerDaMochila(livro.id)} className="bcl-rm">×</button>
                      </div>
                    ))}
                  </div>
                )}

                {!bauAberto && mochila.length === 0 && (
                  <div className="bau-empty-hint">Baú vazio — clique no baú para abrir</div>
                )}
              </div>

              <button
                onClick={realizarEmprestimo}
                disabled={enviando}
                className={`btn-confirmar ${enviando ? 'bc--loading' : ''}`}
              >
                {enviando ? '[ processando... ]' : '[ Confirmar empréstimo ]'}
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
  --ink:#1E0E05; --is:#3D2010; --im:#7A5A38;
  --gok:#3A7D3A; --glk:#C8EAC8;
  --rok:#A02020; --rlk:#F0D0C8;
  /* Minecraft inventory colors */
  --inv-bg:#8B8B8B;
  --inv-border-light:#FFFFFF;
  --inv-border-dark:#373737;
  --inv-slot-bg:#8B8B8B;
  --inv-slot-dark:#373737;
  --inv-slot-light:#FFFFFF;
  --inv-slot-inner:#4A4A4A;
  --px:'Press Start 2P',monospace;
  --sr:'Lora',Georgia,serif;
}
.root{
  min-height:100vh;
  background:var(--wd);
  background-image:
    repeating-linear-gradient(0deg,transparent,transparent 15px,rgba(0,0,0,.07) 15px,rgba(0,0,0,.07) 16px),
    repeating-linear-gradient(90deg,transparent,transparent 64px,rgba(255,255,255,.015) 64px,rgba(255,255,255,.015) 65px);
  color:var(--ink);
  font-family:var(--sr);
}

/* Loading */
.loading-screen{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;background:var(--wd);}
.loading-text{font-family:var(--px);font-size:8px;color:var(--p);letter-spacing:.06em;animation:blink 1s step-end infinite;}
@keyframes blink{50%{opacity:0;}}

/* Header */
.header{background:var(--wm);border-bottom:4px solid var(--wg);box-shadow:0 4px 0 var(--wd);}
.header-bar{display:flex;align-items:center;justify-content:space-between;padding:14px 28px 18px;gap:16px;}
.eyebrow{display:block;font-family:var(--px);font-size:6px;color:var(--pdd);letter-spacing:.1em;margin-bottom:8px;}
.header-title{font-family:var(--sr);font-size:clamp(1.3rem,3vw,1.9rem);font-weight:600;color:var(--p);text-shadow:2px 2px 0 var(--wd);line-height:1.1;}
.btn-refresh{display:flex;align-items:center;gap:8px;font-family:var(--px);font-size:6px;color:var(--p);background:var(--wg);border:2px solid var(--pdd);padding:8px 14px;cursor:pointer;letter-spacing:.05em;box-shadow:2px 2px 0 rgba(0,0,0,.5);transition:all .08s;white-space:nowrap;}
.btn-refresh:hover{background:var(--wl);transform:translate(-1px,-1px);box-shadow:3px 3px 0 rgba(0,0,0,.5);}
.btn-refresh:active{transform:translate(1px,1px);box-shadow:1px 1px 0 rgba(0,0,0,.5);}

/* Alerts */
.alert{margin:12px 28px 0;padding:10px 16px;display:flex;align-items:center;gap:10px;font-family:var(--px);font-size:6.5px;letter-spacing:.04em;line-height:2;border:2px solid;box-shadow:3px 3px 0 rgba(0,0,0,.4);}
.alert--ok{background:var(--glk);color:var(--gok);border-color:var(--gok);}
.alert--err{background:var(--rlk);color:var(--rok);border-color:var(--rok);}
.alert-badge{font-weight:bold;padding:2px 6px;border:1px solid currentColor;flex-shrink:0;}

/* Layout */
.layout{display:grid;grid-template-columns:1fr 430px;gap:20px;max-width:1560px;margin:0 auto;padding:20px 28px 48px;align-items:start;}
@media(max-width:1050px){.layout{grid-template-columns:1fr;padding:16px;}}

/* Panel */
.panel{background:var(--p);border:3px solid var(--wg);box-shadow:4px 4px 0 var(--wd),inset 0 0 0 1px rgba(255,255,255,.25);}
.panel-head{display:flex;align-items:baseline;justify-content:space-between;padding:14px 18px 12px;border-bottom:3px solid var(--wg);background:var(--pd);}
.panel-title{font-family:var(--px);font-size:9px;color:var(--ink);letter-spacing:.05em;}
.panel-count{font-family:var(--px);font-size:6px;color:var(--im);}
.empty{padding:40px 24px;text-align:center;font-family:var(--px);font-size:7px;color:var(--im);line-height:2.2;}

/* Grid livros */
.livros-grid{padding:14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;}
.livro{background:var(--pd);border:2px solid var(--wp);box-shadow:3px 3px 0 var(--wg);display:flex;overflow:hidden;transition:transform .08s,box-shadow .08s;}
.livro:hover{transform:translate(-1px,-2px);box-shadow:4px 5px 0 var(--wg);}
.livro--out{opacity:.5;filter:grayscale(.4);}
.livro--sel{border-color:var(--gok);box-shadow:3px 3px 0 var(--gok);}
.livro-spine{width:7px;flex-shrink:0;background-image:linear-gradient(180deg,rgba(255,255,255,.28) 0,rgba(255,255,255,.28) 1px,transparent 1px,transparent 3px);background-size:100% 4px;}
.livro-body{padding:10px;flex:1;display:flex;flex-direction:column;gap:3px;}
.livro-genero{font-family:var(--px);font-size:7px;color:var(--im);letter-spacing:.12em;text-transform:uppercase;}
.livro-titulo{font-family:var(--sr);font-size:1.05rem;font-weight:600;color:var(--ink);line-height:1.25;margin-top:2px;}
.livro-autor{font-family:var(--sr);font-size:.88rem;font-style:italic;color:var(--im);margin-bottom:6px;}
.stats{display:flex;align-items:center;gap:4px;border:1px solid var(--pdd);padding:5px 6px;background:var(--p);margin-bottom:8px;}
.stat{display:flex;flex-direction:column;align-items:center;flex:1;}
.sdot{color:var(--pdd);font-size:10px;}
.sn{font-family:var(--px);font-size:11px;color:var(--ink);line-height:1.5;}
.sn--ok{color:var(--gok);}
.sn--no{color:var(--rok);}
.sl{font-family:var(--px);font-size:6px;color:var(--im);letter-spacing:.08em;}
.livro-btn{width:100%;padding:7px 8px;font-family:var(--px);font-size:6px;letter-spacing:.04em;border:2px solid;cursor:pointer;box-shadow:2px 2px 0 rgba(0,0,0,.3);transition:all .08s;}
.livro-btn:active:not(:disabled){transform:translate(1px,1px);box-shadow:1px 1px 0 rgba(0,0,0,.3);}
.lb--add{background:var(--wm);color:var(--p);border-color:var(--wd);}
.lb--add:hover{background:var(--wl);}
.lb--done{background:var(--glk);color:var(--gok);border-color:var(--gok);cursor:default;}
.lb--out{background:var(--pdd);color:var(--im);border-color:var(--pdd);cursor:not-allowed;box-shadow:none;}

/* ══ Sidebar ══ */
.sidebar{position:sticky;top:16px;}
.sidebar-body{background:var(--wm);border:3px solid var(--wg);border-top:none;box-shadow:4px 4px 0 var(--wd);padding:18px 16px;display:flex;flex-direction:column;gap:16px;}
.fg{display:flex;flex-direction:column;gap:6px;}
.fl{font-family:var(--px);font-size:5.5px;color:var(--pdd);letter-spacing:.12em;text-transform:uppercase;}
.fi{width:100%;background:var(--p);border:2px solid var(--wg);color:var(--ink);font-family:var(--sr);font-size:13px;padding:7px 9px;outline:none;appearance:none;-webkit-appearance:none;border-radius:0;box-shadow:inset 1px 1px 0 rgba(0,0,0,.12);}
.fi:focus{border-color:var(--pdd);}
.fi option{background:var(--p);color:var(--ink);}
.user-info{display:flex;flex-direction:column;gap:2px;font-family:var(--px);font-size:5.5px;color:var(--pdd);line-height:2.2;padding:5px 8px;background:var(--wg);border-left:3px solid var(--pdd);}

/* ══ BAÚ ══ */
.bau-wrapper{display:flex;flex-direction:column;gap:0;}

.bau-header{
  display:flex;
  align-items:center;
  gap:12px;
  padding:10px 12px;
  background:#3C3C3C;
  border:3px solid;
  border-color:#FFF #373737 #373737 #FFF;
  cursor:pointer;
}
.bau-toggle{
  background:none;border:none;padding:0;cursor:pointer;
  display:flex;align-items:center;
  /* tiny pixel shadow */
  filter:drop-shadow(2px 2px 0 rgba(0,0,0,.6));
  transition:filter .08s;
}
.bau-toggle:hover{filter:drop-shadow(2px 2px 0 rgba(255,200,80,.5));}
.bau-meta{display:flex;flex-direction:column;gap:4px;}
.bau-title{font-family:var(--px);font-size:9px;color:#FFF;text-shadow:1px 1px 0 #000;letter-spacing:.04em;}
.bau-slots-count{font-family:var(--px);font-size:6px;color:#AAAAAA;letter-spacing:.06em;}

/* ── Inventário estilo Minecraft ── */
.bau-inventory{
  display:none;
  flex-direction:column;
  gap:6px;
  background:#C6C6C6;
  border:3px solid;
  border-color:#FFF #373737 #373737 #FFF;
  padding:10px;
  image-rendering:pixelated;
  box-sizing:border-box;
  width:100%;
}
.bau-inventory--open{display:flex;}

.inv-label{
  font-family:var(--px);
  font-size:6px;
  color:#1E1E1E;
  letter-spacing:.04em;
  margin-bottom:2px;
}

/* grade 9×3 — usa fr para preencher sem overflow */
.inv-grid{
  display:grid;
  grid-template-columns:repeat(9,1fr);
  grid-auto-rows:1fr;
  aspect-ratio:9/3;
  gap:2px;
  width:100%;
}

/* slot individual — borda inset estilo MC */
.inv-slot{
  background:#8B8B8B;
  border:2px solid;
  border-color:#373737 #FFF #FFF #373737;
  display:flex;align-items:center;justify-content:center;
  position:relative;
  cursor:default;
  transition:background .05s;
  aspect-ratio:1;
  min-width:0;
  overflow:visible;
}
.inv-slot--filled{cursor:pointer;}
.inv-slot--hover{
  background:#FFF8C0 !important;
  border-color:#FFF #373737 #373737 #FFF !important;
}
.inv-slot--hotbar{
  background:#8B8B8B;
  border-color:#373737 #FFF #FFF #373737;
}

/* tooltip do slot */
.slot-tooltip{
  position:absolute;
  bottom:calc(100% + 4px);
  left:50%;
  transform:translateX(-50%);
  background:#100010;
  border:2px solid #5A005A;
  padding:4px 8px;
  z-index:99;
  white-space:nowrap;
  pointer-events:none;
  display:flex;flex-direction:column;gap:2px;
  box-shadow:2px 2px 0 rgba(0,0,0,.8);
}
.tt-titulo{font-family:var(--px);font-size:5.5px;color:#FFF;letter-spacing:.04em;}
.tt-autor{font-family:var(--px);font-size:5px;color:#AAAAFF;letter-spacing:.03em;}
.tt-remove{font-family:var(--px);font-size:4.5px;color:#FF5555;letter-spacing:.03em;margin-top:2px;}

/* hotbar */
.hotbar{
  display:grid;
  grid-template-columns:repeat(9,1fr);
  gap:2px;
  width:100%;
  margin-top:2px;
  border-top:2px solid #373737;
  padding-top:6px;
}

/* lista compacta quando baú fechado */
.bau-closed-list{
  display:flex;
  flex-direction:column;
  gap:2px;
  background:#5A5A5A;
  border:2px solid;
  border-color:#373737 #FFF #FFF #373737;
  border-top:none;
  padding:6px;
}
.bcl-item{display:flex;align-items:center;gap:6px;background:#4A4A4A;border:1px solid #373737;padding:4px 6px;}
.bcl-spine{width:4px;align-self:stretch;flex-shrink:0;background-image:linear-gradient(180deg,rgba(255,255,255,.3) 0,rgba(255,255,255,.3) 1px,transparent 1px,transparent 3px);background-size:100% 4px;}
.bcl-titulo{flex:1;font-family:var(--px);font-size:5.5px;color:#FFF;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.03em;}
.bcl-rm{background:none;border:none;color:#AAAAAA;font-size:14px;cursor:pointer;padding:0 2px;line-height:1;transition:color .1s;}
.bcl-rm:hover{color:#FF5555;}

.bau-empty-hint{
  background:#4A4A4A;
  border:2px solid;
  border-color:#373737 #FFF #FFF #373737;
  border-top:none;
  padding:10px;
  font-family:var(--px);
  font-size:5.5px;
  color:#999;
  text-align:center;
  line-height:2.2;
  letter-spacing:.04em;
}

/* Botão confirmar */
.btn-confirmar{width:100%;padding:12px 14px;font-family:var(--px);font-size:7px;letter-spacing:.04em;background:var(--p);color:var(--ink);border:3px solid var(--wd);cursor:pointer;box-shadow:3px 3px 0 var(--wd);transition:all .08s;line-height:1.8;}
.btn-confirmar:hover:not(:disabled){background:var(--glk);color:var(--gok);border-color:var(--gok);box-shadow:3px 3px 0 var(--gok);transform:translate(-1px,-1px);}
.btn-confirmar:active:not(:disabled){transform:translate(1px,1px);box-shadow:1px 1px 0 var(--wd);}
.bc--loading{background:var(--pdd);color:var(--im);cursor:not-allowed;box-shadow:1px 1px 0 var(--wd);animation:blink 1s step-end infinite;}
`