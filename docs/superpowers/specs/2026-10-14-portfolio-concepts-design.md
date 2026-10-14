# Duas direções para o portfólio de Enzo Bellussi

## Objetivo

Criar duas versões visuais distintas do portfólio para que Enzo possa compará-las no próprio site. A direção A será a apresentação padrão; a direção B ficará acessível por um seletor persistente no cabeçalho. As duas versões devem transmitir cuidado visual e domínio de front-end sem dificultar a leitura do currículo por recrutadores.

## Entendimento aprovado

- O trabalho parte do site atual em Vite, HTML, CSS e JavaScript, sem framework de interface.
- O portfólio deve continuar em português e inglês, com experiência, produtos, projetos open source, abordagem, apresentação pessoal, currículos e contato.
- A composição deve ser desktop-first. A experiência mobile precisa ser redesenhada para toque e telas menores, não simplesmente reduzida.
- Enzo gosta do Lenis e das referências de shader interativo, cursor personalizado, gráficos animados e textura granulada/serrilhada.
- Os efeitos serão originais e inspirados em princípios visuais das referências, sem copiar seus layouts, código ou identidade.

## Abordagens consideradas

1. **Uma identidade híbrida:** misturar shader, textura pixelada, cursor e superfícies editoriais em uma única página. Isso reduziria o trabalho de manutenção, mas tornaria a comparação ambígua e poderia produzir uma identidade visual sem foco.
2. **Duas páginas completas e independentes:** cada conceito teria seu próprio HTML e conteúdo. Isso daria liberdade estrutural, mas duplicaria traduções, navegação e projetos, aumentando o risco de divergência.
3. **Duas identidades sobre a mesma estrutura semântica — escolhida:** preservar uma fonte de conteúdo, navegação e tradução, aplicando duas composições e sistemas de movimento através de temas selecionáveis. Essa opção torna a comparação direta e mantém os dados do portfólio consistentes.

## Acesso e conteúdo

- `/` abre a versão A por padrão.
- `/?concept=b` abre a versão B diretamente e deve continuar selecionada ao recarregar ou compartilhar o link.
- Um controle `FIELD / INDEX` no cabeçalho troca de versão. O estado aparece em `aria-pressed` e na URL.
- A troca de conceito não altera idioma, conteúdo, links ou ordem lógica das seções.
- Ambas as versões usam o conteúdo e os assets reais existentes, inclusive screenshots dos produtos; nenhuma métrica, responsabilidade ou resultado será inventado.
- A troca PT/EN, os PDFs, navegação por âncoras, metadados, SEO, links sociais e contato continuam disponíveis.

## Conceito A — Deep Field

Uma identidade imersiva, escura e editorial. O hero usa tipografia de grande escala ao lado de um campo procedural de luz e matéria, renderizado em canvas WebGL quando disponível. No desktop, o cursor influencia suavemente o campo; a rolagem conduz a entrada das seções e cria transições de profundidade contidas. As páginas de produto e projetos mantêm texto legível, mas recebem composições visuais amplas e mais cinematográficas.

O campo visual não deve competir com a apresentação profissional: título, descrição e ações de currículo/contato aparecem como HTML normal e são legíveis antes da interação. O movimento é suave, com paleta de tinta azul-petróleo, branco quente e um acento elétrico reservado para ações e foco.

## Conceito B — Pixel Index

Uma identidade gráfica clara, precisa e mais lúdica. A página usa base marfim, tipografia escura, grade modular e acentos de cobalto e lima. Uma textura serrilhada/pixelada animada aparece como camada de baixa intensidade. O cursor de desktop tem um tratamento gráfico próprio; os cartões de projeto respondem ao hover com deslocamento, mudança de escala e detalhes de interface, sem ocultar conteúdo.

O layout organiza os projetos como um índice visual modular, com imagens reais, identificadores e títulos em destaque. A animação é mais gráfica e tátil do que a atmosfera volumétrica da versão A.

## Interação e movimento

- Integrar Lenis como mecanismo de scroll suave, preservando a rolagem por teclado e âncoras. A versão mobile mantém resposta natural ao toque; movimentos decorativos usam gestos de toque e deslocamento de scroll, sem exigir hover.
- No desktop, o cursor personalizado só aparece em ponteiros precisos e não substitui os estados de foco do teclado.
- Animações não podem bloquear navegação, texto, downloads ou interação com links.
- `prefers-reduced-motion` desativa Lenis e movimento decorativo, deixando composições estáticas completas.
- Animações de entrada são progressivas: se JavaScript, IntersectionObserver ou APIs gráficas não estiverem disponíveis, o conteúdo permanece visível.

## Adaptação mobile

- Recompor hero, navegação e cartões em coluna, preservando a hierarquia e a leitura.
- Trocar efeitos baseados em hover por resposta ao toque e à rolagem. Nenhuma informação essencial fica escondida atrás de hover.
- Reduzir a resolução e a frequência do canvas; se WebGL não estiver disponível, mostrar uma versão estática da composição.
- Manter áreas de toque confortáveis, menu acessível, links e ações sem depender de gestos complexos.
- Preservar a personalidade própria de cada conceito: A continua atmosférica; B continua modular e pixelada.

## Arquitetura e limites

- Manter o HTML semântico e o conteúdo compartilhado como fonte única; selecionar o conceito no carregamento a partir do parâmetro `concept`.
- Separar tokens e composições visuais por conceito em folhas ou módulos claramente delimitados, evitando duplicar os dados de tradução.
- Isolar a renderização do canvas em um controlador pequeno, com inicialização e descarte explícitos, renderização limitada por `requestAnimationFrame` e pausa quando a página estiver oculta ou a seção sair da tela.
- Limitar o custo gráfico por pixel ratio e fornecer fallback CSS. Se o canvas falhar, o restante do site continua funcional.
- Não introduzir framework de UI nem dependências de animação além do Lenis sem uma necessidade demonstrada durante a implementação.
- Manter o escopo na apresentação visual e nas interações do portfólio; não reescrever os textos profissionais nem alterar a estrutura dos dados dos projetos.

## Acessibilidade, desempenho e verificação

- Preservar headings, landmarks, links com nome acessível, skip link e foco visível.
- Validar contraste das duas paletas, navegação por teclado, idiomas e downloads.
- Conferir visualmente os dois conceitos em desktop e em mobile estreito, além de movimento reduzido e fallback sem WebGL.
- Fazer uma checagem de build de produção. Não ampliar a suíte de testes neste escopo sem necessidade identificada.

## Critérios de conclusão

1. A e B podem ser abertos por URL e alternados pelo cabeçalho, sem perder idioma ou conteúdo.
2. Cada versão tem identidade visual e movimento claramente diferentes, mantendo os mesmos fatos, projetos e ações profissionais.
3. A versão desktop tem hierarquia visual e interação de ponteiro; o mobile tem layouts e resposta ao toque intencionais para ambos os conceitos.
4. Lenis funciona sem retirar suporte a teclado, âncoras, toque natural ou movimento reduzido.
5. Conteúdo e navegação continuam utilizáveis quando efeitos de canvas ou animação não estão disponíveis.
