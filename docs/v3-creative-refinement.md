# V3 — direção e plano de refinamento

Brief29/10/2026: tornar C mais autoral e explorável, preservando split editorial, serifada, fatos e funcionalidades. A/B congeladas no commit61df43c. A captura enviada é a evidência principal: previews grandes, tratamentos díspares e sidebar mostrando KOReader durante leitura do Black Market.

Direção: um caderno de decisões de interface. Cobalto na identidade; papel e tinta na leitura; campos azul mineral e areia nos estudos de caso. Zilla maior no nome, títulos em serif e informações funcionais em sans. Só imagens reais; recortes editoriais abrem captura integral. Não criar mockups de funcionalidades inexistentes.

Plano de execução inline:
1. Registrar estado anterior e testes de contrato dos cases/motion.
2. Compor cases com mídia de proporção constante e narrativa; substituir screenshot lateral grande por foco compacto, sincronizado com a leitura.
3. Recriar a voz visual exclusivamente no CSS de C. Camadas reagem a ponteiro preciso, com baixa amplitude.
4. Motion nativo: abertura por linhas em sequência; entradas distintas para títulos, imagens e conteúdo; foco de projeto sincronizado por IntersectionObserver; progresso de leitura com trabalho por frame; diálogo acessível para screenshots reais. Sem loops decorativos, scroll hijacking ou dependências de UI.
5. Inspecionar render desktop/mobile, corrigir em pelo menos dois ciclos; testar teclado, reduced motion em runtime, mudança rápida de projeto, idioma/tema e desktop baixo. Reexecutar testes/build e verificar A/B inalteradas por diff.
6. Atualizar o PR3 com documentação e evidências novas, sem merge/promover C.

Aplicação das skills: Improve UI fundamenta o diagnóstico na captura e no DOM; Improve Animations orienta propósito/frequência e oportunidades (não executar seu fluxo read-only como implementação). Animate implementa receitas CSS/WAAPI, easing e cancelamento. Taste mantém composição split-stage, superfícies e provas reais, com desvio intencional da paleta anterior autorizado pelo brief. Frontend Design ancora a arte no dossiê profissional. UI Skills roteia motion e acessibilidade; sem React/GSAP.


## Ciclos renderizados e correções
- Rodada1 (before e round-1): a nova hierarquia e os palcos reduziram a competição das capturas. A lateral foi sincronizada por projeto em leitura.
- Rodada2: corrigidos overflow do motivo em320px, contraste das palavras de assunto, visualização integral e link original no diálogo. O contraste foi elevado, não excluído do teste. Também removida a reserva permanente de scrollbar que deixava uma faixa clara no mobile e quebrava a navegação em três linhas.
- Revisão independente: dois P2 reproduzidos e corrigidos. A navegação interrompida agora reconcilia o último projeto visível após a proteção manual; cada captura reaberta começa emscrollTop0. Testes comprovam a falha anterior (caseblack-market ao verKOReader e scrollTop300 no segundo diálogo) e os estados corrigidos.
- Rodada final: tema claro/escuro, desktop/mobile, captura integral, leitura nativa e clique rápido entre cases. Testes adicionais em320/390/768/960/1440/1920, PT/EN.

## Aplicação concreta de motion
Abertura é evento raro: nome por linhas750ms/stagger80ms. Entradas servem à hierarquia e mudam por função (título mascarado, imagem com deslocamento/escala mínimos, texto com tradução curta). Controles são imediatos; feedback≤260ms. Leitura/ponteiro alteram apenas transforms de baixa amplitude, com gating por capacidade e preferência. Progresso usa geometria cacheada e um frame por evento, sem loop contínuo. Preferência reduzida em runtime cancela animações, limpa offsets e mantém todos os conteúdos legíveis. Não se reivindica taxa fixa de60fps sem medição em hardware físico.

## Assets e integridade
Seis WebP480/960 derivados de três screenshots originais (KOReaderPT/EN e BlackMarket) somam179kB aproximados. Os originais não foram alterados; o diálogo usa os PNGs integrais. Nenhuma tela, função, empresa, tecnologia ou métrica profissional foi inventada. A/B e sua infraestrutura permanecem sem diff contra61df43c; só fontes/estilos/assets de C, testes e documentação mudaram.

## Exceções de auditoria estética
Taste lint sinaliza papel#faf9f5, duas sombras de screenshot e a borda do disclosure. São decisões do desenho: campo cobalto dominante em vez de paleta genérica, profundidade sobre a mídia real e affordance de expansão. Impeccable detect retorna[]. As flags não são falhas de segurança/acessibilidade; o axe continua exigido, sem exclusão de regras. O teste de desktop baixo aceita0.5px de arredondamento geométrico do navegador, mantendo a detecção original de controles dezenas de pixels fora da tela.


## Verificação final executada
-64/64 testes de unidade e build de produção aprovados. Mantido teste de markup acessível e retirado um teste superficial que só procurava nomes de APIs; motion foi verificado pelo comportamento real no navegador.
-Matriz existente48 combinações e11fluxos: sem novas falhas. C sem violações axe nas configurações390/1440, PT/EN, claro/escuro examinadas;8limitações herdadas de A/B permanecem explicitadas no relatório original.
-Nova suíte de C:9checks aprovados (um deles contém24 combinações de largura/tema/idioma): sincronização de leitura, reação limitada ao ponteiro, reduced motion emruntime, diálogo por teclado/Escape/foco, troca rápida, navegação interrompida, reset da captura, render/locale repetido e console. Sem overflow320–1920 e sem erros de página nessas execuções. A quantidade de tamanhos não equivale a validação em aparelhos físicos.
-Revisão independente confirmou as correções de ambos P2, inclusive troca de idioma durante reconciliação pendente, sem novos achados no escopo revisado.

Lighthouse13.6.0 no build final, Chromeheadless, compare=0, uma execução mobile e uma desktop (não percentis de campo):

| Perfil | Performance | Acessibilidade automática | LCP | CLS | TBT | Transferência |
|---|---:|---:|---:|---:|---:|---:|
| Mobile |100|100|1.092s|0|81ms|240.0kB|
| Desktop |100|100|0.290s|0|0ms|256.3kB|

SEO69 segue o noindex deliberado de C. A transferência mobile da primeira C era640.6kB; esta execução ficou em240kB, principalmente pelos derivados WebP e a miniatura lateral menor. O TBT mobile subiu de0 para81ms com o novo sistema; não é INP nem medição de conversão. Os relatórios anteriores de A/B não foram reclassificados como medições novas. Sem atestado integral de WCAG, leitor de tela humano ou hardwaremobile físico.

## Entrega
PR3 existente será atualizado sem merge. V3 local: http://127.0.0.1:4180/v3?lang=pt . Preview Vercel exige o login do proprietário. A/B permanecem integralmente preservadas; a raiz não foi substituída. Evidências: docs/evidence/v3-refinement/{before,round-1,final}, interaction-results.json, matrix-summary.json e lighthouse-*.json. Capturas finais aguardam decode da imagem e estabilização do estado antes de fotografar; não são mockups.
