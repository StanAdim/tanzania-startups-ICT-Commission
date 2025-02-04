module.exports = {
    apps: [
        {
            name: '',
            port: '1954',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
