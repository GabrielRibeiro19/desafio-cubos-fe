import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { AuthContext } from "../../contexts/AuthContex";

const schema = z.object({
  email: z
    .string()
    .email('Insira um email válido')
    .min(1, 'O campo email é obrigatório'),
  password: z.string().min(1, 'O campo senha é obrigatório'),
})

type schemaLoginProps = z.infer<typeof schema>

export function useLogin() {
  const { signIn, isAuthenticated, user } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<schemaLoginProps>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/movies");
    }
  }, [isAuthenticated, user]);

  async function handleLogin(data: schemaLoginProps) {
    setIsSubmitting(true)

    const fnSignIn = await signIn(data)

    setIsSubmitting(false)

    if (fnSignIn) {
      reset()
      navigate("/movies");
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleLogin,
  }
}
