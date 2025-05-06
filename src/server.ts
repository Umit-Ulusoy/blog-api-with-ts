import { env } from '@config/env';
import app from './app';

const PORT = env.APP_PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
