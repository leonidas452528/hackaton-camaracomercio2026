"""Video v2: personajes de referencia + decisiones y retornos explícitos."""
import sys, json, math, asyncio, subprocess
from pathlib import Path
from PIL import Image, ImageDraw
sys.path.insert(0,str(Path(__file__).resolve().parents[2]/'src'))
import render as e
OUT=Path(__file__).resolve().parents[1]
e.OUT=OUT
e.SCENES=json.loads((OUT/'src/guion.json').read_text())
S=e.SCALE; W=e.W; H=e.H; FPS=e.FPS
INK=e.INK; TEAL=e.TEAL; GOLD=e.GOLD; CORAL='#B44232'; PALE=e.PALE; BG=e.BG; WHITE=e.WHITE
rr=e.rr;text=e.text;line=e.line;poly=e.poly;ellipse=e.ellipse;paragraph=e.paragraph;pill=e.pill
EXAMPLE=json.loads((OUT/'src/ejemplo-acopio.json').read_text())
PORTRAITS={}
for name in ['narrador','narradora']:
    im=Image.open(OUT/'assets'/f'{name}.png').convert('RGBA')
    # Scaling is video-layer composition; source character artwork remains unchanged.
    im.thumbnail((220*S,320*S),Image.Resampling.LANCZOS)
    PORTRAITS[name]=im
CUES=[]
PATHS=[]
CACHE={}
def centered(d,x,y,w,h,label,size=22,color=INK,bold=True):
    lines=e.wrap(d,label,size,w-26,bold)
    yy=y+(h-len(lines)*size*1.22)/2
    for k,l in enumerate(lines):text(d,x+w/2,yy+k*size*1.22,l,size,color,bold,'mt')
def node(d,x,y,w,h,label,fill=WHITE,accent=TEAL,size=21):
    rr(d,(x+3,y+5,x+w+3,y+h+5),'#D8DFD4',16)
    rr(d,(x,y,x+w,y+h),fill,16,accent,2)
    centered(d,x,y,w,h,label,size,INK if fill!=INK else WHITE)
def diamond(d,x,y,w,h,label):
    poly(d,[(x+w/2,y),(x+w,y+h/2),(x+w/2,y+h),(x,y+h/2)],'#FFE8A6',INK)
    centered(d,x+w*.12,y+h*.2,w*.76,h*.6,label,20)
def edge(d,pts,label='',color=TEAL,labelpos=None,animate=True):
    line(d,pts,color,3)
    ax,ay=pts[-2];bx,by=pts[-1];angle=math.atan2(by-ay,bx-ax)
    poly(d,[(bx,by),(bx-11*math.cos(angle-.48),by-11*math.sin(angle-.48)),(bx-11*math.cos(angle+.48),by-11*math.sin(angle+.48))],color)
    if label:
        lx,ly=labelpos or ((ax+bx)/2,(ay+by)/2-23)
        pill(d,lx,ly,label, '#F7E4DE' if color==CORAL else PALE,color,14)
    if animate:PATHS.append((pts,color))
def note(d,label,color=TEAL):text(d,330,565,label,16,color)
def canvas(i,phase):
    global PATHS
    PATHS=[]
    im=Image.new('RGB',(W*S,H*S),BG);d=ImageDraw.Draw(im)
    rr(d,(30,22,75,67),INK,12);text(d,52,44,'CA',18,WHITE,True,'mm')
    text(d,90,25,'CALI ACTIVA',19,INK,True);text(d,90,50,'Espacios que cuidan',13,TEAL)
    pill(d,923,27,'DIAGRAMA ANIMADO · PROTOTIPO',size=12)
    text(d,35,92,e.SCENES[i]['title'],31,INK,True)
    stages=['PREVENIR','FILTRAR','ÁREA','ACOPIO','BRECHAS','AUTORIDAD','DIFUNDIR','RETORNAR']
    for j,label in enumerate(stages):
        x=35+j*153
        rr(d,(x,149,x+142,179),INK if i==j else '#E2E8DF',7)
        text(d,x+71,156,label,12,WHITE if i==j else TEAL,True,'mt')
    rr(d,(30,203,291,588),'#E9E2D0',22)
    text(d,160,552,'LA NARRADORA' if i%2==0 else 'EL NARRADOR',15,INK,True,'mt')
    text(d,160,575,'Personajes de tu referencia',11,TEAL,False,'mt')
    rr(d,(309,203,1250,588),'#FCFAF4',20)
    if i==0:
        coords=[(335,240),(645,240),(955,240),(955,420),(645,420),(335,420)]
        labels=['Aprender y definir escenario','Revisar espacio y amenaza','Dimensionar acopio','Preparar y confirmar','Comunicar a la población','Recuperar el espacio']
        for (x,y),label in zip(coords,labels):node(d,x,y,260,92,label)
        edge(d,[(595,286),(645,286)]);edge(d,[(905,286),(955,286)])
        edge(d,[(1085,332),(1085,420)])
        edge(d,[(955,466),(905,466)]);edge(d,[(645,466),(595,466)])
        note(d,'Cada decisión tiene una salida; un dato faltante no es un permiso.')
    elif i==1:
        node(d,332,225,228,96,'Amenaza + sector + población SIMULADA',size=19)
        node(d,619,225,237,96,'Inventario real + capas de amenaza',size=20)
        diamond(d,930,214,285,136,'¿Pasa el filtro?')
        edge(d,[(560,273),(619,273)]);edge(d,[(856,273),(930,282)])
        node(d,940,438,277,91,'Candidato condicionado',PALE,size=21)
        node(d,522,437,317,92,'Descartado o pendiente de evidencia','#F9E6DD',CORAL,size=20)
        edge(d,[(1072,350),(1072,438)],'SÍ',labelpos=(1090,374))
        edge(d,[(945,311),(880,355),(680,355),(680,437)],'NO',CORAL,(732,353))
        text(d,345,368,'Reglas visibles:',18,TEAL,True)
        paragraph(d,345,399,'cruces territoriales y evidencia disponible',17,166)
        note(d,'Incendios y sequía: sin evidencia suficiente, no se preselecciona.')
    elif i==2:
        rr(d,(329,224,600,529),WHITE,15,'#C3D6C8')
        text(d,348,238,'epou-9465 · Cali',21,INK,True)
        e.geodraw(d,[e.selected],(355,283,218,116))
        text(d,348,423,'Colinas del Sur',20,INK,True)
        text(d,348,461,'447,21 m²',31,TEAL,True)
        text(d,348,503,'Huella cartográfica real',15,TEAL)
        diamond(d,653,223,255,135,'¿Hay polígono?')
        node(d,981,245,239,88,'Calcular área cartográfica',PALE,size=20)
        node(d,652,443,270,82,'Capacidad pendiente','#F9E6DD',CORAL,size=21)
        node(d,981,443,239,82,'Ingresar reservas',size=21)
        edge(d,[(600,295),(653,290)])
        edge(d,[(908,290),(981,290)],'SÍ',labelpos=(920,251))
        edge(d,[(780,358),(780,443)],'NO',CORAL,(797,384))
        edge(d,[(1100,333),(1100,443)])
        note(d,'Fuente: Alcaldía de Cali · DAPM/IDESC · adaptación CC BY-SA 4.0',TEAL)
    elif i==3:
        rr(d,(330,223,795,546),WHITE,16,'#C5D8C9')
        pill(d,345,234,'RESERVAS Y MÓDULOS SIMULADOS',GOLD,size=13)
        rows=[('Huella cartográfica real','447,21 m²'),('− No utilizable','100 m²'),('− Circulación / accesos','80 m²'),('− Atención y espera','60 m²'),('− Otros usos','40 m²')]
        for j,(a,b) in enumerate(rows):
            y=282+j*33;text(d,350,y,a,17,INK,j==0);text(d,775,y,b,18,INK,True,'rt')
        line(d,[(350,451),(775,451)],'#B8CEBF',2)
        text(d,350,464,'Disponible: 167,21 m²',24,TEAL,True)
        text(d,350,508,'÷ 10 m²/módulo → máximo 16',21,INK,True)
        proposed=20 if phase==0 else 16
        node(d,883,224,325,60,f'Proponer {proposed} módulos',size=22)
        diamond(d,926,315,235,118,'¿Cabe por área?')
        edge(d,[(1045,284),(1045,315)])
        if phase==0:
            node(d,841,475,372,68,'Bloquear y reducir a 16','#F9E6DD',CORAL,size=21)
            edge(d,[(1045,433),(1045,475)],'NO',CORAL,(1090,431))
            edge(d,[(841,509),(813,509),(813,254),(883,254)],color=CORAL)
        else:
            node(d,841,475,372,68,'Incluir distribución en borrador',PALE,size=20)
            edge(d,[(1045,433),(1045,475)],'SÍ',TEAL,(1090,431))
        note(d,'Máximo teórico por superficie: no certifica aforo ni encaje físico.')
    elif i==4:
        node(d,333,235,234,83,'Población del escenario SIMULADA',size=19)
        node(d,650,229,233,95,'Calcular agua, baños y refugio',size=20)
        edge(d,[(567,276),(650,276)])
        diamond(d,949,212,285,140,'¿Servicios conocidos?')
        edge(d,[(883,276),(949,282)])
        node(d,650,432,233,84,'Brechas por medir','#F9E6DD',CORAL,size=21)
        node(d,953,432,279,84,'Calcular faltantes',PALE,size=21)
        edge(d,[(1092,352),(1092,432)],'SÍ',labelpos=(1110,375))
        edge(d,[(970,320),(918,371),(767,371),(767,432)],'NO',CORAL,(796,366))
        node(d,332,432,235,84,'Responsables propuestos + seguimiento',size=19)
        edge(d,[(650,474),(567,474)])
        edge(d,[(1092,516),(1092,540),(450,540),(450,516)],animate=False)
        note(d,'Los datos desconocidos no se convierten en cero.')
    elif i==5:
        node(d,333,250,225,89,'Borrador de preparación',size=22)
        node(d,636,250,227,89,'Revisión de autoridad competente',size=20)
        diamond(d,937,225,288,139,'¿Habilitación confirmada?')
        edge(d,[(558,294),(636,294)]);edge(d,[(863,294),(937,294)])
        node(d,932,448,295,80,'Confirmar horario y acceso',PALE,size=20)
        node(d,480,448,318,80,'Mantener borrador: NO ACUDIR','#F9E6DD',CORAL,size=20)
        edge(d,[(1080,364),(1080,448)],'SÍ',labelpos=(1100,387))
        edge(d,[(970,326),(892,394),(638,394),(638,448)],'NO',CORAL,(731,390))
        note(d,'No reemplaza evaluación estructural ni conceptos de Bomberos.')
    elif i==6:
        pill(d,333,216,'DEMO · SIN APERTURA CONFIRMADA',GOLD,size=14)
        node(d,334,290,233,111,'Ubicación + horario propuesto + mensaje',size=20)
        node(d,650,290,233,111,'Revisar aviso a toda la población',size=20)
        node(d,971,290,248,111,'Simular envío masivo',PALE,size=23)
        edge(d,[(567,345),(650,345)]);edge(d,[(883,345),(971,345)])
        node(d,934,468,292,76,'Entregas / pendientes SIMULADOS',size=20)
        edge(d,[(1095,401),(1095,468)])
        text(d,348,462,'Envíos reales: 0',30,CORAL,True)
        text(d,348,512,'Borrador: no acudir todavía.',21,INK,True)
        note(d,'Una invitación real requiere apertura y condiciones confirmadas.')
    else:
        node(d,336,260,224,101,'Cierre de atención',size=22)
        node(d,656,260,224,101,'Revisión y checklist',size=22)
        node(d,977,260,244,101,'Acta de retorno',size=22)
        edge(d,[(560,310),(656,310)]);edge(d,[(880,310),(977,310)])
        node(d,865,464,356,72,'Volver al uso cotidiano',PALE,size=23)
        edge(d,[(1099,361),(1099,464)])
        text(d,347,452,'CALI ACTIVA',28,INK,True)
        paragraph(d,347,495,'Conocer el espacio. Preparar el cuidado.',22,450,TEAL,True)
        note(d,'Flujo previsto del proyecto; no acredita una devolución ejecutada.')
    return im,PATHS.copy()

def draw_scene(i,t):
    local=t-e.SCENES[i]['start']
    adjusted_at=next((c['start'] for c in CUES if c['text'].startswith('cabe por área')),39.7)
    phase=1 if i==3 and t>=adjusted_at else 0
    key=(i,phase)
    if key not in CACHE:CACHE[key]=canvas(i,phase)
    base,paths=CACHE[key];im=base.copy();d=ImageDraw.Draw(im)
    name='narradora' if i%2==0 else 'narrador'
    p=PORTRAITS[name]
    offset=math.sin(local*1.8)*2
    im.paste(p,(round((160-p.width/S/2)*S),round((203+offset)*S)),p)
    # A moving light follows each arrow, making direction explicit.
    for j,(pts,color) in enumerate(paths):
        lengths=[math.hypot(b[0]-a[0],b[1]-a[1]) for a,b in zip(pts,pts[1:])]
        position=((local*.35+j*.21)%1)*sum(lengths)
        for (ax,ay),(bx,by),length in zip(pts,pts[1:],lengths):
            if position<=length:
                f=position/max(length,.001);x=ax+(bx-ax)*f;y=ay+(by-ay)*f
                ellipse(d,(x-4,y-4,x+4,y+4),GOLD,INK,1);break
            position-=length
    # Animated voice indicator, without painting over the supplied character faces.
    for j in range(5):
        h=4+abs(math.sin(t*8+j))*10
        rr(d,(124+j*12,532-h/2,129+j*12,532+h/2),TEAL,2)
    rr(d,(30,608,1250,692),INK,15)
    cue=next((c for c in CUES if c['start']<=t<c['end']),None)
    if cue:
        lines=e.wrap(d,cue['text'],23,1160)
        for j,l in enumerate(lines):text(d,640,622+j*29,l,23,WHITE,False,'mt')
    line(d,[(35,708),(1245,708)],'#D8DFD4',4)
    line(d,[(35,708),(35+1210*t/80,708)],TEAL,4)
    return im.resize((W,H),Image.Resampling.LANCZOS)

if __name__=='__main__':
    if '--preview' in sys.argv:
        CUES=json.loads((OUT/'src/subtitulos.json').read_text()) if (OUT/'src/subtitulos.json').exists() else []
        sheet=Image.new('RGB',(1280,1440),BG)
        for i,s in enumerate(e.SCENES):
            frame=draw_scene(i,s['start']+4);frame.save(OUT/f'escena-{i+1}.png')
            sheet.paste(frame.resize((640,360)),((i%2)*640,(i//2)*360))
        sheet.save(OUT/'storyboard.jpg',quality=94)
        draw_scene(0,3).save(OUT/'portada.jpg',quality=94)
        draw_scene(3,40.5).save(OUT/'acopio-ajustado.png')
    else:
        cache=OUT/'audio/guion-cache.json'
        if not cache.exists() or json.loads(cache.read_text()) != e.SCENES:
            for clip in (OUT/'audio').glob('voz-*.mp3'): clip.unlink()
        asyncio.run(e.voices());cache.write_text(json.dumps(e.SCENES,ensure_ascii=False))
        CUES=e.audio()
        if '--audio-only' in sys.argv:sys.exit(0)
        output=OUT/'cali-activa-80s.mp4'
        cmd=[e.FF,'-y','-v','error','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-i',str(OUT/'audio/mezcla.wav'),'-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-t','80','-movflags','+faststart',str(output)]
        proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
        try:
            for frame in range(80*FPS):
                t=frame/FPS;i=next(i for i,s in enumerate(e.SCENES) if s['start']<=t<s['end'])
                proc.stdin.write(draw_scene(i,t).tobytes())
                if frame%(FPS*5)==0:print(f'Render v2: {t:.0f}/80 s',flush=True)
        finally:proc.stdin.close()
        if proc.wait():raise RuntimeError('Error de codificación')
        print('Video v2 listo:',output,flush=True)
