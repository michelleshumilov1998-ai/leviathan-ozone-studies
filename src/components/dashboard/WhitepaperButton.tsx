import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function WhitepaperButton() {
  const handleDownload = () => {
    toast.info("Whitepaper Under Review", {
      description:
        "The full research paper is currently under review for publication. Please connect with Michelle on LinkedIn for a pre-print version.",
      duration: 6000,
    });
  };

  return (
    <Button
      onClick={handleDownload}
      size="sm"
      className="h-8 gap-1.5 bg-gradient-accent text-accent-foreground shadow-glow hover:opacity-90"
    >
      <Download className="h-3.5 w-3.5" />
      <span className="hidden lg:inline">Download Whitepaper</span>
      <span className="lg:hidden">PDF</span>
    </Button>
  );
}
