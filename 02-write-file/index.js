const fs = require('fs')
const path = require('path')
const readline = require("readline")

const rootPath = path.join(__dirname, 'text.txt')
const writeStream = fs.createWriteStream(rootPath)

const rl = readline.createInterface({
  input: process.stdin,
  output: writeStream
})

writeStream.on('open', () => {
  console.log('write something ')
})

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    close()
  }

  fs.appendFile(rootPath, input + '\n', err => { if (err) console.log(err) })
})

process.on("SIGINT", () => {
  close()
})

function close() {
  console.log("ok, bye")
  process.exit(0)
}