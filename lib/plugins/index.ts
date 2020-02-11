import logger from './logger'
import rollbar from './rollbar'

const register = async server => {
    await server.register(logger)
    await server.register(rollbar)
}

export default register
