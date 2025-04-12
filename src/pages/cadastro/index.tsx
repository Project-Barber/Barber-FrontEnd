import React from 'react'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputMask from 'react-input-mask'
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
import { DatePickerDemo } from '@/components/custom-componets/dataPicker'

// Validação com Zod
const schema = z.object({
  name: z.string().min(2, 'Digite um nome válido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(11, 'Digite um telefone válido'),
  cep: z.string().min(8, 'CEP deve ter 8 dígitos'),
  rua: z.string().min(2, 'Rua obrigatória'),
  bairro: z.string().min(2, 'Bairro obrigatório'),
  cidade: z.string().min(2, 'Cidade obrigatória'),
  estado: z.string().min(2, 'Estado obrigatório'),
  date_of_birth: z.date({
    required_error: 'A data de nascimento é obrigatória',
    invalid_type_error: 'Data inválida',
  }),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})


type FormData = z.infer<typeof schema>

const Cadastro: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log('Dados enviados:', data)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Card className="flex flex-row h-[800px] rounded-l-none shadow-md">
        {/* Imagem lateral */}
        <div className="w-[450px] h-full">
          <img
            src="src/assets/pexels-thgusstavo-2040189 1.png"
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Conteúdo do formulário */}
        <div className="flex flex-col justify-between px-6 py-4 w-[550px] h-full">
          <CardHeader className="flex flex-col items-center text-center ">
            <CardTitle className="text-lg font-bold">Cadastre-se</CardTitle>
            <CardDescription className="text-muted-foreground max-w-xs">
              Preencha as informações corretamente para se cadastrar
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Seu nome" {...register('name')} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" placeholder="Seu E-mail" {...register('email')} />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Telefone</Label>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <InputMask
                      mask="(99) 99999-9999"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {(inputProps: any) => (
                        <Input
                          {...inputProps}
                          id="phone"
                          placeholder="(99) 99999-9999"
                        />
                      )}
                    </InputMask>
                  )}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label>Data de Nascimento</Label>
                <DatePickerDemo />
                {errors.date_of_birth && (
                  <p className="text-sm text-red-500">
                    {errors.date_of_birth.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
  <Label htmlFor="cep">CEP</Label>
  <Input id="cep" placeholder="58430768" {...register('cep')} />
  {errors.cep && <p className="text-sm text-red-500">{errors.cep.message}</p>}
</div>

<div className="flex flex-col space-y-1.5 items-center w-full">
  <div className="flex space-x-2 w-full">
    <div className="flex flex-col space-y-1.5 w-full">
      <Label htmlFor="rua">Rua</Label>
      <Input id="rua" placeholder="Rua Exemplo" {...register('rua')} />
      {errors.rua && <p className="text-sm text-red-500">{errors.rua.message}</p>}
    </div>
    <div className="flex flex-col space-y-1.5 w-full">
      <Label htmlFor="bairro">Bairro</Label>
      <Input id="bairro" placeholder="Centro" {...register('bairro')} />
      {errors.bairro && <p className="text-sm text-red-500">{errors.bairro.message}</p>}
    </div>
  </div>
  <div className="flex space-x-2 w-full">
    <div className="flex flex-col space-y-1.5 w-full">
      <Label htmlFor="cidade">Cidade</Label>
      <Input id="cidade" placeholder="Campina Grande" {...register('cidade')} />
      {errors.cidade && <p className="text-sm text-red-500">{errors.cidade.message}</p>}
    </div>
    <div className="flex flex-col space-y-1.5 w-full">
      <Label htmlFor="estado">Estado</Label>
      <Input id="estado" placeholder="PB" {...register('estado')} />
      {errors.estado && <p className="text-sm text-red-500">{errors.estado.message}</p>}
    </div>
  </div>
</div>


              <div className="flex flex-col items-center space-y-0.5">
                <Button
                  type="submit"
                  className="w-full mt-4 bg-[#7B1216] hover:bg-[#7b1215dc]"
                >
                  Cadastre-se
                </Button>
                <h4>ou</h4>
                <Button
                  type="button"
                  className="w-full mt-4 bg-white text-black border border-gray-300 hover:bg-gray-100"
                >
                  <FcGoogle />
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
