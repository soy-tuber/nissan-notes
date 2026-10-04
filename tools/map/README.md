# map.html のSVGを作り直す

```
cd tools/map
npm install
npm run build        # svg.txt と flows.json を書き出す
```

`svg.txt` の中身を `map.html` の `<svg viewBox=...>...</svg>` と差し替えます。

- 地図データ: [Natural Earth](https://www.naturalearthdata.com/)（パブリックドメイン）を
  [world-atlas](https://github.com/topojson/world-atlas)（ISC）の `countries-110m.json` 経由で取得
- 図法: 正距円筒図法、`rotate([-140, 0])` ＝東経140度中心。日本が中央、左に欧州・インド、右に北米
- 線: `geoInterpolate` による大圏コース。投影後に経度が折り返す箇所でサブパスを分割
- 拠点と流れは `build.mjs` の `P`（拠点）と `F`（流れ）を直接編集します
