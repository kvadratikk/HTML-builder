const fs = require('fs')
const path = require('path')

const pathDist = path.join(__dirname, 'project-dist')
const pathAssets = path.join(__dirname, 'assets')
const pathAssetsDist = path.join(pathDist, 'assets')

const template = path.join(__dirname, 'template.html')
const components = path.join(__dirname, 'components')

const styles = path.join(__dirname, 'styles')
const stylesMerged = path.join(pathDist, 'style.css')

fs.mkdir(pathDist, { recursive: true }, err => {
  if (err) {
    console.log(err)
  }

  copyFolder(pathAssets, pathAssetsDist)
  copyHtml(template, components)
  createCss(styles, stylesMerged)
})

function copyHtml(template, components) {
  fs.readFile(template, 'utf8', (err, template) => {
    if (err) console.log(err)

    let html = template + ''

    fs.readdir(components, (err, files) => {
      if (err) console.log(err)

      files.forEach(file => {
        if (path.extname(file) == '.html') {
          const tag = new RegExp(`{{${file.split('.')[0]}}}`)

          const readStream = fs.createReadStream(path.join(components, file), 'utf-8')
          readStream.on('data', (chunk) => {
            html = html.replace(tag, chunk)

            const writeStream = fs.createWriteStream(path.join(pathDist, 'index.html'))
            writeStream.write(html)
          })
        }
      })
    })
  })
}

function createCss(src, bundle) {
  fs.unlink(bundle, () => {
    copyStyles(src, bundle)
  })
}

function copyStyles(src, bundle) {
  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    const writeStream = fs.createWriteStream(bundle)

    files.forEach(file => {
      if (file.isFile() && path.parse(file.name).ext == '.css') {
        const styleStream = fs.createReadStream(path.join(src, file.name), 'utf-8')

        styleStream.on('data', (chunk) => {
          writeStream.write(chunk)
        })
      }
    })
  })
}

function copyFiles(src, copy) {
  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err)

    files.forEach(file => {
      if (file.isFile()) {
        fs.copyFile(path.join(src, file.name), path.join(copy, file.name), () => {
        })
      } else {
        fs.mkdir(path.join(copy, file.name), { recursive: true }, () => {
          copyFiles(path.join(src, file.name), path.join(copy, file.name))
        })
      }
    })
  })
}

function copyFolder(src, copy) {
  fs.access(copy, err => {
    if (err) {
      fs.mkdir(copy, { recursive: true }, () => {
        copyFiles(src, copy)
      })
    } else {
      fs.rm(copy, { recursive: true }, () => {
        fs.mkdir(copy, { recursive: true }, () => {
          copyFiles(src, copy)
        })
      })
    }
  })
}