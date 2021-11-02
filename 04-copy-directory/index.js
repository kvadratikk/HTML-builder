const fs = require('fs')
const path = require('path')
const { readdir, mkdir, rm } = require('fs/promises')

const filesFolder = path.join(__dirname, 'files')
const copyFolder = path.join(__dirname, 'files-copy')

async function init() {
  await dir()
  await copyFiles()
}

async function dir() {
  await rm(copyFolder, { recursive: true, force: true })
  await mkdir(copyFolder, { recursive: true })
}

async function copyFiles() {
  const files = await readdir(filesFolder, { withFileTypes: true })

  files.forEach(file => {
    fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), (err) => { if (err) console.log(err) })
  })
}

init()