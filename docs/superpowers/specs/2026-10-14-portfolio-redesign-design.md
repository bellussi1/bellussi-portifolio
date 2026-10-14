# Redesenho estrutural do portfólio de Enzo Bellussi

## Objetivo

Reformular as duas apresentações do portfólio para que cada uma conte a trajetória e os projetos por meio de uma composição própria. A primeira rodada foi rejeitada pelo usuário porque as versões pareciam compartilhar a mesma estrutura e variar principalmente as cores. A próxima rodada mantém duas versões alternáveis e preserva os fatos profissionais, mas muda a hierarquia, a narrativa e a organização visual das seções.

## Entendimento aprovado

- O projeto parte do portfólio Vite existente, com JavaScript, HTML e CSS nativos.
- O usuário pediu duas versões para comparar e autorizou seguir com a implementação depois de aprovar a direção abaixo.
- A composição é desktop-first; cada versão também precisa ter uma experiência mobile com ritmo e hierarquia próprios.
- O usuário não quer gradients, rejeitou o verde-limão saturado do INDEX e prioriza leitura clara.
- O usuário gosta de motion bem executado, Lenis, elementos gráficos responsivos ao ponteiro e textura sutil em movimento.
- As referências inspiram princípios e nível de acabamento. Não serão copiados layouts, código ou identidades visuais.

## Abordagem

1. **Retocar a estrutura atual com novas cores e efeitos:** menor custo e menor risco de manutenção, mas repete o problema apontado pelo usuário.
2. **Criar duas composições editoriais diferentes a partir de conteúdo compartilhado — escolhida:** cada direção ganha uma gramática própria para o hero, experiência e projetos. Textos, traduções, screenshots, links e fatos são mantidos em uma fonte de dados comum. O custo é uma implementação maior e mais verificação visual; o benefício é permitir comparar duas experiências realmente distintas sem duplicar informações profissionais.

## Acesso e conteúdo compartilhado

- `/` abre FIELD; `/?concept=b` abre INDEX.
- O seletor do cabeçalho troca a composição, preserva idioma e query parameters alheios ao conceito e mantém `aria-pressed` sincronizado com a URL e o histórico.
- Ambas as versões preservam experiência, produtos, open source, abordagem, sobre, currículos, contato, idiomas, links e metadados existentes.
- Nenhum resultado, responsabilidade ou métrica será inventado.
- Os projetos mantêm imagens reais e destino de links atuais.
- Conteúdo textual e dados de projetos têm uma fonte compartilhada, com traduções PT/EN existentes ou explícitas; layouts podem usar templates e ordem visual diferentes.

## FIELD — relato de sistemas

Uma direção escura e técnica, construída com superfícies sólidas, tipografia editorial e linhas de campo nítidas. O canvas responde ao ponteiro em desktop com deformação e traços/órbitas em cor sólida; não usa washes, halos desfocados nem gradients. Uma camada CSS estática mantém a composição quando WebGL não estiver disponível.

- **Hero desktop:** composição ampla próxima da altura da viewport. O texto e as ações ficam ancorados numa coluna editorial; a visualização de campo ocupa um painel gráfico dominante, com coordenadas e rótulos discretos. A leitura do título não depende do canvas.
- **Experiência:** timeline vertical com anos e metadados numa rail estreita, descrições e responsabilidades em coluna principal.
- **Produtos:** estudos de caso grandes, apresentados em sequência. Cada um combina screenshot de destaque, contexto, contribuição e links em uma composição alternada.
- **Open source:** registro técnico mais compacto, com número, descrição e superfície de demonstração; a escala visual fica abaixo dos produtos principais.
- **Abordagem e sobre:** princípios em uma sequência numerada e fatos profissionais organizados numa grade editorial.
- **Paleta:** tinta azul-petróleo/preto, branco quente e acento ciano restrito a elementos pequenos e estados ativos; contraste de texto validado.

## INDEX — catálogo impresso

Uma direção clara inspirada em catálogo editorial: papel sólido, grafite, linhas finas e acento terracota discreto. Não usa verde-limão, faixas cromáticas fortes nem gradients. Uma textura de impressão pode se mover poucos pixels em desktop, com intensidade baixa e desligamento completo em movimento reduzido.

- **Hero desktop:** layout editorial em colunas, com título principal, índice lateral e uma peça gráfica construída com módulos sólidos e tipografia. O nome e a função profissional têm prioridade visual.
- **Experiência:** tabela/índice de funções com colunas explícitas para período, organização e contribuição, em vez da timeline do FIELD.
- **Produtos:** catálogo em grade de duas colunas. Cada cartão mostra screenshot, número, contexto, papel, resultado já documentado e links numa ordem consistente.
- **Open source:** índice curto de ferramentas em linhas de catálogo com status e link, sem repetir o formato dos cartões de produto.
- **Abordagem e sobre:** diagrama modular de princípios e ficha biográfica estruturada em campos.
- **Ponteiro:** marcador desktop pequeno em terracota, sem substituir o cursor nativo ou os focos de teclado.
- **Paleta:** marfim, grafite, cinza quente e terracota escuro com contraste legível; nenhuma superfície verde saturada.

## Mobile

- Recompor os dois conceitos em fluxos verticais específicos, preservando a diferença entre narrativa de estudos de caso (FIELD) e catálogo (INDEX).
- Validar larguras de 320px, 360px e 390px. Nenhum cabeçalho, texto ou ação pode criar rolagem horizontal.
- Manter menu, idiomas, alternador de conceitos e links com alvos de toque de pelo menos 44px.
- Efeitos de hover não contêm informação exclusiva. O cursor customizado não aparece em ponteiros coarse ou sem hover.
- Reduzir custo do WebGL e taxa de atualização em telas menores. Nenhuma interação de toque exige gesto complexo.

## Interação e acessibilidade

- Manter Lenis com scroll por teclado, âncoras e comportamento natural de toque; desligar e destruir sua instância quando `prefers-reduced-motion` estiver ativo.
- `prefers-reduced-motion` interrompe todas as translações, parallax, texturas animadas e movimento do canvas, inclusive regras de hover mais específicas.
- Estados hover e foco de cada superfície têm contraste suficiente contra seu fundo; a língua selecionada continua visualmente identificável.
- Mudar a capacidade do ponteiro entre fine e coarse desanexa os listeners não aplicáveis e limpa o estado visual.
- Preservar skip link, landmarks, headings, foco visível, controles nomeados, navegação por teclado e links acessíveis.
- A animação é decorativa e nunca bloqueia conteúdo, navegação, downloads ou contato.

## Limites técnicos

- Continuar sem framework de interface ou pacote de animação além do Lenis já instalado.
- Compartilhar conteúdo e registros de projeto; permitir estruturas visuais diferentes sem duplicar traduções ou fatos.
- Manter WebGL como aprimoramento isolado, com limite de resolução/cadência, pausa fora da tela e fallback estático.
- Não reescrever o conteúdo profissional nem alterar os destinos dos links existentes.
- Não usar gradients CSS ou gradients de cor no canvas. Construir fundos e gráficos com cores sólidas, contornos, linhas e textura sutil.

## Verificação e critérios de conclusão

1. FIELD e INDEX usam layouts estruturais distintos para hero, experiência e projetos; a diferença não pode depender apenas de cores ou tratamento de superfície.
2. O conteúdo profissional e os links são consistentes entre conceitos e idiomas.
3. Não há gradients nem o verde-limão saturado rejeitado; textos e foco mantêm contraste legível.
4. Desktop mostra hierarquia clara, motion controlado e uma interação de ponteiro distinta; mobile tem layouts próprios e nenhum overflow entre 320–390px.
5. Testes cobrem query/history, idioma, Lenis, ciclo de vida dos efeitos e os seis achados da revisão final: foco/hover de contato, overflow em 320px, reduced motion de hover, idioma selecionado, troca fine/coarse e posicionamento de caption.
6. Build de produção funciona; ambos os conceitos são revisados em desktop, mobile, movimento reduzido e fallback sem WebGL.
