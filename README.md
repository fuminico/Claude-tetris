# 🎮 Switch風テトリスゲーム

[![デプロイメントステータス](https://github.com/fuminico/Claude-tetris/actions/workflows/deploy.yml/badge.svg)](https://github.com/fuminico/Claude-tetris/actions/workflows/deploy.yml)

**[➡️ ライブデモはこちら](https://fuminico.github.io/Claude-tetris/)**

Vite + React + Tailwind CSS で作成された、Nintendo Switch風のUIを持つレスポンシブ対応のテトリスゲームです。

## ✨ 主な特徴

-   **Switch風UI**: Nintendo Switchを模したユニークで魅力的なデザイン。
-   **レスポンシブ対応**: 画面サイズに応じてレイアウトが自動調整され、様々なデバイスで快適にプレイ可能。
-   **主要なテトリス機能**: スコア計算、次のブロックのプレビュー、一時停止機能を搭載。
-   **モダンな技術スタック**: Viteによる高速な開発環境と、React, Tailwind CSSによる効率的な開発を実現。

## 🛠️ 技術スタック

このプロジェクトは以下の主要な技術を使用して構築されています。

-   **[Vite](https://vitejs.dev/)**: 高速なフロントエンド開発ツール。
-   **[React](https://react.dev/)**: UI構築のためのJavaScriptライブラリ。
-   **[Tailwind CSS](https://tailwindcss.com/)**: ユーティリティファーストのCSSフレームワーク。
-   **[vite-plugin-csp](https://github.com/Lilas-w/vite-plugin-csp)**: GitHub Pagesのコンテンツセキュリティポリシー（CSP）に対応するためのViteプラグイン。

## 🚀 プロジェクトのセットアップ

1.  **リポジトリをクローンします。**
    ```bash
    git clone https://github.com/fuminico/Claude-tetris.git
    ```

2.  **プロジェクトディレクトリに移動します。**
    ```bash
    cd Claude-tetris
    ```

3.  **依存関係をインストールします。**
    ```bash
    npm install
    ```

4.  **開発サーバーを起動します。**
    ```bash
    npm run dev
    ```

## 🌐 デプロイ

このリポジトリは、`main` ブランチへのプッシュをトリガーとして、GitHub Actions経由でGitHub Pagesに自動的にデプロイされます。

-   **ビルド**: `npm run build`
-   **デプロイ**: `.github/workflows/deploy.yml` にて定義

## 🕹️ 操作方法

| キー          | アクション         |
| :------------ | :----------------- |
| `←` `→`      | ブロックの左右移動 |
| `↑`           | ブロックの回転     |
| `↓`           | ブロックの高速落下 |
| `スペースキー` | 一時停止 / 再開    |

---
このプロジェクトはAI（Gemini）とのペアプログラミングによって作成されました。