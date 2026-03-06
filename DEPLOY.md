# 🚀 Guia de Deploy - NutriMS Frontend

## Pré-requisitos
- Node.js instalado
- Conta no Fastify (ou Vercel/Netlify)
- Backend já deployado no Render

---

## 📋 Passo a Passo

### 1️⃣ Configurar Variáveis de Ambiente

Certifique-se de que o arquivo `.env.production` contém:
```env
VITE_API_URL=https://servidor-mcs-nutri.onrender.com
```

### 2️⃣ Gerar Build de Produção

```bash
# Instalar dependências
npm install

# Gerar build
npm run build
```

Isso criará a pasta `dist/` com os arquivos otimizados.

---

## 🌐 Deploy no Fastify

### Opção A: Via Dashboard Web

1. Acesse [Fastify](https://www.fastify.io/) ou sua plataforma de hospedagem
2. Crie um novo projeto
3. Faça upload da pasta `dist/`
4. Configure as variáveis de ambiente:
   - `VITE_API_URL=https://servidor-mcs-nutri.onrender.com`

### Opção B: Via CLI (se disponível)

```bash
# Instalar CLI do Fastify
npm install -g fastify-cli

# Deploy
fastify deploy dist/
```

---

## 🔧 Alternativas de Hospedagem

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Render (Static Site)

1. Conecte seu repositório GitHub
2. Configure:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
   - **Environment Variables:** `VITE_API_URL=https://servidor-mcs-nutri.onrender.com`

---

## ✅ Verificação Pós-Deploy

1. Acesse a URL do frontend deployado
2. Teste o login de paciente e nutricionista
3. Verifique se as requisições estão chegando ao backend
4. Teste o agendamento de consultas

---

## 🐛 Troubleshooting

### Erro de CORS
- Verifique se o backend permite requisições do domínio do frontend
- No backend, adicione o domínio do frontend em `cors.origin`

### Variáveis de ambiente não carregam
- Certifique-se de usar o prefixo `VITE_` nas variáveis
- Reconstrua o projeto após alterar `.env.production`

### Rotas 404 após refresh
- Configure redirects/rewrites para SPA:
  - **Vercel:** criar `vercel.json`
  - **Netlify:** criar `_redirects`
  - **Render:** configurar "Rewrite Rules"

---

## 📝 Configurações Adicionais

### vercel.json (para Vercel)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### _redirects (para Netlify)
```
/*    /index.html   200
```

### netlify.toml (alternativa)
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🔐 Segurança

- ✅ Arquivo `.env` está no `.gitignore`
- ✅ Variáveis sensíveis não estão no código
- ✅ HTTPS habilitado no backend e frontend
- ✅ CORS configurado corretamente

---

## 📞 Suporte

Em caso de dúvidas, verifique:
- Logs do backend no Render
- Console do navegador (F12)
- Network tab para ver requisições falhando
