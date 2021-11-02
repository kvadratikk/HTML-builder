const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, 'text.txt')

const stream = fs.createReadStream(root, 'utf-8')

stream.on('readable', function () {
  const data = stream.read()

  if (data != null) console.log(data)
})