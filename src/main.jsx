import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Volume2,
  VolumeX,
  Users,
  Clock,
  Smartphone,
  ChevronLeft,
  Search,
  LockKeyhole,
  FileText,
  Radio,
  Check,
  ShieldCheck,
  NotebookPen,
  X,
  Lightbulb,
  RotateCcw,
  Play,
  Pause,
  MapPin,
  Headphones,
  Info,
} from "lucide-react";
import {
  chapters,
  roles,
  suspects,
  initialGame,
  readSave,
  isCorrect,
} from "./case";
import { narrate, stopSpeech, ambience } from "./audio";
import Hotel from "./Hotel";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./style.css";

function App() {
  const [game, setGame] = useState(() => {
    try {
      return readSave(localStorage);
    } catch {
      return { ...initialGame };
    }
  });
  const [sound, setSound] = useState(false),
    [tab, setTab] = useState("clues"),
    [modal, setModal] = useState(null),
    [answer, setAnswer] = useState(""),
    [feedback, setFeedback] = useState(""),
    [hint, setHint] = useState(false),
    [speaking, setSpeaking] = useState(false),
    [saved, setSaved] = useState(true);
  const focusRef = useRef(null);
  const chapter = chapters[game.chapter];
  const solved = game.solved.includes(game.chapter);
  const name = game.names[game.role] || roles[game.role].name;
  function update(data) {
    setGame((g) => ({
      ...g,
      ...(typeof data === "function" ? data(g) : data),
    }));
  }
  useEffect(() => {
    try {
      localStorage.setItem("ultimo-sinal-v1", JSON.stringify(game));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }, [game]);
  useEffect(() => {
    stopSpeech();
    setSpeaking(false);
    setAnswer("");
    setFeedback("");
    setHint(false);
    setTab("clues");
    window.scrollTo(0, 0);
  }, [game.screen, game.chapter]);
  useEffect(() => {
    document.title =
      game.screen === "game"
        ? `${chapter.subtitle} — O último sinal`
        : "O último sinal — Investigação a dois";
  }, [game.screen, chapter]);
  useEffect(() => {
    ambience(sound);
    return () => ambience(false);
  }, [sound]);
  useEffect(() => {
    if (modal) {
      const old = document.activeElement;
      focusRef.current?.focus();
      function onKey(e) {
        if (e.key === "Escape") closeModal();
        if (e.key === "Tab") {
          const els = focusRef.current?.querySelectorAll(
            'button,input,textarea,a,[tabindex="0"]',
          );
          if (!els?.length) return;
          const first = els[0],
            last = els[els.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
        old?.focus();
      };
    }
  }, [modal]);
  function closeModal() {
    stopSpeech();
    setSpeaking(false);
    setModal(null);
  }
  function speech(text) {
    if (speaking) {
      stopSpeech();
      setSpeaking(false);
    } else {
      const supported = narrate(text, () => setSpeaking(false));
      setSpeaking(supported);
      if (!supported)
        setFeedback(
          "Seu navegador não oferece narração. O boletim completo está disponível em texto.",
        );
    }
  }
  function start() {
    update({ screen: "setup" });
  }
  function begin() {
    update({
      screen: "intro",
      started: true,
      role: game.mode === "shared" ? 0 : game.role,
      chapter: 0,
      read: [false, false],
      solved: [],
      mistakes: 0,
      hints: [],
      notes: "",
      seen: [],
    });
  }
  function inspect(i) {
    setModal({ type: "clue", i });
    update((g) => ({
      seen: [...new Set([...g.seen, `${g.chapter}-${g.role}-${i}`])],
    }));
  }
  function markRead() {
    update((g) => ({ read: g.read.map((r, i) => (i === g.role ? true : r)) }));
    setModal({ type: game.mode === "shared" ? "handoff" : "ready" });
  }
  function verify() {
    const value = chapter.input ? answer : Number(answer);
    if (answer === "") {
      setFeedback("Escolham uma resposta antes de confirmar.");
      return;
    }
    if (isCorrect(game.chapter, value)) {
      update((g) => ({ solved: [...new Set([...g.solved, g.chapter])] }));
      setFeedback("");
      setModal({ type: "news" });
    } else {
      update((g) => ({ mistakes: g.mistakes + 1 }));
      setFeedback(
        "Essa hipótese não combina com todas as pistas. Conversem e tentem novamente.",
      );
    }
  }
  function next() {
    closeModal();
    if (game.chapter === chapters.length - 1) update({ screen: "ending" });
    else
      update((g) => ({
        chapter: g.chapter + 1,
        screen: "intro",
        read: [false, false],
      }));
  }
  function reset() {
    closeModal();
    setGame({
      ...initialGame,
      names: ["", ""],
      read: [false, false],
      solved: [],
      hints: [],
      seen: [],
    });
  }
  const ready =
    game.mode === "dual" ? game.read[game.role] : game.read.every(Boolean);
  const Button = ({ children, ...props }) => (
    <button className="primary" {...props}>
      {children}
      <ArrowRight size={18} />
    </button>
  );
  return (
    <>
      <header className="header">
        <button
          className="brand"
          onClick={() => update({ screen: "home" })}
          aria-label="Página inicial"
        >
          <span className="brand-icon">
            <AudioLines size={25} />
          </span>
          <span>
            ÚLTIMO SINAL
            <span className="brand-caption">UM MISTÉRIO PARA DOIS</span>
          </span>
        </button>
        <nav>
          <span className="desktop-label">INVESTIGAÇÃO COOPERATIVA</span>
          <button
            className="sound-button"
            onClick={() => {
              setSound(!sound);
              if (sound) stopSpeech();
            }}
            aria-label={
              sound ? "Desativar ambiente sonoro" : "Ativar ambiente sonoro"
            }
          >
            {sound ? <Volume2 size={17} /> : <VolumeX size={17} />}
            <span>Som {sound ? "ligado" : "desligado"}</span>
          </button>
          <button
            className="icon-button"
            aria-label="Como jogar"
            onClick={() => setModal({ type: "help" })}
          >
            <Info size={19} />
          </button>
        </nav>
      </header>
      <main>
        {game.screen === "home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="pulse-dot" /> CASO 001{" "}
                  <span className="slash">/</span> HOTEL AURORA
                </div>
                <h1>
                  A verdade tem
                  <br />
                  duas <em>versões.</em>
                </h1>
                <p className="hero-description">
                  Uma jornalista desaparecida. Uma última mensagem.
                  <br className="desktop-break" /> E um segredo que só vocês
                  dois podem desvendar.
                </p>
                <div className="hero-actions">
                  <Button
                    onClick={
                      game.started
                        ? () =>
                            update({
                              screen:
                                game.solved.length === 5
                                  ? "ending"
                                  : game.read.some(Boolean) ||
                                      game.solved.includes(game.chapter)
                                    ? "game"
                                    : "intro",
                            })
                        : start
                    }
                  >
                    {game.started
                      ? "Continuar investigação"
                      : "Começar investigação"}
                  </Button>
                  <span className="small-note">
                    A próxima pista está entre vocês.
                  </span>
                </div>
                <div className="hero-meta">
                  <span>
                    <Users size={17} /> 2 pessoas
                  </span>
                  <span>
                    <Clock size={17} /> 30–50 min
                  </span>
                  <span>
                    <Smartphone size={17} /> 100% no celular
                  </span>
                </div>
              </div>
              <div className="hero-image">
                <Hotel />
                <div className="image-shade" />
                <div className="image-top">
                  <span>
                    <span className="pulse-dot" /> ARQUIVO CONFIDENCIAL
                  </span>
                  <span>23:17:04</span>
                </div>
                <div className="coordinate">23° 32′ S &nbsp; 46° 38′ W</div>
                <div className="case-overlay">
                  <span className="outline-label">
                    DESAPARECIMENTO · EM ABERTO
                  </span>
                  <h2>O último sinal</h2>
                  <p>Hotel Aurora. Uma noite que ninguém esqueceu.</p>
                  <div className="case-bottom">
                    <span>
                      <MapPin size={13} /> BAÍA DE SANTA CLARA
                    </span>
                    <AudioLines size={30} />
                  </div>
                </div>
                <div className="corner tl" />
                <div className="corner br" />
              </div>
            </section>
            <section className="how-section">
              <div className="section-top">
                <div>
                  <span className="eyebrow muted">
                    DUAS PERSPECTIVAS. UM SÓ CASO.
                  </span>
                  <h2>O melhor indício é a conversa.</h2>
                </div>
                <span className="section-note">
                  Nada para imprimir.
                  <br />
                  Tudo para descobrir.
                </span>
              </div>
              <div className="feature-grid">
                {[
                  {
                    icon: FileText,
                    n: "01",
                    title: "Cada um tem uma pista",
                    text: "Informações diferentes, papéis complementares. Ninguém tem a história completa.",
                  },
                  {
                    icon: Users,
                    n: "02",
                    title: "Perguntem. Conectem.",
                    text: "Compartilhem descobertas, desafiem versões e construam uma hipótese juntos.",
                  },
                  {
                    icon: Radio,
                    n: "03",
                    title: "A história reage a vocês",
                    text: "Novos laudos, boletins narrados e revelações a cada descoberta.",
                  },
                ].map(({ icon: Icon, n, title, text }) => (
                  <article className="feature" key={n}>
                    <div className="feature-head">
                      <Icon size={23} />
                      <span>{n}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="home-bottom">
              <span>
                <Headphones size={19} /> Luz baixa. Som ligado. Vocês dois.
              </span>
              <button onClick={() => setModal({ type: "help" })}>
                Como funciona <ArrowUpRight size={16} />
              </button>
            </section>
          </>
        )}
        {game.screen === "setup" && (
          <section className="page setup">
            <button className="back" onClick={() => update({ screen: "home" })}>
              <ChevronLeft size={17} /> Voltar ao caso
            </button>
            <span className="eyebrow">ANTES DA PRIMEIRA PISTA</span>
            <h1>Formem a sua dupla.</h1>
            <p className="lead">O que um não sabe, o outro pode descobrir.</p>
            <div className="mode-grid">
              {[
                {
                  id: "shared",
                  title: "Um celular, dois investigadores",
                  text: "Leiam em segredo e passem o celular. A tela protege as pistas.",
                  icon: Smartphone,
                },
                {
                  id: "dual",
                  title: "Cada um no seu celular",
                  text: "Abram o mesmo jogo, escolham papéis diferentes e avancem juntos por conversa.",
                  icon: Users,
                },
              ].map((m) => (
                <button
                  key={m.id}
                  className={`mode-card ${game.mode === m.id ? "selected" : ""}`}
                  onClick={() => update({ mode: m.id })}
                >
                  <m.icon size={23} />
                  <strong>{m.title}</strong>
                  <span>{m.text}</span>
                  {game.mode === m.id && (
                    <Check size={18} className="selected-check" />
                  )}
                </button>
              ))}
            </div>
            <div className="role-grid">
              {roles.map((r, i) => (
                <div
                  className={`role-card ${game.mode === "dual" && game.role === i ? "selected" : ""}`}
                  key={r.name}
                >
                  <span className="role-tag">
                    DOSSIÊ {r.short} · {i === 0 ? "PERÍCIA" : "CAMPO"}
                  </span>
                  <h2>{r.name}</h2>
                  <p>{r.detail}</p>
                  <label>
                    Nome de quem joga
                    <input
                      maxLength={24}
                      placeholder={
                        i === 0 ? "Primeira pessoa" : "Segunda pessoa"
                      }
                      value={game.names[i]}
                      onChange={(e) =>
                        update((g) => ({
                          names: g.names.map((n, j) =>
                            j === i ? e.target.value : n,
                          ),
                        }))
                      }
                    />
                  </label>
                  {game.mode === "dual" && (
                    <button
                      className="secondary"
                      onClick={() => update({ role: i })}
                    >
                      {game.role === i ? (
                        <>
                          <Check size={15} /> Meu papel
                        </>
                      ) : (
                        "Escolher este papel"
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
            {game.mode === "dual" && (
              <p className="notice">
                <Info size={18} /> Cada aparelho salva seu próprio progresso.
                Escolham papéis diferentes e confirmem as respostas juntos. Não
                há sincronização automática.
              </p>
            )}
            <Button onClick={begin}>Abrir o caso</Button>
            <p className="small-note">
              Ficção original · Suspense sem imagens gráficas · Sem cadastro
            </p>
          </section>
        )}
        {game.screen === "intro" && (
          <section className="page intro">
            <div className="eyebrow">
              <span className="pulse-dot" /> COSTA FM{" "}
              <span className="slash">/</span> PLANTÃO ESPECIAL
            </div>
            <div className="news-stage">
              <div className="news-time">
                {chapter.time} <span>AO VIVO</span>
              </div>
              <div className="waveform">
                {Array.from({ length: 35 }, (_, i) => (
                  <i
                    key={i}
                    style={{
                      "--height": `${15 + ((i * 17) % 55)}px`,
                      "--delay": `${i * 0.07}s`,
                    }}
                  />
                ))}
              </div>
              <span className="role-tag">
                CAPÍTULO {String(game.chapter + 1).padStart(2, "0")} / 05
              </span>
              <h1>{chapter.title}</h1>
              <p>{chapter.intro}</p>
              <button
                className="secondary"
                onClick={() => speech(chapter.news)}
              >
                {speaking ? <Pause size={17} /> : <Play size={17} />}{" "}
                {speaking ? "Parar narração" : "Ouvir boletim"}
              </button>
              <p className="audio-note">
                Narração pela voz disponível no seu navegador. O texto está
                sempre na tela.
              </p>
              <div className="ticker">
                <span>ÚLTIMAS NOTÍCIAS</span>
                <div>
                  HOTEL AURORA · INVESTIGAÇÃO EM ANDAMENTO · DUAS PERSPECTIVAS,
                  UMA VERDADE
                </div>
              </div>
            </div>
            <Button
              onClick={() => {
                stopSpeech();
                update({ screen: "game" });
                setModal({ type: "privacy" });
              }}
            >
              Investigar este capítulo
            </Button>
          </section>
        )}
        {game.screen === "game" && (
          <section className="page investigation">
            <div className="investigation-heading">
              <div>
                <span className="eyebrow">CASO 001 · HOTEL AURORA</span>
                <h1>{chapter.subtitle}</h1>
              </div>
              <button
                className="icon-button"
                onClick={() => setModal({ type: "restart" })}
                aria-label="Reiniciar investigação"
              >
                <RotateCcw size={18} />
              </button>
            </div>
            <div className="progress-row">
              <span>
                CAPÍTULO {String(game.chapter + 1).padStart(2, "0")} / 05
              </span>
              <div className="progress-bars">
                {chapters.map((_, i) => (
                  <i key={i} className={i <= game.chapter ? "active" : ""} />
                ))}
              </div>
              <span>{game.solved.length} / 5 resolvidos</span>
            </div>
            <div className="identity">
              <span className="avatar">{roles[game.role].short}</span>
              <div>
                <strong>{name}</strong>
                <span>{roles[game.role].name} · Dossiê individual</span>
              </div>
              {game.mode === "shared" ? (
                <button onClick={() => setModal({ type: "switch" })}>
                  <Users size={17} />
                  <span>Trocar papel</span>
                </button>
              ) : (
                <span className="private-badge">
                  <LockKeyhole size={14} /> Privado
                </span>
              )}
            </div>
            <div className="tabs" role="tablist" aria-label="Dossiê">
              {[
                ["clues", "Pistas", Search],
                ["suspects", "Suspeitos", Users],
                ["notes", "Caderno", NotebookPen],
              ].map(([id, label, Icon]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
            {tab === "clues" && (
              <>
                <div className="section-top compact">
                  <div>
                    <h2>O seu lado da história.</h2>
                    <p>Leia as pistas. Depois, conversem sem mostrar a tela.</p>
                  </div>
                  <LockKeyhole className="muted" size={20} />
                </div>
                <div className="clue-grid">
                  {chapter.clues[game.role].map((c, i) => {
                    const seen = game.seen.includes(
                      `${game.chapter}-${game.role}-${i}`,
                    );
                    return (
                      <button
                        className="clue-card"
                        key={`${game.chapter}-${game.role}-${i}`}
                        onClick={() => inspect(i)}
                      >
                        <span className="clue-type">
                          <FileText size={15} />
                          {c.type}
                          <span>
                            {seen ? (
                              <Check size={15} />
                            ) : (
                              <LockKeyhole size={14} />
                            )}
                          </span>
                        </span>
                        <span className="clue-number">0{i + 1}</span>
                        <h3>{c.title}</h3>
                        <span className="clue-open">
                          {seen ? "Rever evidência" : "Examinar evidência"}
                          <ArrowUpRight size={17} />
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="conversation">
                  <Users size={23} />
                  <div>
                    <span className="eyebrow">
                      A PISTA QUE FALTA ESTÁ COM A OUTRA PESSOA
                    </span>
                    <p>{chapter.prompt[game.role]}</p>
                  </div>
                </div>
                {!game.read[game.role] && (
                  <button
                    className="secondary wide"
                    disabled={
                      !chapter.clues[game.role].every((_, i) =>
                        game.seen.includes(`${game.chapter}-${game.role}-${i}`),
                      )
                    }
                    onClick={markRead}
                  >
                    <Check size={18} /> Li minhas pistas
                  </button>
                )}
                {game.read[game.role] && !ready && (
                  <p className="notice">
                    Sua leitura está concluída. Passe o celular para a outra
                    pessoa ler o dossiê.
                  </p>
                )}
                <div className={`deduction ${!ready ? "locked" : ""}`}>
                  <span className="eyebrow">
                    {solved
                      ? "DESCOBERTA CONFIRMADA"
                      : "CONECTEM AS EVIDÊNCIAS"}
                  </span>
                  <h2>{chapter.question}</h2>
                  {solved ? (
                    <>
                      <p>{chapter.reveal}</p>
                      <Button onClick={() => setModal({ type: "news" })}>
                        Ver descoberta e continuar
                      </Button>
                    </>
                  ) : ready ? (
                    <>
                      <p className="small-note">
                        {game.mode === "dual"
                          ? "Confirmem que a outra pessoa também leu as pistas antes de responder."
                          : "A dupla leu os dois dossiês. Agora decidam juntos."}
                      </p>
                      {chapter.input ? (
                        <label className="code-label">
                          Senha do cofre
                          <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={5}
                            placeholder="· · · · ·"
                            value={answer}
                            onChange={(e) =>
                              setAnswer(e.target.value.replace(/\D/g, ""))
                            }
                          />
                        </label>
                      ) : (
                        <div className="answers">
                          {chapter.options.map((option, i) => (
                            <button
                              className={answer === String(i) ? "chosen" : ""}
                              key={option}
                              aria-pressed={answer === String(i)}
                              onClick={() => setAnswer(String(i))}
                            >
                              <span>{String.fromCharCode(65 + i)}</span>
                              {option}
                              {answer === String(i) && <Check size={17} />}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="deduction-actions">
                        <Button onClick={verify}>Confirmar hipótese</Button>
                        <button
                          className="hint-button"
                          onClick={() => {
                            setHint(!hint);
                            update((g) => ({
                              hints: [...new Set([...g.hints, g.chapter])],
                            }));
                          }}
                        >
                          <Lightbulb size={17} /> Uma pista extra
                        </button>
                      </div>
                      {hint && <p className="hint">{chapter.hint}</p>}
                      <p className="feedback" role="status">
                        {feedback}
                      </p>
                    </>
                  ) : (
                    <p>
                      <LockKeyhole size={16} /> A hipótese abre depois da
                      leitura dos dossiês.
                    </p>
                  )}
                </div>
              </>
            )}
            {tab === "suspects" && (
              <div className="suspects">
                <h2>Todos têm algo a esconder.</h2>
                <p className="lead">Um motivo não basta. Procurem provas.</p>
                {suspects.map((s) => (
                  <article className="suspect" key={s.name}>
                    <span className="suspect-avatar">{s.initials}</span>
                    <div>
                      <span className="role-tag">{s.role}</span>
                      <h3>{s.name}</h3>
                      <p>{s.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {tab === "notes" && (
              <div className="notes">
                <h2>O caderno da dupla.</h2>
                <p>
                  Anotem horários, contradições e hipóteses. No modo com dois
                  celulares, as notas ficam somente neste aparelho.
                </p>
                <textarea
                  aria-label="Anotações da investigação"
                  maxLength={5000}
                  placeholder="O que não encaixa? Quem sabia de quê?"
                  value={game.notes}
                  onChange={(e) => update({ notes: e.target.value })}
                />
                <span className="small-note">
                  {saved
                    ? "Salvo neste celular"
                    : "Não foi possível salvar neste navegador"}{" "}
                  · {game.notes.length}/5000 caracteres
                </span>
                <h3>Descobertas confirmadas</h3>
                {game.solved.length ? (
                  game.solved.map((i) => (
                    <article className="journal-entry" key={i}>
                      <Check size={17} />
                      <div>
                        <strong>{chapters[i].subtitle}</strong>
                        <p>{chapters[i].reveal}</p>
                      </div>
                    </article>
                  ))
                ) : (
                  <p>A primeira descoberta de vocês aparecerá aqui.</p>
                )}
              </div>
            )}
          </section>
        )}
        {game.screen === "ending" && (
          <section className="page ending">
            <span className="ending-icon">
              <ShieldCheck size={47} />
            </span>
            <span className="eyebrow">CASO 001 · ENCERRADO</span>
            <h1>
              A verdade veio
              <br />
              <em>à tona.</em>
            </h1>
            <p className="lead">
              Lia voltou para casa. A denúncia foi publicada.
              <br />E vocês descobriram o que ninguém conseguiria sozinho.
            </p>
            <div className="ending-stats">
              <div>
                <strong>5/5</strong>
                <span>mistérios resolvidos</span>
              </div>
              <div>
                <strong>{game.mistakes}</strong>
                <span>hipóteses revisadas</span>
              </div>
              <div>
                <strong>{game.hints.length}</strong>
                <span>pistas extras</span>
              </div>
            </div>
            <article className="resolution">
              <span className="role-tag">O QUE ACONTECEU NAQUELA NOITE</span>
              <p>
                Helena descobriu que Lia publicaria os documentos da reforma. Às
                23:17, Lia enviou a mensagem do corredor. Helena tomou seu
                celular e, às 23:19, usou o cartão H-01 para trancá-la no abrigo
                técnico. Devolveu o aparelho ao quarto para criar uma falsa
                versão. Lia escapou pelo túnel indicado na planta de Caio e
                pediu socorro na frequência 63, no píer. O trabalho de vocês
                trouxe Lia de volta e sustentou a prisão de Helena.
              </p>
            </article>
            <div className="couple-moment">
              <Users size={25} />
              <h2>Antes de fechar o caso…</h2>
              <p>
                Pergunte à outra pessoa: “Qual detalhe você percebeu que eu
                deixei passar?”
              </p>
              <p>É assim que uma boa dupla funciona.</p>
            </div>
            <button
              className="secondary"
              onClick={() => speech(chapter.bulletin)}
            >
              <Radio size={17} />{" "}
              {speaking ? "Parar boletim final" : "Ouvir o boletim final"}
            </button>
            <button
              className="text-button"
              onClick={() => setModal({ type: "restart" })}
            >
              Jogar novamente <RotateCcw size={16} />
            </button>
          </section>
        )}
      </main>
      <footer>
        <span>
          ÚLTIMO SINAL <span className="footer-slash">/</span> FEITO PARA
          DESCOBRIR JUNTOS
        </span>
        <span>Um jogo de ficção. Uma conexão real.</span>
      </footer>
      {!saved && (
        <div className="save-warning" role="status">
          O navegador não permitiu salvar. Mantenham esta aba aberta.
        </div>
      )}
      {modal && (
        <div className="modal-backdrop">
          <section
            ref={focusRef}
            tabIndex={-1}
            className={`modal ${modal.type === "news" ? "news-modal" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal-close icon-button"
              aria-label="Fechar janela"
              onClick={closeModal}
            >
              <X size={21} />
            </button>
            {modal.type === "help" && (
              <>
                <span className="eyebrow">JOGUEM JUNTOS, DE VERDADE</span>
                <h2 id="modal-title">Duas pessoas. Duas perspectivas.</h2>
                <ol className="help-list">
                  <li>
                    Escolham um celular para passar entre vocês ou abram o jogo
                    em dois aparelhos com papéis diferentes.
                  </li>
                  <li>
                    O Analista recebe laudos e registros. O Investigador recebe
                    depoimentos. Leiam apenas o próprio dossiê.
                  </li>
                  <li>
                    Perguntem e contem as descobertas com suas palavras. Os
                    enigmas precisam das duas metades.
                  </li>
                  <li>
                    Confirmem a hipótese juntos. Uma resposta correta libera um
                    boletim animado e o próximo capítulo.
                  </li>
                </ol>
                <p className="notice">
                  Em dois aparelhos, coordenem os capítulos por conversa. Não há
                  sala online nem sincronização automática. Em um aparelho, o
                  caderno é compartilhado.
                </p>
                <p>
                  A narração usa a voz em português do navegador e pode variar
                  conforme o celular. O jogo funciona inteiramente com texto,
                  mesmo sem áudio.
                </p>
                <Button onClick={closeModal}>Entendido</Button>
              </>
            )}
            {modal.type === "clue" && (
              <>
                <span className="eyebrow">
                  DOSSIÊ {roles[game.role].short} ·{" "}
                  {chapter.clues[game.role][modal.i].type}
                </span>
                <h2 id="modal-title">
                  {chapter.clues[game.role][modal.i].title}
                </h2>
                <div className="evidence-body">
                  {chapter.clues[game.role][modal.i].body}
                </div>
                <div className="evidence-note">
                  <Search size={18} />
                  <p>{chapter.clues[game.role][modal.i].note}</p>
                </div>
                <Button onClick={closeModal}>Guardar a pista</Button>
              </>
            )}
            {["privacy", "switch", "handoff", "ready"].includes(modal.type) && (
              <>
                <span className="privacy-icon">
                  <LockKeyhole size={33} />
                </span>
                <span className="eyebrow">INFORMAÇÃO INDIVIDUAL</span>
                <h2 id="modal-title">
                  {modal.type === "switch" || modal.type === "handoff"
                    ? "Passe o celular."
                    : "Seu dossiê é só seu."}
                </h2>
                <p>
                  {modal.type === "switch" || modal.type === "handoff"
                    ? `Agora é a vez de ${game.names[1 - game.role] || roles[1 - game.role].name}. Quem acabou de ler deve olhar para o outro lado.`
                    : modal.type === "ready"
                      ? "Conte suas descobertas para a outra pessoa. Confiram que ambos terminaram a leitura antes de responder."
                      : `${name}, leia suas pistas sem mostrar a tela. Depois, conte o que descobriu com suas palavras.`}
                </p>
                <Button
                  onClick={() => {
                    if (modal.type === "switch" || modal.type === "handoff")
                      update({ role: 1 - game.role });
                    closeModal();
                  }}
                >
                  {modal.type === "switch" || modal.type === "handoff"
                    ? `Sou ${game.names[1 - game.role] || roles[1 - game.role].name}`
                    : "Pronto para investigar"}
                </Button>
              </>
            )}
            {modal.type === "news" && (
              <>
                <div className="news-logo">
                  <Radio size={23} /> COSTA <b>FM</b>
                  <span>PLANTÃO</span>
                </div>
                <div className="waveform mini">
                  {Array.from({ length: 25 }, (_, i) => (
                    <i
                      key={i}
                      style={{
                        "--height": `${12 + ((i * 13) % 35)}px`,
                        "--delay": `${i * 0.06}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="eyebrow">
                  <span className="pulse-dot" /> NOVA DESCOBERTA CONFIRMADA
                </span>
                <h2 id="modal-title">
                  {game.chapter === 3
                    ? "Lia está viva."
                    : game.chapter === 4
                      ? "A verdade foi revelada."
                      : "A investigação avançou."}
                </h2>
                <p className="news-reveal">{chapter.reveal}</p>
                <div className="broadcast-text">
                  <span>BOLETIM COSTA FM</span>
                  <p>{chapter.bulletin}</p>
                </div>
                <button
                  className="secondary"
                  onClick={() => speech(chapter.bulletin)}
                >
                  {speaking ? <Pause size={17} /> : <Volume2 size={17} />}{" "}
                  {speaking ? "Parar narração" : "Ouvir notícia"}
                </button>
                <Button onClick={next}>
                  {game.chapter === 4 ? "Encerrar o caso" : "Próximo capítulo"}
                </Button>
              </>
            )}
            {modal.type === "restart" && (
              <>
                <span className="eyebrow">NOVO COMEÇO</span>
                <h2 id="modal-title">Reabrir a investigação?</h2>
                <p>
                  As pistas lidas, hipóteses e anotações deste aparelho serão
                  apagadas. A história e a solução serão as mesmas.
                </p>
                <Button onClick={reset}>Reiniciar o jogo</Button>
                <button className="text-button" onClick={closeModal}>
                  Manter meu progresso
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
