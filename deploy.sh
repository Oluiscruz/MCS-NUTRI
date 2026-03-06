#!/bin/bash

echo "🚀 Iniciando deploy do NutriMS Frontend..."

# 1. Instalar dependências
echo "📦 Instalando dependências..."
npm install

# 2. Build do projeto
echo "🔨 Gerando build de produção..."
npm run build

# 3. Verificar se o build foi criado
if [ -d "dist" ]; then
    echo "✅ Build criado com sucesso!"
    echo "📁 Arquivos prontos na pasta 'dist'"
else
    echo "❌ Erro ao criar build"
    exit 1
fi

echo "✨ Deploy preparado! Agora faça upload da pasta 'dist' para o Fastify"
