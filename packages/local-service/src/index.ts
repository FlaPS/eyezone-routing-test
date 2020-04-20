import fastify from 'fastify'
import {EyezonLoginPayload, EyezonLoginResult} from 'local-iso/src/ducks/eyezonDuck'

const server = fastify()
server.post('/api/login', async (request, reply): Promise<EyezonLoginResult> => {

    const {login, password}: EyezonLoginPayload = JSON.parse(request.body)

    request.log.debug('Login request', request.body)

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