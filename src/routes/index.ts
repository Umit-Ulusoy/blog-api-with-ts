import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const routesPath = __dirname;

fs.readdirSync(routesPath).forEach((file) => {
  const isRouteFile = file.endsWith('Route.ts') || file.endsWith('Route.js');
  const isSelf = file === __filename;

  if (!isRouteFile || isSelf) return;

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
});

export default router;
