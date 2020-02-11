import * as Path from 'path'
import * as dotenv from 'dotenv-safe'

process.on('unhandledRejection', err => {
    console.error(err)
    process.exit(1)
})

dotenv.config({
    path: Path.resolve(__dirname, '../../dotenv'),
    example: Path.resolve(__dirname, '../../dotenv.example'),
})
