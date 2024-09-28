# ベースイメージとしてNode.jsを使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリのソースコードをコピー
COPY . .

# ビルドコマンド
RUN npm run build

# アプリを起動
CMD ["npm", "start"]

# アプリがポート3000で動作
EXPOSE 3000
