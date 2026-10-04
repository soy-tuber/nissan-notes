# 日産分析ノート

日産自動車（7201）をめぐる分析記事を GitHub Pages で公開しています。

**サイト: https://soy-tuber.github.io/nissan-notes/**

| 記事 | 内容 |
|---|---|
| `nissan_dialogue.md` | 現場と数字で日産を読む — 受注・供給の天井・Re:Nissan・限界利益の逆算・関税・中国 |
| `stephen_ma_china.md` | スティーブン・マーと中国日産 |
| `dual_core_mobility.md` | デュアルコア・モビリティ【改訂版】— THS と e-POWER の技術対談 |
| `wayve_roadmap.html` | Wayve × Nissan ロードマップ |
| `dual_core_shinsho.pdf` | デュアルコア・モビリティ（新書体裁版） |

## 構成

Jekyll（GitHub Pages 標準）で構築。記事は Markdown を直接編集して push すれば反映されます。
各記事の冒頭には `title` のみの front matter があり、それ以外は本文そのものです。

- `_config.yml` — サイト設定
- `_layouts/default.html` — 和文長文向けの自作レイアウト（外部テーマ非依存、ライト/ダーク対応）
- `images/` — 記事中の図版
- `.mcp.json` — デザイン参照用MCP（inspo）の設定

## デザインの約束事

レイアウトは `_layouts/default.html` の1ファイルに閉じています（外部CSS・外部テーマなし）。

- **書体**　本文はゴシック、ラベル・数値・ナビは等幅（ターミナル面）。和文は `font-feature-settings:"palt"` で詰める
- **色**　ダーク固定（`color-scheme:dark`）。地は #07090f、アクセントはシアン #2de2ff。マゼンタ #ff2e6b とグリーン #2bf5a0 は数値の正負に、バイオレット #a97bff は区切りに使う。ネオンは罫線・ラベル・数値・ヒーローに限定し、本文はニュートラルに保つ
- **効果**　全面にスキャンライン（`body::after`）と方眼、カードは角を落とす（`clip-path`）、ネオンは `text-shadow` / `filter` のグローで出す
- **対話の整形**　`**話者**　本文` で書かれた段落は、レイアウト側のJSが話者ラベル付きに変換します（AI側＝opus/fable/claude は淡い地色）。対象は本文直下の段落だけで、`.note` や表の中は変換されません
- **部品**　`.strip`（指標の帯）／`.tiles > .tile`（記事カード）／`.cards > .card`（数値カード）／`.note`（注記）／`.ctrl`（スライダー）／`.city`（月次シティ）。`wide: true` を front matter に置くと本文幅が70remに広がります
- **月次シティ**　トップのスカイラインは、月次のグローバル販売 前年同月比からその場でSVGを生成しています（`index.md` 内のスクリプト）。ビル1本が1か月、高さは `16 + 184 × √t`（`t` は78〜105を0〜1に正規化）、100超はシアン、100未満はマゼンタ、未公表の月は空き地。窓の点灯はシード固定の擬似乱数なので、同じデータなら同じ街になります。月次を更新したら `D` の配列も更新してください

## デザイン参照MCP（inspo）

`.mcp.json` に [inspo](https://github.com/Nutlope/inspo) を設定しています。実在サイトのキャプチャ・パレット・タイプランプ・コンポーネントを参照できるMCPで、UIを書く前に「見本」を引くために使います。

ローカルのClaude Codeなら、リポジトリを開き直せば有効になります（`npx -y inspo-mcp`）。ホスト版を使う場合は次のいずれか。

```
npx -y inspo-mcp install
claude mcp add --transport http inspo https://inspomcp.dev/api/mcp
```

## 注記

本サイトの内容は情報提供を目的としたものであり、投資勧誘・投資助言ではありません。
数値には開示情報からの推定・逆算が含まれます。
