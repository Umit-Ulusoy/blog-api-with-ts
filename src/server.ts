import { env } from '@config/env';
import app from './app';
import { connectDatabase } from './database/connection';

const PORT = env.APP_PORT;

const startServer = async () => {

  await connectDatabase();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
}

startServer();