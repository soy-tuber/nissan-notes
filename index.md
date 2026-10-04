---
title: 日産分析ノート
---

<div class="hero">
<p class="eyebrow">// nissan motor 7201 — analysis notes</p>

# 日産分析ノート

<p class="lede">決算資料の数字を分解し、開示されない固定費や一台あたり限界利益を逆算しながら、現場で確かめた事実と突き合わせる。日産自動車（7201）と、日産車体（7222）・日産東京販売HD（8291）をめぐる分析ノートです。</p>
<p class="meta">LAST BUILD 2026.10.04</p>
</div>

<div class="city">
<div class="bar"><span class="cap">monthly city // グローバル販売 前年同月比</span><span class="lg"><b class="c">■</b> 100超　<b class="m">■</b> 100未満　<b>□</b> 未公表</span></div>
<div id="city"></div>
</div>
<p class="meta" style="font-family:var(--mono);font-size:.68rem;letter-spacing:.08em;color:var(--faint);margin:.5rem 0 0">
街のビル1本が1か月。高さ＝前年同月比、シアン＝前年超え、マゼンタ＝前年割れ。空き地は未公表の月。
<a href="monthly.html" style="white-space:nowrap">→ 月次ページ</a></p>

<script>
(function(){
  var D={
    2025:[94.1,92.2,96.6,92.8,94.0,95.1,100.5,102.8,96.4,95.2,95.1,93.3],
    2026:[100.6,92.6,93.1,92.4,89.7,91.7,83.5,82.5,null,null,null,null]
  };
  var CY='#2de2ff', MG='#ff2e6b';
  function rnd(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);
    t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  var R=rnd(7201);
  var W=1240,H=330,BASE=246,SLOT=49,X0=18,BW=34,DP=10;
  var o=[];
  o.push('<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" stop-color="#0a0f1c"/><stop offset="0.55" stop-color="#121a2e"/>'+
    '<stop offset="1" stop-color="#1d1430"/></linearGradient>'+
    '<linearGradient id="st" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" stop-color="#2de2ff" stop-opacity="0.16"/>'+
    '<stop offset="1" stop-color="#2de2ff" stop-opacity="0"/></linearGradient>'+
    '<filter id="gl" x="-60%" y="-60%" width="220%" height="220%">'+
    '<feGaussianBlur stdDeviation="3.2" result="b"/><feMerge>'+
    '<feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>');
  o.push('<rect width="'+W+'" height="'+H+'" fill="url(#sky)"/>');
  // 星
  for(var i=0;i<110;i++){
    var sx=R()*W, sy=R()*(BASE-120), sr=R()*0.9+0.25, so=R()*0.6+0.2;
    o.push('<circle cx="'+sx.toFixed(1)+'" cy="'+sy.toFixed(1)+'" r="'+sr.toFixed(2)+'" fill="#cfe8ff" opacity="'+so.toFixed(2)+'"/>');
  }
  // 月
  o.push('<circle cx="1150" cy="46" r="22" fill="#1b2740"/><circle cx="1143" cy="41" r="19" fill="#dfe9f7" opacity="0.85" filter="url(#gl)"/>');
  // 地平グリッド
  o.push('<g stroke="#2de2ff" stroke-opacity="0.16">');
  for(var g=0;g<=20;g++){var gx=g/20*W; o.push('<line x1="'+gx.toFixed(0)+'" y1="'+BASE+'" x2="'+((gx-W/2)*3+W/2).toFixed(0)+'" y2="'+H+'"/>');}
  for(var r2=1;r2<=7;r2++){var gy=BASE+Math.pow(r2/7,2.1)*(H-BASE); o.push('<line x1="0" y1="'+gy.toFixed(0)+'" x2="'+W+'" y2="'+gy.toFixed(0)+'"/>');}
  o.push('</g>');
  o.push('<line x1="0" y1="'+BASE+'" x2="'+W+'" y2="'+BASE+'" stroke="#2de2ff" stroke-opacity="0.5"/>');
  // ビル
  var idx=0, labels=[];
  [2025,2026].forEach(function(y){
    D[y].forEach(function(v,m){
      var x=X0+idx*SLOT;
      labels.push({x:x+BW/2,m:m,y:y});
      if(v===null){
        o.push('<rect x="'+x+'" y="'+(BASE-4)+'" width="'+(BW+DP)+'" height="4" fill="#1a2230"/>');
        idx++; return;
      }
      var t=Math.max(0,Math.min(1,(v-78)/27));
      var h=Math.round(16+184*Math.sqrt(t));
      var c=(v>=100)?CY:MG;
      var top=BASE-h;
      o.push('<polygon points="'+(x+BW)+','+top+' '+(x+BW+DP)+','+(top-DP)+' '+(x+BW+DP)+','+(BASE-DP)+' '+(x+BW)+','+BASE+'" fill="#0b111c"/>');
      o.push('<rect x="'+x+'" y="'+top+'" width="'+BW+'" height="'+h+'" fill="#070b13"/>');
      o.push('<polygon points="'+x+','+top+' '+(x+DP)+','+(top-DP)+' '+(x+BW+DP)+','+(top-DP)+' '+(x+BW)+','+top+'" fill="'+c+'" opacity="0.22"/>');
      o.push('<path d="M'+x+' '+top+' L'+(x+DP)+' '+(top-DP)+' L'+(x+BW+DP)+' '+(top-DP)+'" fill="none" stroke="'+c+'" stroke-width="1.6" filter="url(#gl)"/>');
      o.push('<line x1="'+x+'" y1="'+top+'" x2="'+x+'" y2="'+BASE+'" stroke="'+c+'" stroke-width="1" opacity="0.65"/>');
      o.push('<line x1="'+(x+BW+DP)+'" y1="'+(top-DP)+'" x2="'+(x+BW+DP)+'" y2="'+(BASE-DP)+'" stroke="'+c+'" stroke-width="1" opacity="0.45"/>');
      // 窓
      var rows=Math.floor((h-12)/13), cols=3;
      for(var rr=0;rr<rows;rr++)for(var cc=0;cc<cols;cc++){
        var p1=R();
        if(p1<0.34) continue;
        var wx=x+5+cc*10, wy=top+8+rr*13, op=(p1>0.88)?1:0.55;
        var win='<rect x="'+wx+'" y="'+wy+'" width="6" height="7" fill="'+c+'" opacity="'+op+'"/>';
        if(p1>0.955) win='<rect x="'+wx+'" y="'+wy+'" width="6" height="7" fill="'+c+'"><animate attributeName="opacity" values="1;0.15;1" dur="'+(2+R()*3).toFixed(1)+'s" repeatCount="indefinite"/></rect>';
        o.push(win);
      }
      // アンテナ
      if(h>120){
        o.push('<line x1="'+(x+BW/2)+'" y1="'+(top-DP)+'" x2="'+(x+BW/2)+'" y2="'+(top-DP-16)+'" stroke="'+c+'" stroke-width="1"/>');
        o.push('<circle cx="'+(x+BW/2)+'" cy="'+(top-DP-18)+'" r="2" fill="#ff4d4d"><animate attributeName="opacity" values="1;0.1;1" dur="1.6s" repeatCount="indefinite"/></circle>');
      }
      // 反射
      o.push('<rect x="'+x+'" y="'+BASE+'" width="'+BW+'" height="'+Math.min(34,h/3).toFixed(0)+'" fill="url(#st)" opacity="0.5"/>');
      idx++;
    });
  });
  // 年の区切り
  var sepX=X0+12*SLOT-8;
  o.push('<line x1="'+sepX+'" y1="40" x2="'+sepX+'" y2="'+(BASE+30)+'" stroke="#a97bff" stroke-width="1" stroke-dasharray="3 5" opacity="0.65"/>');
  o.push('<text x="'+(sepX-8)+'" y="34" text-anchor="end" font-family="ui-monospace,monospace" font-size="11" fill="#55637a" letter-spacing="2">2025</text>');
  o.push('<text x="'+(sepX+8)+'" y="34" font-family="ui-monospace,monospace" font-size="11" fill="#a97bff" letter-spacing="2">2026</text>');
  // 月ラベル
  labels.forEach(function(l){
    o.push('<text x="'+l.x+'" y="'+(BASE+18)+'" text-anchor="middle" font-family="ui-monospace,monospace" font-size="8.5" fill="'+((l.m===0)?'#7f8da3':'#3b475c')+'">'+(l.m+1)+'</text>');
  });
  // ドローン
  o.push('<g opacity="0.9"><g><animateTransform attributeName="transform" type="translate" from="-80,0" to="'+(W+80)+',0" dur="34s" repeatCount="indefinite"/>'+
    '<line x1="0" y1="92" x2="14" y2="92" stroke="#7f8da3" stroke-width="1.2"/>'+
    '<circle cx="15" cy="92" r="1.8" fill="#ff4d4d"><animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/></circle>'+
    '<circle cx="-1" cy="92" r="1.5" fill="#2de2ff"><animate attributeName="opacity" values="0;1;0" dur="1.1s" repeatCount="indefinite"/></circle></g></g>');
  document.getElementById('city').insertAdjacentHTML('afterbegin',
    '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="月次グローバル販売の前年同月比をビルの高さで表したスカイライン">'+o.join('')+'</svg>');
})();
</script>

<div class="strip">
<div><span class="k">FY25 売上高</span><span class="v">12.01兆</span><span class="s">営業利益580億／OPM 0.5%</span></div>
<div><span class="k">FY25 当期純損益</span><span class="v n">▲5,331億</span><span class="s">うち減損3,662億</span></div>
<div><span class="k">FY26 Q1 営業利益</span><span class="v p">779億</span><span class="s">前年同期比 +1,570億</span></div>
<div><span class="k">エルグランド受注</span><span class="v">8,900台</span><span class="s">8/23時点／天井は月2,000台</span></div>
<div><span class="k">8月 中国販売</span><span class="v n">▲51.9%</span><span class="s">4〜8月累計 ▲41.9%</span></div>
<div><span class="k">8月 国内生産</span><span class="v p">+9.2%</span><span class="s">5か月連続で前年超え</span></div>
</div>

<p class="sec">分析・データ</p>

<div class="tiles">

<a class="tile" href="psr.html">
<span class="chip">PSR</span><span class="arw">→</span>
<span class="t">日産PSR分析</span>
<span class="d">FY25実績・FY26会社ガイダンス・FY26第1四半期実績の主要数値と、Re:Nissan後の株価シナリオ計算機。売上高・営業利益率・PERを動かすと想定株価とフィッシャーPSRがその場で再計算されます。マツダとの通期損益比較つき。</span>
</a>

<a class="tile" href="cvp.html">
<span class="chip">CVP</span><span class="arw">→</span>
<span class="t">Re:Nissanを踏まえたCVPシナリオ分析</span>
<span class="d">一台あたり限界利益と損益分岐台数で今期・来期を読む。5,000億円のコスト削減がP&amp;Lのどこで消えているかを追う、損益分岐点シミュレータ付き。</span>
</a>

<a class="tile" href="monthly.html">
<span class="chip">Monthly</span><span class="arw">→</span>
<span class="t">月次 生産・販売・輸出</span>
<span class="d">前年同月比の月次推移。中国は決算より約3か月先行するため、月次速報のほうが早く変化を掴めます。</span>
</a>

<a class="tile lead" href="map.html">
<span class="chip">Map</span><span class="arw">→</span>
<span class="t">グローバル物流マップ</span>
<span class="d">どの工場から、どの海を越えて出ていくのか。生産地と仕向地を大圏コースで結んだ世界地図。日本発が右ハンドル圏の外へ出ていること、太平洋を渡る線に15%の値札が付いていること、e-POWERの心臓を運ぶ緑の線が一本しかないこと ── 三つの制約が線の上に乗っています。</span>
</a>

<a class="tile" href="launches.html">
<span class="chip">Launch</span><span class="arw">→</span>
<span class="t">グローバル投入カレンダー</span>
<span class="d">発売・モデルチェンジを価格・生産国・生産工場つきで月次に並べた台帳。工場再編とユニット供給の制約を、生産拠点別の一覧と合わせて追う。</span>
</a>

</div>

<p class="sec">記事</p>

<div class="tiles">

<a class="tile lead" href="nissan_dialogue.html">
<span class="chip">Dialogue</span><span class="arw">→</span>
<span class="t">現場と数字で日産を読む</span>
<span class="d">エルグランドとキックスの受注から始まり、供給の天井、Re:Nissanによる固定費の解体、一台あたり限界利益七十万円の逆算、関税の算数、中国という別勘定まで。2026年度第1四半期決算までを織り込んだ全面改訂版。</span>
</a>

<a class="tile" href="stephen_ma_china.html">
<span class="chip">China</span><span class="arw">→</span>
<span class="t">スティーブン・マーと中国日産</span>
<span class="d">東風日産の商品投入ケイデンス、天演架構、「中国定義、世界販売」への転換。決算の中国が三か月遅れて動くという、月次速報との読み合わせ方。</span>
</a>

<a class="tile" href="dual_core_mobility.html">
<span class="chip">Tech</span><span class="arw">→</span>
<span class="t">デュアルコア・モビリティ【改訂版】</span>
<span class="d">トヨタTHSと日産e-POWERを、遊星機構と「捨てる思想」という対比から読み解く技術対談。第三世代e-POWERの実力、北米ローグe-POWER、そして日産本体の現在地まで。</span>
</a>

<a class="tile" href="wayve_roadmap.html">
<span class="chip">SDV</span><span class="arw">→</span>
<span class="t">Wayve × Nissan ロードマップ</span>
<span class="d">End-to-End AI自動運転の導入計画と課題の整理。2026年8月のホンダとのECU・車載OS共同開発（コアドメインのみ・2029年度以降）を踏まえ、二本の時間軸で読む。</span>
</a>

<a class="tile" href="dual_core_shinsho.pdf">
<span class="chip">PDF</span><span class="arw">↓</span>
<span class="t">デュアルコア・モビリティ（新書体裁版）</span>
<span class="d">上記の新書体裁版。1.7MB。</span>
</a>

</div>
