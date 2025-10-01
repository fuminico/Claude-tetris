📦 セットアップ方法
1. React + Viteプロジェクトを作成
npm create vite@latest tetris-game -- --template react
cd tetris-game
npm install

2. Tailwind CSSをインストール
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

3. tailwind.config.js を設定
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

4. src/index.css を編集
css@tailwind base;
@tailwind components;
@tailwind utilities;

5. src/App.jsx を置き換え
上記のアーティファクトのコード全体をコピーして src/App.jsx に貼り付けてください。

6. 開発サーバーを起動
bashnpm run dev
ブラウザで http://localhost:5173 を開けばゲームが動作します！