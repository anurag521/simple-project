import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
interface Props {
  data: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
  };
  setCurrentPage: (page: number) => void;
  currentPage: number;
}
export default function Pagination({
  data,
  setCurrentPage,
  currentPage,
}: Props) {
  return (
   <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing page {data.currentPage} of {data.totalPages} ({data.totalUsers} total users)
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        
        <div className="flex gap-1">
          {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
            let pageNum;
            if (data.totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= data.totalPages - 2) {
              pageNum = data.totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0 hover:bg-muted"
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.min(data.totalPages, currentPage + 1))}
          disabled={currentPage === data.totalPages}
          className="hover:bg-muted"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
