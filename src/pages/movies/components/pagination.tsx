import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "../../../components/button";

interface MoviesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function MoviesPagination({ currentPage, totalPages, onPageChange }: MoviesPaginationProps) {
  if (totalPages <= 1) {
    return null; // Não exibir paginação se só houver uma página
  }

  // Função para gerar array de páginas a serem exibidas
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Mostrar todas as páginas se o total for menor ou igual ao máximo visível
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Lógica para mostrar páginas com elipses
      if (currentPage <= 3) {
        // Caso 1: Perto do início
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(-1); // Elipse
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Caso 2: Perto do final
        pageNumbers.push(1);
        pageNumbers.push(-1); // Elipse
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Caso 3: No meio
        pageNumbers.push(1);
        pageNumbers.push(-1); // Elipse
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push(-1); // Elipse
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex w-full justify-center items-center gap-2">
      <Button
        text={<IoIosArrowBack size={25}/>}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {pageNumbers.map((page, index) =>
        page === -1 ? (
          <span key={`ellipsis-${index}`} className="text-gray-400 mx-1">...</span>
        ) : (
          <Button
            key={page}
            text={String(page)}
            disabled={page === currentPage}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? "bg-[#C150FF2E]" : ""}
          />
        )
      )}

      <Button
        text={<IoIosArrowForward size={25}/>}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}
