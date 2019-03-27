const fetchUrl = require("fetch").fetchUrl;
const fs = require("fs");
const path = require('path');

let isWindows = process.platform === "win32"
let fileName = 'opa' + (isWindows ? '.exe' : '')
let opaPath = path.join(__dirname, fileName)

main = () => {
  fs.exists(opaPath, (exists) => {
    if (!exists) getUrl()
  });
}

getUrl = () => {
  if (process.platform === "win32") {
    download('https://github.com/open-policy-agent/opa/releases/download/v0.10.5/opa_windows_amd64.exe');
  } else if (process.platform === "darwin") {
    download('https://github.com/open-policy-agent/opa/releases/download/v0.10.5/opa_darwin_amd64');
  } else {
    download('https://github.com/open-policy-agent/opa/releases/download/v0.10.5/opa_linux_amd64');
  }
}

download = (url) => {
  fetchUrl(url, (error, meta, body) => {
    if (error) console.log('Error downloading', error)
    else write(body)
  })
}

write = (body) => {
  fs.writeFile(fileName, body, (err, data) => {
    if (err) console.log('Error writing', err)
    else console.log('Writing successful')
    fs.chmodSync(opaPath, '755');
  })
}

main()
