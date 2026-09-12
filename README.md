# Rádio CBR — player web

React + Vite, sem backend. O áudio é consumido direto de um stream público (Zeno.fm ou Radio.co).

## Configurar

1. `cp .env.example .env.local`
2. Preencha `VITE_STREAM_URL` com a URL direta do stream (ex: `https://stream.zeno.fm/xxxxxxxxxxxxx`).
3. Opcional — "tocando agora":
   - Zeno.fm: `VITE_NOWPLAYING_PROVIDER=zeno` + `VITE_ZENO_MOUNT_ID=<mount id>`
   - Radio.co: `VITE_NOWPLAYING_PROVIDER=radioco` + `VITE_RADIOCO_STATION_ID=<station id>`

## Rodar

```bash
npm install
npm run dev
```

## Cores

Extraídas da logo (`src/assets/logo.png`): teal `#00606C`, azul céu `#6AA6D6`, cinza `#B4BEBE`, navy `#283C50`. Os dois gradientes da arte original (céu e anel teal) estão em `src/index.css`.
