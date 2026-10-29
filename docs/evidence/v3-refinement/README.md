# V3 — evidências de refinamento

before/: estado recebido, fullpage1440/390. round-1/: primeira implementação, antes das correções de reflow/contraste. final/: composição corrigida, claro/escuro desktop/mobile, preview sincronizado e diálogo. Screenshots estáticos usam reduced motion quando cabível para inspecionar layout; desktop-case-motion registra o comportamento normal durante a entrada.

interaction-results.json:9checks funcionais novos, incluindo24 combinações específicas de C. matrix-summary.json referencia a matriz48combinações+11fluxos A/B/C, sem novas falhas. rawresults em ../browser/results.json; as limitações herdadas estão separadas.

lighthouse-*.json e performance-summary.json: medições reais do build final. assets.json: fontes e pesos dos derivados WebP. Revisão e decisões em ../../v3-creative-refinement.md. Não inferir INP, conformidadeWCAG integral nem taxa dequadros fixa.
