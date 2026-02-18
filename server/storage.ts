import { db } from "./db";
import { posts, newsletterSubscribers, type Post, type InsertPost, type Subscriber, type InsertSubscriber } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getPosts(): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getPostsByUsername(username: string): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class DatabaseStorage implements IStorage {
  async getPosts(): Promise<Post[]> {
    return await db.select().from(posts);
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async getPostsByUsername(username: string): Promise<Post[]> {
    return await db.select().from(posts).where(eq(posts.authorUsername, username));
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts).values(insertPost).returning();
    return post;
  }

  async addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [sub] = await db.insert(newsletterSubscribers).values(subscriber).returning();
    return sub;
  }
}

export const storage = new DatabaseStorage();
