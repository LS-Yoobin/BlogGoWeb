import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  coverImage: text("cover_image").notNull(),
  authorName: text("author_name").notNull(),
  authorUsername: text("author_username").notNull(),
  authorAvatar: text("author_avatar").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  readTime: integer("read_time").notNull(), // in minutes
  tags: text("tags").array().notNull(),
  galleryImages: text("gallery_images").array(), // For the lightbox feature
});

export const insertPostSchema = createInsertSchema(posts).omit({ id: true });

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

export const insertSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({ id: true, subscribedAt: true });
export type Subscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;

// Mock Data Type Definition (for the JSON dataset)
export interface MockBlogData {
  posts: Post[];
}
