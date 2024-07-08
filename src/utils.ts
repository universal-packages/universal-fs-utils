import fs from 'fs'
import os from 'os'
import path from 'path'

export const IS_WINDOWS = process.platform === 'win32'
export const HOME_DIR = os.homedir()

export function checkDirectory(location: string): string {
  const finalLocation = expandPath(location)

  if (!fs.existsSync(finalLocation)) {
    throw new Error(`"${finalLocation}" does not exist`)
  } else if (!fs.lstatSync(finalLocation).isDirectory()) {
    throw new Error(`"${finalLocation}" is not a directory or can not be accessed`)
  }

  return finalLocation
}

export function quickCheckDirectory(location: string): string | false {
  const finalLocation = expandPath(location)

  if (!fs.existsSync(finalLocation) || !fs.lstatSync(finalLocation).isDirectory()) {
    return false
  }

  return finalLocation
}

export function checkFile(location: string): string {
  const finalLocation = expandPath(location)

  if (!fs.existsSync(finalLocation)) {
    throw new Error(`"${finalLocation}" does not exist`)
  } else if (fs.lstatSync(finalLocation).isDirectory()) {
    throw new Error(`"${finalLocation}" is not a file or can not be accessed`)
  }

  return finalLocation
}

export function quickCheckFile(location: string): string | false {
  const finalLocation = expandPath(location)

  if (!fs.existsSync(finalLocation) || fs.lstatSync(finalLocation).isDirectory()) {
    return false
  }

  return finalLocation
}

export function ensureDirectory(location: string): string {
  const finalLocation = expandPath(location)

  if (!fs.existsSync(finalLocation)) {
    try {
      fs.mkdirSync(finalLocation, { recursive: true })
    } catch {
      throw new Error(`Directory "${finalLocation}" is an invalid path or greater permissions are reacquired`)
    }
  }

  return finalLocation
}

export function ensureFile(location: string): string {
  const finalLocation = expandPath(location)

  try {
    fs.closeSync(fs.openSync(finalLocation, 'a'))
  } catch {
    throw new Error(`File location "${finalLocation}" is an invalid path or greater permissions are reacquired`)
  }

  return finalLocation
}

export function expandPath(location: string): string {
  const expanded = location && !IS_WINDOWS && HOME_DIR ? location.replace(/^~(?=$|\/|\\)/, HOME_DIR) : location

  return expanded ? path.resolve(expanded) : expanded
}
