const {exec} = require('child_process')
const path = require('path')

let isWindows = process.platform === 'win32'
let fileName = 'opa' + (isWindows ? '.exe ' : ' ')
let opaPath = path.join(__dirname, fileName)

const build = (args, callback) => {
  const opts = ['data', 'debug', 'help', 'ignore', 'output']
  const cmd = opaPath + 'build ' + transformArgs(args, opts)
  return executeCommand(cmd, callback)
}

const check = (args, callback) => {
  const opts = ['format', 'help', 'ignore', 'max-errors']
  const cmd = opaPath + 'check ' + transformArgs(args, opts)
  return executeCommand(cmd, callback)
}

const deps = (args, callback) => {
  const opts = ['data', 'format', 'help', 'ignore']
  const cmd = opaPath + 'deps ' + transformArgs(args, opts)
  return executeCommand(cmd, callback)
}

const evalQuery = (args, callback) => {
  const opts = ['coverage', 'data', 'explain', 'fail', 'format', 'help', 'ignore', 'import', 'input', 'metrics',
    'package', 'partial', 'pretty-limit', 'profile', 'profile-limit', 'profile-sort', 'stdin', 'stdin-input', 'unknown']
  const cmd = opaPath + 'eval ' + transformArgs(args, opts)
  return executeCommand(cmd, callback)
}

const evalQueryBoolean = (args, callback) => {
  const opts = ['coverage', 'data', 'explain', 'fail', 'format', 'help', 'ignore', 'import', 'input', 'metrics',
    'package', 'partial', 'pretty-limit', 'profile', 'profile-limit', 'profile-sort', 'stdin', 'stdin-input', 'unknown']
  const cmd = opaPath + 'eval ' + transformArgs(args, opts) + `"data.${args['package']}.allow"`
  return executeCommand(cmd, (err, res) => callback(err, JSON.parse(res).result[0].expressions[0].value))
}

const fmt = (args, callback) => {
  const opts = ['diff', 'help', 'list', 'write']
  const cmd = opaPath + 'fmt ' + transformArgs(args, opts)
  return executeCommand(cmd, callback)
}

const help = (callback) => {
  return executeCommand(opaPath + 'help', callback)
}

const parse = (args, callback) => {
  const opts = ['format', 'help']
  const cmd = opaPath + 'parse ' + transformArgs(args, opts)
  return executeCommand(cmd, callback)
}

const testRego = (args, callback) => {
  const opts = ['coverage', 'format', 'help', 'ignore', 'max-errors', 'show-failure', 'threshold', 'timeout', 'verbose']
  const cmd = opaPath + 'test ' + transformArgs(args, opts)
  return executeCommand(cmd, callback)
}

const version = (callback) => {
  return executeCommand(opaPath + 'version', callback)
}

const executeCommand = (cmd, callback) => {
  if (callback) exec(cmd, (err, stdout) => callback(err, stdout))
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout) => {
      if (err) reject(err)
      resolve(stdout)
    })
  })
}

const transformArgs = (args, opts) => {
  let argsString = ''
  Object.keys(args).map(a => {
    if (opts.includes(a)) argsString += `--${a} ${args[a]} `
    else if (a === 'query') argsString += `"${args[a]}" `
  })
  return argsString
}

exports.build = build
exports.check = check
exports.deps = deps
exports.evalQuery = evalQuery
exports.evalQueryBoolean = evalQueryBoolean
exports.fmt = fmt
exports.help = help
exports.parse = parse
exports.testRego = testRego
exports.version = version
