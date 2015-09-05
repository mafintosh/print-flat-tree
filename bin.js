#!/usr/bin/env node

var print = require('./')

console.log('\n' + print(process.argv.slice(2).map(Number)))
