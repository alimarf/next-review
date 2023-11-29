import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { ReactNode } from "react";

export interface PaginationBarProps {
    href: string;
    page: number;
    pageCount: number;
  }

export default function PaginationBar({href, page, pageCount}: PaginationBarProps){
    return (
        <div className="flex items-center gap-2">
        <PaginationLink href={`${href}?page=${page - 1}`}
          enabled={page > 1}>
          <ChevronLeftIcon className="w-5 h-5" />
          <span className="sr-only">Previous Page</span>
        </PaginationLink>
        <span>Page {page} of {pageCount}</span>
        <PaginationLink href={`${href}?page=${page + 1}`}
          enabled={page < pageCount}>
          <ChevronRightIcon className="w-5 h-5" />
          <span className="sr-only">Next Page</span>
        </PaginationLink>
      </div>
    );
}

interface PaginationLinkProps {
    children: ReactNode;
    enabled: boolean;
    href: string;
  }
  
  function PaginationLink({ children, enabled, href }: PaginationLinkProps) {
    if (!enabled) {
      return (
        <span
          className="text-sm border rounded cursor-not-allowed text-slate-300">
          {children}
        </span>
      );
    }
    return (
      <Link href={href}
        className="text-sm border rounded text-slate-500 hover:bg-orange-100 hover:text-slate-700">
        {children}
      </Link>
    );
  }