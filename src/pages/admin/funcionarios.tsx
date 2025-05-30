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
import api from "@/apis/apiClient";

type Funcionario = {
  id: string;
  nome: string;
  tipo_usuario: string;
  email: string;
  telefone: string;
  data_nascimento: string;
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
  }
];

const Funcionarios: React.FC = () => {
  const [tipo, setTipo] = useState<"barbeiros" | "secretarios">("barbeiros");
  const [showForm, setShowForm] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);
  const [data, setData] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/usuarios/exibir');  // Axios
      setData(response.data.usuarios); // aqui, dependendo da sua API, talvez só response.data
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };
  fetchUsuarios();
}, []);



  const handleRowClick = (funcionario: Funcionario) => {
    setSelectedFuncionario(funcionario);
  };

  const handleToggleChange = (value: "barbeiros" | "secretarios") => {
    setTipo(value);
  };

  function removeAccents(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

const filteredData = useMemo(() => {
  if (tipo === "barbeiros") {
    return data.filter(func =>
      func.tipo_usuario && func.tipo_usuario.toLowerCase().includes("barber")
    );
  } else {
    return data.filter(func =>
      func.tipo_usuario && func.tipo_usuario.toLowerCase().includes("secretary")
    );
  }
}, [tipo, data]);




  const handleAddFuncionario = () => {
    setShowForm(true);
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

          {loading && <p>Carregando usuários...</p>}
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
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline" className='cursor-pointer'>Fechar</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Funcionarios;
