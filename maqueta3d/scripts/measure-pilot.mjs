import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import * as turf from '@turf/turf';
const root = new URL('../../', import.meta.url);
const output = new URL('maqueta3d/deliverables/mediciones/', root);
await mkdir(output, { recursive: true });
const rawPath = 'prototipo/datos/raw/idesc/construcciones_piloto_geometria.geojson';
const bytes = await readFile(new URL(rawPath, root));
const buildings = JSON.parse(bytes);
const spaces = JSON.parse(await readFile(new URL('maqueta3d/public/data/spaces.json', root)));
const ids = ['deporte-225', 'deporte-535', 'deporte-229', 'deporte-230', 'deporte-268', 'deporte-791', 'deporte-802'];
const points = ids.map(id => {
  const p = spaces.features.find(f => f.properties.id === id)?.properties;
  if (!p) throw new Error(`Falta ${id}`);
  return { id, name: p.name, coordinates: p.coordinates, googleMaps: `https://www.google.com/maps/search/?api=1&query=${p.coordinates[1]},${p.coordinates[0]}` };
});
const volleyball = points.filter(p => ['deporte-230', 'deporte-268', 'deporte-791'].includes(p.id));
const candidates = buildings.features.filter(f => volleyball.every(p => turf.booleanPointInPolygon(turf.point(p.coordinates), f)));
if (candidates.length !== 1) throw new Error('La asociación espacial de voleibol dejó de ser única. Revisar manualmente.');
const building = candidates[0];
if (building.geometry.type !== "MultiPolygon" || building.geometry.coordinates.length !== 1 || building.geometry.coordinates[0].length !== 1) throw new Error("Revisar método: se esperaba un polígono simple sin huecos.");
const ring = building.geometry.coordinates[0][0];
const center = turf.centroid(building).geometry.coordinates;
const radius = 6371008.8, rad = Math.PI / 180;
const project = ([lon, lat]) => [(lon-center[0])*rad*radius*Math.cos(center[1]*rad), (lat-center[1])*rad*radius];
const xy = ring.slice(0,-1).map(project);
let best;
// Todas las parejas incluyen las direcciones de los lados de la envolvente convexa.
for (let i=0; i<xy.length; i++) for(let j=i+1;j<xy.length;j++) {
  const angle=Math.atan2(xy[j][1]-xy[i][1],xy[j][0]-xy[i][0]);
  const c=Math.cos(angle), s=Math.sin(angle);
  const uv=xy.map(([x,y])=>[x*c+y*s,-x*s+y*c]);
  const minU=Math.min(...uv.map(p=>p[0])), maxU=Math.max(...uv.map(p=>p[0]));
  const minV=Math.min(...uv.map(p=>p[1])), maxV=Math.max(...uv.map(p=>p[1]));
  const area=(maxU-minU)*(maxV-minV);
  if(!best || area<best.area) best={area,angle,width:maxU-minU,depth:maxV-minV,corners:[[minU,minV],[maxU,minV],[maxU,maxV],[minU,maxV]].map(([u,v])=>[u*c-v*s,u*s+v*c])};
}
const round=n=>Math.round(n*10)/10;
const longAngle=best.width>=best.depth?best.angle:best.angle+Math.PI/2;
const measurements={
 status:'Estimación cartográfica; identificación con Francisco Chois por confirmar',
 sourceFile:rawPath, sourceSha256:createHash('sha256').update(bytes).digest('hex'),
 featureId:building.id, catalogPoints:volleyball,
 areaM2:Math.round(turf.area(building)), perimeterM:round(turf.length(turf.polygonToLine(building),{units:'meters'})),
 enclosingRectangle:{lengthM:round(Math.max(best.width,best.depth)),widthM:round(Math.min(best.width,best.depth)),longAxisBearingDegrees:round(((90-longAngle/rad)%180+180)%180)},
 actualClearHeight:null, actualCourtCount:null, usableAreaM2:null,
 method:'Área esférica y perímetro geodésico Turf. Rectángulo envolvente mínimo con proyección equirectangular local centrada en la geometría; norte geográfico. Redondeo a 1 m² / 0,1 m no implica esa exactitud de la fuente.',
 limits:'Huella de construcción, no cancha, área de cubierta inclinada, superficie libre, aforo ni medición topográfica. Tres puntos no demuestran tres canchas actuales. Antigüedad y exactitud de la cartografía no verificadas. La geometría de la maqueta no se recalibra automáticamente.',
 license:'No identificada en las respuestas WFS consultadas (verificar); no se presume CC BY-SA de otro dataset.',
};
const distances=[];
for(const origin of points.filter(p=>['deporte-225','deporte-535'].includes(p.id))) for(const target of points.filter(p=>p!==origin)) {
  distances.push({origin:origin.id,target:target.id,distanceM:Math.round(turf.distance(origin.coordinates,target.coordinates,{units:'meters'})),bearingDegrees:round((turf.bearing(origin.coordinates,target.coordinates)+360)%360)});
}
await writeFile(new URL('mediciones.json',output),JSON.stringify({measurements,points,distances},null,2)+'\n');
await writeFile(new URL('distancias_catalogo.csv',output),'origen_id,destino_id,distancia_recta_m,rumbo_grados\n'+distances.map(d=>`${d.origin},${d.target},${d.distanceM},${d.bearingDegrees}`).join('\n')+'\n');
const scale=5, screen=([x,y])=>[370+x*scale,410-y*scale];
const coords=list=>list.map(p=>screen(p).map(n=>n.toFixed(1)).join(',')).join(' ');
const circles=volleyball.map((p,i)=>{const [x,y]=screen(project(p.coordinates));return `<circle cx="${x}" cy="${y}" r="7" fill="#b46c17"/><text x="${x+12}" y="${y-9}" font-size="15">${i+1}</text>`}).join('');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="820" viewBox="0 0 1000 820"><rect width="1000" height="820" fill="#f6f5ee"/><g font-family="sans-serif" fill="#163e36"><text x="40" y="48" font-size="25">Medición cartográfica · candidato a Coliseo Francisco Chois</text><text x="40" y="80" font-size="16">Fuente: Catastro / IDESC · identificación por confirmar · sin medición en campo</text><polygon points="${coords(best.corners)}" fill="none" stroke="#b46c17" stroke-width="2" stroke-dasharray="8 5"/><polygon points="${coords(xy)}" fill="#cae0d5" stroke="#245c4e" stroke-width="3"/>${circles}<path d="M850 200V130l-9 18m9-18 9 18" fill="none" stroke="#163e36" stroke-width="3"/><text x="842" y="115">N</text><text x="730" y="275" font-size="22">${measurements.areaM2} m²</text><text x="730" y="300" font-size="15">Huella cartográfica</text><text x="730" y="342" font-size="18">${measurements.perimeterM} m de perímetro</text><text x="730" y="380" font-size="17">Envolvente: ${measurements.enclosingRectangle.lengthM} × ${measurements.enclosingRectangle.widthM} m</text><text x="730" y="410" font-size="15">No son dimensiones interiores</text><text x="40" y="660" font-size="16">1: cancha cubierta 1 de voleibol · 2: voleibol 3 madera · 3: voleibol sdr</text><text x="40" y="690" font-size="16">Los puntos del catálogo no acreditan número actual de canchas ni superficie disponible.</text><path d="M40 745h100m-100-5v10m100-10v10" stroke="#163e36" stroke-width="2"/><text x="75" y="773" font-size="14">20 m</text><text x="270" y="755" font-size="14">Altura, área útil y accesos: sin medición verificada.</text></g></svg>`;
await writeFile(new URL('huella_voleibol.svg',output),svg);
console.log(JSON.stringify(measurements,null,2));
