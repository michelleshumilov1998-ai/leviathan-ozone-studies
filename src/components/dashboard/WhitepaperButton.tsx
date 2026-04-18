import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function WhitepaperButton() {
  const handleDownload = () => {
    toast.info("Publication in Progress", {
      description:
        "The comprehensive technical report is currently under peer-review. To request a full pre-print version, please reach out via LinkedIn.",
      duration: 7000,
    });
  };

  return (
    <Button
      onClick={handleDownload}
      size="sm"
      className="h-8 gap-1.5 bg-primary text-primary-foreground shadow-elev-sm hover:bg-primary/90"
    >
      <Download className="h-3.5 w-3.5" />
      <span className="hidden md:inline">Full Research Report</span>
      <span className="md:hidden">Report</span>
    </Button>
  );
}
