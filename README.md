# weather-forecast

現在の天気予報と、１週間分の天気予報を閲覧できるページを作成しました。  
各都道府県の県庁所在地の天気予報がご覧いただけます。

# Deploy

https://main.d1tl2tke46n6x5.amplifyapp.com/

# DEMO

![](https://user-images.githubusercontent.com/95216275/203209878-091ab4d6-33fb-4de8-9b00-56b020272819.gif)

- 現在の天気予報(WeatherForecast)
  - フォームに都道府県名/都市名を入力し、送信ボタンを押すと  
    現在の天気に連動して背景画像が切り替わり、画面下部に天気の詳細が表示されます。
- １週間の天気予報(WeekWeatherForecast)
  - 現在の天気予報ページ上の「週間天気予報ページ」のボタンを押下すると、１週間の天気予報ページに遷移します。
  - 遷移後、現在の天気予報ページで閲覧していた都市が表示されます。
  - フォームに都道府県名/都市名を入力し、送信ボタンを押すと  
    その都市の１週間分の天気グラフが表示されます。

# グラフ作成に使用したライブラリ

- [chart.js@3.8.0](https://www.chartjs.org/)

# API

- 天気予報のデータ取得元
  - [openweathermap](https://openweathermap.org)

# 技術

- Next.js
- Typescript

# 環境

- 動作確認済環境
  - node : v18.8.0
- Google Chrome 最新版、PC/スマートフォン表示で正しく表示確認済み

# 環境構築の手順

## ① ローカルで以下のコマンドにてリポジトリをクローンします

```
git clone git@github.com:YamashitaJunki/weather-forecast.git
```

## ② 以下コマンドでコンテナを作成します

```
docker compose up -d
```

## ③ openweathermap に会員登録の上、API キーを取得します

[会員登録ページ](https://home.openweathermap.org/users/sign_up)

1. Username/Email/Password を入力し、チェックポックスにチェックを入れる
2. Create Account を押下
3. 登録したメールアドレスに届いたメールより認証手続きを行う
4. ログイン後、[APIkeys](https://home.openweathermap.org/api_keys)のページにアクセスする
5. Create key の欄にて任意の「API key name」を入力し「Generate」を押下する
6. 表示される API key をコピーする

## ④`.env`のファイルを作成し、以下のように登録します。

```
OPEN_WEATHER_API_KEY = ***********
```

## ④ コンテナ内にて以下コマンドを実行します

```
yarn run dev
```

# 各種設定ファイルの解説

- .eslintrc.json

  - 目的
    - eslint のルールを自動的に強制するため
  - 参考情報
    - https://eslint.org/docs/latest/user-guide/configuring/
  - 参考経緯
    - 公式の正しい書き方を確認する為

- dockerfile

  - 目的
    - ローカル環境だけではなく、仮想環境でも正しく動くことを確認できるように docker を導入するため
  - 参考情報
    - https://docs.docker.jp/engine/reference/builder.html
  - 参考経緯
    - 公式の正しい書き方を確認する為
  - OS
    - alpine(v3.15)

- docker-compose.yml

  - 目的
    - 今後開発にあたりコンテナ数が増える可能性があるため
  - 参考情報
    - https://docs.docker.com/compose/compose-file/
  - 参考経緯
    - 公式の正しい書き方を確認する為
  - port
    - 3000:3000 →DockerImage を立ち上げるポート
    - 9229:9229 → デバッグ用のポート

- .prettierrc

  - 目的
    - eslint のルールを自動的に強制するため
  - 参考情報
    - https://prettier.io/docs/en/options.html
  - 参考経緯
    - 公式の正しい書き方を確認する為

- tsconfig.json

  - 目的
    - 型を宣言して未然にエラーを防ぐため typescript を導入
  - 参考情報
    - https://zenn.dev/toono_f/scraps/b9b8b5f7fb1c57
  - 参考経緯
    - オリジナルの最適設定を考える力が無い為

以上
