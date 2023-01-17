import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { PagingParams } from '../../models/pagination';
import { useStore } from '../../stores/store';


export default observer(function PaginationBar() {
    const { institutionStore, specialtyStore } = useStore();
    const { setPagingParams, pagination, loadInstitutions, institutionsRegistry, setPagination } = institutionStore;

    const [loadingNext, setLoadingNext] = useState(false);

    if (!pagination) return <></>;

    function HandleLoad(i: number) {
        setLoadingNext(true);
        setPagingParams(new PagingParams(i));
        loadInstitutions().then(() => {
            setLoadingNext(false);
        });
        }

    let elements = [];
    for (let i = 1; i <= pagination!.totalPages; i++) {
        elements.push((<Button
            onClick={() => HandleLoad(i)}
            content={i}
            key={i}
            active={pagination?.currentPage === i} />))
    }

    return (
        <Segment basic textAlign='center'>
            {elements.map(element => (
                element
            ))}
        </Segment>
    )
})