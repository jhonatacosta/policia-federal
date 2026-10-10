export const roles = [
  {
    name: "Analista",
    short: "A",
    description: "Você encontra o que ninguém vê.",
    detail:
      "Laudos, registros digitais e vestígios. Sua metade da verdade está nos detalhes.",
  },
  {
    name: "Investigador",
    short: "B",
    description: "Você ouve o que ninguém conta.",
    detail:
      "Depoimentos, horários e contradições. Sua metade da verdade está nas pessoas.",
  },
];
export const suspects = [
  {
    name: "Helena Duarte",
    role: "Diretora do hotel",
    initials: "HD",
    detail:
      "Controla as chaves e os arquivos do Aurora. Diz que saiu antes da tempestade.",
  },
  {
    name: "Caio Nunes",
    role: "Técnico de manutenção",
    initials: "CN",
    detail:
      "Foi visto no corredor de serviço. Tinha uma discussão pendente com Lia.",
  },
  {
    name: "Marina Reis",
    role: "Fotógrafa e amiga de Lia",
    initials: "MR",
    detail:
      "Recebeu a última mensagem. Esconde por que estava no hotel naquela noite.",
  },
];
export const chapters = [
  {
    title: "Uma noite sem respostas",
    subtitle: "O desaparecimento",
    time: "23:17",
    intro:
      "A jornalista Lia Torres desapareceu do Hotel Aurora durante uma tempestade. Seu celular ficou no quarto 307. Às 23h17, uma mensagem chegou à amiga: “Se eu não voltar, sigam o último sinal.” A polícia procura duas pessoas capazes de unir os fragmentos dessa noite. Vocês.",
    news: "Plantão Costa FM. A jornalista Lia Torres está desaparecida desde a noite de ontem. O Hotel Aurora permanece isolado. O último sinal do celular foi registrado às vinte e três horas e dezessete minutos. A investigação começa agora.",
    clues: [
      [
        {
          title: "Relógio fora de sincronia",
          type: "LAUDO DIGITAL",
          body: "A câmera do corredor marca 23:10. A perícia mediu um atraso de exatamente 7 minutos no relógio da câmera.",
          note: "Os registros reais e os da câmera não usam o mesmo horário.",
        },
        {
          title: "Celular no quarto 307",
          type: "EVIDÊNCIA 01",
          body: "O envio da última mensagem aconteceu às 23:17. O aparelho estava conectado ao Wi-Fi do corredor de serviço, fora do alcance do quarto.",
          note: "Alguém levou o celular de volta ao quarto depois do envio.",
        },
      ],
      [
        {
          title: "O depoimento do porteiro",
          type: "DEPOIMENTO",
          body: "“Na câmera das 23:10, vi uma pessoa com capa amarela saindo do corredor de serviço. Não dava para ver o rosto.”",
          note: "Pergunte à outra pessoa se o horário da câmera é confiável.",
        },
        {
          title: "A capa emprestada",
          type: "ANOTAÇÃO DE CAMPO",
          body: "Caio usava uma capa azul. Marina estava de casaco preto. A capa amarela era do hotel e podia ser retirada por qualquer funcionário.",
          note: "A roupa sozinha não identifica o responsável.",
        },
      ],
    ],
    question:
      "A que horas, de verdade, a pessoa de capa amarela saiu do corredor?",
    options: ["23:03", "23:10", "23:17"],
    answer: 2,
    hint: "Um de vocês tem o horário da imagem. O outro sabe quanto o relógio estava atrasado.",
    prompt: [
      "Pergunte: o que aconteceu no horário mostrado pela câmera?",
      "Pergunte: o relógio da câmera estava certo?",
    ],
    reveal:
      "A saída foi às 23:17 — no mesmo minuto da mensagem. Quem estava no corredor poderia ter presenciado o desaparecimento.",
    bulletin:
      "Uma descoberta muda a investigação: a câmera estava sete minutos atrasada. A pessoa de capa amarela saiu do corredor no momento exato da última mensagem de Lia. Peritos agora examinam os acessos ao hotel.",
  },
  {
    title: "A chave que não devia existir",
    subtitle: "O acesso restrito",
    time: "00:06",
    intro:
      "Os peritos recuperam o controle de acesso. Às 23:19, uma porta subterrânea foi aberta com um cartão reservado à diretoria. Helena afirma que o cartão foi clonado. Caio diz que só estava tentando restabelecer a luz. Alguém está mentindo.",
    news: "Costa FM, nova atualização. Um cartão da diretoria abriu uma porta subterrânea minutos depois da última mensagem. O hotel alega falha de segurança. A perícia ainda não confirma essa versão.",
    clues: [
      [
        {
          title: "A impressão do cartão",
          type: "PERÍCIA DE ACESSO",
          body: "O cartão H-01 abriu a porta às 23:19. O chip usou uma assinatura criptográfica válida. Não há indício de clonagem.",
          note: "O cartão físico original foi utilizado.",
        },
        {
          title: "Mapa do subsolo",
          type: "PLANTA RECUPERADA",
          body: "O registro associa cada porta a um código: 11 → lavanderia; 14 → arquivo; 18 → abrigo técnico. O evento H-01 registrou a porta 18.",
          note: "Descubra com seu parceiro quem tinha acesso ao cartão H-01.",
        },
      ],
      [
        {
          title: "O cartão da diretora",
          type: "DEPOIMENTO",
          body: "A recepcionista confirmou: “H-01 é o cartão de Helena. Ela o mantinha no cordão do pescoço às 23h15. Vi quando pediu que fechássemos a recepção.”",
          note: "A versão de que Helena foi embora às 22h não se sustenta.",
        },
        {
          title: "O ruído na ligação",
          type: "TRANSCRIÇÃO",
          body: "Marina ligou para Lia às 23:20. Ouviu três batidas metálicas e um gerador. Depois, silêncio. O gerador de emergência fica no abrigo técnico.",
          note: "Uma sala no subsolo combina com o som da ligação.",
        },
      ],
    ],
    question: "Qual local deve ser investigado agora?",
    options: [
      "Lavanderia · porta 11",
      "Arquivo · porta 14",
      "Abrigo técnico · porta 18",
    ],
    answer: 2,
    hint: "Cruzem o número da porta no registro com o mapa e o som ouvido por Marina.",
    prompt: [
      "Pergunte: quem estava com o cartão da diretoria?",
      "Pergunte: qual porta foi aberta com esse cartão?",
    ],
    reveal:
      "O cartão original de Helena abriu o abrigo técnico. O som do gerador confirma o destino. A história da clonagem não se sustenta.",
    bulletin:
      "Urgente. Peritos descartam clonagem do cartão da diretoria. O abrigo técnico do Hotel Aurora foi acessado às vinte e três horas e dezenove minutos. Equipes seguem para o subsolo.",
  },
  {
    title: "Entre duas versões",
    subtitle: "A mensagem escondida",
    time: "00:24",
    intro:
      "No abrigo há uma gravadora quebrada e uma anotação de Lia: “Não confiem na primeira versão.” Caio admite que discutiu com ela sobre um vazamento de documentos. Marina confessa que ajudava Lia a investigar o hotel. A gravadora contém uma pista para um cofre.",
    news: "A polícia localizou uma gravadora no abrigo técnico. Lia investigava possíveis irregularidades na reforma do Hotel Aurora. A assessoria da direção nega qualquer envolvimento no desaparecimento.",
    clues: [
      [
        {
          title: "Bilhete de Lia",
          type: "DOCUMENTO",
          body: "“O cofre não guarda dinheiro. Guarda a verdade. A senha é o ano do Aurora, seguido pelo número de saídas que ainda podem salvar alguém.”",
          note: "Quatro dígitos do ano + um dígito das saídas.",
        },
        {
          title: "Planta de emergência",
          type: "LAUDO ESTRUTURAL",
          body: "A planta mostra 4 saídas. Duas estão concretadas desde a reforma. Restam 2 saídas utilizáveis: recepção e túnel marítimo.",
          note: "O número de saídas no papel é diferente do número de saídas utilizáveis.",
        },
      ],
      [
        {
          title: "A inauguração",
          type: "ARQUIVO DO JORNAL",
          body: "“Hotel Aurora inaugura em 1998, com vista para a baía e abrigo para tempestades.” A placa original ainda está no saguão.",
          note: "Pergunte que informação vem depois do ano na senha.",
        },
        {
          title: "O segredo de Marina",
          type: "CONFISSÃO",
          body: "“Lia descobriu que Helena recebeu dinheiro para manter o hotel aberto apesar das saídas bloqueadas. Eu ia fotografar os documentos. Caio entregou a planta para nós.”",
          note: "A discussão de Caio era sobre o risco de divulgar a planta, não sobre esconder Lia.",
        },
      ],
    ],
    question: "Qual é a senha do cofre de Lia?",
    input: true,
    answer: "19982",
    hint: "O ano tem quatro dígitos. Acrescentem apenas as saídas que continuam utilizáveis.",
    prompt: [
      "Pergunte: em que ano o hotel foi inaugurado?",
      "Pergunte: quantas saídas realmente funcionam?",
    ],
    reveal:
      "O cofre abre. Dentro, notas assinadas por Helena e um áudio de Lia: “Helena me trancou. Se eu sair, vou publicar tudo. O túnel ainda é uma saída.”",
    bulletin:
      "Exclusivo Costa FM. Documentos recuperados ligam a diretora Helena Duarte à ocultação de riscos estruturais. Uma gravação indica que Lia foi trancada no abrigo e tentou escapar pelo túnel marítimo.",
  },
  {
    title: "O último sinal",
    subtitle: "A corrida contra a maré",
    time: "00:41",
    intro:
      "Lia fugiu do abrigo pelo túnel, mas a maré sobe. Um novo sinal de emergência chegou de uma das saídas. A equipe só pode seguir por uma rota de cada vez. Não escolham por instinto: uma pessoa tem o mapa, a outra tem o sinal.",
    news: "Atenção. A maré está subindo na baía. Uma possível transmissão de Lia foi captada no túnel marítimo. A equipe de resgate precisa localizar a saída correta.",
    clues: [
      [
        {
          title: "Mapa das três rotas",
          type: "CARTOGRAFIA",
          body: "Rota norte → farol → frequência 81. Rota leste → píer → frequência 63. Rota sul → rochas → frequência 42.",
          note: "Cada saída tem uma frequência exclusiva.",
        },
        {
          title: "Boletim da maré",
          type: "ALERTA DE RESGATE",
          body: "O túnel sul já está alagado. O píer está danificado, mas a plataforma superior continua acessível. O farol está vazio.",
          note: "Não confundam a rota segura com o local onde Lia realmente está.",
        },
      ],
      [
        {
          title: "Transmissão fragmentada",
          type: "RÁDIO DE EMERGÊNCIA",
          body: "“Aqui é Lia… seis… três… estou na plataforma… escuto as correntes dos barcos. A água está chegando.”",
          note: "Os dois números identificam o transmissor da saída.",
        },
        {
          title: "O resgate espera",
          type: "CONTATO COM A EQUIPE",
          body: "A lancha está pronta. Precisamos indicar o destino exato: farol, píer ou rochas. A plataforma do píer pode ser alcançada pela água.",
          note: "Pergunte ao seu parceiro qual local corresponde à frequência recebida.",
        },
      ],
    ],
    question: "Para onde vocês enviam a equipe de resgate?",
    options: ["Farol · rota norte", "Píer · rota leste", "Rochas · rota sul"],
    answer: 1,
    hint: "O rádio transmite “seis, três”. Uma das rotas corresponde à frequência 63.",
    prompt: [
      "Pergunte: quais números foram recebidos no rádio?",
      "Pergunte: qual saída corresponde à frequência do sinal?",
    ],
    reveal:
      "A lancha chega ao píer. Lia está na plataforma superior, com água nos tornozelos e a gravação original na mão. Vocês a encontraram.",
    bulletin:
      "Notícia de última hora. Lia Torres foi encontrada com vida no píer da baía. A jornalista está sendo atendida. A investigação agora reúne provas para identificar quem a trancou no abrigo.",
  },
  {
    title: "A verdade tem duas vozes",
    subtitle: "A conclusão do caso",
    time: "01:02",
    intro:
      "Lia está a salvo. Falta assinar o relatório: quem a trancou, e por quê? Revejam os depoimentos e as provas. Uma acusação precisa de uma ligação concreta entre pessoa, acesso e motivo.",
    news: "Lia Torres está fora de perigo. Investigadores analisam o cartão de acesso, documentos financeiros e a gravação recuperada. A conclusão do caso está próxima.",
    clues: [
      [
        {
          title: "O conjunto das provas",
          type: "RELATÓRIO FINAL",
          body: "Cartão original H-01 usado às 23:19. Cofre com pagamentos e assinatura de Helena. Gravação de Lia dizendo que Helena a trancou para impedir a publicação.",
          note: "A perícia confirma o acesso e os documentos revelam o motivo.",
        },
        {
          title: "O celular devolvido",
          type: "RECONSTITUIÇÃO",
          body: "Depois de trancar Lia, Helena voltou ao corredor e deixou o celular no quarto 307 para simular um desaparecimento voluntário. A capa amarela pertencia ao hotel.",
          note: "A capa não bastava para acusar. O conjunto das provas basta.",
        },
      ],
      [
        {
          title: "O álibi de Caio",
          type: "VERIFICAÇÃO",
          body: "Caio estava com o porteiro reiniciando o quadro elétrico às 23:19. Ambos aparecem na câmera da recepção. Ele entregou a planta para Lia investigar a reforma.",
          note: "Caio tinha uma discussão, mas o álibi foi confirmado.",
        },
        {
          title: "O depoimento de Lia",
          type: "TESTEMUNHO",
          body: "“Helena me disse que o hotel acabaria se eu publicasse os documentos. Pegou meu celular e me trancou. Marina tentava me ajudar. Fugi pela saída que Caio marcou na planta.”",
          note: "Conversem: quais três provas sustentam a acusação?",
        },
      ],
    ],
    question: "Quem trancou Lia para impedir a denúncia?",
    options: ["Helena Duarte", "Caio Nunes", "Marina Reis"],
    answer: 0,
    hint: "Cruzem a posse do cartão, os pagamentos assinados e o depoimento de Lia.",
    prompt: [
      "Pergunte: qual prova liga a pessoa à porta do abrigo?",
      "Pergunte: qual era o motivo para silenciar Lia?",
    ],
    reveal:
      "Helena Duarte é presa. O acesso com o cartão original, os documentos financeiros e a gravação de Lia sustentam a acusação. A matéria é publicada: nenhum hotel vale uma vida.",
    bulletin:
      "Caso encerrado. Helena Duarte foi presa por manter Lia Torres em cárcere e ocultar irregularidades no Hotel Aurora. A jornalista foi resgatada graças ao trabalho conjunto de dois investigadores. A verdade finalmente veio à tona.",
  },
];
export function isCorrect(chapter, answer) {
  return chapters[chapter]?.input
    ? String(answer).trim() === chapters[chapter].answer
    : answer === chapters[chapter]?.answer;
}
export const initialGame = {
  version: 1,
  started: false,
  screen: "home",
  chapter: 0,
  role: 0,
  mode: "shared",
  names: ["", ""],
  read: [false, false],
  solved: [],
  mistakes: 0,
  hints: [],
  notes: "",
  seen: [],
};
export function readSave(storage) {
  try {
    const saved = JSON.parse(storage.getItem("ultimo-sinal-v1"));
    if (
      saved?.version === 1 &&
      Number.isInteger(saved.chapter) &&
      saved.chapter >= 0 &&
      saved.chapter < chapters.length &&
      ["home", "setup", "intro", "game", "ending"].includes(saved.screen) &&
      [0, 1].includes(saved.role) &&
      ["shared", "dual"].includes(saved.mode) &&
      Array.isArray(saved.names) &&
      saved.names.length === 2 &&
      saved.names.every((x) => typeof x === "string") &&
      Array.isArray(saved.read) &&
      saved.read.length === 2 &&
      saved.read.every((x) => typeof x === "boolean") &&
      Array.isArray(saved.solved) &&
      saved.solved.every((x) => Number.isInteger(x) && x >= 0 && x < 5) &&
      Array.isArray(saved.hints) &&
      Array.isArray(saved.seen) &&
      typeof saved.notes === "string" &&
      Number.isInteger(saved.mistakes) &&
      saved.mistakes >= 0
    )
      return { ...initialGame, ...saved };
  } catch {}
  return { ...initialGame };
}
