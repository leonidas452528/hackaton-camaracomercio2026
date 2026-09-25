"""Compara archivos archivados con WFS sin publicar atributos originales adicionales."""
import concurrent.futures
import hashlib
import json
from datetime import datetime
from pathlib import Path
from urllib.request import urlopen
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / 'maqueta3d/public/data'


def digest(data):
    features = sorted(json.dumps({'geometry': f['geometry'], 'properties': f['properties']}, sort_keys=True, ensure_ascii=False) for f in data['features'])
    return hashlib.sha256(json.dumps(features, ensure_ascii=False).encode()).hexdigest()


def check(source):
    result = {'key': source['key'], 'url': source['download'], 'consultedOn': datetime.now(ZoneInfo('America/Bogota')).date().isoformat(), 'snapshotCount': source['count']}
    try:
        with urlopen(source['download'], timeout=40) as response:
            remote = json.load(response)
        archived = json.loads((ROOT / 'prototipo/datos/raw/idesc' / (source['name'] + '.geojson')).read_text())
        result.update(remoteCount=len(remote['features']), sameGeometryAndProperties=digest(remote) == digest(archived), status='Comparación de descarga completa; excluye IDs transitorios WFS')
    except Exception as error:
        result.update(status='No se pudo verificar descarga completa', error=type(error).__name__)
    return result


if __name__ == '__main__':
    manifest = json.loads((DATA / 'manifest.json').read_text())
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        results = list(pool.map(check, manifest['sources']))
    (DATA / 'source-checks.json').write_text(json.dumps(results, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(results, ensure_ascii=False, indent=2))
