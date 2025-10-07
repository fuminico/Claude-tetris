# 🎮 Switch風テトリスゲーム

[![デプロイメントステータス](https://github.com/fuminico/Claude-tetris/actions/workflows/deploy.yml/badge.svg)](https://github.com/fuminico/Claude-tetris/actions/workflows/deploy.yml)

**[➡️ ライブデモはこちら](https://fuminico.github.io/Claude-tetris/)**

Vite + React + Tailwind CSS で作成された、Nintendo Switch をモチーフにした UI を持つレスポンシブ対応テトリスゲームです。

## ✨ 主な特徴

- **Switch 風 UI**: ジョイコンを含む Switch 本体をイメージした没入感のあるデザイン。
- **レスポンシブ対応**: PC / タブレット / スマートフォンで快適にプレイ可能。
- **テトリスの基本機能**: スコア計算、次ブロックのプレビュー、一時停止（スペースキー）に対応。
- **スタートボタンを実装**: 画面中央の START ボタンからゲーム開始。ゲームオーバー時は RESTART ボタンで素早く再挑戦可能。
- **モダンな技術スタック**: Vite による高速開発、React + Tailwind CSS による効率的な UI 実装。

## 🕹 操作方法

| 操作            | キー                   |
| --------------- | ---------------------- |
| 左右移動        | ← / →                  |
| 落下（ソフトドロップ） | ↓                     |
| 回転            | ↑                      |
| ポーズ切り替え  | Space                  |
| ゲーム開始・再開 | 画面下部の START / RESTART ボタン |

## 🛠 技術スタック

- **[Vite](https://vitejs.dev/)**: 高速なフロントエンド開発環境
- **[React](https://react.dev/)**: UI 構築のための JavaScript ライブラリ
- **[Tailwind CSS](https://tailwindcss.com/)**: ユーティリティファーストの CSS フレームワーク
- **[vite-plugin-csp](https://github.com/Lilas-w/vite-plugin-csp)**: GitHub Pages の CSP 対応プラグイン

## 🚀 セットアップ

1. リポジトリをクローンします。

    ```bash
    git clone https://github.com/fuminico/Claude-tetris.git
    ```

2. プロジェクトディレクトリに移動します。

    ```bash
    cd Claude-tetris
    ```

3. 依存関係をインストールします。

    ```bash
    npm install
    ```

4. 開発サーバーを起動します。

    ```bash
    npm run dev
    ```

## 🌐 デプロイ

`main` ブランチへのプッシュをトリガーに GitHub Actions が動作し、自動的に GitHub Pages へデプロイされます。

- ビルド: `npm run build`
- プレビュー: `npm run preview`

## 🧪 テスト

現状ユニットテストは未実装です。挙動の確認には開発サーバーを起動しブラウザで動作確認を行ってください。

## 📄 ライセンス

このリポジトリは [MIT License](LICENSE) の下で公開されています。
