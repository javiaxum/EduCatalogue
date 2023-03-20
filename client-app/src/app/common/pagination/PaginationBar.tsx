import { observer } from 'mobx-react-lite';
import { Button } from 'semantic-ui-react';
import { Pagination } from '../../models/pagination';

interface Props {
    handleLoad: (i: number) => void;
    pagination: Pagination | null
}

export default observer(function PaginationBar({ handleLoad, pagination }: Props) {

    if (!pagination) return <></>;
    const maxButtons = 6;
    let elements = [];
    for (let i = 1; i <= pagination!.totalPages; i++) {
        if (i < (maxButtons - 1))
            elements.push((<Button
                onClick={() => handleLoad(i)}
                content={i}
                key={i}
                active={pagination?.currentPage === i} />))
        else if (i > (pagination!.totalPages - 1))
            elements.push((<Button
                onClick={() => handleLoad(i)}
                content={i}
                key={i}
                active={pagination?.currentPage === i} />))
        else if (i == (pagination!.totalPages - 2)) elements.push(<div style={{display: 'inline', padding: '0 0.2rem 0 0'}}>...</div>);
    }
    return (
        <>{elements}</>
    )
})