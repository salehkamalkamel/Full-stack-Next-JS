import { Card, CardContent } from "@/components/ui/card";

export default function ProtectionPlan() {
  return (
    <Card className="rounded-lg border overflow-hidden">
      <div className="bg-muted p-4">
        <h3 className="font-semibold">Protection Plan</h3>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 rounded-lg border p-4">
          <div className="pt-0.5">
            <input type="checkbox" id="protection-plan" className="h-4 w-4" />
          </div>
          <div>
            <label
              htmlFor="protection-plan"
              className="font-medium cursor-pointer"
            >
              Add 2-Year Protection Plan
            </label>
            <p className="text-sm text-muted-foreground mt-1">
              Covers technical issues and provides premium support for 2 years.
            </p>
            <p className="text-sm font-medium mt-2">$9.99</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
