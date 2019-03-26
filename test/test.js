const {evalQueryBoolean, check, deps, evalQuery, fmt, help, parse, version} = require('../index.js')

test('rego file to be valid', () => {
  check(c => {
    expect(c).toBe('')
  }, {query: 'test/example.rego'})
})

test('query to have no dependencies', () => {
  deps(c => {
    expect(c).toBe('')
  }, {query: 'x = 1; y = 2; x < y'})
})

test('example policy to return data', () => {
  evalQuery(c => {
    expect(c).toContain('allow')
  }, {data: 'test/example.rego', input: 'test/data.json', query: 'data'})
})

test('example policy returns true', () => {
  evalQueryBoolean(c => {
    expect(c).toBe(true)
  }, {data: 'test/example.rego', input: 'test/data.json', package: 'opa.example'})
})

test('formatted file to contain a rule existing in the original file', () => {
  fmt(c => {
    expect(c).toContain('user_has_role')
  }, {query: 'test/example.rego'})
})

test('help page to contain the header', () => {
  help(c => {
    expect(c).toContain('An open source project to policy-enable your service')
  })
})

test('parsed file to contain one of the existing rules', () => {
  parse(c => {
    expect(c).toContain('role_has_permission')
  }, {query: 'test/example.rego'})
})

test('version contains Version:', () => {
  version(c => {
    expect(c).toContain('Version:')
  })
})
