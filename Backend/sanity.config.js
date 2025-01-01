import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'

export default defineConfig({
  name: 'default',
  title: 'portfolio-01',

  projectId: 'w7mopn6h',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), vercelDeployTool()],

  schema: {
    types: schemaTypes,
  },
})
