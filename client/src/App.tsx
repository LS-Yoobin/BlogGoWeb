import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Page Imports
import Home from "@/pages/home";
import Features from "@/pages/features";
import Pricing from "@/pages/pricing";
import Support from "@/pages/support";
import Profile from "@/pages/profile";
import PostPage from "@/pages/post";
import Editor from "@/pages/editor";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/features" component={Features} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/support" component={Support} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/profile/:username" component={Profile} />
      <Route path="/profile/:username/blog/:slug" component={PostPage} />
      <Route path="/editor/:slug" component={Editor} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
