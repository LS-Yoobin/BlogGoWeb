import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Save, Image as ImageIcon, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Editor() {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();
  
  // Local state for the editor
  const [title, setTitle] = useState("Untitled Post");
  const [content, setContent] = useState("");

  // Mock auto-save effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        handleSave();
      }
    }, 5000); // Auto-save every 5s if changed

    return () => clearTimeout(timer);
  }, [title, content]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const handlePublish = () => {
    toast({
      title: "Published!",
      description: "Your post is now live (in demo mode).",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Editor Navbar */}
      <nav className="border-b border-border bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="text-sm text-muted-foreground">
              {isSaving ? (
                <span className="flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin" /> Saving...</span>
              ) : lastSaved ? (
                <span>Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              ) : (
                <span>Unsaved changes</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button variant="premium" onClick={handlePublish}>
              Publish
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        {/* Cover Image Placeholder */}
        <div className="mb-8 group relative aspect-video bg-secondary/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
          <div className="text-center text-muted-foreground group-hover:text-primary transition-colors">
            <ImageIcon className="w-8 h-8 mx-auto mb-2" />
            <span className="font-medium">Add Cover Image</span>
          </div>
        </div>

        <Input 
          className="text-4xl md:text-5xl font-bold font-display border-none px-0 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50 h-auto py-4"
          placeholder="Post Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <textarea
          className="w-full min-h-[500px] mt-4 resize-none border-none outline-none text-lg text-foreground/90 leading-relaxed font-sans bg-transparent placeholder:text-muted-foreground/50"
          placeholder="Tell your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus
        />
      </main>
    </div>
  );
}
