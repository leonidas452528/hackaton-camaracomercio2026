"""Valida duración, formato, audio y tiempos de subtítulos del entregable."""
import json, os, shutil, subprocess
from pathlib import Path
import numpy as np
root=Path(__file__).resolve().parents[1]
ff=os.environ.get('CALI_VIDEO_FFMPEG') or shutil.which('ffmpeg') or '/tmp/cali-ffmpeg/usr/bin/ffmpeg'
probe=str(Path(ff).with_name('ffprobe'))
p=root/'cali-activa-80s.mp4'
metadata=json.loads(subprocess.check_output([probe,'-v','error','-show_streams','-show_format','-of','json',str(p)]))
v=next(s for s in metadata['streams'] if s['codec_type']=='video')
a=next(s for s in metadata['streams'] if s['codec_type']=='audio')
assert float(metadata['format']['duration'])==80.0
assert v['codec_name']=='h264' and a['codec_name']=='aac'
assert v['width']==1280 and v['height']==720 and v['r_frame_rate']=='24/1'
assert int(v['nb_frames'])==1920
assert abs(float(a['duration'])-80)<.05
cues=json.loads((root/'src/subtitulos.json').read_text())
assert all(0<=c['start']<c['end']<=80 for c in cues)
assert all(cues[i]['end']<=cues[i+1]['start']+.001 for i in range(len(cues)-1))
subprocess.run([ff,'-v','error','-i',str(p),'-f','null','-'],check=True)
raw=subprocess.check_output([ff,'-v','error','-i',str(p),'-vn','-f','f32le','-ac','1','-ar','16000','-'])
samples=np.frombuffer(raw,dtype='<f4')
peak=float(np.max(np.abs(samples)))
assert 0.05<peak<1
scenes=json.loads((root/'src/guion.json').read_text())
rms=[float(np.sqrt(np.mean(samples[int((s['start']+.5)*16000):int((s['end']-.5)*16000)]**2))) for s in scenes]
assert all(x>.015 for x in rms)
result={'durationSeconds':80,'frames':1920,'width':1280,'height':720,'fps':24,'videoCodec':v['codec_name'],'audioCodec':a['codec_name'],'channels':a['channels'],'subtitleCues':len(cues),'audioPeak':round(peak,4),'audioRmsPerScene':[round(x,4) for x in rms],'fullDecode':'passed','personalData':False}
(root/'verificacion.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(result,ensure_ascii=False,indent=2))
