import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    watch: {
      // קבצי מקור/תמונות שנשמרים בשורש הפרויקט אינם חלק מהאתר
      ignored: [
        `${root}source-materials/**`,
        `${root}*.{jpg,jpeg,png,gif,webp,bmp,pdf,docx,doc,pptx,zip}`,
      ],
      // בווינדוס קובץ שעדיין נכתב (העתקה/סנכרון) נעול, ו-fs.watch מפיל את השרת ב-EBUSY.
      // polling אינו פותח ידיות על הקובץ, ו-awaitWriteFinish ממתין לסיום הכתיבה.
      usePolling: true,
      interval: 300,
      binaryInterval: 1000,
      awaitWriteFinish: {
        stabilityThreshold: 400,
        pollInterval: 100,
      },
    },
  },
})
