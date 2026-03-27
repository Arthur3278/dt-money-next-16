'use client';
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { ITransaction, TotalCard } from "@/types/transaction";
import { useMemo, useState } from "react";

const transactions: ITransaction[] = [
  { id: "1", title: "Salário", price: 5000, category: "Trabalho", type: "INCOME", data: new Date("2024-06-01") },
  { id: "2", title: "Aluguel", price: 1500, category: "Moradia", type: "OUTCOME", data: new Date("2024-06-05") },
  { id: "3", title: "Supermercado", price: 300, category: "Alimentação", type: "OUTCOME", data: new Date("2024-06-10") },
  { id: "4", title: "Freelance", price: 1200, category: "Trabalho", type: "INCOME", data: new Date("2024-06-15") },
];

export default function Home() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState(transactions);
  const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<ITransaction | null>(null);

  const handleAddTransaction = (transaction: ITransaction) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setTransactionData((prev) => [...prev, newTransaction]);
  }

  const handleEditTransaction = (updated: ITransaction) => {
    setTransactionData((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  }

  const handleOpenEdit = (transaction: ITransaction) => {
    setTransactionToEdit(transaction);
    setIsFormModalOpen(true);
  }

  const handleOpenDelete = (transaction: ITransaction) => {
    setTransactionToDelete(transaction);
  }

  const handleConfirmDelete = () => {
    if (transactionToDelete) {
      setTransactionData((prev) => prev.filter((t) => t.id !== transactionToDelete.id));
      setTransactionToDelete(null);
    }
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setTransactionToEdit(null);
  }

  const calculaTotal = useMemo(() => {
    return transactionData.reduce<TotalCard>((acc, transaction) => {
      if (transaction.type === "INCOME") {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    }, { total: 0, income: 0, outcome: 0 });
  }, [transactionData]);
  
  return (
    <div className="h-full min-h-screen">
      <Header handleOpenFormModal={() => { setTransactionToEdit(null); setIsFormModalOpen(true); }} />
      <BodyContainer>
         <CardContainer totalValues={calculaTotal} />
         <Table 
           data={transactionData} 
           onEdit={handleOpenEdit}
           onDelete={handleOpenDelete}
         />
      </BodyContainer>

      {isFormModalOpen && (
        <FormModal 
          closeModal={handleCloseFormModal}
          title={transactionToEdit ? "Editar Transação" : "Criar Transação"}
          addTransaction={handleAddTransaction}
          editTransaction={handleEditTransaction}
          transactionToEdit={transactionToEdit}
        />
      )}

      {transactionToDelete && (
        <div className="relative z-10" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-700 opacity-75" aria-hidden="true" />
          <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Excluir esta transação</h2>
              <p className="text-gray-500 mb-6">
                Realmente tem certeza que deseja excluir <strong>{transactionToDelete.title}</strong>?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setTransactionToDelete(null)}
                  className="px-6 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-6 py-2 rounded-md bg-red-500 text-white hover:opacity-80"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}