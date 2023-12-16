
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';

const etherspaceEndpoint = 'http://192.168.1.80:8889/api/v1/contraption';

async function uploadContraptions() {
  try {
    const files = await fs.readdir('./examples');
    const jsFiles = files.filter(file => file.endsWith('.js'));

    for (const file of jsFiles) {
      let content = await fs.readFile(`./examples/${file}`, 'utf8');
      const name = path.basename(file, '.js'); // Use the file name without the extension as the contraption name

      // inside content, replace the string '../index.js' with `realstone`
      // this is because the contraption code will be run in the browser, and
      // the browser will not have access to the local folder
      content = content.replace(/'\.\.\/index\.js'/g, "'realstone'");

      // find any lines that look like: let anyStRinGcase = new RealStone();
      // and add a line immediately after that looks like: window.anyStRinGcase = anyStRinGcase;
      // this is to make the system available in the browser console
      const lines = content.split('\n');
      let windowLine = '';
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('new RealStone')) {
          const variableName = line.split(' ')[1].trim();
          windowLine = `\n\nwindow.realStoneSystem = ${variableName};`;
        }
      }

      // remove any line that starts with 'import'
      content = content.replace(/import.*/g, '');

      // replace all 'new ' strings with 'new RS.'
      content = content.replace(/new /g, 'new RS.');
      
      content+= windowLine;

      const payload = {
        name,
        owner: 'Marak',
        code: content // The file content is the contraption code
      };
      console.log(`${etherspaceEndpoint}/${name}`)
      console.log(payload)

      let upload = true;
      if (upload) {
        const response = await axios.post(`${etherspaceEndpoint}/${name}`, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        console.log(`Uploaded ${name}: Status ${response.status}`);
  
      }
    }
  } catch (error) {
    console.error('Error uploading contraptions:', error);
  }
}

uploadContraptions();
