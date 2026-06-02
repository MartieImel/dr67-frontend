# dr67-frontend

Frontend para Danganronpa — Turma 67.

Como usar:

1. Instale dependências:

```bash
npm install
```

2. Desenvolver localmente:

```bash
npm run dev
```

3. Build para produção:

```bash
npm run build
```

4. Publicar no GitHub Pages (opcional):

- Adicione este repositório ao GitHub (crie repo remoto `dr67-frontend`).
- Push para `main`.
- O workflow em `.github/workflows/deploy.yml` fará build e publicará em `gh-pages`.

Configurar backend:

- Edite `index.html` e defina `window.__API_BASE__` para a URL do seu backend implantado (Render, Heroku, etc.).
- Exemplo:

```html
<script>
  window.__API_BASE__ = 'https://seu-backend.example.com';
</script>
```

Próximos passos:
- Subir para o GitHub e ativar Pages na branch `gh-pages` (o workflow já gera o conteúdo).
- Se quiser, eu empurro os arquivos diretamente para um repositório remoto (preciso de acesso ao GitHub/perm).