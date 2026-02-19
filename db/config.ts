import { defineDb, defineTable, column } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }), // Clerk User ID
    username: column.text({ unique: true }),
    displayName: column.text(),
    bio: column.text({ optional: true }),
    avatarUrl: column.text({ optional: true }),
    theme: column.text({ default: 'gradient' }),
    updatedAt: column.date({ default: new Date() }),
  }
});

const Link = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
    title: column.text(),
    url: column.text(),
    order: column.number(),
    isActive: column.boolean({ default: true }),
    thumbnailType: column.text({ default: 'favicon' }), // favicon, preview, custom
    thumbnailUrl: column.text({ optional: true }),
  }
});

export default defineDb({
  tables: { User, Link }
});
