import { IPagination } from '../../interfaces/IPagination';
import styles from './Pagination.module.css'

const Pagination = ({ currentPage, totalPages, onPageChange }: IPagination) => {
    const handleClick = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className={styles.containerPagination} >
            <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Voltar
            </button>
            <span>
                Página {currentPage} de {totalPages}
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
