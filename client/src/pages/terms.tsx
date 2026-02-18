import { Layout } from "@/components/layout";

export default function Terms() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-4xl font-bold font-display mb-8">Terms of Service</h1>
        <div className="prose prose-lg">
          <p className="text-muted-foreground text-lg mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p>
            Welcome to BlogGo. By accessing or using our website, you agree to be bound by these terms.
          </p>
          <h3>1. Content Ownership</h3>
          <p>
            You retain all rights to the content you post on BlogGo. By posting, you grant us a license to display it on the platform.
          </p>
          <h3>2. Acceptable Use</h3>
          <p>
            You agree not to post content that is illegal, harmful, or violates the rights of others. We reserve the right to remove any content.
          </p>
          <h3>3. Termination</h3>
          <p>
            We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason.
          </p>
        </div>
      </div>
    </Layout>
  );
}
