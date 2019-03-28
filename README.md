# node-open-policy-agent

[![npm](https://img.shields.io/npm/v/@fnzc/node-open-policy-agent.svg)](https://www.npmjs.com/package/@fnzc/node-open-policy-agent)

_Node module for Open Policy Agent https://github.com/open-policy-agent/opa_

## Installation

```
npm install --save @fnzc/node-open-policy-agent
```
or
```
yarn add @fnzc/node-open-policy-agent
```

## Usage

_See `Functions` section for a list of the provided functions._

*All functions can be called using a callback but they also return a promise.*

Options to provide to the OPA command are represented by an object. Provide an empty string for self-sufficient options (e.g: `help`).
All functions come with a `help` option that you can print to see the specific usage.

```
const {parse} = require('@fnzc/node-open-policy-agent');
parse({help: ''}, res => console.log('Res: ', res))

const helpRes = async () {
    const res = await parse({help: ''});
    console.log(res);
}
helpRes()
```

You can also use the `test/test.js` file provided in the package to see basic usage of all the functions.
Basic usage:

```
const {evalQueryBoolean} = require('@fnzc/node-open-policy-agent');
evalQueryBoolean(
    {data: 'test/example.rego', input: 'test/data.json', package: 'opa.example'},
    res => console.log('Res: ', res)
)

const evalRes = async () {
    const res = await evalQueryBoolean({data: 'test/example.rego', input: 'test/data.json', package: 'opa.example'});
    console.log(res);
}
evalRes()
```

## Functions

| Name | Description | Options | OPA equivalent |
|---|---|---|---|
|**`build`**|Compile a Rego policy query into an executable for enforcement.|`data`: set data file(s) or directory path(s), `debug`: enable debug output, `help`: help for build, `ignore`: set file and directory names to ignore during loading (e.g., '.*' excludes hidden files), `output`: set the filename of the compiled policy (default "policy.wasm")|`opa build`|
|**`check`**|Check Rego source files for parse and compilation errors.|`format`: {pretty,json} set output format (default pretty), `help`: help for check, `ignore`: set file and directory names to ignore during loading (e.g., '.*' excludes hidden files), `max-errors`: set the number of errors to allow before compilation fails early (default 10)|`opa check`|
|**`deps`**|Analyze Rego query dependencies.|`data`: set data file(s) or directory path(s), `format`: {pretty,json} set output format (default pretty), `help`: help for deps, `ignore`: set file and directory names to ignore during loading (e.g., '.*' excludes hidden files)|`opa deps`|
|**`evalQuery`**|Evaluate a Rego query and print the result.|`coverage`: report coverage, `data`: set data file(s) or directory path(s), `explain`: enable query explainations, `fail`: exits with non-zero exit code on undefined result and errors, `format`: {json,values,bindings,pretty} set output format (default json), `help`: help for eval, `ignore`: set file and directory names to ignore during loading (e.g., '.*' excludes hidden files), `import`: set query import(s), `input`: set input file path, `metrics`: report query performance metrics, package`: set query package, partial`: perform partial evaluation, pretty-limit`: set limit after which pretty output gets truncated (default 80), profile`: perform expression profiling, profile-limit`: set number of profiling results to show (default 10), profile-sort`: set sort order of expression profiler results, stdin`: read query from stdin, stdin-input`: read input document from stdin, unknowns`: set paths to treat as unknown during partial evaluation (default [input])|`opa eval`|
|**`evalQueryBoolean`**|Evaluate a Rego query and print the result.|`coverage`: report coverage, `data`: set data file(s) or directory path(s), `explain`: enable query explainations, `fail`: exits with non-zero exit code on undefined result and errors, `format`: {json,values,bindings,pretty} set output format (default json), `help`: help for eval, `ignore`: set file and directory names to ignore during loading (e.g., '.*' excludes hidden files), `import`: set query import(s), `input`: set input file path, `metrics`: report query performance metrics, package`: set query package, partial`: perform partial evaluation, pretty-limit`: set limit after which pretty output gets truncated (default 80), profile`: perform expression profiling, profile-limit`: set number of profiling results to show (default 10), profile-sort`: set sort order of expression profiler results, stdin`: read query from stdin, stdin-input`: read input document from stdin, unknowns`: set paths to treat as unknown during partial evaluation (default [input])|`opa eval "data.[package].allow"`|
|**`fmt`**|Format Rego source files.|`diff`: only display a diff of the changes, `help`: help for fmt, `list`: list all files who would change when formatted, `write`: overwrite the original source file|`opa fmt`|
|**`help`**|Help provides help for any command in the application.|`help`: help for help|`opa help`|
|**`parse`**|Parse Rego source file and print AST.|`format`: {pretty,json} set output format (default pretty), `help`: help for parse|`opa parse`|
|**`testRego`**|Execute Rego test cases.|`coverage`: report coverage (overrides debug tracing), `format`: {pretty,json} set output format (default pretty), `help`: help for test, `ignore`: set file and directory names to ignore during loading (e.g., '.*' excludes hidden files), `max-errors`: set the number of errors to allow before compilation fails early (default 10), `show-failure-line`: show test failure line, `threshold`: set coverage threshold and exit with non-zero status if coverage is less than threshold %, `timeout`: set test timeout (default 5s), `verbose`: set verbose reporting mode|`opa test`|
|**`version`**|Show version and build information for OPA.|`help`: help for version|`opa version`|

## [Changelog](https://github.com/fnzc/node-open-policy-agent/blob/master/CHANGELOG.md)

## Contributing

Pull requests are welcome.

## [License](https://github.com/fnzc/node-open-policy-agent/blob/master/LICENSE)