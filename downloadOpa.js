const fetchUrl = require("fetch").fetchUrl;
const fs = require("fs");

main = () => {
  fs.exists('./opa', (exists) => {
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
  fs.writeFile("opa", body, (err, data) => {
    if (err) console.log('Error writing', err)
    else console.log('Writing successful')
    fs.chmodSync('./opa', '755');
  })
}

main()
