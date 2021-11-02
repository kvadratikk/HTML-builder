const fs = require('fs')
const path = require('path')
const readline = require("readline")

const root = path.join(__dirname, 'text.txt')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("write something ", function (input) {
  write(input)

  rl.on('line', function (input) {
    write(input)
  })
})

rl.on("close", function () {
  close()
})

function write(input) {
  if (input == 'exit') close()

  rl.resume()

  fs.appendFile(root, input + ' ', function (error) {
    if (error) throw error
  })
}

function close() {
  console.log("ok, bye")
  process.exit(0)
}