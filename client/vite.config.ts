import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    server: {
        host: "0.0.0.0"
    },
    define: {
        "apiURL": command === "serve" ? JSON.stringify('https://127.0.0.1:5000/api') : JSON.stringify('/api')
    },
    plugins: [react(), basicSsl()],
}))
