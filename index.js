console.log('start!');
import Handlebars from "handlebars";
import Fs from "fs";
import path from "path";

const targetDir = './sample';
const outputDir = './output';

let templateFile = Fs.readFileSync('ticket.hds', 'utf-8');
let template = Handlebars.compile(templateFile);

// 対象ディレクトリからJSONファイル一覧を抽出する.
console.log(`target directory: ${targetDir}.`);
const files = Fs.readdirSync(targetDir)
    .filter((file) => path.extname(file).toLowerCase() === '.json');
console.log(`target json: ${files.length} files.`);

// JSONファイルを１つずつ読み込み、mdファイルを出力していく.
let errorFiles = 0;
files.forEach((file) => {
    console.log(`target: ${file}`);
    try{
        let dataText = Fs.readFileSync(`${targetDir}/${file}`, 'utf-8');
        let data = JSON.parse(dataText);
        let outputFileName = `${data.id}_${data.title}.md`;
        Fs.writeFileSync(`${outputDir}/${outputFileName}`, template(data));
    }catch(e){
        errorFiles++;
        console.log(`error occured at ${file}.`);
        console.log(e);
    }
});

console.log(`finished. error files: ${errorFiles}.`);