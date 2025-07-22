import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
}

export function PricingCard({
  title,
  price,
  description,
  features,
  isPopular = false,
  ctaText = "Get Started",
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "relative border-2 transition-all duration-300 hover:shadow-xl",
        isPopular ? "border-primary-500 shadow-lg scale-105" : "border-gray-200"
      )}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader className="text-center pb-8 pt-8">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-600">/month</span>
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className={cn(
            "w-full py-3 text-lg font-medium",
            isPopular
              ? "bg-primary hover:bg-primary/90"
              : "bg-secondary-foreground hover:bg-secondary-foreground/90"
          )}
        >
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
}
