import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { AuthContext } from "../../contexts/AuthContex";
import { useCreateUser } from "../../hooks/users/createUser";

const schema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
  email: z
    .string()
    .email('Insira um email válido')
    .min(1, 'O campo email é obrigatório'),
  password: z.string().min(6, 'Minimo de 6 caracteres'),
  passwordConfirmation: z.string().min(1, 'O campo confirmação de senha é obrigatório'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "As senhas não conferem",
  params: {
    field: "passwordConfirmation",
  },
});

type schemaLoginProps = z.infer<typeof schema>

export function useRegister() {
  const { isAuthenticated, user } = useContext(AuthContext);

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<schemaLoginProps>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync: mutateCreateUser, isPending: isPendingCreateUser } =
  useCreateUser()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/movies");
    }
  }, [isAuthenticated, user]);

  async function handleRegister(data: schemaLoginProps) {
    await mutateCreateUser(data)
    reset()

    navigate('/')
  }

  return {
    register,
    handleSubmit,
    errors,
    handleRegister,
    isPendingCreateUser,
  }
}
