import { Feature } from "@prisma/client";
import { Check } from "lucide-react";

interface FeaturesTabProps {
  features: Feature[];
}

export default function FeaturesTab({ features }: FeaturesTabProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
      <ul className="space-y-4">
        {features.map((feature) => (
          <li key={feature.id} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span>{feature.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
