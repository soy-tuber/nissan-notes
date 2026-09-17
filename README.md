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

- **書体**　見出しは明朝（Hiragino Mincho / Yu Mincho / Noto Serif JP）、本文はゴシック、数値と英字ラベルは等幅。和文は `font-feature-settings:"palt"` で詰める
- **色**　紙色の地（#fbfaf7）＋藍のアクセント（#1c5470）。赤（#b4453c）と緑（#1a7f5a）は数値の正負にだけ使う。ダークモードは `prefers-color-scheme` で自動
- **対話の整形**　`**話者**　本文` で書かれた段落は、レイアウト側のJSが話者ラベル付きに変換します（AI側＝opus/fable/claude は淡い地色）。対象は本文直下の段落だけで、`.note` や表の中は変換されません
- **部品**　`.strip`（指標の帯）／`.tiles > .tile`（記事カード）／`.cards > .card`（数値カード）／`.note`（注記）／`.ctrl`（スライダー）。`wide: true` を front matter に置くと本文幅が66remに広がります

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
