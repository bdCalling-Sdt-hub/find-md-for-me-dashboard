import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  host: "159.65.14.5",
  port: "3001"
  }
  // host: "159.65.14.5",

})
