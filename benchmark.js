const { execSync } = require('node:child_process')

console.log('Sleeping for 10s to let the services perform the startup...')
execSync('sleep 10')

require('./benchmark-kafka')
require('./benchmark-redpanda')