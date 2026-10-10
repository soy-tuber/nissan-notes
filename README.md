# 日産分析ノート

日産自動車（7201）をめぐる分析記事を GitHub Pages で公開しています。

**サイト: https://soy-tuber.github.io/nissan-notes/**

| ページ | 内容 |
|---|---|
| `index.md` | トップ。主要指標の帯と、月次販売から生成するスカイライン |
| `psr.html` | 日産PSR分析 — 決算実績・会社ガイダンス・株価シナリオ計算機（マツダとの通期比較はここが正本） |
| `cvp.md` | Re:Nissanを踏まえたCVP分析 — 一台あたり限界利益と損益分岐点、監視指標15項目 |
| `monthly.html` | 月次 生産・販売・輸出 |
| `map.html` | グローバル物流マップ — 生産地と仕向地を大圏コースで結ぶ |
| `launches.html` | グローバル投入カレンダー — 発売・工場配置の台帳 |
| `nissan_dialogue.md` | 現場と数字で日産を読む — 受注・供給の天井・Re:Nissan・限界利益の逆算・関税・中国・エスピノーサの経営 |
| `stephen_ma_china.md` | スティーブン・マーと中国日産 |
| `dual_core_mobility.md` | デュアルコア・モビリティ【改訂版】— THS と e-POWER の技術対談 |
| `wayve_roadmap.html` | Wayve × Nissan ロードマップ — SDV・自動運転・課金モデル |
| `dual_core_shinsho.pdf` | デュアルコア・モビリティ（新書体裁版） |

### 記述の分担

同じ事実を複数ページで繰り返さないため、正本を決めています。**マツダとの通期損益比較**は `psr.html`、**5-in-1ユニットの海外生産**・**サンダーランドの稼働率とチェリー受託**・**車種別の生産地と仕向地**は `launches.html`（工場別一覧とグローバル車種の表）、**輸出ルートの地理**は `map.html`、**コスト削減のネット残余と監視指標**は `cvp.md`、**中国事業の詳細**は `stephen_ma_china.md`。他のページからは要点だけを引いて相互にリンクします。

## 構成

Jekyll（GitHub Pages 標準）で構築。記事は Markdown を直接編集して push すれば反映されます。

公開前にローカルで確認する場合：

```
gem install jekyll
jekyll build -d /tmp/site      # ビルドが通るか（Liquid・kramdownのエラーを拾う）
jekyll serve                   # http://127.0.0.1:4000/nissan-notes/
```

`baseurl: /nissan-notes` を設定しているため、`relative_url` / `absolute_url` を通したリンクは
`/nissan-notes/...` になります。**`<div>` の中に Markdown を書くと処理されません**（kramdown の仕様）。
見出しや強調を div の中で使いたいときは `markdown="1"` を付けるか、素の HTML で書いてください。
各記事の冒頭には `title` のみの front matter があり、それ以外は本文そのものです。

- `_config.yml` — サイト設定
- `_layouts/default.html` — 和文長文向けの自作レイアウト（外部テーマ非依存、ライト/ダーク対応）
- `images/` — 記事中の図版
- `.mcp.json` — デザイン参照用MCP（inspo）の設定
- `tools/map/` — 物流マップのワールドマップSVGを生成するスクリプト（Natural Earth → SVG）

## デザインの約束事

レイアウトは `_layouts/default.html` の1ファイルに閉じています（外部CSS・外部テーマなし）。

- **書体**　本文はゴシック、ラベル・数値・ナビは等幅（ターミナル面）。和文は `font-feature-settings:"palt"` で詰める
- **色**　ダーク固定（`color-scheme:dark`）。地は #07090f、アクセントはシアン #2de2ff。マゼンタ #ff2e6b とグリーン #2bf5a0 は数値の正負に、バイオレット #a97bff は区切りに使う。ネオンは罫線・ラベル・数値・ヒーローに限定し、本文はニュートラルに保つ
- **効果**　全面にスキャンライン（`body::after`）と方眼、カードは角を落とす（`clip-path`）、ネオンは `text-shadow` / `filter` のグローで出す
- **対話の整形**　`**話者**　本文` で書かれた段落は、レイアウト側のJSが話者ラベル付きに変換します（AI側＝opus/fable/claude は淡い地色）。対象は本文直下の段落だけで、`.note` や表の中は変換されません
- **部品**　`.strip`（指標の帯）／`.tiles > .tile`（記事カード）／`.cards > .card`（数値カード）／`.note`（注記）／`.ctrl`（スライダー）／`.city`（月次シティ）。`wide: true` を front matter に置くと本文幅が70remに広がります
- **月次シティ**　トップのスカイラインは、月次のグローバル販売 前年同月比からその場でSVGを生成しています（`index.md` 内のスクリプト）。ビル1本が1か月、高さは `16 + 184 × √t`（`t` は78〜105を0〜1に正規化）、100超はシアン、100未満はマゼンタ、未公表の月は空き地。窓の点灯はシード固定の擬似乱数なので、同じデータなら同じ街になります。月次を更新したら `D` の配列も更新してください

## デザイン参照MCP（inspo）

`.mcp.json` に [inspo](https://github.com/Nutlope/inspo) を設定しています（`npx -y inspo-mcp`）。UIを書く前に実在サイトのパレット・タイプランプを引くためのもので、ローカルのClaude Codeならリポジトリを開き直せば有効になります。クラウドのセッションからは外向き通信が塞がれていて接続できません。

## 注記

本サイトの内容は情報提供を目的としたものであり、投資勧誘・投資助言ではありません。
数値には開示情報からの推定・逆算が含まれます。
