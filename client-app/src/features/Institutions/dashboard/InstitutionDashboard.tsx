import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';
import InstitutionDetails from '../details/InstitutionDetails';
import InstitutionForm from '../form/InstitutionForm';
import InstitutionsList from './InstitutionsList';

export interface Props {
    institutions: Institution[];
    selectedInstitution: Institution | undefined;
    selectInstitution: (id: string) => void;
    cancelSelectInstitution: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean;
    handleInstitutionFormSubmit: (institution: Institution) => void;
}

export default function InstitutionDashboard({ institutions, selectedInstitution, selectInstitution, cancelSelectInstitution, openForm, closeForm, editMode, handleInstitutionFormSubmit }: Props) {
    return (
        <Grid>
            <Grid.Column width={10}>
                <InstitutionsList institutions={institutions} selectInstitution={selectInstitution} />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedInstitution && !editMode &&
                    <InstitutionDetails
                        institution={selectedInstitution}
                        cancelSelectInstitution={cancelSelectInstitution}
                        openForm={openForm}
                    />}
                {editMode &&
                    <InstitutionForm
                        closeForm={closeForm}
                        selectedInstitution={selectedInstitution}
                        handleInstitutionFormSubmit={handleInstitutionFormSubmit} />}
            </Grid.Column>
        </Grid>
    )
}