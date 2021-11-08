const fs = require('fs')
const path = require('path')

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8')

stream.on('readable', function () {
  const data = stream.read()

  data !== null ? console.log(data.trim()) : console.log('')
})