import React from 'react';
import { Transition, Placeholder, Table, Icon, SemanticICONS } from 'semantic-ui-react';

interface Props {
    loading: boolean;
    icon: string;
    label?: any;
    content?: any;
    children?: any;
}

export default function TableItem({ loading, content, label, icon, }: Props) {
    return (
        <Table.Row>
            <Table.Cell style={{ width: '3rem' }} >
                <Icon
                    name={icon as SemanticICONS || 'x'}
                    size='large'
                    style={{color: 'rgb(38, 94, 213)'}} />
            </Table.Cell>
            <Table.Cell>
                <>{label}:</>
            </Table.Cell>
            <Table.Cell>
                {!loading ?
                    <>{content}</> :
                    <Placeholder style={{width: '3rem'}}>
                        <Placeholder.Line />
                    </Placeholder>}
            </Table.Cell>
        </Table.Row>
    )
}