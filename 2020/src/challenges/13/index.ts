import path from "path";
import { readFile } from "../../utils/readFile";

const data = readFile(`${path.join(__dirname)}/entry.txt`, "\n");

const num13 = () => {};

export default num13;
