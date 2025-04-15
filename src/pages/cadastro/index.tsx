'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { FcGoogle } from 'react-icons/fc'
import toast, { Toaster } from 'react-hot-toast'
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import PhoneInput from '@/components/ui/inputPhone'
import DateInputProps from '@/components/ui/inputDate'
import { useUsers } from '../../hooks/user-hooks'

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
})

type FormData = z.infer<typeof createUserSchema>

const Cadastro: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
  })

  const { createUser, loading } = useUsers()
  const [isVisible, setIsVisible] = useState(false)

  const onSubmit = async (data: FormData) => {
    try {
      const userData = {
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
      }
      const result = await createUser(userData)
      if (result) {
        console.log("Usuário criado com sucesso", result)
        toast.success("Usuário criado com sucesso!")
      }
    } catch (error) {
      console.error("Erro ao criar usuário", error)
      toast.error("Erro ao criar usuário")
    }
  }

  const onError = (errors: any) => {
    Object.values(errors).forEach((error: any) => {
      toast.error(error.message || 'Erro ao preencher o formulário')
    })
  }

  const handlePasswordVisibility = () => {
    setIsVisible(prev => !prev)
  }

  return (
    <div className="flex justify-center items-center h-full py-6 bg-white select-none">
      <Toaster position="top-right" />

      <Card className="flex flex-row h-[800px] shadow-md rounded-l-md">
        <div className="w-[450px] h-full relative">
          <img
            src="src/assets/pexels-thgusstavo-2040189 1.png"
            alt="Imagem de fundo"
            className="w-full h-full object-cover rounded-l-md"
            draggable="false"
          />
          <img
            src="src/assets/paulista-logo-branco-removebg-preview 2.png"
            alt="Logo"
            className="top-20 left-25 w-70 h-70 object-cover absolute"
          />
        </div>

        <div className="flex flex-col justify-between px-6 py-4 w-[550px] h-full">
          <CardHeader className="flex flex-col items-center text-center">
            <CardTitle className="text-lg font-bold">Cadastre-se</CardTitle>
            <CardDescription className="text-muted-foreground max-w-xs">
              Preencha as informações corretamente para se cadastrar
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center">
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4 w-full">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Seu nome" {...register('name')} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" placeholder="Seu E-mail" {...register('email')} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Telefone</Label>
                <PhoneInput {...register('phone')} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date_of_birth">Data de Nascimento</Label>
                <DateInputProps {...register('date_of_birth')} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" placeholder="xx xxx-xxx" {...register('cep')} />
              </div>

              <div className="flex flex-col space-y-1.5 items-center w-full">
                <div className="flex space-x-2 w-full">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="rua">Rua</Label>
                    <Input id="rua" placeholder="Rua Exemplo" {...register('rua')} />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input id="bairro" placeholder="Bairro" {...register('bairro')} />
                  </div>
                </div>
                <div className="flex space-x-2 w-full">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" placeholder="Patos" {...register('cidade')} />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="estado">Estado</Label>
                    <Input id="estado" placeholder="PB" {...register('estado')} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5 relative">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  placeholder="********"
                  type={isVisible ? "text" : "password"}
                  {...register('password')}
                />
                <button
                  onClick={handlePasswordVisibility}
                  type="button"
                  className="absolute right-3 top-[30px]"
                >
                  {isVisible ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>

              <div className="flex flex-col items-center space-y-0.5">
                <Button
                  type="submit"
                  className="w-full mt-4 bg-[#7B1216] hover:bg-[#7b1215dc] text-white"
                >
                  Cadastre-se
                </Button>
                <h4>ou</h4>
                <Button
                  type="button"
                  className="w-full mt-4 bg-white text-black border border-gray-300 hover:bg-gray-100"
                  onClick={() => handleSubmit(onSubmit, onError)()}
                >
                  <FcGoogle  />
                  Cadastrar com Google
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

export default Cadastro
