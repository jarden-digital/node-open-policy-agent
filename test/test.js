const {evalQueryBoolean, check, deps, evalQuery, fmt, help, parse, version} = require('../index.js')

// CALLBACK VERSION

test('rego file to be valid', () => {
  check({query: 'test/example.rego'},
    (err, c) => expect(c).toBe(''))
})

test('query to have no dependencies', () => {
  deps({query: 'x = 1; y = 2; x < y'},
    (err, c) => expect(c).toBe(''))
})

test('example policy to return data', () => {
  evalQuery({data: 'test/example.rego', input: 'test/data.json', query: 'data'},
    (err, c) => expect(c).toContain('allow'))
})

test('example policy returns true', () => {
  evalQueryBoolean({data: 'test/example.rego', input: 'test/data.json', package: 'opa.example'},
    (err, c) => expect(c).toBe(true))
})

test('formatted file to contain a rule existing in the original file', () => {
  fmt({query: 'test/example.rego'},
    (err, c) => expect(c).toContain('user_has_role'))
})

test('help page to contain the header', () => {
  help((err, c) => expect(c).toContain('An open source project to policy-enable your service'))
})

test('parsed file to contain one of the existing rules', () => {
  parse({query: 'test/example.rego'},
    (err, c) => expect(c).toContain('role_has_permission'))
})

test('version contains Version:', () => {
  version((err, c) => expect(c).toContain('Version:'))
})

// PROMISE VERSION

test('promisified rego file to be valid', async () => {
  const res = await check({query: 'test/example.rego'})
  expect(res).toBe('')
})

test('promisified query to have no dependencies', async () => {
  const res = await deps({query: 'x = 1; y = 2; x < y'})
  expect(res).toBe('')
})

test('promisified example policy to return data', async() => {
  const res = await evalQuery({data: 'test/example.rego', input: 'test/data.json', query: 'data'})
  expect(res).toContain('allow')
})

test('promisified example policy returns true', async() => {
  const res = await evalQueryBoolean({data: 'test/example.rego', input: 'test/data.json', package: 'opa.example'})
  expect(res).toBe(true)
})

test('promisified formatted file to contain a rule existing in the original file', async() => {
  const res = await fmt({query: 'test/example.rego'})
  expect(res).toContain('user_has_role')
})

test('promisified help page to contain the header', async() => {
  const res = await help()
  expect(res).toContain('An open source project to policy-enable your service')
})

test('promisified parsed file to contain one of the existing rules', async() => {
  const res = await parse({query: 'test/example.rego'})
  expect(res).toContain('role_has_permission')
})

test('promisified version contains Version:', async () => {
  const res = await version()
  expect(res).toContain('Version:')
})
