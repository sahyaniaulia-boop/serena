import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const root = process.cwd();
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png'};
createServer(async (req,res)=>{
  try { const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); const safe = normalize(pathname).replace(/^([.][.][/\\])+/, ''); let file = join(root, safe === '/' ? 'index.html' : (safe === '/sirena-ocean.png' ? 'public/sirena-ocean.png' : safe));
    try { if (!(await stat(file)).isFile()) throw new Error(); } catch { file = join(root,'index.html'); }
    res.writeHead(200, {'Content-Type': types[extname(file)] || 'application/octet-stream'}); res.end(await readFile(file));
  } catch { res.writeHead(500); res.end('Server error'); }
}).listen(5173,()=>console.log('SIRENA running at http://localhost:5173'));
