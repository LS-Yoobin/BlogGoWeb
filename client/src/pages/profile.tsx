import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthorPosts } from "@/hooks/use-posts";
import { useLocation, Link } from "wouter";
import { Loader2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile({ params }: { params: { username: string } }) {
  const { data: posts, isLoading } = useAuthorPosts(params.username);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Fallback if no posts/user found (or error)
  if (!posts) {
    return (
      <Layout>
        <div className="text-center py-24">
          <h2 className="text-2xl font-bold">User not found</h2>
        </div>
      </Layout>
    );
  }

  // Derived user info from the first post for demo purposes
  // In a real app, we'd have a separate useUser(username) hook
  const user = posts.length > 0 ? {
    name: posts[0].authorName,
    username: posts[0].authorUsername,
    avatar: posts[0].authorAvatar,
    bio: "Passionate writer and tech enthusiast. Sharing my journey through code and design."
  } : {
    name: "Demo User",
    username: params.username,
    avatar: "",
    bio: "New to BlogGo"
  };

  return (
    <Layout>
      {/* Profile Header */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container mx-auto px-4 py-16 text-center">
          <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-white shadow-xl">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold font-display mb-2">{user.name}</h1>
          <p className="text-muted-foreground text-lg mb-6">@{user.username}</p>
          <p className="max-w-xl mx-auto text-foreground/80 leading-relaxed mb-8">
            {user.bio}
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="default">Follow</Button>
            <Button variant="outline">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-bold font-display mb-8">Latest Posts</h2>
        <div className="space-y-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/profile/${post.authorUsername}/blog/${post.slug}`}>
              <Card className="group cursor-pointer hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-0 sm:flex">
                  <div className="sm:w-1/3 aspect-video sm:aspect-auto">
                    {/* Unsplash blog cover */}
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-r-none"
                    />
                  </div>
                  <div className="p-6 sm:w-2/3 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      {post.publishedAt ? format(new Date(post.publishedAt), 'MMM d, yyyy') : 'Draft'}
                      <span>•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-12 bg-secondary/20 rounded-2xl border border-dashed border-border">
              <p className="text-muted-foreground">No posts published yet.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
