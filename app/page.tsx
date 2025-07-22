import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";
import { PricingCard } from "@/components/ui/pricing-card";
import { StatCard } from "@/components/ui/stat-card";
import {
  ArrowRight,
  Users,
  Zap,
  Shield,
  Calendar,
  FileText,
  BarChart3,
  CheckCircle,
  Star,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <Section className="pt-20 pb-16 bg-gradient-primary">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-primary/60 rounded-full text-primary-foreground text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            <p>Reduce admin work by 70% in minutes</p>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight text-balance">
            Stop Losing Clients to
            <span className="text-primary-600"> Slow Onboarding</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto text-balance">
            Automate your entire client intake process with branded forms,
            instant document delivery, and smart workflows. Turn administrative
            chaos into professional efficiency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg">
              Start Free 14-Day Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-gray-300 bg-transparent btn-hover-lift"
            >
              Watch Demo (2 min)
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <StatCard
              value="70%"
              label="Less Admin Time"
              description="Focus on billable work"
            />
            <StatCard
              value="5 min"
              label="Setup Time"
              description="Start automating today"
            />
            <StatCard
              value="24/7"
              label="Client Onboarding"
              description="Never lose a lead again"
            />
          </div>
        </div>
      </Section>

      {/* Problem Section */}
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            The Hidden Cost of Manual Onboarding
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Every hour spent on admin work is an hour not earning revenue.
            Here's what's really happening to your business:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <div className="text-red-600 text-4xl font-bold mb-2">70%</div>
              <div className="text-red-800 font-semibold mb-2">
                Time Wasted on Admin
              </div>
              <div className="text-red-700 text-sm">
                Manually sending emails, documents, and payment links instead of
                doing billable work
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <div className="text-red-600 text-4xl font-bold mb-2">30%</div>
              <div className="text-red-800 font-semibold mb-2">
                Client Loss Rate
              </div>
              <div className="text-red-700 text-sm">
                Slow responses and unprofessional processes lose potential
                clients
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              "I spend 70% of my time on this crap instead of actual work"
            </h3>
            <p className="text-gray-600 italic">
              - Freelance consultant describing their manual onboarding process
            </p>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section id="features">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Automate Every Step of Client Onboarding
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From first contact to project kickoff, IntakeFlow handles the entire
            process so you can focus on what you do best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={FileText}
            title="Smart Intake Forms"
            description="Create branded, customizable forms that collect all client information upfront. Embed on your site or share via link."
          />

          <FeatureCard
            icon={Zap}
            title="Instant Automation"
            description="Automatically send welcome emails, contracts, payment links, and portal access the moment a form is submitted."
          />

          <FeatureCard
            icon={Calendar}
            title="Calendar Integration"
            description="Seamlessly connect with Calendly and other scheduling tools to automatically book consultation calls."
          />

          <FeatureCard
            icon={Shield}
            title="Branded Client Portal"
            description="Give clients a professional portal to view their onboarding checklist, upload files, and track progress."
          />

          <FeatureCard
            icon={BarChart3}
            title="Smart Workflows"
            description="Set up intelligent triggers and follow-ups based on client actions and responses."
          />

          <FeatureCard
            icon={Users}
            title="Essential Integrations"
            description="Connect with Google Docs, email services, payment processors, and other tools you already use."
          />
        </div>
      </Section>

      {/* Pricing Section */}
      <Section id="pricing" className="bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your business size and needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard
            title="Solo"
            price="$19"
            description="Perfect for freelancers and solo professionals"
            features={[
              "Up to 50 clients per month",
              "Unlimited intake forms",
              "Basic automation workflows",
              "Email & document delivery",
              "Simple client portal",
              "Calendar integration",
              "Email support",
            ]}
            ctaText="Start Free Trial"
          />

          <PricingCard
            title="Pro"
            price="$49"
            description="For growing agencies and service businesses"
            features={[
              "Up to 200 clients per month",
              "Advanced multi-step workflows",
              "Custom branding & white-label",
              "Priority integrations",
              "Advanced client portal",
              "Team collaboration tools",
              "Priority support & onboarding",
            ]}
            isPopular={true}
            ctaText="Start Free Trial"
          />
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-secondary-500 mr-2" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-secondary-500 mr-2" />
              No setup fees
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-secondary-500 mr-2" />
              30-day money back
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section id="testimonials">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-xl text-gray-600">
            See how IntakeFlow is transforming businesses like yours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic">
              &quot;IntakeFlow saved me 15 hours per week. I can finally focus
              on client work instead of endless admin tasks.&quot;
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <div className="font-semibold text-gray-900">Sarah Chen</div>
                <div className="text-gray-600 text-sm">
                  Marketing Consultant
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic">
              "My client conversion rate increased by 40% since using
              IntakeFlow. The professional onboarding makes all the difference."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <div className="font-semibold text-gray-900">
                  Mike Rodriguez
                </div>
                <div className="text-gray-600 text-sm">Web Developer</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic">
              "The automated workflows are a game-changer. Clients love the
              professional experience and I love the time savings."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <div className="font-semibold text-gray-900">Emma Thompson</div>
                <div className="text-gray-600 text-sm">Business Coach</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-cta">
        <div className="text-center max-w-3xl mx-auto text-secondary">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-balance">
            Ready to Reclaim Your Time?
          </h2>
          <p className="text-xl text-primary-100 mb-8 text-balance">
            Join thousands of professionals who&apos;ve automated their client
            onboarding and increased their revenue by focusing on what matters
            most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="outline"
              className="text-secondary-foreground"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-secondary hover:bg-secondary-foreground hover:text-primary-600 px-8 py-4 text-lg bg-transparent btn-hover-lift"
            >
              Schedule a Demo
            </Button>
          </div>

          <p className="text-primary-200 text-sm mt-6">
            14-day free trial • No credit card required • Setup in 5 minutes
          </p>
        </div>
      </Section>
    </div>
  );
}
