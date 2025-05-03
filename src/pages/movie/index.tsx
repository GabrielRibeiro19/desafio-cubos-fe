import { motion } from "motion/react";
import posterImg from "../../assets/Poster.svg";
import { Button } from "../../components/button";
import { Container } from "../../components/container";

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#23222599] p-3 rounded">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

function RatingCircle({ percentage }: { percentage: number }) {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="w-24 h-24 rounded-full border-4 border-yellow-400 flex items-center justify-center text-yellow-400 font-bold text-lg bg-black/60 self-center"
    >
      {percentage}
      <span className="text-white text-xs">%</span>
    </motion.div>
  );
}

export function Movie() {
  return (
    <Container>
      <div className="flex flex-col bg-[#1C1C1E] text-white p-6 rounded-lg shadow-lg gap-8 max-w-6xl mx-auto">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Bumblebee</h1>
            <p className="text-[#EEEEF0] text-sm">
              Título original: Bumblebee{" "}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button text="Deletar" variant="secondary" />
            <Button text="Editar" />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="h-full">
          <img
            src={posterImg}
            alt={"Poster do filme"}
            className="w-[250px] rounded-sm shadow-md"
          />

          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-4 justify-between">
              <p className="text-[#EEEEF0] text-sm">Todo herói tem um começo</p>
              <div className="flex items-center gap-4">
                <InfoBox label="POPULARIDADE" value={"50"} />
                <InfoBox label="VOTOS" value={"500"} />
                <RatingCircle percentage={40} />
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-4 w-full">
                <div className="bg-[#2C2C2E] p-3 rounded">
                  <p className="text-gray-400">SINOPSE</p>
                  <p className="text-sm">
                    “Bumblebee” é um filme que se passa em 1987 e conta a
                    história de um Autobot chamado Bumblebee que encontra
                    refúgio em um ferro-velho de uma pequena cidade praiana da
                    Califórnia. Charlie, uma adolescente prestes a completar 18
                    anos, encontra Bumblebee machucado e sem condições de uso.
                    Quando ela o revive, percebe que este não é qualquer fusca
                    amarelo1. O filme é uma mistura de animação e drama, com um
                    tom leve e divertido, e se destaca por sua ambientação nos
                    anos 80 e pela trilha sonora perfeita2.
                  </p>
                </div>

                <div className="bg-[#2C2C2E] p-3 rounded">
                  <p className="text-xs text-gray-400">GENEROS</p>
                  <div className="flex flex-wrap gap-2">
                    {/* {genres.map((genre, index) => ( */}
                    <Button
                      variant="secondary"
                      text="Ação"
                      className="bg-[#C150FF2E]"
                    />
                    <Button
                      variant="secondary"
                      text="Ação"
                      className="bg-[#C150FF2E]"
                    />
                    <Button
                      variant="secondary"
                      text="Ação"
                      className="bg-[#C150FF2E]"
                    />
                    {/* ))} */}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full">
              <div className="w-full grid grid-cols-2 gap-4 text-sm">
                <InfoBox label="LANÇAMENTO" value={"12/02/2025"} />
                <InfoBox label="DURAÇÃO" value={"1h 53m"} />
                <InfoBox label="SITUAÇÃO" value={"Lançado"} />
                <InfoBox label="IDIOMA" value={"Inglês"} />
              </div>

              <div className="w-full grid grid-cols-3 gap-4 text-sm">
                <InfoBox label="ORÇAMENTO" value={"$135M"} />
                <InfoBox label="RECEITA" value={"$467.99M"} />
                <InfoBox label="LUCRO" value={"$332.99M"} />
              </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Container>
  );
}
