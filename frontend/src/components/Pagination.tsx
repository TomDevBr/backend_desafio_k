import { IPagination } from '../interfaces/IPagination';


const Pagination = ({ currentPage, totalPages, onPageChange }: IPagination) => {
    const handleClick = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Voltar
            </button>
            <span style={{ margin: '0 10px' }}>
                {currentPage} de {totalPages}
            </span>
            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Próxima
            </button>
        </div>
    );
};

export default Pagination;
