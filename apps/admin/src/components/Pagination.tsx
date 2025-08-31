import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface GetPageNumbersParams {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
}

function getPageNumbers({
  currentPage,
  totalPages,
  siblingCount = 1,
}: GetPageNumbersParams): (number | string)[] {
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [1];

  const totalPageNumbers = siblingCount * 2 + 5; // siblingCount*2 + first + last + current + 2*DOTS

  // Case 1: Number of pages is less than the page numbers we want to show
  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1; // Changed from totalPages - 2 to totalPages - 1 for more accurate dot display

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Case 2: No left dots to show, but rights dots
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount; // Show more pages on the left
    const leftRange = range(1, leftItemCount);
    return [...leftRange, DOTS, totalPages];
  }

  // Case 3: No right dots to show, but left dots
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount; // Show more pages on the right
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  // Case 4: Both left and right dots to show
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  // Fallback, should ideally be covered by above cases
  return range(1, totalPages);
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  siblingCount?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  siblingCount = 1,
}: PaginationProps) {
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pageNumbers = getPageNumbers({ currentPage, totalPages, siblingCount });

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 0 && totalItems <= 0) {
    // Don't render if no pages or items
    return null;
  }
  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-950 px-4 py-3 sm:px-1">
        <div className="flex flex-1 justify-between sm:hidden">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePrevious();
            }}
            aria-disabled={currentPage === 1}
            className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-slate-950 dark:text-gray-200 dark:hover:bg-gray-600 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
          >
            Previous
          </Link>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
            aria-disabled={currentPage === totalPages}
            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-slate-950 dark:text-gray-200 dark:hover:bg-gray-600 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
          >
            Next
          </Link>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{firstItem}</span> to{" "}
              <span className="font-medium">{lastItem}</span> of{" "}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-xs"
            >
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePrevious();
                }}
                aria-disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-gray-400 dark:ring-gray-600 dark:hover:bg-gray-700 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="size-5" />
              </Link>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {pageNumbers.map((page, index) => {
                if (page === DOTS) {
                  return (
                    <span
                      key={`${DOTS}-${index}`}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0 dark:text-gray-400 dark:ring-gray-600"
                    >
                      ...
                    </span>
                  );
                }

                const pageNum = page as number;
                const isCurrent = pageNum === currentPage;
                return (
                  <Link
                    key={pageNum}
                    href={`?page=${pageNum}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(pageNum);
                    }}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                      isCurrent
                        ? "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:focus-visible:outline-indigo-500"
                        : "text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 dark:text-gray-100 dark:ring-gray-600 dark:hover:bg-gray-700"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                aria-disabled={currentPage === totalPages}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-gray-400 dark:ring-gray-600 dark:hover:bg-gray-700 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="size-5" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
