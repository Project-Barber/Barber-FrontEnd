import React, { useState, useEffect, useMemo } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from '@/pages/admin/table/DataTable';
import ToggleButton from '@/components/custom-componets/switch';
import { Button } from '@/components/ui/button';
import Register_funcionario from '@/pages/admin/register_funcionarios';
import { MdOutlineArrowBack } from "react-icons/md";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import api from "@/apis/apiClient";
import { LoaderCircle } from 'lucide-react';

type Funcionario = {
  id: string;
  nome: string;
  tipo_usuario: string;
  email: string;
  telefone: string;
  data_nascimento: string;
  descricao?: string;
};

export const columns: ColumnDef<Funcionario>[] = [
  { accessorKey: "nome", header: "Nome" },
  { accessorKey: "tipo_usuario", header: "Cargo" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "telefone", header: "Celular" },
  {
    accessorKey: "data_nascimento",
    header: "Data de Nascimento",
    cell: ({ row }) => {
      const data = new Date(row.getValue("data_nascimento"));
      return data.toLocaleDateString("pt-BR");
    }
  },
];

const Funcionarios: React.FC = () => {
  const [tipo, setTipo] = useState<"barbeiros" | "secretarios">("barbeiros");
  const [showForm, setShowForm] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);
  const [funcionarioToDelete, setFuncionarioToDelete] = useState<Funcionario | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [data, setData] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
const cookies = document.cookie;
console.log(cookies);

useEffect(() => {
  const controller = new AbortController();

  const fetchUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/usuarios/exibir/todos', {
        signal: controller.signal,
        withCredentials: true
      });
      setData(response.data.usuarios);
    } catch (err: any) {
      if (err.code === 'ERR_CANCELED') return;
      const errorMsg = err.response?.data?.error || err.message || 'Erro desconhecido';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  fetchUsuarios();

  return () => controller.abort();
}, []);


  const handleRowClick = (funcionario: Funcionario) => {
    setSelectedFuncionario(funcionario);
  };

  const handleToggleChange = (value: "barbeiros" | "secretarios") => {
    setTipo(value);
  };

  const filteredData = useMemo(() => {
    return data.filter(func =>
      func.tipo_usuario &&
      func.tipo_usuario.toLowerCase().includes(tipo === "barbeiros" ? "barber" : "secretary")
    );
  }, [tipo, data]);

  const handleAddFuncionario = () => {
    setShowForm(true);
  };

  const handleDeleteFuncionario = async () => {
    if (!funcionarioToDelete) return;
    try {
      await api.delete(`/usuarios/deletar`, {
        withCredentials: true, // 👈 ISSO é essencial pra enviar cookies
      });
      setFuncionarioToDelete(null);
      setConfirmDeleteOpen(false);
      setSelectedFuncionario(null);
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-full overflow-auto">
      {showForm && (
        <div>
          <Button onClick={() => setShowForm(false)} variant="ghost" className='cursor-pointer fixed'>
            <MdOutlineArrowBack />
            Voltar
          </Button>
          <Register_funcionario />
        </div>
      )}

      {!showForm && (
        <>
           <div className="flex items-center space-x-4 sm:flex-coll">
            <ToggleButton value={tipo} onChange={handleToggleChange} />
            <Button variant="outline" className="ml-auto cursor-pointer" onClick={handleAddFuncionario}>
              Adicionar Funcionário
            </Button>
          </div>

          {loading && (
            <div>
              <LoaderCircle className='animate-spin' />
              <p>Carregando usuários...</p>
            </div>
          )}
          {error && <p className="text-red-500">Erro: {error}</p>}

          {!loading && !error && (
            <DataTable
              columns={columns}
              data={filteredData}
              onRowClick={handleRowClick}
            />
          )}
        </>
      )}

      {selectedFuncionario && (
        <Drawer open={!!selectedFuncionario} onOpenChange={(open) => !open && setSelectedFuncionario(null)}>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Detalhes do Funcionário</DrawerTitle>
                <DrawerDescription>Informações do Funcionário</DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <p><strong>Nome:</strong> {selectedFuncionario.nome}</p>
                <p><strong>Cargo:</strong> {selectedFuncionario.tipo_usuario}</p>
                <p><strong>Email:</strong> {selectedFuncionario.email}</p>
                <p><strong>Celular:</strong> {selectedFuncionario.telefone}</p>
                <p><strong>Nascimento:</strong> {new Date(selectedFuncionario.data_nascimento).toLocaleDateString("pt-BR")}</p>
                <p><strong>Descrição:</strong> {selectedFuncionario.descricao || "Não informada"}</p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline" className='cursor-pointer'>Fechar</Button>
                </DrawerClose>
                <Button
                  variant="destructive"
                  className="ml-2 cursor-pointer"
                  onClick={() => {
                    setFuncionarioToDelete(selectedFuncionario);
                    setConfirmDeleteOpen(true);
                  }}
                >
                  Deletar
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      )}

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o funcionário{' '}
              <strong>{funcionarioToDelete?.nome}</strong>? Esta ação não poderá ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" className='cursor-pointer' onClick={() => setConfirmDeleteOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" className='cursor-pointer' onClick={handleDeleteFuncionario}>
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Funcionarios;
