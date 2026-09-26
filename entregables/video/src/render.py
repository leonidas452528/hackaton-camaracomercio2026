"""Animación original Cali Activa: 80 segundos, sin material personal.
Uso: python render.py [--preview | --audio-only]
Dependencias aisladas: Pillow, numpy, edge-tts; FFmpeg instalado o CALI_VIDEO_FFMPEG.
"""
import asyncio, json, math, subprocess, sys, wave
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import os, shutil

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / "entregables/video"
SCENES = json.loads((OUT / "src/guion.json").read_text())
FF = os.environ.get("CALI_VIDEO_FFMPEG") or shutil.which("ffmpeg") or "/tmp/cali-ffmpeg/usr/bin/ffmpeg"
W, H, FPS, SCALE = 1280, 720, 24, 2
BG="#F6F2E8"; INK="#153D38"; TEAL="#267E6C"; GOLD="#F1BD53"; CORAL="#DF735E"; PALE="#DCECE3"; WHITE="#FFFFFF"
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
fonts={}
def font(size,bold=False):
    key=(size,bold)
    if key not in fonts: fonts[key]=ImageFont.truetype(BOLD if bold else FONT,round(size*SCALE))
    return fonts[key]
def rr(d,box,fill,rad=18,outline=None,width=2):
    d.rounded_rectangle(tuple(round(v*SCALE) for v in box),radius=rad*SCALE,fill=fill,outline=outline,width=width*SCALE)
def line(d,pts,fill=INK,width=3):
    d.line([(round(x*SCALE),round(y*SCALE)) for x,y in pts],fill=fill,width=round(width*SCALE),joint="curve")
def poly(d,pts,fill,outline=None):
    p=[(round(x*SCALE),round(y*SCALE)) for x,y in pts]
    d.polygon(p,fill=fill)
    if outline: d.line(p+[p[0]],fill=outline,width=3*SCALE,joint="curve")
def ellipse(d,box,fill,outline=None,width=2):
    d.ellipse(tuple(round(v*SCALE) for v in box),fill=fill,outline=outline,width=width*SCALE)
def text(d,x,y,s,size=24,color=INK,bold=False,anchor=None):
    d.text((x*SCALE,y*SCALE),s,font=font(size,bold),fill=color,anchor=anchor)
def wrap(d,s,size,maxwidth,bold=False):
    words=s.split(); lines=[]; current=""
    for word in words:
        candidate=(current+" "+word).strip()
        if d.textlength(candidate,font=font(size,bold)) > maxwidth*SCALE and current:
            lines.append(current);current=word
        else: current=candidate
    if current: lines.append(current)
    return lines
def paragraph(d,x,y,s,size=24,width=500,color=INK,bold=False,spacing=1.35):
    for k,l in enumerate(wrap(d,s,size,width,bold)): text(d,x,y+k*size*spacing,l,size,color,bold)
def pill(d,x,y,s,fill=PALE,color=INK,size=17):
    width=d.textlength(s,font=font(size,True))/SCALE+28
    rr(d,(x,y,x+width,y+34),fill,17)
    text(d,x+14,y+6,s,size,color,True)
def check(d,x,y,color=TEAL):
    line(d,[(x,y+10),(x+8,y+18),(x+26,y)],color,5)
def arrow(d,x,y,length=55):
    line(d,[(x,y),(x+length,y)],TEAL,4)
    line(d,[(x+length-12,y-10),(x+length,y),(x+length-12,y+10)],TEAL,4)
def box(d,x,y,w=60,h=50):
    rr(d,(x,y,x+w,y+h),"#D99C61",6,INK)
    line(d,[(x+w*.48,y),(x+w*.48,y+h)],"#F8DA9D",6)
    line(d,[(x+10,y+h-12),(x+23,y+h-12)],INK,2)
def tree(d,x,y,s=1):
    line(d,[(x,y),(x,y-65*s)],"#946744",10*s)
    ellipse(d,(x-30*s,y-105*s,x+30*s,y-40*s),TEAL)
    ellipse(d,(x-45*s,y-80*s,x+15*s,y-25*s),"#439578")
def character(d,x,y,t,female=True,size=1,talking=False,gesture=0):
    # Coordinates are relative to the feet. All people are fictional.
    def pt(a,b): return (x+a*size,y+b*size)
    def r(a,b,c,e,col,rad=10): rr(d,(*pt(a,b),*pt(c,e)),col,rad*size)
    skin="#B96D44" if female else "#D9A377"
    hair="#263637"
    phase=math.sin(t*3)*2
    ellipse(d,(*pt(-48,-7),*pt(48,9)),"#CCD8CD")
    line(d,[pt(-15,-68),pt(-19,0)],"#274E61",18*size)
    line(d,[pt(17,-68),pt(23,0)],"#274E61",18*size)
    r(-31,-5,-9,5,INK,4);r(13,-5,37,5,INK,4)
    r(-34,-155,34,-58,CORAL if female else TEAL,15)
    r(-10,-173,10,-142,skin,4)
    if female: ellipse(d,(*pt(-42,-231),*pt(39,-145)),hair)
    ellipse(d,(*pt(-31,-224),*pt(31,-160)),skin)
    ellipse(d,(*pt(-33,-231),*pt(31,-204)),hair)
    if female: ellipse(d,(*pt(-40,-230),*pt(-3,-190)),hair)
    blink=(t%4.1)<.13
    for eye in [-11,12]:
        if blink: line(d,[pt(eye-3,-191),pt(eye+3,-191)],INK,2)
        else: ellipse(d,(*pt(eye-2,-195),*pt(eye+2,-189)),INK)
    if talking:
        opening=3+abs(math.sin(t*17))*5
        ellipse(d,(*pt(-6,-179),*pt(7,-179+opening)),INK)
    else: line(d,[pt(-6,-177),pt(0,-174),pt(7,-177)],INK,2)
    line(d,[pt(-31,-141),pt(-49,-105),pt(-34,-87)],skin,13*size)
    lift=gesture*22+phase
    line(d,[pt(31,-142),pt(52,-110-lift),pt(70,-126-lift)],skin,13*size)
    ellipse(d,(*pt(62,-135-lift),*pt(80,-117-lift)),skin)
def base(i,t):
    im=Image.new("RGB",(W*SCALE,H*SCALE),BG);d=ImageDraw.Draw(im)
    # Own decorative city silhouette; not a geographic representation.
    for j in range(17):
        x=j*85-20; h=35+(j*37)%80
        rr(d,(x,570-h,x+65,570),"#E3E8DE",7)
    line(d,[(0,574),(1280,574)],"#B6CCC0",2)
    rr(d,(38,25,83,70),INK,12);text(d,60,48,"CA",18,WHITE,True,"mm")
    text(d,99,26,"CALI ACTIVA",19,INK,True)
    text(d,99,51,"Espacios que cuidan",13,TEAL)
    pill(d,890,29,"PROTOTIPO · ANIMACIÓN ILUSTRATIVA",size=13)
    text(d,50,99,SCENES[i]["title"],34,INK,True)
    for k in range(8):
        rr(d,(50+k*148,158,180+k*148,164),TEAL if k<=i else "#D8DFD4",3)
    return im,d

spaces=json.loads((ROOT/"maqueta3d/public/data/spaces.json").read_text())
selected=next(s for s in spaces["features"] if s["properties"]["id"]=="epou-9465")
communes=json.loads((ROOT/"maqueta3d/public/data/communes.json").read_text())
def rings(geometry):
    if geometry["type"]=="Polygon": return geometry["coordinates"]
    if geometry["type"]=="MultiPolygon": return [r for p in geometry["coordinates"] for r in p]
    return []
def geodraw(d,features,bounds,color=PALE):
    coords=[c for f in features for r in rings(f["geometry"]) for c in r]
    lo=min(c[0] for c in coords); hi=max(c[0] for c in coords); bot=min(c[1] for c in coords); top=max(c[1] for c in coords)
    x,y,w,h=bounds; scale=min(w/(hi-lo),h/(top-bot))
    ox=x+(w-(hi-lo)*scale)/2;oy=y+(h-(top-bot)*scale)/2
    def point(c): return ox+(c[0]-lo)*scale,oy+(top-c[1])*scale
    for f in features:
        for r in rings(f["geometry"]): poly(d,[point(c) for c in r],color,TEAL)
    return point
def pin(d,x,y,t):
    rad=13+3*math.sin(t*4)
    ellipse(d,(x-rad-6,y-rad-6,x+rad+6,y+rad+6),"#FADE95")
    ellipse(d,(x-10,y-10,x+10,y+10),CORAL,WHITE,2)

def draw_scene(i,t):
    im,d=base(i,t); local=t-SCENES[i]["start"]
    talking=local>.5 and local<SCENES[i]["end"]-SCENES[i]["start"]-.5
    if i==0:
        text(d,50,203,"Conocer el espacio.",48,INK,True)
        text(d,50,264,"Preparar el cuidado.",48,TEAL,True)
        paragraph(d,54,344,"Una emergencia cambia la ciudad. Prepararnos cambia cómo respondemos.",25,580)
        for j,label in enumerate(["PREVENCIÓN","TERRITORIO","COMUNIDAD"]):
            pill(d,55+j*190,459,label,size=15)
        tree(d,985,565,1.2);tree(d,1200,565,.8)
        character(d,825,565,t,True,1.32,talking,1)
        character(d,1100,565,t,False,1.14,False,.4)
        ellipse(d,(1130,195,1190,255),GOLD)
    elif i==1:
        character(d,140,565,t,False,1.25,talking,1)
        labels=[("ANTES","Aprender y preparar"),("DURANTE","Seguir indicaciones"),("DESPUÉS","Verificar y recuperar")]
        for j,(title,desc) in enumerate(labels):
            x=285+j*300; yy=219+max(0,1-local/1.2)*25*(j+1)
            rr(d,(x,yy,x+270,yy+195),WHITE,20,"#BED4C6")
            ellipse(d,(x+24,yy+24,x+74,yy+74),GOLD if j==0 else PALE)
            text(d,x+49,yy+49,str(j+1),25,INK,True,"mm")
            text(d,x+24,yy+96,title,20,TEAL,True)
            paragraph(d,x+24,yy+137,desc,20,230)
        rr(d,(285,445,1155,535),INK,20)
        paragraph(d,310,466,"Estar en el mapa ≠ estar habilitado",29,815,WHITE,True)
    elif i==2:
        rr(d,(55,193,550,556),WHITE,22)
        project=geodraw(d,communes["features"],(95,214,400,298))
        x,y=project(selected["properties"]["coordinates"]);pin(d,x,y,t)
        text(d,79,526,"Comunas reales · IDESC / DAPM",16,TEAL)
        rr(d,(585,196,1190,418),WHITE,20)
        pill(d,610,217,"ESPACIO REAL · epou-9465")
        text(d,610,271,"Parque · Colinas del Sur",27,INK,True)
        text(d,610,313,"Comuna 18 · EPE_1064",21)
        text(d,610,354,"Ubicación ↗ Google Maps",21,TEAL,True)
        for j,word in enumerate(["Amenaza","Restricciones","Criterios"]):
            pill(d,585+j*205,441,word,size=17)
        paragraph(d,585,497,"La cercanía no demuestra seguridad ni disponibilidad.",22,590)
    elif i==3:
        rr(d,(50,196,560,562),WHITE,22)
        geodraw(d,[selected],(85,240,420,235))
        text(d,78,212,"Huella real del parque",22,INK,True)
        text(d,78,517,"El área total no es toda utilizable.",19,TEAL,True)
        labels=[("ÁREA TOTAL","#BBDCC6"),("− Restricciones y otros usos",CORAL),("− Circulación y atención",GOLD),("= Área para almacenamiento",TEAL)]
        for j,(label,c) in enumerate(labels):
            yy=205+j*64
            ellipse(d,(601,yy+4,619,yy+22),c)
            text(d,639,yy,label,22,INK,j==3)
        # Animated proposed storage queue stops at a clear limit.
        for j in range(5):
            x=626+j*84
            if j<3 or local>3+j*.5:
                box(d,x,480,62,48)
                if j>=3:
                    line(d,[(x+6,486),(x+55,521)],CORAL,5)
                    line(d,[(x+55,486),(x+6,521)],CORAL,5)
        line(d,[(862,462),(862,540)],CORAL,4)
        text(d,610,549,"Si no cabe: inclusión bloqueada",19,CORAL,True)
        pill(d,810,154,"MEDIDAS PROPUESTAS · SIMULADAS",size=12)
    elif i==4:
        character(d,135,565,t,True,1.22,talking,1)
        cards=[("AGUA","L / día","EMCALI"),("BAÑOS","Unidades","UAESP"),("REFUGIO","Área cubierta","Gestión del Riesgo")]
        for j,(title,unit,entity) in enumerate(cards):
            x=280+j*306
            rr(d,(x,213,x+277,498),WHITE,20,"#C0D5C7")
            ellipse(d,(x+95,237,x+177,319),PALE)
            if j==0:
                poly(d,[(x+136,248),(x+113,286),(x+116,302),(x+136,310),(x+157,298),(x+158,285)],"#63ADB8")
            elif j==1:
                rr(d,(x+115,249,x+158,305),TEAL,6);ellipse(d,(x+134,272,x+141,279),GOLD)
            else:
                poly(d,[(x+107,294),(x+136,254),(x+166,294)],CORAL,INK)
                rr(d,(x+116,293,x+158,310),GOLD,2)
            text(d,x+24,341,title,23,INK,True)
            text(d,x+24,378,unit,20)
            text(d,x+24,422,entity,18,TEAL,True)
            text(d,x+24,457,"Por verificar",17,CORAL,True)
        text(d,287,528,"Población SIMULADA · responsables propuestos",20,TEAL,True)
    elif i==5:
        character(d,160,565,t,False,1.25,talking,1)
        rr(d,(304,208,857,550),WHITE,23)
        text(d,336,235,"PROPUESTA DE PREPARACIÓN",22,TEAL,True)
        for j,label in enumerate(["Criterios y restricciones","Necesidades y brechas","Distribución de acopio"]):
            check(d,342,297+j*52);text(d,386,292+j*52,label,23)
        rr(d,(331,474,829,526),GOLD,12)
        text(d,350,487,"No equivale a autorización",24,INK,True)
        arrow(d,878,352,68)
        rr(d,(970,265,1218,456),INK,20)
        paragraph(d,994,294,"LA AUTORIDAD DECIDE",28,204,WHITE,True)
        text(d,994,404,"Habilitación",20,GOLD)
    elif i==6:
        character(d,135,565,t,True,1.15,talking,1)
        rr(d,(286,194,601,567),INK,32)
        rr(d,(302,217,585,548),WHITE,20)
        rr(d,(383,203,503,226),INK,10)
        text(d,322,241,"Cali Activa · SMS",20,TEAL,True)
        pill(d,320,277,"SIMULADO",GOLD,size=15)
        paragraph(d,320,323,"Punto propuesto:\nParque Colinas del Sur",20,245)
        paragraph(d,320,391,"Ubicación + horario",18,245)
        rr(d,(318,441,570,526),"#FFF0D5",12)
        paragraph(d,331,454,"Apertura no confirmada. No acudir todavía.",17,220,INK,True)
        for j in range(3):
            x=644+((local*.3+j*.29)%1)*105; y=323+j*37
            rr(d,(x,y,x+25,y+17),GOLD,3)
        rr(d,(804,229,1207,498),WHITE,20)
        text(d,832,256,"Difusión a la población",24,INK,True)
        for j,label in enumerate(["Mensaje revisable","Entregas simuladas","Pendientes simulados"]):
            if local>j*.65:
                check(d,837,310+j*44);text(d,881,306+j*44,label,19)
        text(d,832,455,"Envíos reales: 0",23,CORAL,True)
        text(d,804,524,"Solo acudir tras confirmación oficial.",18,TEAL,True)
    else:
        text(d,52,209,"El espacio vuelve",44,INK,True)
        text(d,52,264,"a la comunidad.",44,TEAL,True)
        pill(d,57,345,"REVISIÓN  →  ACTA  →  RETORNO",size=19)
        paragraph(d,58,410,"Un ciclo de cuidado, desde la preparación hasta la recuperación.",26,615)
        tree(d,1063,563,1.12);tree(d,1215,563,.7)
        character(d,837,565,t,True,1.2,False,.5)
        character(d,1148,565,t,False,1.06,talking,1)
        text(d,59,532,"CALI ACTIVA",29,INK,True)
        text(d,316,540,"Conocer el espacio. Preparar el cuidado.",19,TEAL)
    if i in [2,3]:
        text(d,50,579,"Fuente: Alcaldía de Santiago de Cali · DAPM / IDESC · datos.cali.gov.co · adaptación CC BY-SA 4.0",12,TEAL)
    # Verbatim, timed subtitle chunks generated from the voice timing.
    cue=next((c for c in CUES if c["start"]<=t<c["end"]),None)
    rr(d,(35,599,1245,693),INK,17)
    if cue:
        lines=wrap(d,cue["text"],24,1140)
        for j,l in enumerate(lines):
            text(d,640,622+j*32,l,24,WHITE,False,"mt")
    line(d,[(50,709),(1230,709)],"#D8DFD4",4)
    line(d,[(50,709),(50+1180*t/80,709)],TEAL,4)
    return im.resize((W,H),Image.Resampling.LANCZOS)

def run(args,**kw):
    return subprocess.run([FF,"-hide_banner","-loglevel","error",*args],check=True,**kw)
async def voices():
    import edge_tts
    for i,s in enumerate(SCENES):
        path=OUT/"audio"/f"voz-{i+1}.mp3"
        if not path.exists() or path.stat().st_size<1000:
            print("Generando voz",i+1,flush=True)
            await edge_tts.Communicate(s["text"],s["voice"],rate="+5%").save(str(path))
def audio():
    sr=48000
    mix=np.zeros(sr*80,dtype=np.float32); cues=[]
    for i,s in enumerate(SCENES):
        path=OUT/"audio"/f"voz-{i+1}.mp3"
        raw=subprocess.check_output([FF,"-v","error","-i",str(path),"-f","f32le","-ar",str(sr),"-ac","1","-"])
        a=np.frombuffer(raw,dtype="<f4").copy()
        # Remove encoder silence; retain natural internal pauses.
        active=np.flatnonzero(np.abs(a)>.003)
        if active.size: a=a[max(0,active[0]-int(sr*.06)):min(len(a),active[-1]+int(sr*.12))]
        duration=len(a)/sr;available=s["end"]-s["start"]-.85
        factor=max(1,duration/available)
        if factor>1:
            raw=subprocess.check_output([FF,"-v","error","-f","f32le","-ar",str(sr),"-ac","1","-i","-","-af",f"atempo={factor}","-f","f32le","-"],input=a.tobytes())
            a=np.frombuffer(raw,dtype="<f4").copy()
        duration=len(a)/sr
        print(f'Escena {i+1}: voz {duration:.2f}s / ventana {available:.2f}s; tempo {factor:.3f}',flush=True)
        peak=max(.01,np.max(np.abs(a)));a*=.64/peak
        start=s["start"]+.4; at=round(start*sr)
        mix[at:at+len(a)]+=a
        words=s["text"].split(); chunks=[]; cur=[]
        for word in words:
            cur.append(word)
            if len(" ".join(cur))>70 or word.endswith((".", "?", ":")) and len(cur)>5:
                chunks.append(" ".join(cur));cur=[]
        if cur: chunks.append(" ".join(cur))
        total=sum(len(v) for v in chunks);cursor=start
        for chunk in chunks:
            end=cursor+duration*len(chunk)/total
            cues.append({"start":cursor,"end":end,"text":chunk});cursor=end
    # Original gentle instrumental: soft, slow arpeggios, no licensed samples.
    music=np.zeros_like(mix)
    chords=[[130.81,164.81,196.00],[110,130.81,164.81],[87.31,110,130.81],[98,123.47,146.83]]
    for beat in range(160):
        at=beat*.5; chord=chords[int(at/5)%4]; f=chord[beat%3]*2
        dur=min(1.8,80-at);ts=np.arange(int(sr*dur))/sr
        env=(1-np.exp(-ts*35))*np.exp(-ts*3)
        tone=.028*env*(np.sin(2*np.pi*f*ts)+.24*np.sin(2*np.pi*f*2*ts))
        ix=int(at*sr);music[ix:ix+len(tone)]+=tone
    # Gentle scene transition chimes and simulated-message notification.
    for at in [8,18,29,40,50,60,64.5,71]:
        ts=np.arange(int(sr*.45))/sr
        chime=.045*np.sin(2*np.pi*(660 if at!=64.5 else 880)*ts)*np.exp(-ts*9)*(1-np.exp(-ts*70))
        ix=int(at*sr);music[ix:ix+len(chime)]+=chime
    fade=np.minimum(np.arange(sr*80)/sr/1.5,1)*np.minimum(np.arange(sr*80)[::-1]/sr/2,1)
    mix=(mix+music)*fade
    stereo=np.column_stack([mix,mix])
    with wave.open(str(OUT/"audio/mezcla.wav"),"wb") as w:
        w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((np.clip(stereo,-1,1)*32767).astype("<i2").tobytes())
    (OUT/"src/subtitulos.json").write_text(json.dumps(cues,ensure_ascii=False,indent=2))
    def stamp(t):
        ms=round(t*1000);return f"{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}"
    (OUT/"cali-activa-80s.srt").write_text("\n\n".join(f"{i+1}\n{stamp(c['start'])} --> {stamp(c['end'])}\n{c['text']}" for i,c in enumerate(cues))+"\n")
    return cues

if __name__=="__main__":
    if "--preview" in sys.argv:
        CUES=json.loads((OUT/"src/subtitulos.json").read_text()) if (OUT/"src/subtitulos.json").exists() else []
        thumbs=[]
        for i,s in enumerate(SCENES):
            im=draw_scene(i,s["start"]+4);im.save(OUT/f"escena-{i+1}.png")
            thumbs.append(im.resize((640,360)))
        sheet=Image.new("RGB",(1280,1440),BG)
        for i,im in enumerate(thumbs):sheet.paste(im,((i%2)*640,(i//2)*360))
        sheet.save(OUT/"storyboard.jpg",quality=93)
    else:
        asyncio.run(voices());CUES=audio()
        if "--audio-only" in sys.argv:sys.exit(0)
        output=OUT/"cali-activa-80s.mp4"
        cmd=[FF,"-y","-v","error","-f","rawvideo","-vcodec","rawvideo","-s",f"{W}x{H}","-pix_fmt","rgb24","-r",str(FPS),"-i","-","-i",str(OUT/"audio/mezcla.wav"),"-c:v","libx264","-preset","fast","-crf","19","-pix_fmt","yuv420p","-c:a","aac","-b:a","192k","-t","80","-movflags","+faststart",str(output)]
        proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
        try:
            for frame in range(80*FPS):
                t=frame/FPS
                i=next(i for i,s in enumerate(SCENES) if s["start"]<=t<s["end"])
                proc.stdin.write(draw_scene(i,t).tobytes())
                if frame%(FPS*5)==0:print(f"Render: {t:.0f}/80 s",flush=True)
        finally:proc.stdin.close()
        if proc.wait():raise RuntimeError("Falló codificación")
        print("Video listo:",output,flush=True)
