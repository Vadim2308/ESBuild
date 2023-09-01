import { Plugin } from 'esbuild'
import {rm} from 'fs/promises' // Утилитки из fs для работы с файловой системой. rm-remove
export const CleanPlugin:Plugin = {
    name: 'CleanPlugin',
    setup(build) { // build это наша сборка
        build.onStart(async ()=> {
            try {
                const outdir = build.initialOptions.outdir // переда запуском, законсолить. Иначе можно дропнуть что-то не то
                if(outdir){
                    await rm(outdir,{recursive:true})
                }
            }catch (e) {
                console.log("Не удалось очистить папку")
            }
        })
    },
}
