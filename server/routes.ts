import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.posts.list.path, async (_req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get(api.posts.getBySlug.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  app.get(api.posts.getByUsername.path, async (req, res) => {
    const posts = await storage.getPostsByUsername(req.params.username);
    res.json(posts);
  });

  app.post(api.newsletter.subscribe.path, async (req, res) => {
    try {
      const subscriber = api.newsletter.subscribe.input.parse(req.body);
      await storage.addSubscriber(subscriber);
      res.json({ message: "Subscribed successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid email or already subscribed" });
    }
  });

  // Initialize seed data
  await seedDatabase();

  return httpServer;
}

// Seed function to populate the database with the mock blog dataset
export async function seedDatabase() {
  const existingPosts = await storage.getPosts();
  if (existingPosts.length === 0) {
    const mockPosts = [
      {
        slug: "future-of-web-development",
        title: "The Future of Web Development",
        excerpt: "Exploring how AI and WASM are reshaping the browser landscape.",
        content: `
          <h2>The Browser as an OS</h2>
          <p>WebAssembly (WASM) is finally fulfilling the promise of high-performance computing in the browser. Combined with WebGPU, we are seeing desktop-class applications running entirely on the web.</p>
          <h2>AI-Assisted Coding</h2>
          <p>It's no longer just about writing code; it's about curating it. AI tools are becoming the new pair programmers, allowing developers to focus on architecture and user experience.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        authorName: "Sarah Jenkins",
        authorUsername: "sarahj",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        readTime: 5,
        tags: ["Tech", "WebAssembly", "AI"],
        galleryImages: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
        ]
      },
      {
        slug: "mastering-minimalism",
        title: "Mastering Minimalism in Design",
        excerpt: "Why less is more, and how to achieve balance in your UI.",
        content: `
          <h2>White Space is Not Empty Space</h2>
          <p>Effective use of white space guides the user's eye and creates a sense of luxury and calm. It is an active design element, not a passive background.</p>
          <h2>Typography Hierarchies</h2>
          <p>By limiting font families and relying on weight and size, you create a cleaner, more scannable interface.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=1200&q=80",
        authorName: "David Chen",
        authorUsername: "davidc",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        readTime: 4,
        tags: ["Design", "Minimalism", "UI/UX"],
        galleryImages: [
          "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=800&q=80"
        ]
      },
      {
        slug: "remote-work-culture",
        title: "Building a Remote Work Culture",
        excerpt: "Strategies for keeping distributed teams connected and productive.",
        content: `
          <h2>Async First</h2>
          <p>The key to remote work is asynchronous communication. Writing documentation and updates allows team members to work in their own time zones without blockers.</p>
          <h2>Intentional Socializing</h2>
          <p>Without the water cooler, you need to create spaces for casual interaction. Virtual coffee chats and gaming sessions can bridge the gap.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&w=1200&q=80",
        authorName: "Elena Rodriguez",
        authorUsername: "elenar",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
        readTime: 6,
        tags: ["Remote Work", "Culture", "Management"],
        galleryImages: []
      },
      {
        slug: "sustainable-tech",
        title: "Sustainable Tech: Green Coding",
        excerpt: "Reducing the carbon footprint of your digital products.",
        content: `
          <h2>Optimizing Assets</h2>
          <p>Large images and videos are the primary drivers of web carbon emissions. Compressing assets and lazy loading can significantly reduce impact.</p>
          <h2>Efficient Algorithms</h2>
          <p>Code efficiency isn't just about speed; it's about energy consumption. Better Big-O notation means less CPU cycles and less battery drain.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
        authorName: "Sarah Jenkins",
        authorUsername: "sarahj",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        readTime: 3,
        tags: ["Sustainability", "Green Tech", "Coding"],
        galleryImages: []
      },
      {
        slug: "coffee-brewing-guide",
        title: "The Ultimate Guide to Home Brewing",
        excerpt: "From French Press to V60: Elevate your morning routine.",
        content: `
          <h2>The Grind Matters</h2>
          <p>A consistent burr grinder is the most important investment you can make. It ensures even extraction and balanced flavor.</p>
          <h2>Water Quality</h2>
          <p>Coffee is 98% water. Using filtered water with the right mineral content can transform a bitter cup into a sweet, tea-like experience.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80",
        authorName: "Markus Spiske",
        authorUsername: "markuss",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        readTime: 8,
        tags: ["Lifestyle", "Coffee", "Hobbies"],
        galleryImages: [
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
        ]
      }
    ];

    for (const post of mockPosts) {
      await storage.createPost(post);
    }
  }
}
