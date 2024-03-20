console.log('start!');
import Handlebars from "handlebars";
import Fs from "fs";

let templateFile = Fs.readFileSync('ticket.hds','utf-8');
let template = Handlebars.compile(templateFile);

let dataText = Fs.readFileSync('sample.json', 'utf-8');
let data = JSON.parse(dataText);
console.log(template(data));
let outputFileName = `${data.id}_${data.title}.md`;
Fs.writeFileSync(outputFileName, template(data));

console.log('end!!');