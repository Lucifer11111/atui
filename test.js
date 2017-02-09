const fs = require('fs');
const YFM = require('yaml-front-matter');

const mdPath = './src/components/Button/demo/primary.md';

let markdown = fs.readFileSync(mdPath);

const raw = YFM.loadFront(markdown);

let content = raw.__content;

delete raw.__content;
const meta = raw;

const markupReg = /\`{3,}jsx([\s\S]*?)\`{3,}/;
const codeReg = /\`{3,}vue\-script([\s\S]*?)\`{3,}/;

let doc = {};
let markup = '';
let code = '';

let markupMatch = content.match(markupReg);
let codeMatch = content.match(codeReg);

//markup
content = content.replace(markupReg, function(match, $1){
  markup = $1;
  return '';
})

//code
content = content.replace(codeReg, function(match, $1){
  code = $1;
  return '';
})

const langArr = ['zh-CN', 'en-US'];
const defLang = langArr[0];

//remove \n at head and tail
content = content.replace(/^\n*|\n*$/g,'')

//doc ## zh-CN
let regStr = '\#{2,}\\s*(' + langArr.join('|') + ')'
let docRegs = new RegExp(regStr);

// ['','zh-CN','\n\n一级按钮\n\n','en-US',"\n\nprimary button"]
let docs = content.split(docRegs);
// delete blank string
docs.shift();
for(var i=0,len=docs.length/2;i<=len;i+=2){
  doc[docs[i]] = docs[i+1]
}

//doc ## en-US

console.log({
  meta:meta,
  markup:markup,
  code:code,
  doc:doc
})