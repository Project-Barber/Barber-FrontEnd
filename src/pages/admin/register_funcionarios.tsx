'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import toast, { Toaster } from 'react-hot-toast'
import { useUsers } from '@/hooks/user-hooks'
import { maskPhone, maskDate } from '@/utils/masks'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const createUserSchema = z.object({
  name: z.string().min(2, 'Digite um nome válido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(11, 'Digite um telefone válido'),
  cep: z.string().optional(),
  rua: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  date_of_birth: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data deve estar no formato dd/mm/yyyy'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  role: z.string({ required_error: 'Selecione uma função' }),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  imagem: z.string().url('Insira uma URL válida para a imagem'),
})

type FormData = z.infer<typeof createUserSchema>

const formatUserData = (data: FormData) => ({
  nome: data.name,
  email: data.email,
  telefone: data.phone,
  data_nascimento: data.date_of_birth,
  senha: data.password,
  endereco: JSON.stringify({
    cep: data.cep,
    rua: data.rua,
    bairro: data.bairro,
    cidade: data.cidade,
    estado: data.estado,
  }),
  tipo_usuario: data.role,
  avaliacao: 0,
  descricao: data.descricao,
  imagem: data.imagem || 'https://example.com/default.jpg',
})

const Register_funcionario: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
  })

  const { createUserBarbeiro, loading, createUserSecretario } = useUsers()
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [role, setRole] = useState('')

  const onSubmit = async (data: FormData) => {
    const userData = formatUserData(data)
 if (role === 'barber') {
      const response = await createUserBarbeiro(userData)
      if (response) {
        toast.success('Usuário barbeiro cadastrado com sucesso!')
      } else {
        toast.error('Erro ao cadastrar usuário barbeiro')
      }
    }
    if (role === 'secretary') {
      const response = await createUserSecretario(userData)
      if (response) {
        toast.success('Usuário secretário cadastrado com sucesso!')
      } else {
        toast.error('Erro ao cadastrar usuário secretário')
      }
    }
    setValue('name', '')
  }

  const onError = (errors: any) => {
    Object.values(errors).forEach((error: any) => {
      toast.error(error.message || 'Erro ao preencher o formulário')
    })
  }
  const handlePasswordVisibility = () => {
    setIsVisible((prev) => !prev)
  }
 
  console.log('Role:', role)
  return (
    <div className="flex justify-center  items-center py-6 w-full select-none">
      <Toaster position="top-right" />
      <Card className="flex flex-row h-auto w-[800px] items-center justify-center shadow-md rounded-l-md">
        <div className="flex flex-col  items-center px-6 py-4 w-[600px] max-w-[550px] h-full">
          <CardHeader className="flex flex-col items-center text-center w-full">
            <CardTitle className="text-lg font-bold">Registre funcionário</CardTitle>
            <CardDescription className="text-muted-foreground max-w-xs">
              Preencha as informações corretamente para  registrar
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center  w-full h-[1010px] overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4 w-full">

              {/* Inputs padrões */}
              {[
                { id: 'name', label: 'Nome', placeholder: 'Seu nome' },
                { id: 'email', label: 'E-mail', placeholder: 'Seu e-mail' },
                { id: 'cep', label: 'CEP', placeholder: '00000-000' },
                { id: 'rua', label: 'Rua', placeholder: 'Rua Exemplo' },
                { id: 'bairro', label: 'Bairro', placeholder: 'Bairro Exemplo' },
                { id: 'cidade', label: 'Cidade', placeholder: 'Sua cidade' },
                { id: 'estado', label: 'Estado', placeholder: 'UF' },
                { id: 'descricao', label: 'Descrição', placeholder: 'Fale um pouco sobre você' },
                { id: 'imagem', label: 'Imagem (URL)', placeholder: 'https://...' },
                { id: 'password', label: 'Senha', placeholder: 'Crie uma senha', type: 'password' },
              ].map(({ id, label, placeholder, type }) => (
                <div
                  className={`flex flex-col space-y-1.5 ${id === 'password' ? 'relative' : ''}`}
                  key={id}
                >
                  <Label htmlFor={id}>{label}</Label>

                  <Input
                    id={id}
                    placeholder={placeholder}
                    type={id === 'password' ? (isVisible ? 'text' : 'password') : type || 'text'}
                    {...register(id as keyof FormData)}
                    className={`${errors[id as keyof FormData] ? 'border-red-500' : ''} ${id === 'password' ? 'pr-10' : ''}`}
                  />

                  {id === 'password' && (
                    <button
                      type="button"
                      onClick={handlePasswordVisibility}
                      className="absolute right-3 top-7 text-xl text-black"
                    >
                      {isVisible ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                  )}

                  {errors[id as keyof FormData] && (
                    <p className="text-xs text-red-500">
                      {errors[id as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}


              {/* Telefone */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(xx) xxxxx-xxxx"
                  type="tel"
                  value={phone}
                  {...register('phone')}
                  onChange={(e) => {
                    const masked = maskPhone(e.target.value)
                    setPhone(masked)
                    setValue('phone', masked)
                  }}
                  className={errors.phone && "border-red-500"}
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
              </div>

              {/* Data de nascimento */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date_of_birth">Data de Nascimento</Label>
                <Input
                  id="date_of_birth"
                  placeholder="dd/mm/yyyy"
                  value={dateOfBirth}
                  {...register('date_of_birth')}
                  onChange={(e) => {
                    const masked = maskDate(e.target.value)
                    setDateOfBirth(masked)
                    setValue('date_of_birth', masked)
                  }}
                  className={errors.date_of_birth && "border-red-500"}
                />
                {errors.date_of_birth && (
                  <p className="text-xs text-red-500">{errors.date_of_birth.message}</p>
                )}
              </div>

              {/* Função */}
              <div className="flex flex-col space-y-1.5">
                <Label>Função</Label>
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        setRole(value) 
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className={`w-full ${errors.role ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecione uma função" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="barber">Barbeiro</SelectItem>
                        <SelectItem value="secretary">Secretário(a)</SelectItem>
                      </SelectContent>
                    </Select>

                  )}
                />
                {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
              </div>

              {/* Botão */}
              <div className="flex flex-col items-center space-y-0.5">
                <Button
                  type="submit"
                  className="w-full mt-4 bg-[#7B1216] hover:bg-[#7b1215dc] text-white"
                  disabled={loading}
                >
                  {loading ? 'Carregando...' : 'Cadastre-se'}
                </Button>
              </div>

            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

export default Register_funcionario
