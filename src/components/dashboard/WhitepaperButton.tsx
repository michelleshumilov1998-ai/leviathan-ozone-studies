import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function WhitepaperButton() {
  const handleDownload = () => {
    toast.success("Download Started", {
      description: "Ozone Impact Study — full whitepaper (PDF, ~4.2 MB)",
    });
  };

  return (
    <Button
      onClick={handleDownload}
      size="sm"
      className="h-8 gap-1.5 bg-gradient-accent text-accent-foreground shadow-glow hover:opacity-90"
    >
      <Download className="h-3.5 w-3.5" />
      <span className="hidden md:inline">Download Full Whitepaper</span>
      <span className="md:hidden">Whitepaper</span>
    </Button>
  );
}
