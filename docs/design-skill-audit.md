# Auditoria de skills — 29/10/2026

## Método e procedência
Pesquisa antes de alterações de produto. Foram abertos todos os 13 endereços solicitados. Os oito repositórios GitHub foram clonados (depth 1; agentic-awesome-skills com sparse checkout) para `C:/Users/Bellussi/.codex/tmp/portfolio-design-research`, fora do produto. Nenhuma skill foi instalada globalmente. Foram lidos READMEs, SKILL.md selecionados, referências de tipografia/motion/crítica e inspecionados os scripts executados. Não foram executados instaladores dos catálogos.

| Referência | Acesso e conteúdo verificado | Decisão |
|---|---|---|
| https://github.com/pbakaus/impeccable | Web + clone 5e745ac; README, skill instalada 4.8, context, init/new-work, craft-floor | Princípios de typeset, contraste, harden e revisão renderizada. Processo de comps/entrevistas não adotado: brief já autoriza direção e execução contínua. |
| https://github.com/Leonxlnx/taste-skill | Web + clone 12af471; skill local, type, motion, critique, draw e inspect | Principal direção de C, tokens, composição, screenshots em três larguras e revisão visual. |
| https://www.ui-skills.com/skills/ibelick/ui-skills-root | Web + clone ibelick/ui-skills; CLI inspecionada | Roteamento typography/accessibility. CLI executada diretamente com Node 24 (strip types), sem instalar a árvore Astro/React. |
| https://www.ui-skills.com/skills/ibelick/improve-ui | Web e SKILL.md local | Auditoria baseada em evidência; não executar seu fluxo de implementação, pois a skill é estritamente read-only. |
| https://www.ui-skills.com/skills/anthropics/frontend-design | Web e skill local | Direção ancorada em trabalho real, não em ornamentos. Complementa taste. |
| https://www.ui-skills.com/skills/emilkowalski/improve-animations | Web e skill local | Referência de diagnóstico. Implementação usa native CSS/WAAPI com reduced motion, sem bibliotecas extras. |
| https://www.ui-skills.com/skills/millionco/improve-react | Web e skill local | Não executar React Doctor: projeto Vite vanilla, sem React. Aplicáveis: evitar trabalho redundante no DOM, adiar código não crítico. |
| https://github.com/CryptoZephyr/zoom | Web + clone 2dcfc34; skills/zoom/SKILL.md | Checklist crítico de template, informação e efeitos sem propósito; não reescrever A/B sob esse critério. |
| https://github.com/sickn33/agentic-awesome-skills | Web + clone sparse, README | Identificadas frontend-lighthouse, webapp-uat e Product Design Studio; não instalar pacote extenso. |
| https://github.com/VoltAgent/awesome-agent-skills | Web + clone, README | Identificadas webapp-testing, Playwright, web-design-guidelines; aproveitar testes reais, não adicionar frameworks. |
| https://github.com/composio-community/awesome-codex-skills | Web + clone; webapp-testing/SKILL.md | Reconhecer DOM renderizado antes de automação, capturar console/network, testar casos de uso. |
| https://github.com/VoltAgent/awesome-codex-subagents | Web + clone; README e perfis de qualidade | Catálogo de perfis, não skills executáveis; sem instalação de agentes. |
| https://skill-issue.in/?domain=design | Web tool não acessou; HTTP direto200 e catálogo renderizado acessível no Playwright | Diretório de descoberta: ui-ux-pro-max, frontend-design, taste-skill, design-system-patterns, web-design-guidelines, high-end-visual-design, redesign-existing-projects, hallmark, minimalist-ui e emil-design-eng. Não instalar estilos concorrentes; design-system-patterns aparece como link não verificado no próprio diretório. |

## Inventário local e seleção
Instaladas verificadas: taste-skill, impeccable, anthropic-frontend-design, ui-skills-root, improve-ui, improve-animations, improve-react, zoom; skills de processo using-superpowers, brainstorming, writing-plans, executing-plans, test-driven-development, verification-before-completion e using-git-worktrees. Nenhuma migração de stack. Ego-browser indisponível no PATH; navegador Playwright disponível e usado como fallback.

Seleção por qualidade/relevância/compatibilidade (1–5): taste 5/5/5 (C e evidência); better-typography 5/5/5 (B/C); fixing-accessibility 5/5/5 (seletor/C); frontend-design 4/5/5 (direção C); Impeccable craft-floor 4/5/5 (revisão C); improve-ui 4/4/3 (diagnóstico apenas); improve-animations 4/4/3 (diagnóstico apenas); improve-react 4/1/1 (descartada para execução); zoom 3/3/4 (checklist, não autoridade universal).

A CLI encontrou adicionalmente `jakubkrehel/better-typography`, `pbakaus/typeset`, `zeke/swiss-design`, `ibelick/fixing-accessibility` e `vercel-labs/web-design-guidelines`. Foram carregadas better-typography e fixing-accessibility: fontes locais, pesos reais, leading unitário, medida legível, foco e controles nativos. Swiss-design e typeset redundam com os contextos já escolhidos.

## Aplicação concreta
- B: Zilla Slab real, WOFF2 local, swap, pesos 400/500/600/700 e itálico; tokens de família, escala e entrelinha. Sem alterar cores, padding, seções, componentes ou animações. A continua usando seus arquivos originais.
- C: split-stage da taste, paleta Sheet and biro (papel, tinta e azul), Zilla Slab + DM Sans. A identidade de Enzo e suas ferramentas reais ocupam o palco fixo. Um seletor de projeto troca o preview usando as duas aplicações reais, sem métricas inventadas.
- Testes: preservar baseline, testar rotas/idioma/tema, sem JS, reduced motion, teclado, responsividade e console; medir build e navegador separadamente de notas estéticas.

## Conflitos e limites
As regras de taste contra linhas, texto pequeno e mono não constituem WCAG. O scanner de baseline acusa preferências estéticas: não corrigir A/B por isso. A regra de quatro imagens/vídeo não justifica inventar mídia; só existem duas capturas de produtos atuais. Seu sorteio pressupôs fotografias, mas foram passados product-ui e escolhidos os screenshots reais. Não usar fotos genéricas nem fabricar projetos.

Brainstorming normalmente pede aprovações intermediárias; a instrução explícita deste pedido dispensa esses gates reversíveis. O mesmo vale para decisões de comps da Impeccable. Todo o desenho e os desvios ficam documentados. O launcher Impeccable context funcionou; o launcher JS do UI Skills dependia de tsx ausente, resolvido executando o .ts inspecionado com Node 24. O comando `list --category design` não existe; as categorias corretas typography e accessibility foram consultadas.

Ferramentas de execução adicionais: Playwright1.64.1 e axe-core4.14.0 apenas como devDependencies para tornar a matriz reproduzível. Lighthouse13.6.0 e Prettier3.8.2 usados como ferramentas externas isoladas, sem dependência de produção. Contexto usado para selecionar, não para acumular bibliotecas no site.


## Refinamento exclusivo de C após feedback
Diagnóstico refeito sobre a captura fornecida: competição entre screenshots e identidade; preview lateral fora de sincronia; pouco encadeamento visual. Aplicadas Animate/RECIPES e Improve Animations/AUDIT para propósito, stagger, cancelamento, pointer gating e reduced motion em runtime. Improve UI foi usado na fase de leitura, sem impor seu workflow read-only à implementação explicitamente solicitada. UI Skills consultada na categoria motion; não foram instaladas skills/libraries novas. Taste/Frontend Design guiaram a composição de dois estudos reais, palcos cromáticos e escala do nome. Registradas exceções aos quatro achados de lint (papel claro, sombra de plano e linha de disclosure); Impeccable detect retornou[] nos novos fontes. Ver docs/v3-creative-refinement.md.
