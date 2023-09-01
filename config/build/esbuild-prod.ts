import ESBuild from "esbuild";
import config from './esbuild-config';

(async()=>{
    try {
        await ESBuild.build(config)
    } catch (e) {
        console.log(e)
    }
})()


