const fs = require('fs')
const path = require('path')

const filesFolder = path.join(__dirname, 'files')
const copyFolder = path.join(__dirname, 'files-copy')

fs.access(copyFolder, err => {
  if (err) {
    fs.mkdir(copyFolder, { recursive: true }, () => {
      copyFiles(filesFolder, copyFolder)
    })
  } else {
    fs.rm(copyFolder, { recursive: true }, () => {
      fs.mkdir(copyFolder, { recursive: true }, () => {
        copyFiles(filesFolder, copyFolder)
      })
    })
  }
})

function copyFiles(src, copy) {
  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err)

    files.forEach(file => {
      fs.copyFile(path.join(src, file.name), path.join(copy, file.name), () => {

      })
    })
  })
}