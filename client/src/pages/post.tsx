import { Layout } from "@/components/layout";
import { usePost, useSubscribeNewsletter } from "@/hooks/use-posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, ArrowLeft, Mail, Clock } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function PostPage({ params }: { params: { username: string; slug: string } }) {
  const { data: post, isLoading } = usePost(params.slug);
  const { toast } = useToast();
  const subscribeMutation = useSubscribeNewsletter();
  const [email, setEmail] = useState("");

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="text-center py-24">
          <h2 className="text-2xl font-bold">Post not found</h2>
          <Link href="/">
            <Button variant="link" className="mt-4">Back Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subscribeMutation.mutateAsync({ email });
      toast({ title: "Subscribed!", description: "Check your inbox for updates." });
      setEmail("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <Layout>
      <article className="pb-24">
        {/* Header Image */}
        <div className="h-[40vh] md:h-[50vh] w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10" />
          {/* Unsplash cover image */}
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          
          <div className="absolute bottom-0 left-0 w-full z-20 p-4 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
            <div className="container mx-auto max-w-3xl text-white">
              <Link href={`/profile/${post.authorUsername}`}>
                <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white mb-6 p-0 h-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Profile
                </Button>
              </Link>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <Badge key={tag} className="bg-primary/80 hover:bg-primary border-none text-white">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={post.authorAvatar} />
                  <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.authorName}</div>
                  <div className="text-sm opacity-80 flex items-center gap-2">
                    {post.publishedAt && format(new Date(post.publishedAt), 'MMM d, yyyy')}
                    <span>•</span>
                    <Clock className="w-3 h-3" /> {post.readTime} min read
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-3xl mt-12">
          <div className="prose prose-lg prose-indigo max-w-none">
            {/* Simple rendering of text with line breaks for demo. 
                In a real app, use a markdown renderer or rich text display. */}
            {post.content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4 text-foreground/80 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Gallery / Lightbox */}
          {post.galleryImages && post.galleryImages.length > 0 && (
            <div className="my-12">
              <h3 className="text-2xl font-bold font-display mb-6">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {post.galleryImages.map((img, i) => (
                  <Dialog key={i}>
                    <DialogTrigger asChild>
                      <div className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl border-none bg-transparent shadow-none p-0">
                      <img src={img} alt={`Gallery ${i}`} className="w-full h-auto rounded-lg shadow-2xl" />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 bg-secondary/50 rounded-3xl p-8 md:p-12 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-display mb-2">Subscribe to my newsletter</h3>
            <p className="text-muted-foreground mb-6">Get the latest posts delivered right to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" disabled={subscribeMutation.isPending}>
                {subscribeMutation.isPending ? "Joining..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </article>
    </Layout>
  );
}
