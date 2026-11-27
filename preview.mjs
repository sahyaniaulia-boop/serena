import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
const root = join(process.cwd(),'dist'); const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png'};
createServer(async(req,res)=>{try{let path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=join(root,path==='/'?'index.html':path);try{if(!(await stat(file)).isFile())throw new Error()}catch{file=join(root,'index.html')}res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(await readFile(file))}catch{res.writeHead(500);res.end('Server error')}}).listen(4173,()=>console.log('Preview at http://localhost:4173'));
