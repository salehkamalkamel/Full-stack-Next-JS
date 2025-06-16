import type React from "react";
import {
  Monitor,
  Cpu,
  MemoryStickIcon as Memory,
  HardDrive,
} from "lucide-react";
import { SystemRequirementType } from "@/lib/types/product-type";

export default function SystemRequirementsTab({
  systemRequirements,
}: {
  systemRequirements: SystemRequirementType[];
}) {
  if (!systemRequirements?.length)
    return <div className="w-full text-center">No data provided.</div>;
  if (systemRequirements.length === 1)
    return (
      <div>
        <RequirementSection requirements={systemRequirements[0]} />
      </div>
    );

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {systemRequirements.map((req, idx) => (
        <RequirementSection key={idx} requirements={req} />
      ))}
    </div>
  );
}

function RequirementSection({
  requirements,
}: {
  requirements: SystemRequirementType;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Monitor className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-xl font-semibold">
          {requirements?.type || "Unknown"}
        </h3>
      </div>
      <div className="space-y-4 rounded-lg border p-4">
        <RequirementItem
          icon={<Monitor className="h-5 w-5 text-muted-foreground mt-0.5" />}
          label="Operating System"
          value={requirements.os || ""}
        />
        <RequirementItem
          icon={<Cpu className="h-5 w-5 text-muted-foreground mt-0.5" />}
          label="Processor"
          value={requirements.processor || ""}
        />
        <RequirementItem
          icon={<Memory className="h-5 w-5 text-muted-foreground mt-0.5" />}
          label="Memory"
          value={requirements.memory || ""}
        />
        <RequirementItem
          icon={<Monitor className="h-5 w-5 text-muted-foreground mt-0.5" />}
          label="Graphics"
          value={requirements.graphics || ""}
        />
        <RequirementItem
          icon={<HardDrive className="h-5 w-5 text-muted-foreground mt-0.5" />}
          label="Storage"
          value={requirements.storage || ""}
        />
      </div>
    </div>
  );
}

interface RequirementItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function RequirementItem({ icon, label, value }: RequirementItemProps) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-muted-foreground">{value}</div>
      </div>
    </div>
  );
}
