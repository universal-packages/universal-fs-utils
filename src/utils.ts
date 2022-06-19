import fs from 'fs'
import os from 'os'
import path from 'path'

export const IS_WINDOWS = process.platform === 'win32'
export const HOME_DIR = os.homedir()

/** Checks if a string is a valid path to a directory and expands it */
export function checkDirectory(location: string): string {
  const finalLocation = expandPath(location)

  if (!fs.existsSync(finalLocation)) {
    throw new Error(`"${finalLocation}" does not exist`)
  } else if (!fs.lstatSync(finalLocation).isDirectory()) {
    throw new Error(`"${finalLocation}" is not a directory or can not be accessed`)
  }

  return finalLocation
}

/** Checks if a string is a valid path to a file and expands it */
export function checkFile(location: string): string {
  const finalLocation = expandPath(location)

  if (!fs.existsSync(finalLocation)) {
    throw new Error(`"${finalLocation}" does not exist`)
  } else if (fs.lstatSync(finalLocation).isDirectory()) {
    throw new Error(`"${finalLocation}" is not a file or can not be accessed`)
  }

  return finalLocation
}

/** Checks and expand a path and tries to create the directory if the check fails */
export function ensureDirectory(location: string): string {
  const finalLocation = expandPath(location)

  if (!fs.existsSync(finalLocation)) {
    try {
      fs.mkdirSync(finalLocation, { recursive: true })
    } catch {
      throw new Error(`Directory "${finalLocation}" is an invalid path or greater permisons are reaquired`)
    }
  }

  return finalLocation
}

/** Checks and expand a path and tries to create an empty file if the check fails */
export function ensureFile(location: string): string {
  const finalLocation = expandPath(location)

  try {
    fs.closeSync(fs.openSync(finalLocation, 'a'))
  } catch {
    throw new Error(`File location "${finalLocation}" is an invalid path or greater permisons are reaquired`)
  }

  return finalLocation
}

/** Tries to expand a path by resolving the tilde and resolving to an absolute path */
export function expandPath(location: string): string {
  const expanded = !IS_WINDOWS && HOME_DIR ? location.replace(/^~(?=$|\/|\\)/, HOME_DIR) : location

  return path.resolve(expanded)
}
