import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function WhitepaperButton() {
  const handleDownload = () => {
    toast.info("Whitepaper Under Review", {
      description:
        "The full research paper is under review. Please connect on LinkedIn for the pre-print.",
      duration: 6000,
    });
  };

  return (
    <Button
      onClick={handleDownload}
      size="sm"
      className="h-8 gap-1.5 bg-primary text-primary-foreground shadow-elev-sm hover:bg-primary/90"
    >
      <Download className="h-3.5 w-3.5" />
      <span className="hidden lg:inline">Download Full Whitepaper</span>
      <span className="lg:hidden">Whitepaper</span>
    </Button>
  );
}
