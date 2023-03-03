import 'reflect-metadata'
import dotenv from 'dotenv'
import App from './app'
import { PORT } from './conf'
import '@Components/Auth/Controller'
import '@Components/product/front/Controller'
import '@Components/product/admin/Controller'
import '@Components/category/front/Controller'
import '@Components/category/admin/Controller'

dotenv.config()
const port = Number(PORT)
const application = new App(port)
application.start()
