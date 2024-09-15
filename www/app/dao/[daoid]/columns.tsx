"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
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

export type InvestmentData = {
  id: string;
  investment: string;
  status: string;
  votes: string; // "Yes/No/Not Done" → converted to a single string
  amountInvested: number;
  tokens: number;
  tokenValue: number;
  percentChange: number;
};

export const investment_columns: ColumnDef<InvestmentData>[] = [
  {
    accessorKey: "investment",
    header: () => (
      <Button variant="ghost">
        Investment
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.original.status}</div>,
  },
  {
    accessorKey: "votes",
    header: "Votes (Yes/No/Not Done)",
    cell: ({ row }) => row.original.votes,
  },
  {
    accessorKey: "amountInvested",
    header: "Amount Invested",
    cell: ({ row }) => {
      const amount = row.getValue("amountInvested");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "tokens",
    header: "Tokens",
    cell: ({ row }) => row.original.tokens,
  },
  {
    accessorKey: "tokenValue",
    header: "Token Value (USDC)",
    cell: ({ row }) => {
      const value = row.getValue("tokenValue");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "percentChange",
    header: "Percent Change in Token Price",
    cell: ({ row }) => `${row.original.percentChange}%`,
  },
];
