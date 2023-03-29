import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Table, Header, SemanticVERTICALALIGNMENTS } from 'semantic-ui-react';

interface Props {
    array: JSX.Element[];
    header: string;
    headerLess?: boolean;
    pieChart?: boolean;
    data?: number[];
    verticalAlign?: SemanticVERTICALALIGNMENTS;
}

export default function InstitutionComparisonBoardRow({ array, header, pieChart, data, headerLess, verticalAlign }: Props) {

    return (
        <Table.Row verticalAlign={verticalAlign || 'middle'}>
            {!headerLess && <Table.Cell>
                <Header as='h4' textAlign='center' color='grey'>
                    {header}
                </Header>
            </Table.Cell>}
            {array.map((i, index) =>
                <Table.Cell
                    key={index + header}
                    textAlign='center'>
                    {pieChart && data && <PieChart
                        style={{ width: '6rem', height: '6rem', display: 'block', margin: '0 auto' }}
                        startAngle={270}
                        lineWidth={40}
                        radius={40}
                        data={[
                            { value: data[index], color: '#1e47a0' },
                            { value: 100 - data[index], color: '#ccc' },
                        ]} />}
                    {i}
                </Table.Cell>)}
            <Table.Cell>
            </Table.Cell>
        </Table.Row>
    )
}