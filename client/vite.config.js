import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
	server: {
    host: '0.0.0.0', // Allow access from outside
    port: 5173 // Ensure this is the correct port
  }
})


