import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "192.168.10.201",
    port: "3000"
  }
      // host: "159.65.14.5",
    // port: "3001"
})
