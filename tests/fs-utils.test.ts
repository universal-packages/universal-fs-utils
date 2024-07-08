import { checkDirectory, checkFile, ensureDirectory, ensureFile, expandPath, quickCheckDirectory, quickCheckFile } from '../src'

beforeAll((): void => {
  ensureDirectory('./tmp')
})

describe('ts-utils', (): void => {
  describe(checkDirectory, (): void => {
    it('expands a path, checks for is existence, checks for it to be a directory and returns the final path', async (): Promise<void> => {
      const finalPath = checkDirectory('./src')

      expect(finalPath).toMatch(/^\/.*\/src$/)
    })

    it('throws if the location does not exists', async (): Promise<void> => {
      expect((): any => checkDirectory('./fake')).toThrow(/.* does not exist/)
    })

    it('throws if the location does exists but is not a directory', async (): Promise<void> => {
      expect((): any => checkDirectory('./README.md')).toThrow(/.* is not a directory or can not be accessed/)
    })
  })

  describe(quickCheckDirectory, (): void => {
    it('expands a path, checks for is existence, checks for it to be a directory and returns the final path', async (): Promise<void> => {
      const finalPath = quickCheckDirectory('./src')

      expect(finalPath).toMatch(/^\/.*\/src$/)
    })

    it('returns false if the location does not exists', async (): Promise<void> => {
      expect(quickCheckDirectory('./fake')).toBeFalsy()
    })

    it('return false if the location does exists but is not a directory', async (): Promise<void> => {
      expect(quickCheckDirectory('./README.md')).toBeFalsy()
    })
  })

  describe(checkFile, (): void => {
    it('expands a path, checks for is existence, checks for it to be a file and returns the final path', async (): Promise<void> => {
      const finalPath = checkFile('./README.md')

      expect(finalPath).toMatch(/^\/.*\/README.md$/)
    })

    it('throws if the location does not exists', async (): Promise<void> => {
      expect((): any => checkFile('./fake.md')).toThrow(/.* does not exist/)
    })

    it('throws if the location does exists but is a directory', async (): Promise<void> => {
      expect((): any => checkFile('./src')).toThrow(/.* is not a file or can not be accessed/)
    })
  })

  describe(quickCheckFile, (): void => {
    it('expands a path, checks for is existence, checks for it to be a file and returns the final path', async (): Promise<void> => {
      const finalPath = quickCheckFile('./README.md')

      expect(finalPath).toMatch(/^\/.*\/README.md$/)
    })

    it('return false if the location does not exists', async (): Promise<void> => {
      expect(quickCheckFile('./fake.md')).toBeFalsy()
    })

    it('throws if the location does exists but is a directory', async (): Promise<void> => {
      expect(quickCheckFile('./src')).toBeFalsy()
    })
  })

  describe(ensureDirectory, (): void => {
    it('creates a directory if it does not exists and returns the expanded path', async (): Promise<void> => {
      const finalPath = ensureDirectory('./tmp/deep/directory')

      expect(finalPath).toMatch(/^\/.*\/tmp\/deep\/directory$/)
      expect(finalPath).toMatch(checkDirectory('./tmp/deep/directory') as string)
      expect(ensureDirectory('./tmp/deep/directory')).toMatch(checkDirectory('./tmp/deep/directory') as string)
    })

    it('throws if the path is not valid because of various reasons', async (): Promise<void> => {
      expect((): any => ensureDirectory('/new')).toThrow(/.* is an invalid path or greater permissions are reacquired/)
    })
  })

  describe(ensureFile, (): void => {
    it('creates an empty file if it does not exists and returns the expanded path', async (): Promise<void> => {
      const finalPath = ensureFile('./tmp/deep/directory/file.pdf')

      expect(finalPath).toMatch(/^\/.*\/tmp\/deep\/directory\/file.pdf$/)
      expect(finalPath).toMatch(checkFile('./tmp/deep/directory/file.pdf') as string)
      expect(ensureFile('./tmp/deep/directory/file.pdf')).toMatch(checkFile('./tmp/deep/directory/file.pdf') as string)
    })

    it('throws if the path is not valid because of various reasons', async (): Promise<void> => {
      expect((): any => ensureFile('/new.pdf')).toThrow(/.* is an invalid path or greater permissions are reacquired/)
    })
  })

  describe(expandPath, (): void => {
    it('tries to expand a path by resolving the tilde and resolving to an absolute path', async (): Promise<void> => {
      expect(expandPath('~')).not.toMatch('~')
      expect(expandPath(undefined)).toEqual(undefined)
    })
  })
})
