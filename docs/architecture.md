# NEXSKILL - 技術構成

## 技術スタック
| 項目 | 技術 |
|---|---|
| フロントエンド | Vanilla HTML/CSS/JS（シングルファイル） |
| 認証 | Firebase Authentication（メール/パスワード） |
| データベース | Cloud Firestore |
| ホスティング | GitHub Pages（mainブランチから自動デプロイ） |
| Firebase SDK | compat版 v10.12.2（CDN読み込み） |
| ビルドツール | なし（ビルドステップ不要） |

## ディレクトリ構成
```
ai_learning_app/
├── index.html          # メインアプリ（CSS + HTML + JS 全込み、約2200行）
├── admin.html          # 管理者ページ（約360行）
├── docs/               # プロジェクトドキュメント
│   ├── project.md
│   ├── requirements.md
│   ├── architecture.md
│   ├── decisions.md
│   └── todo.md
├── CLAUDE.md           # Claude Code用の作業ルール
└── .claude/
    └── launch.json     # ローカルプレビューサーバー設定（port 8765）
```

## Firebase設定
```
プロジェクトID: ai-learning-lab-21b07
Auth Domain: ai-learning-lab-21b07.firebaseapp.com
管理者メアド: kokisuto494@gmail.com
```

## Firestoreデータ構造

### `approved_emails/{docId}`
管理者が許可したメールアドレスの一覧。
```json
{
  "email": "user@example.com",
  "approvedAt": "<Timestamp>"
}
```

### `users/{uid}`
ユーザーごとの学習データ。Firebase Auth の UID をドキュメントIDとして使用。
```json
{
  "email": "user@example.com",
  "chapterStatuses": {
    "chapter_1": "completed",
    "chapter_2": "in_progress",
    "chapter_mac_1": "not_started"
  },
  "customChapters": [],
  "createdAt": "<Timestamp>",
  "lastLogin": "<Timestamp>"
}
```

### ステータスの取り扱い
- `chapterStatuses` に存在しないチャプターIDは `"not_started"` として扱う
- これにより、新チャプター追加時にFirestoreのデータ移行が不要
- `customChapters` は現在未使用（ユーザーからのチャプター生成機能を削除済み）

## コード内のデータ構造

### `DEFAULT_CHAPTERS` 配列（index.html内）
全チャプターの定義とコンテンツを格納。コードに埋め込み。
```javascript
{
  id: 'chapter_1',           // 一意のID（Firestoreのstatusesのキー）
  title: 'チャプタータイトル',
  icon: '🤖',               // 絵文字1つ
  color: 'purple',           // purple|blue|pink|green|orange|teal
  estimatedMinutes: 15,
  content: {
    hook: 'つかみの一言',
    goals: ['目標1', '目標2', '目標3'],
    body: '<h4>見出し</h4><p>本文HTML...</p>',
    points: ['ポイント1', 'ポイント2', 'ポイント3'],
    practiceWork: '実践ワークの説明'
  }
}
```

### `COURSES` 配列（index.html内）
コースの定義。チャプターIDの配列で紐づける。
```javascript
{
  id: 'course_ai_basics',
  title: 'AI初歩コース',
  icon: '🚀',
  color: 'purple',
  description: 'コースの説明文',
  chapterIds: ['chapter_1', 'chapter_2', ...]
}
```

### 現在のコース/チャプター一覧（2026-06-05時点）
| コースID | コース名 | チャプター数 |
|---|---|---|
| course_ai_basics | AI初歩コース | 6 (chapter_1〜6) |
| course_mac_basics | はじめてのMacコース | 6 (chapter_mac_1〜6) |
| course_win_basics | はじめてのWindowsコース | 6 (chapter_win_1〜6) |

## 主要な処理フロー

### 認証フロー
1. `auth.onAuthStateChanged` がFirebase Authの状態を監視
2. 未ログイン → ログイン画面表示
3. ログイン済み → `initApp()` → `loadUserData()` → Firestoreからユーザーデータ取得
4. 新規登録時: `approved_emails`コレクション全件取得 → 許可チェック → `createUserWithEmailAndPassword` → Firestoreにユーザードキュメント作成

### データ読み込みフロー
1. `loadUserData()`: Firestoreの `users/{uid}` からデータ取得
2. `DEFAULT_CHAPTERS` をベースに `chapters` 配列を構築
3. 各チャプターの `status` は `chapterStatuses[ch.id] || 'not_started'` で決定
4. → 新チャプターは自動的に「未学習」で表示される

### 画面遷移
- `SCREEN_RENDERERS` オブジェクトに画面IDと描画関数を登録
- `switchScreen(screenId)` で画面切り替え
- 存在しない画面IDはコンソールエラーで検知

## 外部サービス/API
| サービス | 用途 | 備考 |
|---|---|---|
| Firebase Auth | ユーザー認証 | メール/パスワード方式 |
| Cloud Firestore | データ永続化 | ユーザー進捗・許可メアド |
| GitHub Pages | 静的ホスティング | mainブランチから自動デプロイ |
| Anthropic API | チャプター生成（管理者のみ） | SYSTEM_PROMPT内蔵、現在ユーザーには非公開 |

## セキュリティ上の注意点
- **Firestoreルールがテストモード**: 2026年7月まで全読み書き許可。本番運用前に適切なルールに変更が必要
- **Firebase設定キーがコード内にハードコード**: Firebase APIキーは公開前提の設計だが、Firestoreルールでのアクセス制御が本来の防御線
- **管理者メアドがコード内にハードコード**: admin.html内の `ADMIN_EMAIL` 定数
- **approved_emails の読み取り**: 未認証ユーザーからの読み取りが必要（新規登録時の許可チェック用）
