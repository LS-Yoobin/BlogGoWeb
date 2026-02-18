import { Layout } from "@/components/layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-4xl font-bold font-display mb-8">Privacy Policy</h1>
        <div className="prose prose-lg">
          <p className="text-muted-foreground text-lg mb-8">
            We value your privacy. This policy explains how we handle your data.
          </p>
          <h3>Data Collection</h3>
          <p>
            We collect information you provide directly to us, such as when you create an account, update your profile, or publish content.
          </p>
          <h3>Use of Information</h3>
          <p>
            We use the information we collect to operate and improve our services, send you technical notices, and respond to your comments.
          </p>
          <h3>Data Protection</h3>
          <p>
            We implement appropriate technical measures to protect your personal information against unauthorized access or disclosure.
          </p>
        </div>
      </div>
    </Layout>
  );
}
