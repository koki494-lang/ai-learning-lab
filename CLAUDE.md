# CLAUDE.md - Claude Code 作業ルール

## このファイルについて
このファイルはClaude Codeがこのプロジェクトで作業するときに必ず読む前提条件です。
新しいセッションを開始したら、まずこのファイルと `docs/` 配下のドキュメントを確認してください。

## プロジェクト概要
- **アプリ名**: NEXSKILL（次の自分をつくるスキル学習）
- **ターゲット**: 大学1〜2年生（副業に踏み出したい層）
- **構成**: index.html（メインアプリ）+ admin.html（管理者ページ）のシングルHTML構成
- **ホスティング**: GitHub Pages（mainブランチpushで自動デプロイ）
- **バックエンド**: Firebase Auth + Cloud Firestore（サーバーサイドコードなし）
- **デプロイURL**: https://koki494-lang.github.io/ai-learning-lab/

## 回答方針
- 日本語で応答すること
- 仕様書レベルの具体的な回答をすること。一般論・抽象的な説明は避ける
- コード変更時は必ず変更理由と影響範囲を説明すること

## 守るべきルール

### コード変更時
1. **既存ユーザーの進捗を壊さない**: `chapterStatuses` に存在しないIDは `not_started` として扱う設計。この仕組みを変更しない
2. **シングルHTML構成を維持**: ファイルを分割しない。ビルドステップを追加しない
3. **Firebase設定を変更しない**: apiKey, projectId 等は既存のものを使う
4. **管理者メアドを変更しない**: `ADMIN_EMAIL = 'kokisuto494@gmail.com'`

### コース/チャプター追加時
1. `DEFAULT_CHAPTERS` 配列にチャプターオブジェクトを追加
2. `COURSES` 配列のcourse定義にchapterIdsを追加（新コースの場合はcourse自体を追加）
3. チャプターIDは一意にする（例: `chapter_mac_1`, `chapter_win_1`）
4. コースカラーは `purple | blue | pink | green | orange | teal` の6色から選択
5. チャプターコンテンツは `hook, goals(3), body(HTML), points(3), practiceWork` の5要素必須

### 画面/タブ追加時
1. HTMLに `<div id="screen-xxx" class="screen">` を追加
2. `SCREEN_RENDERERS` オブジェクトに描画関数を登録
3. ボトムナビに `<button class="nav-item" data-screen="xxx">` を追加

### Git運用
- mainブランチに直接push（GitHub Pages用）
- コミットメッセージは日本語で、変更内容を明記
- Co-Authored-By を含める

## 変更前に確認すべきこと
1. `DIRECTION.md` で方針（サブ事業・やらないことリスト）を確認
2. `docs/architecture.md` でデータ構造を確認
3. `docs/requirements.md` で「やらないこと」に該当しないか確認
4. `docs/decisions.md` で過去に却下された案でないか確認

## ドキュメント更新ルール
以下の変更を行ったら、対応するドキュメントも更新すること：

| 変更内容 | 更新するファイル |
|---|---|
| コース/チャプター追加 | `docs/architecture.md`（コース一覧表）, `docs/todo.md` |
| 新機能追加 | `docs/requirements.md`, `docs/todo.md` |
| 技術的な意思決定 | `docs/decisions.md` |
| 方針・ターゲット変更 | `docs/project.md`, `CLAUDE.md` |
| タスク完了 | `docs/todo.md` |

## ドキュメント一覧
| ファイル | 内容 |
|---|---|
| `docs/project.md` | プロジェクト概要・ターゲット・前提条件 |
| `docs/requirements.md` | 機能要件・非機能要件・やらないこと |
| `docs/architecture.md` | 技術構成・データ構造・処理フロー |
| `docs/decisions.md` | 意思決定ログ |
| `docs/todo.md` | タスク管理・優先度 |

## コンテンツ追加ワークフロー
1. ユーザーがClaudeチャットでコース構成を壁打ち
2. 最終出力フォーマット（コース名・チャプター構成）をClaude Codeに貼付け
3. Claude Codeがチャプター本文を執筆し、コードに追加
4. ユーザーが内容を確認してOK
5. git push → GitHub Pages自動デプロイ
6. `docs/architecture.md` のコース一覧表を更新
