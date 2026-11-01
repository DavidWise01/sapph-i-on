#!/usr/bin/env python3
"""
hermes-verify-epoch13-deep-deep
Ad-hoc verification for epoch 13 (layer 29, year 2160, gods of the deep deep).
Mantis shrimp and bioluminescence theme.
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
print("HERMES VERIFY: Epoch 13 - Gods of the Deep Deep (layer 29, year 2160)")
print("=" * 60)

print("[1] Epoch 13 files generated (24 pages)")
ep = sorted([f for f in os.listdir(GROWN) if f.startswith('layer-29-2160-') and f.endswith('.html')])
check("24 epoch 13 pages exist", len(ep) == 24)
for f in ep:
    sz = os.path.getsize(os.path.join(GROWN, f))
    check(f"  {f} > 2KB", sz > 2048)

print("[2] Epoch 13 content markers")
sample_path = os.path.join(GROWN, ep[0])
with open(sample_path, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()
check("Contains <!--generated-by-icarium-->", '<!--generated-by-icarium-->' in content)
check("Contains viewport meta", '<meta name="viewport"' in content)
check("Contains author meta", '<meta name="author"' in content)
check("Contains generator meta", 'Icarium · SaPpH11on' in content)
check("Contains Mantis Shrimp theme", 'mantis shrimp' in content.lower() or 'Mantis Shrimp' in content)
check("Contains biolum theme", 'biolum' in content.lower() or 'Biolum' in content)
check("Contains deep deep theme", 'deep deep' in content.lower() or 'Deep Deep' in content)

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
