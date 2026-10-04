import re,sys,os,shutil
ROOT=r'D:\nissan-notes'
OUT=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(os.path.abspath(__file__)),'out')
os.makedirs(OUT,exist_ok=True)
lay=open(os.path.join(ROOT,'_layouts','default.html'),encoding='utf-8').read()

def front(p):
    s=open(p,encoding='utf-8').read()
    fm={}
    if s.startswith('---\n'):
        e=s.index('\n---',4)
        for line in s[4:e].split('\n'):
            if ':' in line:
                k,v=line.split(':',1); fm[k.strip()]=v.strip()
        s=s[e+4:].lstrip('\n')
    return fm,s

def liquid(t,page,content=''):
    t=t.replace('{{ content }}',content)
    # assign cast
    cast=page.get('cast','').split() if page.get('cast') else []
    def rel(m):
        return m.group(1)
    t=re.sub(r"\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}",rel,t)
    # for loop over cast
    # for ループは複数ある（ガター装飾と末尾ストリップ）。全部展開する
    def _loop(mm):
        body=mm.group(1); out=''
        for i,c in enumerate(cast,1):
            b=body.replace('{{ forloop.index }}',str(i))
            b=re.sub(r"\{\{\s*'/images/cast/'\s*\|\s*append:\s*c\s*\|\s*append:\s*'\.webp'\s*\|\s*relative_url\s*\}\}",'/images/cast/%s.webp'%c,b)
            out+=b
        return out
    t=re.sub(r'\{% for c in cast %\}(.*?)\{% endfor %\}',_loop,t,flags=re.S)
    t=re.sub(r'\{% assign cast[^%]*%\}','',t)
    t=re.sub(r'\{% if cast\.size > 0 %\}(.*?)\{% endif %\}',(lambda m:m.group(1) if cast else ''),t,flags=re.S)
    t=t.replace('{% if page.wide %}wide {% endif %}','wide ' if page.get('wide')=='true' else '')
    t=t.replace('{% if page.home %}home{% endif %}','home' if page.get('home')=='true' else '')
    t=re.sub(r'\{% if page\.title and page\.title != site\.title %\}(.*?)\{% endif %\}',lambda m:'' ,t)
    t=t.replace('{{ site.title }}','日産分析ノート')
    t=re.sub(r'\{\{ page\.description \| default: site\.description \}\}','',t)
    t=t.replace("{{ '/' | relative_url }}",'/index.html')
    t=re.sub(r'\{% if page\.url != "/" %\}← \{% endif %\}','← ',t)
    # {{ page.KEY }} を front matter の値に差し替える
    t=re.sub(r'\{\{\s*page\.([a-z_]+)\s*\}\}',lambda m:page.get(m.group(1),''),t)
    # {% if page.KEY %}...{% endif %} を front matter に従って解決する
    # （解決しないと未設定キーの中身が preview に漏れて実物と食い違う）
    def _cond(m):
        return m.group(2) if page.get(m.group(1)) else ''
    t=re.sub(r'\{% if page\.([a-z_]+) %\}(.*?)\{% endif %\}',_cond,t,flags=re.S)
    t=re.sub(r'\{[{%].*?[%}]\}','',t,flags=re.S)
    return t

import markdown as _md
PAGES=[('index.md','index.html'),('psr.html','psr.html'),('cvp.md','cvp.html'),
       ('monthly.html','monthly.html'),('launches.html','launches.html'),
       ('nissan_dialogue.md','nissan_dialogue.html'),
       ('stephen_ma_china.md','stephen_ma_china.html'),
       ('dual_core_mobility.md','dual_core_mobility.html')]
for src,dst in PAGES:
    p=os.path.join(ROOT,src)
    if not os.path.exists(p):
        print('!! missing',src); continue
    fm,body=front(p)
    body=liquid(body,fm)
    if src.endswith('.md') and src!='index.md':
        body=_md.markdown(body,extensions=['tables','fenced_code','attr_list','md_in_html'])
    body=body.replace('.md"', '.html"').replace(".md'", ".html'")
    html=liquid(lay,fm,body)
    open(os.path.join(OUT,dst),'w',encoding='utf-8').write(html)
    print('->',dst)
# front matter を持たないファイルは Jekyll がそのまま配信する。
# レイアウトを被せるとプレビューだけ実物と食い違うので素通しでコピーする。
for raw in ('wayve_roadmap.html',):
    shutil.copyfile(os.path.join(ROOT,raw),os.path.join(OUT,raw))
    print('-> (raw)',raw)

for d in ('images','assets'):
    shutil.rmtree(os.path.join(OUT,d),ignore_errors=True)
    shutil.copytree(os.path.join(ROOT,d),os.path.join(OUT,d))
