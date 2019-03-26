const { exec } = require('child_process');

const build = (callback, args) => {
  const opts = ['data', 'debug', 'help', 'ignore', 'output']
  const cmd = './opa build ' + transformArgs(args, opts)
  executeCommand(cmd, callback)
}

const check = (callback, args) => {
  const opts = ['format', 'help', 'ignore', 'max-errors']
  const cmd = './opa check ' + transformArgs(args, opts)
  executeCommand(cmd, callback)
}

const deps = (callback, args) => {
  const opts = ['data', 'format', 'help', 'ignore']
  const cmd = './opa deps ' + transformArgs(args, opts)
  executeCommand(cmd, callback)
}

const evalQuery = (callback, args) => {
  const opts = ['coverage', 'data', 'explain', 'fail', 'format', 'help', 'ignore', 'import', 'input', 'metrics',
    'package', 'partial', 'pretty-limit', 'profile', 'profile-limit', 'profile-sort', 'stdin', 'stdin-input', 'unknown']
  const cmd = './opa eval ' + transformArgs(args, opts)
  executeCommand(cmd, callback)
}

const evalQueryBoolean = (callback, args) => {
  const opts = ['coverage', 'data', 'explain', 'fail', 'format', 'help', 'ignore', 'import', 'input', 'metrics',
    'package', 'partial', 'pretty-limit', 'profile', 'profile-limit', 'profile-sort', 'stdin', 'stdin-input', 'unknown']
  const cmd = './opa eval ' + transformArgs(args, opts) + `"data.${args['package']}.allow"`
  executeCommand(cmd, r => callback(JSON.parse(r).result[0].expressions[0].value))
}

const fmt = (callback, args) => {
  const opts = ['diff', 'help', 'list', 'write']
  const cmd = './opa fmt ' + transformArgs(args, opts)
  executeCommand(cmd, callback)
}

const help = (callback) => {
  executeCommand('./opa help', callback)
}

const parse = (callback, args) => {
  const opts = ['format', 'help']
  const cmd = './opa parse ' + transformArgs(args, opts)
  executeCommand(cmd, callback)
}

const testRego = (callback, args) => {
  const opts = ['coverage', 'format', 'help', 'ignore', 'max-errors', 'show-failure', 'threshold', 'timeout', 'verbose']
  const cmd = './opa test ' + transformArgs(args, opts)
  executeCommand(cmd, callback)
}

const version = (callback) => {
  executeCommand('./opa version', callback)
}

const executeCommand = (cmd, callback) => {
  exec(cmd, (err, stdout) => {
    if (err) console.error(err)
    else callback(stdout)
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
