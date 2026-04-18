import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useStation } from "./StationContext";

export function ChartActions() {
  const { station } = useStation();

  const handleCsv = () => {
    toast.info("Data export started", {
      description: `Preparing CSV for ${station.name}…`,
      duration: 4000,
    });
  };

  const handlePdf = () => {
    toast.info("PDF export started", {
      description: `Rendering chart snapshot for ${station.name}…`,
      duration: 4000,
    });
  };

  return (
    <div className="flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCsv}
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            aria-label="Export as CSV"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">Export as CSV</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePdf}
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            aria-label="Export as PDF"
          >
            <FileText className="h-3.5 w-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">Export as PDF</TooltipContent>
      </Tooltip>
    </div>
  );
}
