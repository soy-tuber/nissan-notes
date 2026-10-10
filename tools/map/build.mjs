import fs from 'fs';
import {feature, mesh} from 'topojson-client';
import {geoEquirectangular, geoPath, geoInterpolate} from 'd3-geo';

const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-110m.json','utf8'));
const W=1600, ROT=-140, scale=W/(2*Math.PI), Hfull=Math.PI*scale;
const proj = geoEquirectangular().rotate([ROT,0]).scale(scale).translate([W/2,Hfull/2]);
const path = geoPath(proj);
const rd = d => d.replace(/-?\d+\.?\d*/g, m => (+m).toFixed(1));
const land = rd(path(feature(topo, topo.objects.land)));
const borders = rd(path(mesh(topo, topo.objects.countries, (a,b)=>a!==b)));
const Y0=Math.round(proj([0,84])[1])-6, Y1=Math.round(proj([0,-50])[1])+10, VH=Y1-Y0;

// --- 拠点 ---
const P = {
  kyushu: {ll:[131.00,33.82], n:'日産自動車九州', s:'ローグHV／ノート／キックス／ローグ', t:'plant', lab:'l', lx:40, dy:-26},
  shatai: {ll:[131.06,33.55], n:'日産車体九州', s:'パトロール／アルマーダ／QX80／キャラバン', t:'plant', lab:'l', lx:40, dy:-8},
  tochigi: {ll:[139.95,36.45], n:'栃木', s:'Z／スカイライン／LEAF／アリア＋ミニバン集約', t:'plant', lab:'r', lx:34, dy:-24},
  oppama: {ll:[139.67,35.30], n:'追浜', s:'ノート／キックス（2027年度末で終了）', t:'plant', lab:'r', lx:34, dy:-6},
  jatco: {ll:[138.68,35.16], n:'ジヤトコ富士', s:'第3世代e-POWER 5-in-1ユニット', t:'unit', lab:'l', lx:56, dy:22},
  sund: {ll:[-1.38,54.91], n:'サンダーランド', s:'Qashqai／Juke／LEAF／キックスHV＋第1ラインはチェリー受託', t:'plant', lab:'r', lx:12, dy:0},
  douai: {ll:[3.08,50.37], n:'Douai', s:'Micra EV（委託）', t:'alli', lab:'r', lx:12, dy:14},
  novo: {ll:[15.17,45.80], n:'ノヴォメスト', s:'PIXO（委託・トゥインゴ／スプリングと同ライン）', t:'alli', lab:'r', lx:12, dy:28},
  chennai: {ll:[80.17,12.82], n:'チェンナイ', s:'TEKTON（ダスター兄弟）／Magnite／GRAVITE', t:'alli', lab:'l', lx:12, dy:18},
  zhengz: {ll:[113.63,34.75], n:'鄭州日産', s:'フロンティア プロ／ナバラ プロ', t:'plant', lab:'l', lx:30, dy:-48},
  huadu: {ll:[113.22,23.40], n:'広州花都', s:'N7／N6／NX8／NX7', t:'plant', lab:'l', lx:26, dy:16},
  thai: {ll:[100.60,13.55], n:'タイ', s:'Kicks／Almera／Navara／Terra', t:'plant', lab:'l', lx:12, dy:0},
  smyrna: {ll:[-86.52,35.98], n:'スマーナ', s:'Rogue／QX65（HV生産は2028年にも）', t:'plant', lab:'r', lx:12, dy:-4},
  decherd: {ll:[-86.08,35.21], n:'デカード', s:'エンジン（e-POWER化を検討）', t:'unit', lab:'r', lx:12, dy:12},
  canton: {ll:[-90.03,32.61], n:'キャントン', s:'Altima／Frontier／Xterra', t:'plant', lab:'l', lx:12, dy:0},
  agua: {ll:[-102.3,21.88], n:'アグアス', s:'Sentra ほか', t:'plant', lab:'l', lx:12, dy:0},
  // 仕向地
  us:   {ll:[-97,39],    n:'米国',      t:'mkt'},
  ca:   {ll:[-96,54],    n:'カナダ',    t:'mkt'},
  mx:   {ll:[-99,19.4],  n:'メキシコ',  t:'mkt'},
  me:   {ll:[52.5,27.5], n:'中東',      t:'mkt'},
  af:   {ll:[20,2],      n:'アフリカ',  t:'mkt'},
  au:   {ll:[145,-33],   n:'豪州',      t:'mkt'},
  ph:   {ll:[121,14.6],  n:'フィリピン',t:'mkt'},
  hk:   {ll:[114.2,22.3],n:'香港',      t:'mkt', dy:-14},
  asean:{ll:[103.8,1.35],n:'ASEAN',     t:'mkt'},
  latam:{ll:[-58,-20],   n:'中南米',    t:'mkt'},
  id:   {ll:[106.8,-6.2],n:'インドネシア',t:'mkt'},
};
// --- 流れ ---
const F = [
  ['kyushu','us',  'jp', 'ローグ ハイブリッド', '2026年秋〜・完成車に15%関税', 1],
  ['kyushu','ca',  'jp', 'ローグ ハイブリッド', '米国生産開始後もカナダ向けは九州から継続', 1],
  ['oppama','ph',  'jp', 'キックス', '2026/9輸出開始・左ハンドル市場', 0],
  ['tochigi','us', 'jp', 'LEAF', '2025/11にスマーナ生産を撤回し栃木から輸出', 0],
  ['tochigi','id', 'jp', 'フェアレディZ', 'GIIAS 2026で初公開', 0],
  ['shatai','me',  'jp', 'パトロール', '中東が主力仕向地・物流は要監視', 1],
  ['shatai','us',  'jp', 'アルマーダ／QX80', '一台あたり限界利益は全社平均の2.6〜3.5倍', 1],
  ['shatai','hk',  'jp', 'エルグランド', '日本国外の第1弾・右ハンドル市場', 0],
  ['shatai','au',  'jp', 'パトロール', '2027年初', 0],
  ['chennai','me', 'in', 'TEKTON', 'インドを中東・アフリカの輸出ハブに', 1],
  ['chennai','af', 'in', 'TEKTON', '9/1に初回1,300台超を船積み（南アフリカ・ブータン・ネパール）', 1],
  ['zhengz','mx',  'cn', 'フロンティア プロ PHEV', '2026年10月発売・中国以外で最初の市場', 1],
  ['zhengz','ph',  'cn', 'ナバラ プロ', '2026年11月投入', 0],
  ['zhengz','me',  'cn', 'ナバラ プロ', '2026年内・中東へ', 0],
  ['zhengz','latam','cn','フロンティア プロ', '2026年末までに中南米の他市場へ', 0],
  ['zhengz','au',  'cn', 'ナバラ プロ PHEV', '2027年・初の右ハンドル市場・2.0Lターボ＋8ATの別仕様', 1],
  ['huadu','latam','cn', 'N7', '2026年前半から輸出開始', 0],
  ['huadu','asean','cn', 'N7', '東風との合弁輸出会社が窓口', 0],
  ['agua','us',    'risk','量販車', 'メキシコ発は25%関税・4〜8月累計で生産▲23.7%', 1],
  ['jatco','kyushu','unit','5-in-1 ユニット', '国内で完結・部品関税なし', 1],
  ['jatco','sund', 'risk','5-in-1 ユニット', '欧州キックス用の供給は未公表（海外生産の計画なし）', 0],
];
function arc(a,b){
  const A=P[a].ll, B=P[b].ll, it=geoInterpolate(A,B), N=70;
  let segs=[], cur=[], prev=null;
  for(let i=0;i<=N;i++){
    const p=proj(it(i/N));
    if(prev && Math.abs(p[0]-prev[0])>W*0.5){ segs.push(cur); cur=[]; }
    cur.push(p); prev=p;
  }
  segs.push(cur);
  return segs.filter(s=>s.length>1)
    .map(s=>'M'+s.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join('L')).join(' ');
}
let o=[];
o.push(`<path class="land" d="${land}"/>`);
o.push(`<path class="bord" d="${borders}"/>`);
// 経緯線（正距円筒なので直線）
let g=[];
for(let lat=-40;lat<=80;lat+=20){const y=proj([0,lat])[1].toFixed(1); g.push(`M0 ${y}H${W}`);}
for(let k=0;k<12;k++){const x=(W/12*k).toFixed(1); g.push(`M${x} ${Y0}V${Y1}`);}
o.push(`<path class="grat" d="${g.join('')}"/>`);
o.push(`<line class="eq" x1="0" y1="${proj([0,0])[1].toFixed(1)}" x2="${W}" y2="${proj([0,0])[1].toFixed(1)}"/>`);
// 流れ
F.forEach((f,i)=>{
  const [a,b,c,name,note,hi]=f;
  o.push(`<g class="fl fl-${c}${hi?' hi':''}" data-i="${i}"><path class="glow" d="${arc(a,b)}"/>`+
         `<path class="line" d="${arc(a,b)}"/><path class="dash" d="${arc(a,b)}"/></g>`);
});
// 拠点
Object.entries(P).forEach(([k,v])=>{
  const [x,y]=proj(v.ll), X=x.toFixed(1), Y=y.toFixed(1);
  if(v.t==='mkt'){
    o.push(`<g class="nd mkt"><circle cx="${X}" cy="${Y}" r="4"/>`+
           `<text x="${X}" y="${(y+18+(v.dy||0)).toFixed(1)}" text-anchor="middle">${v.n}</text></g>`);
  }else{
    const lx=v.lx||10, dy=v.dy||0;
    const anc=v.lab==='l'?'end':'start', tx=v.lab==='l'?x-lx:x+lx, ty=y+4+dy;
    const lead = (lx>12||Math.abs(dy)>6)
      ? `<path class="lead" d="M${X} ${Y}L${(v.lab==='l'?x-lx+4:x+lx-4).toFixed(1)} ${(ty-4).toFixed(1)}"/>` : '';
    o.push(`<g class="nd ${v.t}" data-k="${k}">${lead}<rect x="${(x-4).toFixed(1)}" y="${(y-4).toFixed(1)}" width="8" height="8"/>`+
           `<circle class="ping" cx="${X}" cy="${Y}" r="4"/>`+
           `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="${anc}">${v.n}</text></g>`);
  }
});
fs.writeFileSync('svg.txt', `<svg viewBox="0 ${Y0} ${W} ${VH}" preserveAspectRatio="xMidYMid meet">${o.join('')}</svg>`);
fs.writeFileSync('flows.json', JSON.stringify(F.map(f=>({a:P[f[0]].n,b:P[f[1]].n,c:f[2],n:f[3],note:f[4]}))));
console.log('svg bytes', fs.statSync('svg.txt').size, 'viewBox', `0 ${Y0} ${W} ${VH}`);
