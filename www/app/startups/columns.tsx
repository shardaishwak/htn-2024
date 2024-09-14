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

// Define the shape of our startup data.
export type Startup = {
  id: string;
  name: string;
  industries: string[];
  totalTokens: number;
  totalTokensGivenOut: number;
  tokenPrice: number;
  numberOfProposals: number;
};

export const startup_columns: ColumnDef<Startup>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const startup = row.original;

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(startup.id)}>
              Copy Startup ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Startup Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => (
      <Button variant="ghost">
        Startup Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "industries",
    header: "Industries",
    cell: ({ row }) => <div>{row.original.industries.join(", ")}</div>,
  },
  {
    accessorKey: "totalTokens",
    header: "Total Tokens",
    cell: ({ row }) => row.original.totalTokens,
  },
  {
    accessorKey: "totalTokensGivenOut",
    header: "Total Tokens Given Out",
    cell: ({ row }) => row.original.totalTokensGivenOut,
  },
  {
    accessorKey: "tokenPrice",
    header: () => <div className="text-right">Token Price (USDC)</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("tokenPrice"));
      return (
        <div className="text-right font-medium">{price.toFixed(2)}</div>
      );
    },
  },
  {
    accessorKey: "numberOfProposals",
    header: "# of Proposals",
    cell: ({ row }) => row.original.numberOfProposals,
  },
  {
    id: "checkout",
    header: "Checkout",
    cell: ({ row }) => {
      const router = useRouter(); // Using Next.js router
      const startup = row.original; // Accessing the row's data

      return (
        <Button
          variant="outline"
          onClick={() => router.push(`/startups/${startup.id}`)} // Navigate to /startups/{id}
        >
          Checkout Startup
        </Button>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
