/**
 * Script to check if the Astro dev server is already running
 * Returns exit code 0 if server is running (success)
 * Returns exit code 1 if server is not running (command will proceed to start a server)
 * 
 * Usage: 
 * - As standalone: node check-server.js [port]
 * - In package.json: "dev": "node check-server.js || astro dev"
 */
import http from 'http';

// Get the port from command line args, env var, or use default
const PORT = process.argv[2] || process.env.PORT || 6543;
const HOST = 'localhost';

console.log(`Checking if server is already running on ${HOST}:${PORT}...`);

// Create an HTTP request to check if the server is running
const req = http.request(
  {
    method: 'HEAD', // Just request headers, not the full page
    host: HOST,
    port: PORT,
    path: '/',
    timeout: 3000, // Timeout after 3 seconds
  },
  (res) => {
    console.log(`✅ Server is already running on port ${PORT} (status code: ${res.statusCode})`);
    console.log(`🌐 You can access it at: http://${HOST}:${PORT}/`);
    process.exit(0); // Exit with success code (server IS running)
  }
);

// Handle errors (likely means server is not running)
req.on('error', (error) => {
  console.log(`❌ Server is not running on port ${PORT}: ${error.message}`);
  process.exit(1); // Exit with error code (server IS NOT running)
});

// Handle request timeout
req.on('timeout', () => {
  console.log(`⏱️ Timed out checking if server is running on port ${PORT}`);
  req.destroy(); // Destroy the request
  process.exit(1); // Exit with error code (assume server is not running)
});

// End the request
req.end();
