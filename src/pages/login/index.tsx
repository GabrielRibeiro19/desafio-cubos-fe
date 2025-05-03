import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../../components/button'
import { Container } from '../../components/container'
import { Input } from '../../components/input'

const schema = z.object({
  email: z
    .string()
    .email('Insira um email válido')
    .min(1, 'O campo email é obrigatório'),
  password: z.string().min(1, 'O campo senha é obrigatório'),
})

type FormData = z.infer<typeof schema>

export function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  // useEffect(() => {
  //   async function handleLogout() {
  //     await signOut(auth)
  //   }

  //   handleLogout()
  // }, [])

  // function onSubmit(data: FormData) {
  //   signInWithEmailAndPassword(auth, data.email, data.password)
  //     .then(() => {
  //       toast.success('Logado com sucesso!')
  //       navigate('/dashboard', { replace: true })
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       toast.error('Erro ao logar, verifique suas credenciais!')
  //     })
  // }

  return (
    <Container>
      <div className="w-full h-[calc(100vh-188px)] flex justify-center items-center flex-col gap-4">
        <form
          className="bg-[#232225] max-w-xl w-full rounded-lg p-4"
        // onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              label="E-mail"
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              error={errors.email?.message}
              // register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              name="password"
              error={errors.password?.message}
              // register={register}
            />
          </div>
          <div className="flex gap-4 justify-between items-center pt-4">
            <Link to="/register" className="text-[#8E4EC6] font-medium underline">
              Criar conta
            </Link>
           <Button text="Entrar" type="submit" />
          </div>
        </form>
      </div>
    </Container>
  )
}
