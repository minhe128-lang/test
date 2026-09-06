"""Build a dependency-free, double-clickable HTML from the source tree."""
from pathlib import Path
import base64
import json
import re
ROOT = Path(__file__).resolve().parent.parent
html = (ROOT / 'index.html').read_text(encoding='utf-8')
images = {p.stem: 'data:image/webp;base64,' + base64.b64encode(p.read_bytes()).decode('ascii') for p in (ROOT / 'assets/scenes').glob('*.webp')}
html = html.replace('<link rel="stylesheet" href="assets/arcade.css">', '<style>\n' + (ROOT/'assets/arcade.css').read_text(encoding='utf-8') + '\n</style>')
html = html.replace('src="assets/scenes/dice.webp"', 'src="' + images['dice'] + '"')
bootstrap = '<script>window.OVERKILL_ASSETS=' + json.dumps(images, ensure_ascii=False, separators=(',', ':')) + ';</script>\n'
html = html.replace('<script src="assets/js/core.js"></script>', bootstrap + '<script src="assets/js/core.js"></script>')
def inline_script(match):
    source = (ROOT/match.group(1)).read_text(encoding='utf-8')
    source = source.replace('</script', '<\\/script')
    return '<script>\n' + source + '\n</script>'
html = re.sub(r'<script src="([^"]+)"></script>', inline_script, html)
(ROOT/'OVERKILL_바로실행.html').write_text(html, encoding='utf-8')
print('Built standalone:', (ROOT/'OVERKILL_바로실행.html').stat().st_size, 'bytes')
