import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const LINKEDIN_URL = "https://www.linkedin.com/in/michelle-shumilov";

export function WhitepaperButton() {
  const handleDownload = () => {
    toast.info("Publication in Progress", {
      description: (
        <span>
          The comprehensive technical report is currently under peer-review. To request a full pre-print version, please reach out via{" "}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
          >
            LinkedIn
          </a>
          .
        </span>
      ),
      duration: 8000,
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
