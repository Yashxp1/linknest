import { nanoid } from 'nanoid';

export function generateSlug(name: string): string {
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 50);

  return `${baseSlug}-${nanoid()}`;
}
