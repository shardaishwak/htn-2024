"use client";
import React, { useContext, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chart from "./chart";

import ProposalsDataTable from "./proposals-data-table";
import InvestorsDataTable from "./investors-data-table";
import StartupsDataTable from "./startups-data-table";
import { ChainContext, ChainContextType } from "@/context/chain-context";
import { rpcProvider } from "@/rpc";

const DaoPage = () => {
	const { provider, signer } = useContext<ChainContextType>(ChainContext);

	const callbackLend = async (daoAddress: string, amount: number) => {
		await rpcProvider.dao.lend(daoAddress, provider, signer, amount);
	};
	return (
		<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 p-8">
			<div className="max-w-4xl mx-auto">
				<header className="text-center mb-12">
					<Chart />
				</header>

				<h1 className="text-white font-bold text-3xl">
					We will LEND HERE!! Make modal
				</h1>

				{/* Tabs system for Investments and Investors */}
				<Tabs defaultValue="lenders" className="w-full">
					<div className=" ">
						<TabsList className="bg-gray-700 rounded-lg shadow-md w-fit">
							<TabsTrigger
								value="lenders"
								className="text-white py-2 px-4 text-left"
							>
								Lenders
							</TabsTrigger>
							<TabsTrigger
								value="proposals"
								className="text-white py-2 px-4  text-left"
							>
								Proposals
							</TabsTrigger>

							<TabsTrigger
								value="startups"
								className="text-white py-2 px-4 text-left"
							>
								Startups
							</TabsTrigger>
						</TabsList>
					</div>

					{/* Tab Content for Investments */}
					<TabsContent value="proposals">
						<ProposalsDataTable />
					</TabsContent>

					{/* Tab Content for Investors */}
					<TabsContent value="lenders">
						<InvestorsDataTable />
					</TabsContent>

					<TabsContent value="startups">
						<StartupsDataTable />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default DaoPage;
