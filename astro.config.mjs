import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import clerk from '@clerk/astro'

import db from '@astrojs/db';

export default defineConfig({
  integrations: [clerk(), db()],
  adapter: node({ mode: 'standalone' }),
  output: 'server',
  site: 'https://c-link.app', // Change this to your actual domain
})