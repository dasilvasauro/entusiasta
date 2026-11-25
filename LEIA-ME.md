# Entusiasta: como gerar o PWA, o APK (Android) e o .deb (Linux)

Este pacote já contém o jogo pronto em `www/` e as receitas para o GitHub montar as versões instaláveis automaticamente. Você não precisa instalar nada no seu computador: tudo é compilado nos servidores do GitHub (GitHub Actions), de graça para repositórios públicos.

## O que tem aqui

| Pasta ou arquivo | Para que serve |
|---|---|
| `www/` | O jogo (`index.html`), o three.js local para rodar offline, o manifesto do PWA, o service worker e os ícones |
| `capacitor.config.json` e `scripts/` | Configuração do app Android (horizontal, tela cheia, tela sempre ligada) |
| `electron/main.js` | Janela do app para Linux |
| `build/icon.png` e `resources/` | Ícones do app |
| `.github/workflows/` | As três receitas: `android.yml` (APK), `linux-deb.yml` (.deb) e `pages.yml` (PWA no GitHub Pages) |

## Passo a passo

### 1. Criar o repositório
1. Entre em github.com e crie uma conta, se ainda não tiver.
2. Clique em **New repository**, dê o nome `entusiasta`, deixe **Public** e clique em **Create repository**.
3. Na página do repositório vazio, clique em **uploading an existing file**.
4. Descompacte este .zip no computador e arraste **todo o conteúdo da pasta `entusiasta`** (inclusive a pasta `.github`) para a página. Se o navegador não mostrar a pasta `.github` por estar oculta, ative "mostrar arquivos ocultos" no explorador de arquivos antes de arrastar.
5. Clique em **Commit changes**.

> Alternativa pelo terminal: `git init`, `git add .`, `git commit -m "Entusiasta"`, `git branch -M main`, `git remote add origin https://github.com/SEU_USUARIO/entusiasta.git` e `git push -u origin main`.

### 2. Gerar o APK do Android
1. No repositório, abra a aba **Actions**. Se aparecer um aviso, clique em **I understand my workflows, go ahead and enable them**.
2. Na lista da esquerda, clique em **Android (APK)** e depois em **Run workflow** → **Run workflow**.
3. Aguarde de 5 a 10 minutos até aparecer o ✓ verde.
4. Clique na execução concluída e, em **Artifacts**, baixe **entusiasta-android**. Dentro do .zip está o `app-debug.apk`.
5. No celular, abra o APK. O Android vai pedir para permitir **instalar apps de fontes desconhecidas** para o navegador ou gerenciador de arquivos; permita e instale.

O app abre só na horizontal, em tela cheia e com a tela sempre ligada. Controles Bluetooth ou USB (Xbox, PlayStation, 8BitDo e similares) funcionam no app, assim como no navegador.

> O APK gerado é de depuração (debug). Ele instala normalmente no seu celular, mas para publicar na Play Store é preciso um APK/AAB assinado com a sua chave. Quando chegar a hora, posso preparar essa etapa.

### 3. Gerar o .deb para Linux
1. Em **Actions**, clique em **Linux (.deb)** → **Run workflow**.
2. Ao terminar, baixe o artefato **entusiasta-linux** e descompacte.
3. Instale com `sudo apt install ./entusiasta_0.6.0_amd64.deb` (o nome pode variar).
4. O jogo aparece no menu de aplicativos, na categoria Jogos, com ícone e descrição. F11 alterna a tela cheia.

### 4. Publicar o PWA (jogar pelo navegador e instalar)
1. No repositório, abra **Settings** → **Pages**.
2. Em **Build and deployment** → **Source**, escolha **GitHub Actions**.
3. Em **Actions**, rode **PWA (GitHub Pages)** (ele também roda sozinho a cada envio para a branch `main`).
4. O endereço fica parecido com `https://SEU_USUARIO.github.io/entusiasta/`.
5. No Chrome do Android, abra o endereço e use **Adicionar à tela inicial** ou **Instalar app**. No computador, use o ícone de instalar na barra de endereço. Depois da primeira visita, o jogo funciona offline.

## Gerar versões novas
1. Troque `www/index.html` pela versão nova do jogo.
2. Atualize `"version"` em `package.json` (por exemplo, `0.7.0`).
3. Envie as mudanças e rode os workflows de novo. Se criar uma tag começando com `v` (por exemplo `v0.7.0`), o APK e o .deb são gerados automaticamente.

## Problemas comuns
- **O workflow falhou em "Instalar dependências"**: rode de novo; às vezes é instabilidade momentânea do npm.
- **O APK não instala**: desinstale a versão anterior se ela tiver sido gerada em outro repositório (a assinatura de depuração muda).
- **Não vejo a aba Actions**: confira se a pasta `.github/workflows` foi enviada junto.
