# Evidências — 29/10/2026

- baseline/: screenshots do controle antes da implementação; report.json do taste; verificação independente de origin/main em verified-original.json; fidelity-layout.json mostra texto e geometria iguais entre original e A. A comparação PNG não é byte a byte idêntica: no desktop,232/1.296.000 pixels diferiram em apenas1 nível do canal verde entre dev e produção, sem mudança de layout.
- browser/:12 screenshots finais (A/B/C×claro/escuro×390/1440), results.json com48 combinações e11 fluxos. Oito ocorrências de overflow herdado são explicitamente conhecidas, não aprovações de reflow.
- editorial/: screenshots de C em1440/768/390 e folhas de scroll. O report do taste é um scanner de estilo, não a11y. Ler as exceções justificadas no relatório de comparação.
- lighthouse-{a,b,c}-{mobile,desktop}.json: seis execuções reais Lighthouse13.6, build de produção local, comparação oculta. Uma execução por configuração; sem inferir percentis ou INP de campo.
- comparison-disabled.json: verificação do build sem módulo nem marcação do seletor.
- link-check.json: checagem HTTP dos13 destinos externos distintos; LinkedIn rejeita HEAD com405, não prova URL quebrada.

Os screenshots com movimento reduzido ajudam a comparação de layout. Motion normal também foi exercitado por testes de interação, mas estas imagens não registram a qualidade temporal da animação. O site publicado foi aberto em navegador; as evidências completas de matriz e performance são locais. Sem atestado de conformidade WCAG nem teste com leitor de tela humano.
