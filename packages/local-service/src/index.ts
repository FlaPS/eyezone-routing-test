import fastify from 'fastify'

const server = fastify()
server.post('/api/login', async (request, reply) => {
    const {login, password} = JSON.parse(request.body)
    console.log(request.body)
    if(login === 'Admin' && password == '12345')
        return {authorized: 'Ok'}

    throw new Error('Unauthorized')
})

server.listen(8084, (err, address) => {
    if(err) {
        console.error(err)
        //process.exit(0)
    }
    console.log(`Server listening at ${address}`)
})