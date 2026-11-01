#!/usr/bin/env python3
"""
hermes-verify-epoch11-leviathan
Ad-hoc verification for epoch 11 (layer 27, year 2138, Leviathan theme).
"""
import os
import json
import sys

REPO = r'C:\Users\Dave\sapph-i-on'
GROWN = os.path.join(REPO, 'grown')

passed = 0
failed = 0

def check(description, condition):
    global passed, failed
    if condition:
        passed += 1
        print("  PASS: " + description)
    else:
        failed += 1
        print("  FAIL: " + description)

print("=" * 60)
print("HERMES VERIFY: Epoch 11 - Leviathan (layer 27, year 2138)")
print("=" * 60)

print("[1] Epoch 11 files generated (24 pages)")
ep = sorted([f for f in os.listdir(GROWN) if f.startswith('layer-27-2138-') and f.endswith('.html')])
check("24 epoch 11 pages exist", len(ep) == 24)
for f in ep:
    sz = os.path.getsize(os.path.join(GROWN, f))
    check(f"  {f} > 2KB", sz > 2048)

print("[2] Epoch 11 content markers")
sample_path = os.path.join(GROWN, ep[0])
with open(sample_path, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()
check("Contains <!--generated-by-icarium-->", '<!--generated-by-icarium-->' in content)
check("Contains viewport meta", '<meta name="viewport"' in content)
check("Contains author meta", '<meta name="author"' in content)
check("Contains generator meta", 'Icarium · SaPpH11on' in content)
check("Contains Leviathan theme", 'leviathan' in content.lower() or 'Leviathan' in content)

print("[3] Git commit state")
import subprocess
head = subprocess.run(['git', 'rev-parse', 'HEAD'], cwd=REPO, capture_output=True, text=True).stdout.strip()
print("  HEAD:", head[:8])
dest_commit = subprocess.run(['git', 'ls-remote', 'origin', 'master'], cwd=REPO, capture_output=True, text=True).stdout.split()[0]
print("  Origin: ", dest_commit[:8])
check("HEAD == origin/master", head == dest_commit)

print("[4] Manifest consistency")
with open(os.path.join(REPO, 'sapphon.json')) as f:
    s = json.load(f)
check("new_spheres == len(sphere_manifest)", s['counts']['new_spheres'] == len(s.get('sphere_manifest', [])))
check("entries == new_spheres", len(s.get('sphere_manifest', [])) == s['counts']['new_spheres'])

print("=" * 60)
print("VERIFICATION SUMMARY: {}/{} passed, {} failed".format(passed, passed + failed, failed))
print("=" * 60)
sys.exit(0 if failed == 0 else 1)
