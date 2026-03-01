import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { writeFileSync } from 'fs'
import { SIDEBAR_ITEMS } from './src/data/pages'

function sitemapPlugin() {
  return {
    name: 'sitemap',
    closeBundle() {
      const base = 'https://sport.tanaakk.com'
      const urls = SIDEBAR_ITEMS.map((i) => (i.id === 'market_ranking' ? base + '/' : base + '/' + i.id))
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === base + '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`
      writeFileSync(path.resolve(__dirname, 'dist/sitemap.xml'), xml)
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), sitemapPlugin()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
