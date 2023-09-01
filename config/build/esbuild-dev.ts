import ESBuild from "esbuild";
import config from './esbuild-config';

const PORT = Number(process.env.PORT) || 3000;


(async()=>{
    let ctx = await ESBuild.context(config)
    let { host, port } = await ctx.serve({
        servedir: config.outdir,
        port:PORT
    })
    await ctx.watch()
    console.log(`Server started on ${host}:${port}`)
})()


