import React from 'react';
import { Header, Table } from 'semantic-ui-react';

interface Props {
    name: string;
    columns: number;
}

export default function InstiutionComparisonParameterCellFixedMobile({ name, columns }: Props) {
    return (
        <Table.Row>
            <Table.Cell colSpan={columns}>
                <Header as='h4' textAlign='center' color='grey' style={{ position: 'absolute', margin: '0.3rem 0 0 0.3rem' }}>
                    {name}
                </Header>
                <Header as='h4' textAlign='center' color='grey'>
                    {" "}
                </Header>
            </Table.Cell>
        </Table.Row>
    )
}