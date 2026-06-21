# NEXSKILL

副業に踏み出したい大学生に、AIとPCの基礎スキルを無料で提供するクローズドな学習Webアプリ。管理者が許可したメールアドレスのみ登録可能。コース × チャプター構成で段階的に学べる。

## 技術構成

| 項目 | 技術 |
|---|---|
| フロントエンド | Vanilla HTML/CSS/JS（シングルファイル） |
| 認証 | Firebase Authentication（メール/パスワード） |
| データベース | Cloud Firestore |
| ホスティング | GitHub Pages |
| Firebase SDK | compat版 v10.12.2（CDN） |

## ファイル構成

- `index.html` — メインアプリ（CSS + HTML + JS 全込み）
- `admin.html` — 管理者ページ（許可メアド管理・ユーザー進捗確認）
- `DIRECTION.md` — 方針定義（位置づけ・ミッション・やらないことリスト）
- `CLAUDE.md` — Claude Code 用の作業ルール
- `docs/` — プロジェクトドキュメント

## ローカルでの確認方法

ビルドステップなし。HTMLファイルをブラウザで直接開くか、ローカルサーバーで配信する。

```bash
# 方法1: Python簡易サーバー
cd ai_learning_app
python3 -m http.server 8765

# 方法2: VS Code の Live Server 拡張機能で index.html を開く
```

`http://localhost:8765` にアクセスすればアプリが表示される。

## デプロイ

GitHub Pages を使用。`main` ブランチにpushすると自動的に公開される。

- 公開URL: https://koki494-lang.github.io/ai-learning-lab/
- 管理者ページ: https://koki494-lang.github.io/ai-learning-lab/admin.html

特別な設定やビルドコマンドは不要。pushするだけ。
