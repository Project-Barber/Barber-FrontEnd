import { DataTable } from "@/pages/admin/table/table"
import { ColumnDef } from "@tanstack/react-table"

type User = {
  id: string
  name: string
  email: string
  
}

const users: User[] = [
  { id: "1", name: "Henrique", email: "henrique@example.com" },
  { id: "2", name: "João", email: "joao@example.com" },
]

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
]

export default function Home() {
  return <DataTable columns={columns} data={users} />
}
