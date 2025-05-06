import { Link } from "react-router-dom";
import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { Input } from "../../components/input";
import { useRegister } from "./useRegister";

export function Register() {
  const {
    errors,
    handleSubmit,
    register,
    handleRegister,
    isPendingCreateUser,
  } = useRegister();

  return (
    <Container>
      <div className="w-full h-[calc(100vh-188px)] flex justify-center items-center flex-col gap-4">
        <form
          className="bg-light-card2 dark:bg-dark-card2 max-w-xl w-full rounded-lg p-4"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="mb-3">
            <Input
              label="Nome"
              placeholder="Digite seu nome"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>
          <div className="mb-3">
            <Input
              label="E-mail"
              type="email"
              placeholder="Digite seu e-mail"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <div className="mb-3">
            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>
          <div className="mb-3">
            <Input
              label="Confirmação de senha"
              type="password"
              placeholder="Digite sua senha novamente"
              error={errors.passwordConfirmation?.message}
              {...register("passwordConfirmation")}
            />
          </div>
          <div className="flex gap-4 justify-between items-center pt-4">
            <Link to="/" className="text-[#8E4EC6] font-medium underline">
              Já tem uma conta?
            </Link>
            <Button
              text="Cadastrar"
              type="submit"
              disabled={isPendingCreateUser}
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
