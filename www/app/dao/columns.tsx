"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export type Dao = {
  id: string;
  name: string;
  industries: string;
  participants: number;
  totalUSDCIn: number;
  totalUSDCOut: number;
  numberOfProposals: number;
};

export const dao_columns: ColumnDef<DAO>[] = [
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter(); // Using Next.js router
      const dao = row.original; // Accessing the row's data

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(dao.id)}>
              Copy DAO ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/dao/${dao.id}`)}>
              View DAO Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => (
      <Button variant="ghost">
        DAO Token
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "industries",
    header: "Industry",
    cell: ({ row }) => <div>{row.original.industries}</div>,
  },
  {
    accessorKey: "participants",
    header: "# of Investors",
    cell: ({ row }) => row.original.participants,
  },
  {
    accessorKey: "totalUSDCIn",
    header: "USDC Invested",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalUSDCIn"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "totalUSDCOut",
    header: "USDC Pool",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalUSDCOut"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "numberOfProposals",
    header: "# of Proposals",
    cell: ({ row }) => row.original.numberOfProposals,
  },
];
