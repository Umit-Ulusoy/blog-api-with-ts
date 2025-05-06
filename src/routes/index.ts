import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const routesPath = __dirname;
const files = fs.readdirSync(routesPath);

for (const file of files) {
  const isRouteFile = file.endsWith('Route.ts');
  const isSelf = __filename.endsWith(file);

  if (!isRouteFile || isSelf) continue;

  const fullPath = path.join(routesPath, file);

  try {
    const routeModule = require(fullPath);
    const route = routeModule.default;

    if (route?.path && route?.router) {
      router.use(route.path, route.router);
      console.log(`✅ Route loaded: ${file} => ${route.path}`);
    } else {
      console.warn(`⚠️  Skipped: ${file} - Missing "path" or "router" export.`);
    }
  } catch (err: any) {
    console.error(`❌ Error loading ${file}: ${err.message}`);
  }
}

export default router;
