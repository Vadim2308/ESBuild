import path from 'path'
import {BuildOptions} from "esbuild";
import { CleanPlugin } from "./plugins/CleanPlugin";
import { HTMLPlugin } from "./plugins/HTMLPlugin";
import {livereloadPlugin} from '@jgoz/esbuild-plugin-livereload';

const mode = process.env.MODE || 'development'
const isDev = mode === "development"
const isProd = mode === "production"

function resolveRoot(...segments:string[]){
    return path.resolve(__dirname,"..","..",...segments)
}

/**
 * Экспортируем из файла объект
 */
const config:BuildOptions = {
    outdir:resolveRoot("build"), // путь до папки, где должен лежать итоговая сборка (..=> это выход на директорию выше)
    entryPoints:[resolveRoot("src","index.tsx")], // входная точка нашего приложения
    entryNames:'[dir]/bundle.[name]-[hash]', // Как будет называться файл, в котором будет лежать итоговый код. Надо добавлять hash, чтоб добавлять уникальное значение к имени файлы, чтоб браузер на закешировал эти файлы, и пользователь не увидел старый код.[dir] подтянется из outdir
    bundle:true, // true, иначе код будет точно таким же как в index.js
    tsconfig:resolveRoot("tsconfig.json"),
    minify:isProd,
    sourcemap:isDev, // генерация карты исходного кода. При дебаге будет не в общем файле бандла копаться, а в конкретном компоненте
    loader:{ // esbuild должен знать, как работать с каждым файлом. Инфа про '.png':'file' в доке Content Types
        '.png':'file',
        '.svg':'file',
        '.jpg':'file',
    },
    metafile:true, // ??
    plugins:[livereloadPlugin(),CleanPlugin,HTMLPlugin({title:'Ulbi TV'})], // Какие-то доп. плагины, которые могут делать что то. Например очистить папку, что то скопировать из одной папки в другую и т.д.
}
export default config