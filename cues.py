import json, sys, re
words=json.load(open('video/src/data/words.json'))
def norm(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())
def find(phrase, start=0):
    toks=[norm(x) for x in phrase.split()]
    toks=[x for x in toks if x]
    out=[]
    for i in range(len(words)):
        if words[i]['s'] < start: continue
        ok=True
        for j,t in enumerate(toks):
            if i+j>=len(words) or norm(words[i+j]['w'])!=t:
                ok=False; break
        if ok:
            out.append((words[i]['s'], words[i+j]['e'], ' '.join(w['w'] for w in words[i:i+len(toks)])))
    return out
if __name__=='__main__':
    for arg in sys.argv[1:]:
        start=0
        if '|' in arg:
            arg,st=arg.split('|'); start=float(st)
        res=find(arg,start)
        print(f'## {arg!r}')
        for r in res[:8]:
            print(f'  {r[0]:.2f}-{r[1]:.2f}  {r[2]}')
