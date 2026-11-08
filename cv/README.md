# Currículos / Resumes

Fontes LaTeX dos currículos em inglês e português. Os PDFs publicados no site ficam em `public/curriculo-en.pdf` e `public/curriculo-pt.pdf`.

## Arquivos

| Arquivo | Uso |
| --- | --- |
| `curriculo-en.tex` | Currículo em inglês (padrão para o site) |
| `curriculo-pt.tex` | Currículo em português |
| `curriculo-en.pdf` | PDF compilado em inglês |
| `curriculo-pt.pdf` | PDF compilado em português |

## Compilar

O preâmbulo funciona com pdfLaTeX e XeTeX. A forma mais simples é usar o [Tectonic](https://tectonic-typesetting.github.io/), que baixa os pacotes necessários na primeira execução:

```sh
tectonic -X compile curriculo-en.tex
tectonic -X compile curriculo-pt.tex
```

Com uma instalação completa de TeX Live ou MiKTeX:

```sh
pdflatex curriculo-en.tex
pdflatex curriculo-pt.tex
```

Depois de compilar, copie os PDFs para o site:

```sh
cp curriculo-en.pdf ../public/curriculo-en.pdf
cp curriculo-pt.pdf ../public/curriculo-pt.pdf
```

## Decisões de ATS

- Uma coluna, sem tabelas, caixas de texto, ícones ou gráficos.
- Cabeçalhos de seção convencionais: Summary, Skills, Experience, Projects, Education, Languages.
- Texto selecionável e fontes incorporadas.
- Ligaduras desativadas para preservar palavras como "eficiência" e "proficiency" na extração.
- Uma página, com palavras-chave da área no resumo, competências e experiências.
- Links exibidos em texto legível, com URLs completas no PDF.
- Sem métricas inventadas; os números do ATLAS vêm do build publicado do projeto.

## Atualizar

Edite os `.tex`, recompile os dois idiomas e substitua os PDFs em `public/`. O teste `npm test` verifica que os arquivos existem e que o site aponta para os nomes corretos.
