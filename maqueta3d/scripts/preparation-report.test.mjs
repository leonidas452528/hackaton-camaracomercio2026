import test from 'node:test';
import assert from 'node:assert/strict';
import { preparationReport } from '../src/preparationReport.ts';
import { emptyAcopioInputs, acopioCapacity } from '../src/calculateAcopioCapacity.ts';

test('el informe escapa texto externo y no genera enlaces ejecutables', () => {
  const malicious = '<img src=x onerror=alert(1)>';
  const html = preparationReport({
    generatedAt: '2026-09-26T12:00:00Z',
    origin: { name: 'Referencia', id: 'epou-1' },
    target: { name: malicious, id: 'epou-1', coordinates: [-76,3], commune: null, neighborhood: null },
    scope: malicious, threat: 'drought', people: 1,
    decision: { status: 'pending', excluded: true, reason: malicious },
    comparison: { candidates: [], considered: 1, excluded: 0, pendingEvidence: 1 },
    gaps: [], acopio: { ...acopioCapacity(null, emptyAcopioInputs), includedInDraft: false },
    fire: [], fireLimitations: [], fireSources: [],
    manifest: { attribution: malicious, snapshotDate: '2026-09-25', sources: [{ name: malicious, page: 'javascript:alert(1)', license: 'Referencia' }], limitations: [malicious] },
  });
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(!html.includes(malicious));
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(html.includes('Sin polígono válido'));
  assert.ok(html.includes('Por confirmar'));
});
