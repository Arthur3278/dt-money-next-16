import { ITransaction } from "@/types/transaction"
import { formatDate, formatPrice } from "@/utils"

export type TableProps = {
    data: ITransaction[]
    onEdit: (transaction: ITransaction) => void
    onDelete: (transaction: ITransaction) => void
}

export const Table = ({ data, onEdit, onDelete }: TableProps) => {
    return <>
        <table className="w-full mt-16 border-separate border-spacing-y-2">
            <thead>
                <tr>
                   <th className="px-4 text-left text-table-header text-base font-medium">Título</th> 
                   <th className="px-4 text-left text-table-header text-base font-medium">Preço</th> 
                   <th className="px-4 text-left text-table-header text-base font-medium">Categoria</th> 
                   <th className="px-4 text-left text-table-header text-base font-medium">Data</th>
                   <th className="px-4 text-left text-table-header text-base font-medium">Ações</th> 
                </tr>
            </thead> 
            <tbody>
               {data.map(transaction => (
                <tr key={transaction.id} className="h-16">
                   <td className="px-4 py-4 whitespace-nowrap text-title bg-white rounded-l-lg">{transaction.title}</td> 
                   <td className={`px-4 py-4 whitespace-nowrap ${transaction.type === "INCOME" ? "text-income" : "text-outcome"} bg-white text-right`}>{formatPrice(transaction.price)}</td> 
                   <td className="px-4 py-4 whitespace-nowrap text-title bg-white">{transaction.category}</td>
                   <td className="px-4 py-4 whitespace-nowrap text-title bg-white">{formatDate(transaction.data)}</td>
                   <td className="px-4 py-4 whitespace-nowrap bg-white rounded-r-lg">
                       <button
                           onClick={() => onEdit(transaction)}
                           className="mr-2 px-3 py-1 text-sm text-white bg-blue-500 rounded hover:opacity-80"
                       >
                           Editar
                       </button>
                       <button
                           onClick={() => onDelete(transaction)}
                           className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:opacity-80"
                       >
                           Excluir
                       </button>
                   </td>
                </tr>
               ))} 
            </tbody>
        </table>
    </>
}