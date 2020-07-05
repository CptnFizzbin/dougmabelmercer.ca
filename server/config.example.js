import path, {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, './data');

export default {
    host: 'localhost',
    port: 3001,
    prefix: '/api',

    dataDir: dataDir,
}
