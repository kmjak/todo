# 📝 Todo アプリ制作手順

## 🎯 0. 事前準備（npm のセットアップ）

まず最初に、Node.jsとnpmがインストールされていることを確認してください。
ターミナル（Macならターミナル、WindowsならコマンドプロンプトやPowerShell）で以下のコマンドを実行して、バージョンが表示されればOKです！

```bash
node --version
npm --version
```

## 🏗️ 1. プロジェクトの雛形を作成しよう

Next.jsの公式ツールを使って、Todoアプリの基本構造を作成します。
以下のコマンドを実行すると、いくつか質問されるので、すべて「Yes」を選択してください。

```bash
npx create-next-app@latest todo
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like your code inside a `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to use Turbopack for `next dev`? … Yes
✔ Would you like to customize the import alias (`@/*` by default)? … Yes
```

💡 **各項目の説明：**
- **TypeScript**: より安全なコード書けるJavaScriptの拡張版
- **ESLint**: コードの品質をチェックしてくれるツール
- **Tailwind CSS**: 素早くスタイリングできるCSSフレームワーク
- **src/ directory**: コードを整理しやすくする構造
- **App Router**: Next.js 13以降の新しいルーティング方式
- **Turbopack**: 開発時のビルドを高速化するツール

## 📚 2. GitHubにプロジェクトをアップロードしよう

作成したプロジェクトをGitHubで管理できるようにします。
まず、GitHubで新しいリポジトリを作成してから、以下の手順を実行してください。

> 🔧 **置き換えが必要な部分：**
> - `XXXX` = あなたのGitHubユーザー名
> - `YYYY` = 作成したリポジトリ名

```bash
git init
git add .
git commit -m "chore: Next.jsでTodoアプリの雛形を作成"
git branch -M main
git remote add origin https://github.com/XXXX/YYYY.git
git push -u origin main
```

💡 **コマンドの説明：**
- `git init`: 現在のフォルダをGitリポジトリとして初期化
- `git add .`: すべてのファイルを追加対象に
- `git commit -m "..."`: 変更内容を記録（コミット）
- `git branch -M main`: メインブランチの名前を「main」に設定
- `git remote add origin ...`: GitHubのリポジトリを連携先として登録
- `git push -u origin main`: ローカルの変更をGitHubにアップロード

## ⚙️ 3. 開発環境の設定をしよう

コードの品質を保つため、ESLintの設定を詳しく調整します。
この設定により、統一されたコーディングスタイルを維持できます。

### 📝 ESLint設定ファイルの作成

プロジェクトのルートにある `eslint.config.mjs` ファイルを以下の内容で更新してください：

```mjs
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ),

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase"],
        },
        {
          selector: "parameter",
          format: ["camelCase"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],
    },
  },

  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "function",
          format: ["camelCase"],
        },
      ],
    },
  },

  {
    files: ["**/app/api/**/*.ts"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "function",
          format: ["UPPER_CASE"],
        },
      ],
    },
  },

  {
    files: ["**/*.tsx"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "function",
          format: ["PascalCase"],
        },
      ],
    },
  },
];

export default eslintConfig;
```

💡 **この設定の効果：**
- 変数名はキャメルケース（camelCase）で統一
- 型名はパスカルケース（PascalCase）で統一
- React関数コンポーネントはパスカルケースで統一
- コードの品質が自動チェックされる

### 📦 ESLint設定をGitにコミットしよう

設定ファイルを更新したので、変更内容をGitに記録します：

```bash
git add eslint.config.mjs
git commit -m "chore: ESLint設定ファイルを追加してコード品質向上ルールを設定"
```

### 🎨 VS Code設定ファイルの作成

開発効率を上げるため、VS Codeの設定も調整しましょう。
プロジェクトルートに `.vscode` フォルダを作成し、その中に `settings.json` ファイルを配置してください：

**ファイルパス**: `todo/.vscode/settings.json`

```json
{
  "editor.formatOnSave": false,
  "editor.tabSize": 2,
  "editor.quickSuggestions": {
    "strings": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": "always",
    "source.fixAll.eslint": "always",
    "source.organizeImports": "always"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "javascript.preferences.importModuleSpecifier": "non-relative",
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  "files.trimTrailingWhitespace": true
}
```

💡 **この設定の効果：**
- ESLintエラーの自動修正
- インポート文の自動整理
- より快適な開発体験

### 📦 VS Code設定をGitにコミットしよう

VS Codeの設定ファイルも追加したので、これもGitに記録します：

```bash
git add .vscode/
git commit -m "chore: VS Code開発環境設定ファイルを追加"
```

### 🚀 完成した環境設定をGitHubにアップロードしよう

ここまでの設定をすべてGitHubに反映させます：

```bash
git push
```

## 🧹 4. 不要なファイルを削除してシンプルにしよう

Next.jsで自動生成された不要なファイルを削除し、Todoアプリ用にカスタマイズします。

### 削除対象と修正内容：
- **public/フォルダ**: サンプル画像などを削除
- **src/app/globals.css**: Tailwind CSS以外のスタイルを削除
- **src/app/page.tsx**: ホームページをシンプルな「Todo」表示に変更

### 📝 ホームページの修正

`src/app/page.tsx` を以下の内容に変更してください：
```tsx
export default function Home() {
  return (
    <h1>Todo</h1>
  );
}
```

`src/app/globals.css`を以下の内容に変更してください:
```css
@import "tailwindcss";
```

### 📦 削除・修正内容をGitにコミットしよう

変更した内容をそれぞれコミットして、GitHubにアップロードします：
```bash
git add public
git commit -m "remove: Next.js雛形に含まれていた不要な画像ファイルを削除"

git add src/app/globals.css
git commit -m "style: グローバルCSSをTailwind CSSのみに整理"

git add src/app/page.tsx
git commit -m "refactor: ホームページをTodoアプリ用にシンプルな構成に変更"

git push
```

## 🌟 5. アプリを起動して動作確認しよう

これまでの作業が正しくできているか確認するため、開発サーバーを起動します：

```bash
npm run dev
```

✅ **確認ポイント：**
- ターミナルにエラーが表示されていないか
- `http://localhost:3000` にアクセスできるか
- 「Todo」という文字が表示されているか

💡 サーバーを停止したい場合は、ターミナルで `Ctrl + C` を押してください。

## 🎨 6. Headerコンポーネントを作成しよう

アプリにヘッダーを追加して、見た目を整えます。
まずは新しいブランチを作成して、機能ごとに開発を進めましょう。

### 🔄 開発ブランチの作成と切り替え

新しい機能を開発する際は、メインブランチとは別のブランチで作業するのがベストプラクティスです：

```bash
git branch

git branch feature/components/header
git checkout feature/components/header

git branch
```

💡 **ブランチの仕組み：**
- `main`ブランチ: 完成した機能のみを保管
- `feature/～`ブランチ: 新機能の開発用
- 開発完了後にmainブランチにマージ（統合）

### 📄 Headerコンポーネントファイルの作成

以下のパスにHeaderコンポーネントを作成します：

**ファイルパス**: `src/components/header/Header.tsx`
```tsx
export default function Header() {
  return (
    <header className="w-full h-16 bg-gray-800 text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold">Todoアプリ</h1>
    </header>
  )
}
```

💡 **このコンポーネントの特徴：**
- Tailwind CSSを使用したスタイリング
- レスポンシブデザイン対応
- ダークテーマのヘッダーデザイン

### 📦 Headerコンポーネントをコミットしよう

作成したHeaderコンポーネントをGitに記録します：
```bash
git add src/components/header/Header.tsx
git commit -m "feat: アプリ全体で使用するHeaderコンポーネントを追加"
```

### 🔗 レイアウトにHeaderを組み込もう

作成したHeaderをアプリ全体で表示されるように、レイアウトファイルに追加します。

**ファイルパス**: `src/app/layout.tsx`
```tsx
import Header from "@/components/header/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}

```

💡 **layout.tsxの役割：**
- アプリ全体の共通レイアウトを定義
- Headerのように全ページで表示したいコンポーネントを配置
- childrenで各ページのコンテンツを表示

### 📦 レイアウトの変更をコミットしよう
```bash
git add src/app/layout.tsx
git commit -m "feat: レイアウトファイルにHeaderコンポーネントを組み込み"
```

### 🚀 新しいブランチの内容をGitHubにプッシュしよう

⚠️ **重要**: 新しいブランチを初めてプッシュする場合は、以下のコマンドが必要です：

```bash
git push --set-upstream origin feature/components/header
```

💡 **なぜこのコマンドが必要？**
- ローカルブランチとリモートブランチを関連付けるため
- 2回目以降は `git push` だけでOK

### 🔄 プルリクエストを作成してmainにマージしよう

1. GitHubのリポジトリページにアクセス
2. 「Compare & pull request」ボタンをクリック
3. 変更内容を確認してプルリクエストを作成
4. 問題なければ「Merge pull request」でマージ

## ✅ 7. マージ結果の確認をしよう

マージが完了したら、ローカルのmainブランチを最新状態に更新して確認します：
```bash
git checkout main
git pull
```

✅ **確認ポイント：**
- エラーが表示されていないか
- Headerが正しく表示されているか
- 開発サーバー（`npm run dev`）でページが正常に動作するか

## 📝 8. Todoフォームコンポーネントを作成しよう

次に、新しいTodoを追加するためのフォームを作成します。

### 🔄 新しい開発ブランチの作成

Todo関連のコンポーネントを開発するための新しいブランチを作成します：

```bash
git branch

git branch feature/components/todo
git checkout feature/components/todo

git branch
```

### 📝 TodoFormコンポーネントの作成

新しいTodoを入力するためのフォームコンポーネントを作成します。

**ファイルパス**: `src/components/todo/TodoForm.tsx`
```tsx
export default function TodoForm() {
  return (
    <form className="flex items-center gap-1 justify-center">
      <input
        type="text"
        className="w-60 h-12 outline-none border-2 rounded-md text-xl px-2 py-1 focus:border-blue-400 transition-colors"
        placeholder="Add a new task"
      />
      <button
        type="submit"
        className="w-20 h-12 border-2 rounded-md text-xl cursor-pointer hover:border-blue-400 active:border-blue-400 active:opacity-50 transition-colors duration-200"
      >
        Add
      </button>
    </form>
  );
}
```

💡 **このフォームの特徴：**
- 入力フィールドとボタンを横並びに配置
- ホバー効果とフォーカス効果を追加
- レスポンシブデザイン対応

### 📦 TodoFormをコミットしよう
```bash
git add src/components/todo/TodoForm.tsx
git commit -m "feat: 新しいTodoを追加するためのフォームコンポーネントを作成"
```

### 🏠 ホームページにTodoFormを組み込もう

作成したTodoFormをホームページで表示できるようにします。

**ファイルパス**: `src/app/page.tsx`
```tsx
import TodoForm from "@/components/todo/TodoForm";

export default function Home() {
  return (
    <main className="container mx-auto py-4">
      <TodoForm />
    </main>
  );
}
```

### 📦 ページの更新をコミットしよう
```bash
git add src/app/page.tsx
git commit -m "feat: ホームページにTodoFormコンポーネントを組み込み"
```

### 🚀 TodoFormブランチをプッシュしよう

新しいブランチでのpushなので--set--upstreamなどが必要です：

```bash
git push --set-upstream origin feature/components/todo
```

## 📋 9. Todo一覧表示コンポーネントを作成しよう

続けて同じブランチで、Todoを一覧表示するコンポーネントを作成します。

### 🏷️ Todo型定義の作成

まずはTodoデータの構造を定義するため、TypeScriptの型を作成します。

**ファイルパス**: `src/types/todo/Todo.ts`
```ts
export interface Todo {
  id: number;
  name: string;
  description?: string;
}
```

💡 **型定義の説明：**
- `id`: 各Todoを識別するユニークな番号（必須）
- `name`: Todoのタイトル（必須）
- `description?`: 詳細説明（オプション、`?`マークで省略可能）

### 📝 TodoListコンポーネントの作成

Todoの一覧を表示するコンポーネントを作成します。
まずはサンプルデータを使って表示機能を実装します。

**ファイルパス**: `src/components/todo/TodoList.tsx`
```tsx
import { Todo } from "@/types/todo/Todo";

export default function TodoList() {
  const todoItems: Todo[] = [
    { id: 1, name: "Todoアプリ作成", description: "Next.jsとTypeScriptで作成" },
    { id: 2, name: "ランニング", description: "毎日5km走る" },
    { id: 3, name: "ブロスタ", },
  ];

  return (
    <ul className="flex flex-col gap-2 py-4">
      {todoItems.map((todo:Todo) => (
        <div className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 text-xl w-80 border border-black rounded-lg" key={todo.id}>
          <p className="">{todo.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-green-500 hover:opacity-40 transition-opacity">更新</p>
            <p className="text-red-500 hover:opacity-40 transition-opacity">削除</p>
          </div>
        </div>
      ))}
    </ul>
  );
}
```

💡 **このコンポーネントの特徴：**
- サンプルデータを使用してTodo一覧を表示
- 各Todoに更新・削除ボタンを配置
- ホバー効果でユーザビリティ向上
- レスポンシブデザイン対応

### 🏠 ホームページにTodoListを追加しよう

作成したTodoListをホームページに組み込んで、一覧表示できるようにします。

**ファイルパス**: `src/app/page.tsx`
```tsx
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center py-4">
      <TodoForm />
      <TodoList />
    </main>
  );
}
```

### 📦 作成したコンポーネントをコミットしよう

ここまでで作成した型定義とコンポーネントをそれぞれコミットします：
```bash
git add src/types/todo/Todo.ts
git commit -m "feat: TypeScriptでTodoデータ構造のインターフェースを定義"


git add src/components/todo/TodoList.tsx
git commit -m "feat: Todoアイテムを一覧表示するコンポーネントを作成"

git add src/app/page.tsx
git commit -m "feat: ホームページにTodoListコンポーネントを追加して一覧表示機能を実装"
```

### 🔧 コンポーネントをさらに細分化しよう

より保守性の高いコードにするため、データとコンポーネントをさらに分割します。

#### 📊 設定ファイルの作成

サンプルデータを別ファイルに移動して、データとUIを分離します。

**ファイルパス**: `src/config/todo/todos.ts`
```ts
import { Todo } from "@/types/todo/Todo";

export const todoItems: Todo[] = [
  { id: 1, name: "Todoアプリ作成", description: "Next.jsとTypeScriptで作成" },
  { id: 2, name: "ランニング", description: "毎日5km走る" },
  { id: 3, name: "ブロスタ", },
];
```

#### 📄 TodoItemコンポーネントの作成

個別のTodoアイテムを表示するコンポーネントを作成します。
これにより、TodoList内の処理がシンプルになります。

**ファイルパス**: `src/components/todo/TodoItem.tsx`
```tsx
import Link from "next/link"

interface TodoItemProps {
  id: number
  name: string
}

export default function TodoItem({id, name}: TodoItemProps) {
  return (
    <div className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 text-xl w-80 border border-black rounded-lg">
      <p className="">{name}</p>
      <div className="flex items-center gap-2">
        <Link href={`/edit/${id}`} className="text-green-500 hover:opacity-40 transition-opacity">更新</Link>
        <Link href={`/delete/${id}`} className="text-red-500 hover:opacity-40 transition-opacity">削除</Link>
      </div>
    </div>
  )
}
```

💡 **TodoItemコンポーネントの特徴：**
- 再利用可能な単一責任のコンポーネント
- propsで必要なデータのみを受け取る
- Next.jsのLinkコンポーネントで将来の編集・削除ページに対応
- クリーンなコード構造

#### 🔄 TodoListの更新

TodoItemコンポーネントと設定ファイルを使用するように、TodoListを更新します。

**ファイルパス**: `src/components/todo/TodoList.tsx`
```tsx
import TodoItem from "@/components/todo/TodoItem";
import { todoItems } from "@/config/todo/todos";
import { Todo } from "@/types/todo/Todo";

export default function TodoList() {
  return (
    <ul className="flex flex-col gap-2 py-4">
      {todoItems.map((todo:Todo) => (
        <TodoItem key={todo.id} name={todo.name} id={todo.id} />
      ))}
    </ul>
  );
}
```

### 📦 変更した内容をコミットしよう

ファイルを細分化した変更をそれぞれコミットします：
```bash
git add src/config/todo/todos.ts
git commit -m "feat: Todoサンプルデータを管理する設定ファイルを作成"

git add src/components/todo/TodoItem.tsx
git commit -m "feat: 個別のTodoアイテムを表示する再利用可能なコンポーネントを作成"

git add src/components/todo/TodoList.tsx
git commit -m "refactor: TodoListを設定ファイルとTodoItemコンポーネントを使用する構成に変更"
```

### 🚀 プッシュしてプルリクエストをマージしよう

Todo関連のコンポーネントが完成したので、GitHubにプッシュします（一度のこのbranchでpushしたのでgit pushだけでOK）：

```bash
git push
```

💡 **プルリクエストの流れ：**
1. GitHubでプルリクエストを作成
2. 変更内容をレビュー
3. 問題なければマージ

### ✅ mainブランチの更新確認

マージ完了後、mainブランチで最新の変更が反映されているか確認しましょう：
```bash
git checkout main
git pull
```

## ⚛️ 10. Todoの状態管理（hooks）を実装しよう - Part1

いよいよTodoアプリに動的な機能を追加します！
状態管理ライブラリのJotaiを使用して、Todoの追加・表示機能を実装しましょう。

### 🔄 新しい開発ブランチの作成

フック（hooks）機能を開発するための新しいブランチを作成します。

💡 **ブランチ作成の省略記法：**
- `git switch -c ブランチ名`
- `git checkout -b ブランチ名`

```bash
git switch -c feature/hooks/todo
```

### 📦 状態管理ライブラリのインストール

Jotaiをインストールして、効率的な状態管理を実現します：
```bash
npm install jotai
```

💡 **Jotaiとは？**
- React用の軽量な状態管理ライブラリ
- コンポーネント間でデータを共有可能
- 複雑な設定不要でシンプルに使用可能

### 🏪 Todo状態管理ストアの作成

Jotaiを使ってTodoリストの状態を管理するatomを作成します。

**ファイルパス**: `src/store/todo/todos.ts`
```ts
import { todoItems } from "@/config/todo/todos";
import { Todo } from "@/types/todo/Todo";
import { atom } from "jotai";

export const todosAtom = atom<Todo[]>(todoItems);
```

💡 **atomの仕組み：**
- Todoリストの状態を全アプリで共有
- 初期値として設定ファイルのデータを使用
- 型安全性を保つためにTypeScriptの型を指定

### 🔄 TodoListでJotaiの状態を使用しよう

static（固定）データではなく、動的に変更可能な状態を使用するようにTodoListを更新します。

**ファイルパス**: `src/components/todo/TodoList.tsx`
```tsx
"use client"

import TodoItem from "@/components/todo/TodoItem";
import { todosAtom } from "@/store/todo/todos";
import { Todo } from "@/types/todo/Todo";
import { useAtomValue } from "jotai";

export default function TodoList() {
  const todos = useAtomValue(todosAtom);

  return (
    <ul className="flex flex-col gap-2 py-4">
      {todos.map((todo:Todo) => (
        <TodoItem key={todo.id} name={todo.name} id={todo.id} />
      ))}
    </ul>
  );
}
```

💡 **変更のポイント：**
- `"use client"`: ブラウザ側で実行するコンポーネントとして指定
- `useAtomValue`: Jotaiの状態を読み取り専用で取得
- リアルタイムで状態の変更が反映される

### 🎯 カスタムフック（useTodo）の作成

Todo関連の操作をまとめたカスタムフックを作成します。
これにより、コンポーネントから状態管理のロジックを分離できます。

**ファイルパス**: `src/hooks/todo/useTodo.ts`
```ts
"use client"

import { todosAtom } from "@/store/todo/todos";
import { Todo } from "@/types/todo/Todo";
import { useAtom } from "jotai";
import { FormEvent, useState } from "react";

export default function useTodo() {
  const [todos, setTodos] = useAtom(todosAtom);
  const [newTodoName, setNewTodoName] = useState<string>("");

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewTodoName("");
    const id = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const newTodo: Todo = {
      id,
      name: newTodoName,
      description: "",
    };
    console.log(newTodo);

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  const handleChangeNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
  };

  return {
    newTodoName,
    handleAddTodo,
    handleChangeNewTodoName,
  }
}
```

💡 **useTodoフックの機能：**
- **newTodoName**: 入力中のTodo名を管理
- **handleAddTodo**: フォーム送信時のTodo追加処理
- **handleChangeNewTodoName**: 入力フィールドの変更処理
- 自動的にユニークなIDを生成
- 追加後は入力フィールドをクリア

### 🔧 TodoFormでuseTodoを使用しよう

作成したカスタムフックを使用して、TodoFormに実際のTodo追加機能を実装します。

**ファイルパス**: `src/components/todo/TodoForm.tsx`
```tsx
"use client"

import useTodo from "@/hooks/todo/useTodo";

export default function TodoForm() {
  const { handleAddTodo, handleChangeNewTodoName, newTodoName } = useTodo();
  return (
    <form className="flex items-center gap-1 justify-center" onSubmit={handleAddTodo}>
      <input
        type="text"
        className="w-60 h-12 outline-none border-2 rounded-md text-xl px-2 py-1 focus:border-blue-400 transition-colors"
        placeholder="Add a new task"
        value={newTodoName}
        onChange={handleChangeNewTodoName}
      />
      <button
        type="submit"
        className="w-20 h-12 border-2 rounded-md text-xl cursor-pointer hover:border-blue-400 active:border-blue-400 active:opacity-50 transition-colors duration-200"
      >
        Add
      </button>
    </form>
  );
}
```

💡 **実装された機能：**
- フォーム送信時にTodoが追加される
- 入力値は状態管理により自動で管理
- 追加後に入力フィールドがクリアされる
- リアルタイムでTodoListに反映される

### 📦 すべての変更をGitにコミット＆プッシュしよう

実装した機能をそれぞれコミットして、GitHubにプッシュします：
```bash
git add package.json package-lock.json
git commit -m "chore: 状態管理ライブラリjotaiをインストール"

git add src/store/todo/todos.ts
git commit -m "feat: Jotaiを使用したTodo状態管理のatomを作成"

git add src/components/todo/TodoList.tsx
git commit -m "refactor: TodoListコンポーネントで静的データではなくJotaiの状態を使用するように変更"

git add src/hooks/todo/useTodo.ts
git commit -m "feat: Todo操作をまとめたカスタムフック（useTodo）を作成"

git add src/components/todo/TodoForm.tsx
git commit -m "feat: useTodoフックを使用してTodo追加機能を実装"

git push --set-upstream origin feature/hooks/todo
```

### 🎉 動作確認とマージ

1. **動作確認**: 開発サーバーでTodoの追加機能が正常に動作することを確認
2. **プルリクエスト作成**: GitHubでプルリクエストを作成
3. **マージ**: 変更内容に問題がなければmainブランチにマージ

### データが更新されているか確認しよう

マージ後、mainブランチで最新の状態を確認しましょう：

```bash
git checkout main
git pull
```
