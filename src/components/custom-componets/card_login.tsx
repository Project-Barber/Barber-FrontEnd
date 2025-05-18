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
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { useAuth } from '../../hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type FormData = z.infer<typeof loginSchema>

const CardLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  const { login, loading, error: authError } = useAuth()
  const [isVisible, setIsVisible] = useState(false)

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password)
    } catch (error) {
      toast.error(authError || 'Erro ao realizar o login!')
    }
  }

  const onError = (errors: any) => {
    Object.values(errors).forEach((error: any) => {
      toast.error(error.message || 'Erro ao preencher o formulário')
    })
  }

  const handlePasswordVisibility = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div className="flex justify-center items-center h-full py-6 bg-white select-none">
      <Toaster position="top-right" />

      <Card className="flex flex-row h-full shadow-md rounded-l-md">
        <div className="w-[400px] h-full relative hidden sm:flex">
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

        <div className="flex flex-col px-6 py-6 w-[400px] max-w-[550px] h-full">
          <CardHeader className="flex flex-col items-center text-center">
            <CardTitle className="text-lg font-bold py-3">Entrar</CardTitle>
            <CardDescription className="text-muted-foreground max-w-xs">
              Faça login para acessar sua conta
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col py-8 items-center">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-4 w-full"
            >
              <div className="flex flex-col py-7 space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  placeholder="Seu E-mail"
                  {...register('email')}
                  className={`${
                    errors.email ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5 relative">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  placeholder="********"
                  type={isVisible ? 'text' : 'password'}
                  {...register('password')}
                  className={`${
                    errors.password ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                />
                <button
                  onClick={handlePasswordVisibility}
                  type="button"
                  className="absolute right-3 top-[30px]"
                >
                  {isVisible ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center py-7 space-y-0.5">
                <Button
                  type="submit"
                  className="w-full mt-4 bg-[#7B1216] hover:bg-[#7b1215dc] text-white"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
                <h4>ou</h4>
                <Button
                  type="button"
                  className="w-full mt-4 bg-white text-black border border-gray-300 hover:bg-gray-100"
                  onClick={() => toast.success('Google login não implementado ainda')}
                >
                  <FcGoogle />
                  Entrar com Google
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

export default CardLogin
