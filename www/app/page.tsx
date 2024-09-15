"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DaoDataTable from "./dao/data-table";
import Hero from "@/components/hero";
import StartupDataTable from "./startups/startup-data-table";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 p-8">
			<Hero />

			<div className="max-w-4xl mx-auto mt-32">
				{/* Tabs positioned at top left */}
				<Tabs defaultValue="daos" className="relative">
					<div className=" ">
						<TabsList className="bg-gray-700 rounded-lg shadow-md w-[200px]">
							<TabsTrigger
								value="daos"
								className="text-white py-2 px-4  text-left"
							>
								DAOs
							</TabsTrigger>
							<TabsTrigger
								value="tokens"
								className="text-white py-2 px-4 text-left"
							>
								Startup Tokens
							</TabsTrigger>
						</TabsList>
					</div>

					<div className="">
						<TabsContent value="daos">
							<div>
								<DaoDataTable />
							</div>
						</TabsContent>

						<TabsContent value="tokens">
							<StartupDataTable />
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</div>
	);
}
