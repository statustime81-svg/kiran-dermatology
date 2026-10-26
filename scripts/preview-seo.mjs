import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
export function createPreviewServer() {
 const root=path.resolve('dist')
 const types={'.html':'text/html; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.json':'application/json','.webmanifest':'application/manifest+json','.woff2':'font/woff2'}
 return createServer(async(req,res)=>{
  try {
   const pathname=decodeURIComponent(new URL(req.url,'http://local').pathname)
   const relative=pathname==='/'?'index.html':pathname.replace(/^\/+/, '')
   let file=path.resolve(root, relative)
   if(!file.startsWith(root+path.sep) && file!==root){res.writeHead(400);res.end();return}
   let status=200
   if(/^\/admin(?:\/|$)/.test(pathname)){file=path.join(root,'admin-shell.html');res.setHeader('X-Robots-Tag','noindex, follow')}
   else {
    try{if(!(await stat(file)).isFile())throw new Error()}catch{
     try{file=path.resolve(root, relative+'.html');if(!(await stat(file)).isFile())throw new Error()}catch{status=404;file=path.join(root,'404.html')}
    }
   }
   const body=await readFile(file);res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(req.method==='HEAD'?undefined:body)
  }catch{res.writeHead(500);res.end('Build the project first with npm run build or npm run build:preview.')}
 })
}
if(path.resolve(process.argv[1] || '')===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT||4173);createPreviewServer().listen(port,'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${port}`))}
