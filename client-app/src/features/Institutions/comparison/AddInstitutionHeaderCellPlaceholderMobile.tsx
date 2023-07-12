import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Table } from 'semantic-ui-react';

export default function AddInstitutionHeaderCellPlaceholderMobile() {
    const { t } = useTranslation();

    return (
        <Table.HeaderCell style={{ minWidth: '50vw', maxWidth: '50vw' }}>
            <Button
                as={Link}
                to='/institutions'
                style={{
                    border: 'dashed 3px #aaa',
                    height: '12rem',
                    width: '12rem',
                    borderRadius: '2rem',
                    textAlign: 'center',
                    margin: '0 2.4rem'
                }}>
                <Icon name='plus' size='huge' style={{ color: '#aaa', margin: '33% 0 0 0', left: '50%' }} />
            </Button>
        </Table.HeaderCell>
    )
}