import { createCanvas, loadImage } from "canvas";
import * as fs from 'fs';

export default async function imageLoader(name, buffer) {
    if ((fs.existsSync(`./data/img/${name}.png`))) {
        console.log('[DEBUG] Old file found.')
    } else {
        console.log('[DEBUG] New file made.')
        const canvas = createCanvas(128, 128)
        const context = canvas.getContext('2d')

        loadImage(buffer).then(image => {
            context.drawImage(image, 0, 0, 128, 128)
            const buffer = canvas.toBuffer('image/png')
            fs.writeFileSync(`./data/img/${name}.png`, buffer)
        })
    }
}
