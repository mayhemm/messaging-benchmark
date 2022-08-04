console.log('Sleeping for 10s to let the services perform the startup...')
require('node:child_process').execSync('sleep 10')

require('./benchmark-kafka')
require('./benchmark-redpanda')
require('./benchmark-rabbitmq')