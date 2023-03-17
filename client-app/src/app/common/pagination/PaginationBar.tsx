import { observer } from 'mobx-react-lite';
import { Button } from 'semantic-ui-react';
import { Pagination } from '../../models/pagination';

interface Props {
    handleLoad: (i: number) => void;
    pagination: Pagination | null
}

export default observer(function PaginationBar({ handleLoad, pagination }: Props) {

    if (!pagination) return <></>;

    let elements = [];
    for (let i = 1; i <= pagination!.totalPages; i++) {
        elements.push((<Button
            onClick={() => handleLoad(i)}
            content={i}
            key={i}
            active={pagination?.currentPage === i} />))
    }

    return (
        <>{elements}</>
    )
})