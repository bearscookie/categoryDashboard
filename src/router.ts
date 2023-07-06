import { createRouter } from './lib/Router'
import { routes } from './routes'

export const router = createRouter('browser')
router.routes = routes
router.appendPathList(...routes.map(r => r.path as string))
