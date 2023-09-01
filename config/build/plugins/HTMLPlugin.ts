import { Plugin } from 'esbuild'
import {rm,writeFile} from 'fs/promises' // Утилитки из fs для работы с файловой системой. rm-remove
import path from 'path'

interface HTMLPluginOption {
    template?:string,
    title?:string,
    jsPaths?:string[],
    cssPaths?:string[],
}

const renderHtml = (options:HTMLPluginOption) => {
    return `<!doctype html>
      <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>${options?.title ?? 'Title'}</title>
              ${options.cssPaths?.map(path=>`<link rel="stylesheet" href="${path}"/>`).join('\n')}
          </head>
          <body>
             <div id="root"></div>
             ${options.jsPaths?.map(path=>`<script src=${path}></script>`).join('\n')}
          </body>
      </html>`
}

function preparePath(outputs:string[]){
    return outputs.reduce<Array<string[]>>((acc,path)=>{
        const [js,css] = acc;
        const splitFileName = path.split('/').pop()
        if(splitFileName?.endsWith('.js')){
            js.push(splitFileName)
        } else if (splitFileName?.endsWith('.css')){
            css.push(splitFileName)
        }
        return acc;
    },[[],[]])
}

export const HTMLPlugin = (options:HTMLPluginOption):Plugin => {
    return {
        name: 'HTMLPlugin',
        setup(build) { // build это наша сборка
            const outdir = build.initialOptions.outdir // перед запуском, законсолить. Иначе можно дропнуть что-то не то
            build.onEnd(async (result)=> {
                const outpoots = result.metafile?.outputs
                const [jsPaths,cssPaths] = preparePath(Object.keys(outpoots ?? {}))
                if(outdir){
                    await writeFile(path.resolve(outdir,"index.html"),renderHtml({ jsPaths,cssPaths,...options })
                )
                }
            })
        },
    }
}