# O último sinal

Jogo original de investigação cooperativa para duas pessoas, em português, feito com React e Vite. Uma jornalista desaparece no Hotel Aurora. A dupla recebe informações complementares e precisa conversar para resolver cinco capítulos.

## Jogar

- **Um celular:** escolham Analista e Investigador. Cada pessoa lê suas pistas e passa o aparelho com uma tela de privacidade.
- **Dois celulares:** abram a mesma URL, selecionem papéis diferentes e avancem juntos por conversa. Cada aparelho salva seu próprio progresso. Este modo é presencial (ou com uma chamada externa); **não possui sala online ou sincronização automática**.
- Examinem as duas pistas do próprio papel, confirmem a leitura e troquem informações verbalmente.
- As respostas corretas liberam descobertas, notícias animadas e o próximo capítulo. Hipóteses incorretas permitem tentar novamente. Dicas são opcionais.
- O caderno, as pistas e o progresso são salvos localmente. Reiniciar remove esses dados deste navegador.

Duração estimada: 30–50 minutos, dependendo da conversa. Conteúdo fictício de suspense, sem imagens gráficas. Não é necessário imprimir, cadastrar ou fornecer dados reais.

## Rodar localmente

Requer Node.js 22.12+.

```bash
npm ci
npm run dev
```

Abra a URL indicada pelo Vite. Para testar no celular na mesma rede, use o IP do computador e a porta 5173, com acesso permitido pelo firewall.

```bash
npm test
npm run build
npm run preview
```

## Testar a jornada no navegador

Com `npm run dev` em execução em outro terminal:

```bash
npx playwright install chromium
npm run test:browser
```

O teste percorre os cinco capítulos, ambos os modos, resposta incorreta, salvamento e reset. Capturas ficam em `test-results`. Pode usar Chromium instalado no sistema ou `CHROMIUM_PATH`. Para testar outra URL, defina `TEST_BASE_URL`.

## Publicar no GitHub Pages

O workflow `.github/workflows/deploy.yml` publica automaticamente a branch `main`.

1. Envie este projeto para seu repositório no GitHub, na branch `main`.
2. No repositório, abra **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Execute o workflow **Deploy to GitHub Pages** em **Actions**, ou faça um novo push para `main`.
4. A URL pública aparecerá no job de deploy. Para este repositório, normalmente será `https://jhonatacosta.github.io/policia-federal/`.

O `base: './'` permite servir em subdiretórios. A aplicação não exige servidor ou variáveis secretas. Também funciona em hospedagens estáticas como Netlify e Vercel com `npm run build` e diretório `dist`.

## Áudio e motion design

As introduções e revelações têm formas de onda, ticker de notícias e transições em CSS. O cenário é uma ilustração SVG local. A narração usa **SpeechSynthesis**, com preferência por uma voz `pt-BR`; disponibilidade e qualidade variam por navegador e sistema. Não há voz gravada ou serviço pago. Pressione “Ouvir boletim”/“Ouvir notícia” para autorizar a reprodução no celular. O som ambiente usa Web Audio, ativado pelo botão no cabeçalho. Todo o conteúdo narrado tem texto equivalente. O site respeita `prefers-reduced-motion`.

O áudio em português depende das vozes instaladas no dispositivo. O jogo inteiro funciona sem áudio. Não há dependência de imagens, vídeos ou fontes remotas.

## Estrutura

- `src/case.js`: roteiro, suspeitos, dossiês, soluções e validação do progresso salvo.
- `src/main.jsx`: interface, modos, leitura privada, deduções, caderno e final.
- `src/Hotel.jsx`: cenário vetorial original.
- `src/audio.js`: narração e ambiente sonoro.
- `src/style.css`: design responsivo e animações.
- `tests/case.test.js`: soluções e recuperação de progresso.

Para criar outro caso, altere os capítulos de `src/case.js`. A solução não é protegida contra leitura do código-fonte: a proposta é colaboração, não competição. Em um celular compartilhado, o botão de troca protege a passagem de tela; a privacidade depende de cada pessoa respeitar o seu papel.
