import React from 'react';
import { Transition, Placeholder, Table, Icon, SemanticICONS } from 'semantic-ui-react';

interface Props {
    loading: boolean;
    icon: string;
    label?: any;
    children?: any;
}

export default function TableItemLink({ loading, label, icon, }: Props) {
    return (
        <Table.Row>
            <Table.Cell style={{ width: '3rem' }} >
                <Icon
                    name={icon as SemanticICONS || 'x'}
                    size='large'
                    color='blue' />
            </Table.Cell>
            <Table.Cell>
                {!loading ?
                    <>{label}</> :
                    <Placeholder>
                        <Placeholder.Line />
                    </Placeholder>}
            </Table.Cell>
            <Table.Cell>
            </Table.Cell>
        </Table.Row>
    )
}