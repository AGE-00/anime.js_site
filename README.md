# Animation JS Site

React + Vite で構築したアニメーションライブラリ「Animation JS」のデモ/ランディングページです。`anime.js` を活用したパーティクル背景やタイトルアニメーションを備え、ライブラリの主要機能をわかりやすく紹介します。

## 主な特徴

- 🎨 `anime.js` によるキャンバス粒子エフェクトとタイポグラフィアニメーション
- ⚛️ React 19 + Vite 7 によるモダンな開発環境（HMR 対応）
- 📱 スクロール連動の「Back to top」ボタンやレスポンシブデザイン
- 🧩 セクション単位で整理されたコンポーネント構造

## 技術スタック

- React 19 / React DOM
- Vite 7
- anime.js 4
- ESLint 9 （Flat Config）

## セットアップ

必須: Node.js 18 以上（推奨 20+）

```powershell
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発サーバ（[http://localhost:5173](http://localhost:5173)）を起動 |
| `npm run build` | 本番ビルドを `dist/` に生成 |
| `npm run preview` | ビルド成果物をローカルで提供 |
| `npm run lint` | ESLint チェックを実行 |

## プロジェクト構造

```text
├── public/               # 静的アセット（ビルド時にコピー）
├── src/
│   ├── App.jsx           # ルートコンポーネント
│   ├── App.css           # ページ固有スタイル
│   ├── index.css         # グローバルスタイル & テーマ
│   ├── main.jsx          # React エントリポイント
│   └── components/       # UI コンポーネント群
│       ├── BackgroundCanvas.jsx  # 粒子アニメーション
│       ├── AnimatedTitle.jsx     # タイトルの演出
│       ├── BackToTop.jsx         # スクロール制御ボタン
│       └── ...
└── vite.config.js        # Vite 設定
```

## anime.js を使った演出

- `BackgroundCanvas.jsx` — キャンバス描画と `anime.js` タイムラインで粒子の色相をループさせ、一定間隔でバーストエフェクトを追加。
- `AnimatedTitle.jsx` — 文字単位のイントロアニメーションと、（任意で）マイク入力に連動したグロー表現。

これらのコンポーネントは `App.jsx` から読み込まれ、英雄セクションや特徴紹介セクションと組み合わせてランディング体験を構成しています。

## 開発メモ

- グローバルスタイルは `src/index.css` に集約し、React コンポーネント内は必要最低限のスコープド CSS を適用しています。
- 不要になった従来のスクリプトや空ファイルは削除済みです。構造を保ちながら新しいセクションを追加する際は `src/components/` 以下にまとめると管理しやすくなります。

## ライセンス

このデモは学習・検証目的で公開されています。アニメーションライブラリ本体のライセンスに関しては公式リポジトリをご確認ください。
