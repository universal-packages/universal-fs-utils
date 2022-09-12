# fs Utils

[![npm version](https://badge.fury.io/js/@universal-packages%2Ffs-utils.svg)](https://www.npmjs.com/package/@universal-packages/fs-utils)
[![Testing](https://github.com/universal-packages/universal-fs-utils/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-fs-utils/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-fs-utils/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-fs-utils)

Extended functionality for fs, when you need to know something in disk exists or want to ensure it exists.

## Install

```shell
npm install @universal-packages/fs-utils
```

## checkDirectory()

Checks if a string is a valid path to a directory and expands it.

```js
import { checkDirectory } from '@universal-packages/fs-utils'

const finalPath = checkDirectory('./src')

console.log(finalPath)

// > /Users/david/project/src
```

Any other case is thrown as an error.

```js
import { checkDirectory } from '@universal-packages/fs-utils'

try {
  const finalPath = checkDirectory('./src/fake')
} catch (error) {
  console.log(error)
}

// > Error "/Users/david/project/src/fake" does not exists
// > Error "/Users/david/project/src/fake" is not a directory or can not be accessed
```

## checkFile()

Checks if a string is a valid path to a file and expands it.

```js
import { checkFile } from '@universal-packages/fs-utils'

const finalPath = checkFile('./src/README.md')

console.log(finalPath)

// > /Users/david/project/src/README.md
```

Any other case is thrown as an error.

```js
import { checkFile } from '@universal-packages/fs-utils'

try {
  const finalPath = checkFile('./src/NOT.md')
} catch (error) {
  console.log(error)
}

// > Error "/Users/david/project/src/NOT.md" does not exists
// > Error "/Users/david/project/src/NOT.md" is not a file or can not be accessed
```

## ensureDirectory()

Checks and expand a path and tries to create the directory if the check fails.

```js
import { ensureDirectory } from '@universal-packages/fs-utils'

const finalPath = ensureDirectory('./src/tmp')

console.log(finalPath)

// > /Users/david/project/src/tmp
```

Any other case is thrown as an error.

```js
import { ensureDirectory } from '@universal-packages/fs-utils'

try {
  const finalPath = ensureDirectory('/new')
} catch (error) {
  console.log(error)
}

// > Error Directory "/new" is an invalid path or greater permisons are reaquired
```

## ensureFile()

Checks and expand a path and tries to create an empty file if the check fails

```js
import { ensureFile } from '@universal-packages/fs-utils'

const finalPath = ensureFile('./src/tmp/development.log')

console.log(finalPath)

// > /Users/david/project/src/tmp/development.log
```

Any other case is thrown as an error.

```js
import { ensureFile } from '@universal-packages/fs-utils'

try {
  const finalPath = ensureFile('/file.rb')
} catch (error) {
  console.log(error)
}

// > Error File location "/file.rb" is an invalid path or greater permisons are reaquired
```

## expandPath()

Tries to expand a path by resolving the tilde and resolving to an absolute path.

```js
import { expandPath } from '@universal-packages/fs-utils'

console.log(expandPath('./src/tmp'))
console.log(expandPath('~/directory'))

// > /Users/david/directory
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
