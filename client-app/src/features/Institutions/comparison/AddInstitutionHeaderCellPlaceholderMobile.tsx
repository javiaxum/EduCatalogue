import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Icon, Table } from 'semantic-ui-react';

export default function AddInstitutionHeaderCellPlaceholderMobile() {
    const { t } = useTranslation();

    return (
        <Table.HeaderCell style={{ minWidth: '50vw', maxWidth: '50vw' }}>
            <div
                style={{
                    border: 'dashed 3px #aaa',
                    height: '12rem',
                    width: '12rem',
                    borderRadius: '2rem',
                    textAlign: 'center',
                    margin: '0 auto'
                }}>
                <Icon name='plus' size='huge' style={{ color: '#aaa', margin: '33% 0 0 0', left: '50%' }} />
            </div>
        </Table.HeaderCell>
    )
}