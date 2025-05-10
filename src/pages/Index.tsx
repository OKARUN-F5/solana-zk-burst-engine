
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { QrCode, Plus } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-solana/20 to-transparent -z-10" />
          
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Proof-of-Participation with{" "}
              <span className="bg-clip-text text-transparent bg-ctoken-gradient">
                compressed tokens
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Leverage Solana ZK Compression to create and distribute experience tokens 
              at scale with near-zero cost. Perfect for events, conferences, and community engagement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/create">
                  <Plus className="h-5 w-5" />
                  Create cToken
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link to="/scan">
                  <QrCode className="h-5 w-5" />
                  Scan & Claim
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Use cToken POP?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Near-Zero Cost",
                  description: "Create thousands of tokens with minimal cost using Solana's ZK Compression technology."
                },
                {
                  title: "Instant Claiming",
                  description: "Attendees can claim tokens instantly by scanning a QR code with their phone."
                },
                {
                  title: "Built on Solana",
                  description: "Leverage the speed, low fees, and security of the Solana blockchain."
                }
              ].map((feature, index) => (
                <div key={index} className="glass-card p-6 rounded-lg animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {[
                {
                  step: 1,
                  title: "Create a Token",
                  description: "Design your compressed token with details about your event or experience."
                },
                {
                  step: 2,
                  title: "Share the QR Code",
                  description: "Display the QR code at your event or share it with participants."
                },
                {
                  step: 3,
                  title: "Attendees Claim",
                  description: "Participants scan the QR code and instantly receive their token."
                }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-ctoken-gradient flex items-center justify-center text-white font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-solana/20 to-ctoken/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Create your first compressed token in minutes and start building engaging experiences for your community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/create">Create Your First Token</Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/onboarding">New User? Start Onboarding</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built on Solana with ZK Compression technology.</p>
          <p className="mt-2">© 2025 cToken POP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
