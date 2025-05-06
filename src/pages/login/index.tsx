import { Link } from "react-router-dom";
import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { Input } from "../../components/input";
import { useLogin } from "./useLogin";

export function Login() {
  const { errors, handleSubmit, register, handleLogin, isSubmitting } =
    useLogin();

  return (
    <Container>
      <div className="w-full h-[calc(100vh-188px)] flex justify-center items-center flex-col gap-4">
        <form
          className="bg-light-card2 dark:bg-dark-card2 max-w-xl w-full rounded-lg p-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="mb-3">
            <Input
              label="E-mail"
              type="email"
              placeholder="Digite seu e-mail"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>
          <div className="mb-3">
            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>
          <div className="flex gap-4 justify-between items-center pt-4">
            <Link
              to="/register"
              className="text-[#8E4EC6] font-medium underline"
            >
              Criar conta
            </Link>
            <Button text="Entrar" type="submit" disabled={isSubmitting} />
          </div>
        </form>
      </div>
    </Container>
  );
}
