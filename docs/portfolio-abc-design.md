# Desenho A/B/C

Brief: comparar identidade visual em desktop/mobile sem promover C, inventar fatos ou migrar stack. Execução contínua já autorizada no pedido. Trabalho arquitetural com rotas independentes e camada de comparação pequena.

Alternativas: duplicar três sites daria fidelidade mas conteúdo divergente; reestilizar um único DOM limitaria C a facelift; escolhido multipage Vite com A original, B gerada a partir de A e C prerenderizada com dados compartilhados. CSS de C não importa CSS de A/B. B é cópia gerada, não uma fonte de conteúdo nova. A só recebe a entrada do seletor condicional.

Direção C: split-stage (taste seed 1939662201), Sheet and biro. Nesta página, os produtos KOReader/Black Market e a identidade de Enzo tornam-se um palco fixo que acompanha o dossiê profissional. Nome Zilla Slab, texto DM Sans, fundo branco, tinta quase preta e ação azul. A imagem muda pelo seletor de projeto. Sem cenas de scroll, vídeo ou fotografias que não existem. A blueprint de menu/restaurante é adaptada para currículo; não incluir formulário sem backend. Mobile transforma a coluna fixa em abertura no fluxo. Tema inicial claro em C, preferência explícita preservada; A/B mantêm o tema inicial original.

Narrativa/claims: Enzo é engenheiro focado em frontend (nome, especialidade e currículo); cria software real (dois produtos com status e imagens); assume responsabilidade em produção (duas experiências, todas responsabilidades); constrói ferramentas abertas (três CLIs com comandos e links); conecta interface e arquitetura (abordagem e competências); contato direto (email/CV/LinkedIn). Sem resultados numéricos novos.

Rotas: Vite build multipage, /v2/index.html e /v3/index.html gerados antes de dev/build. Vercel usa rewrites explícitos para os arquivos HTML gerados; canonical / e robots noindex nos experimentos. Query lang=pt/en permite compartilhar e sobreviver a storage indisponível. Seletor em Shadow DOM evita CSS cruzado; import removido em build quando VITE_PORTFOLIO_COMPARE=false. Modo ?compare=0 para screenshots sem seletor; sem espaço reservado ou listeners quando desativado.

Testes: unidade de rotas/idioma e render factual, baseline intacto por hash, comparação B de tokens sem alterações geométricas declaradas; navegador em 320/390/768/1440, duas línguas/temas, keyboard, reduced motion, storage bloqueado, sem JS, console e rede, âncoras/CVs. Performance de laboratório separada de avaliação visual. Screenshot antes/depois. Riscos: fonte B muda quebras naturalmente; conteúdo profissional pode estar desatualizado e não será reinterpretado; sem métricas de campo INP/CrUX próprias.

Revisão independente: viewport1440×600 expunha controles abaixo da coluna sticky; fallback para coluna no fluxo em desktop com altura≤759px resolve o caso e evita corte marginal em960×720. Novo teste integrado cobre controles e seleção em desktop baixo.

Configuração Vercel: não combinar cleanUrls=true com destino de rewrite terminado em.html. Mantido o padrão sem cleanUrls e rewrites explícitos para v2/index.html e v3/index.html, conforme documentação oficial Vite/Vercel.
