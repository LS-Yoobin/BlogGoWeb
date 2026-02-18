import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type Post, type InsertSubscriber } from "@shared/schema"; // Ideally this would import from @shared/routes but reusing types from schema for simplicity based on prompt structure

// Note: In a real app, we would import api definitions from @shared/routes. 
// For this generation, we will fetch directly from the known endpoints defined in the requirement.

export function usePosts() {
  return useQuery({
    queryKey: ['/api/posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      return await res.json() as Post[];
    },
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['/api/posts', slug],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${slug}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error('Failed to fetch post');
      }
      return await res.json() as Post;
    },
    enabled: !!slug,
  });
}

export function useAuthorPosts(username: string) {
  return useQuery({
    queryKey: ['/api/authors', username, 'posts'],
    queryFn: async () => {
      const res = await fetch(`/api/authors/${username}/posts`);
      if (!res.ok) throw new Error('Failed to fetch author posts');
      return await res.json() as Post[];
    },
    enabled: !!username,
  });
}

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: async (data: InsertSubscriber) => {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to subscribe');
      }
      return await res.json();
    },
  });
}
