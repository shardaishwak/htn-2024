import { Payment, columns } from "./columns"
import { DaoDataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ec52f",
      amount: 100,
      status: "pending",
      email: "alss@example.com",
    },
    {
      id: "728ed52f",
      amount: 200,
      status: "pending",
      email: "askndj@example.com",
    },
    {
      id: "728ee52f",
      amount: 2830,
      status: "pending",
      email: "mewkd@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DaoDataTable columns={columns} data={data} />
    </div>
  )
}
