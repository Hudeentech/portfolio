import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'w7mopn6h',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,           // public read — no token needed for published content
  perspective: 'published',
});

const builder = imageUrlBuilder(client);

/**
 * Safe urlFor — returns null if source is falsy, avoiding crashes
 * on empty Sanity fields.
 */
export const urlFor = (source) => {
  if (!source) return null;
  try {
    return builder.image(source);
  } catch {
    return null;
  }
};