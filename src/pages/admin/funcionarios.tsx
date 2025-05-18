//funcionários
import React, { useState, useMemo } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from '@/pages/admin/table/DataTable';
import ToggleButton from '@/components/custom-componets/switch';
import { Button } from '@/components/ui/button'
import Register_funcionario from '@/pages/admin/register_funcionarios';
import { MdOutlineArrowBack } from "react-icons/md";


type Funcionario = {
    id: string;
    nome: string;
    cargo: string;
    email: string;
    cel: string;
    data_nascimento: string;
};

const data: Funcionario[] = [
    {
        id: "1",
        nome: "Ana Silva",
        cargo: "Barbeira",
        email: "ana@empresa.com",
        cel: "(11) 91234-5678",
        data_nascimento: "1990-03-15",
    },
    {
        id: "2",
        nome: "Carlos Souza",
        cargo: "Designer",
        email: "carlos@empresa.com",
        cel: "(21) 99876-5432",
        data_nascimento: "1987-07-09",
    },
    {
        id: "3",
        nome: "Pedro Lima",
        cargo: "Gerente",
        email: "pedro@empresa.com",
        cel: "(31) 91122-3344",
        data_nascimento: "1982-12-25",
    },
    {
        id: "4",
        nome: "Mariana Costa",
        cargo: "Secretária",
        email: "mariana@empresa.com",
        cel: "(41) 91234-5678",
        data_nascimento: "1993-05-20",
    },
];

export const columns: ColumnDef<Funcionario>[] = [
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "cargo",
        header: "Cargo",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "cel",
        header: "Celular",
    },
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

    const handleToggleChange = (value: "barbeiros" | "secretarios") => {
        setTipo(value);
    };

    function removeAccents(str: string) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const filteredData = useMemo(() => {
        if (tipo === "barbeiros") {
            return data.filter(func => removeAccents(func.cargo.toLowerCase()).includes("barbeir"));
        } else {
            return data.filter(func => removeAccents(func.cargo.toLowerCase()).includes("secretar"));
        }
    }, [tipo]);

    const handleAddFuncionario = () => {
        setShowForm(true);
    };

    return (
        <div className="p-4 space-y-4">
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
                    <div className="flex items-center space-x-4">
                        <ToggleButton value={tipo} onChange={handleToggleChange} />
                        <Button variant="outline" className="ml-auto cursor-pointer" onClick={handleAddFuncionario}>
                            Adicionar Funcionário
                        </Button>
                    </div>
                    <div>
                        <DataTable columns={columns} data={filteredData} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Funcionarios;
