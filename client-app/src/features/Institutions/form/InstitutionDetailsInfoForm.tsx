import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { Button, Container, Divider, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import ImageUploadWidgetCropper from '../../../app/common/imageUpload/titleImage/ImageUploadWidgetCropper';
import ImageUploadWidgetDropzone from '../../../app/common/imageUpload/titleImage/ImageUploadWidgetDropzone';
import { useStore } from '../../../app/stores/store';
import TableItem from '../details/TableItem';
import TableItemLink from '../details/TableItemLink';
import TitleCollage from '../details/TitleCollage';

export default observer(function InstitutionDetailsInfoForm() {
    const { institutionStore, specialtyStore } = useStore();
    const {
        selectedInstitution,
        setTitleImage,
        uploading,
        loading,
        loadingInitial,
        getCityById,
        getRegionById } = institutionStore;

    const { specialtyCoreRegistry, popularSpecialties, getSpecialtyCore } = specialtyStore;

    const { t } = useTranslation();

    const degrees = t("degreeOptions", { returnObjects: true }) as [{ text: string; value: number }]
    const languages = t("languageOptions", { returnObjects: true }) as [{ text: string; value: string }]
    const studyForms = t("studyFormOptions", { returnObjects: true }) as [{ text: string; value: number }]

    const specialtyLanguages = selectedInstitution?.languageIds.map((i) => languages[i == "en" ? 0 : 1 as number]?.text).join(", ");
    const specialtyStudyForms = selectedInstitution?.studyFormIds.map((i) => studyForms[i - 1]?.text).join(", ");

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });


    return (
        <>
            {isComputerOrTablet &&
                <Grid style={{ width: '90%', margin: '0 auto ' }}>
                    <Grid.Row>
                        <TitleCollage />
                    </Grid.Row>
                    <Grid.Row>
                        <Header
                            as='h1'
                            content={t('Overview')} />
                        <CustomTextArea
                            width='90%'
                            rows={10}
                            placeholder={t('Description')}
                            name='description' />
                    </Grid.Row>
                    <Grid.Row>
                        <Segment style={{ width: '90%' }}>
                            <Grid>
                                <Grid.Column width={8}>
                                    <Table basic='very' compact>
                                        <Table.Body>
                                            <TableItem
                                                loading={(loading || loadingInitial)}
                                                icon='check'
                                                label={t('Accreditation')}
                                                content={
                                                    <CustomTextInput
                                                        width='5.5rem'
                                                        type='number'
                                                        placeholder={t('Accreditation')}
                                                        name='accreditation' />} />
                                            <TableItem
                                                loading={(loading || loadingInitial)}
                                                icon='money'
                                                label={t('Average tuition')}
                                                content={Math.round(selectedInstitution?.averageTuitionUAH! / 100) + '00 UAH'} />
                                            <TableItemLink
                                                loading={(loading || loadingInitial)}
                                                icon='chain'
                                                label={
                                                    <CustomTextInput
                                                        width='100%'
                                                        placeholder={t('Homepage URL')}
                                                        name='siteURL' />} />
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Icon name='point' color='blue' /> {selectedInstitution?.streetAddress},  {" "}
                                    {getCityById(selectedInstitution?.cityId!, selectedInstitution?.regionId!)?.name}, {" "}
                                    {getRegionById(selectedInstitution?.regionId!)?.name} <br /><br />
                                    <CustomTextArea
                                        rows={10}
                                        width='100%'
                                        placeholder={t('Contact information')}
                                        name='contactInformation' />
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row>
                        <Header
                            as='h1'
                            content={t('Students')} />
                        <Segment style={{ width: '90%' }} basic>
                            <Grid columns={2} stackable textAlign='center'>
                                <Divider vertical />
                                <Grid.Row verticalAlign='middle'>
                                    <Grid.Column>
                                        <Header icon>
                                            <Icon name='graduation' />
                                        </Header>
                                        <Table basic='very' compact style={{ width: '22rem' }}>
                                            <Table.Body>
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='check'
                                                    label={t('Acceptance rate')}
                                                    content={selectedInstitution?.acceptanceRate.toFixed(1) + '%'} />
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='graduation'
                                                    label={t('Graduation rate')}
                                                    content={selectedInstitution?.graduationRate.toFixed(1) + '%'} />
                                                <TableItem
                                                    loading={(loading || loadingInitial)}
                                                    icon='briefcase'
                                                    label={t('Graduate employment rate')}
                                                    content={selectedInstitution?.graduateEmploymentRate.toFixed(1) + '%'} />
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment>
                                            <Header as={'h2'} style={{ margin: 0 }}>
                                                {selectedInstitution?.undergraduatesEnrolled}
                                            </Header>
                                            <Header style={{ margin: 0, top: '1rem' }}>
                                                {t('Undergraduates enrolled')}
                                            </Header>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row>
                        <Header
                            as='h1'
                            content={t('Specialties')}
                            style={{ display: 'block' }} />
                    </Grid.Row>
                    <Grid.Row>
                        <Segment basic style={{ width: '40%', display: 'block' }}>
                            <Table basic='very' compact>
                                <Table.Body>
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='check'
                                        label={t('Specialties count')}
                                        content={selectedInstitution?.specialtiesCount} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='check'
                                        label={t('Specialties coverage')}
                                        content={selectedInstitution?.graduateEmploymentRate.toFixed(1) + '%'} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='briefcase'
                                        label={t('Graduate employment rate')}
                                        content={((selectedInstitution?.specialtiesCount! / specialtyCoreRegistry.size) * 100).toFixed(1) + '%'} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='language'
                                        label={t('Language')}
                                        content={
                                            <CustomSelectInput
                                                width='18rem'
                                                options={languages}
                                                placeholder={t('Language')}
                                                name='languageIds'
                                                multiple={true} />} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='address book'
                                        label={t('Study form')}
                                        content={
                                            <CustomSelectInput
                                                width='18rem'
                                                options={studyForms}
                                                placeholder={t('Study form')}
                                                name='studyFormIds'
                                                multiple={true} />} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='address book'
                                        label={t('Scholarships')}
                                        content={<Icon name={selectedInstitution?.scholarship ? 'check' : 'x'} size='large' />} />
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Row>
                </Grid>}
            {isMobile &&
                <Grid style={{ width: '95%', margin: '0 auto' }}>
                    <Grid.Row>
                        <TitleCollage />
                    </Grid.Row>
                    <Grid.Row>
                        <Header
                            as='h1'
                            content={t('Overview')} />
                        <CustomTextArea
                            width='90%'
                            rows={10}
                            placeholder={t('Description')}
                            name='description' />
                    </Grid.Row>
                    <Grid.Row>
                        <Table basic='very' compact unstackable>
                            <Table.Body>
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='check'
                                    label={t('Accreditation')}
                                    content={
                                        <CustomTextInput
                                            width='5.5rem'
                                            type='number'
                                            placeholder={t('Accreditation')}
                                            name='accreditation' />} />
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='money'
                                    label={t('Average tuition')}
                                    content={Math.round(selectedInstitution?.averageTuitionUAH! / 100) + '00 UAH'} />
                                <TableItemLink
                                    loading={(loading || loadingInitial)}
                                    icon='chain'
                                    label={
                                        <CustomTextInput
                                            width='100%'
                                            placeholder={t('Homepage URL')}
                                            name='siteURL' />} />
                                <TableItemLink
                                    loading={(loading || loadingInitial)}
                                    icon='point'
                                    label={selectedInstitution?.streetAddress + " " +
                                        getCityById(selectedInstitution?.cityId!, selectedInstitution?.regionId!)?.name + " " +
                                        getRegionById(selectedInstitution?.regionId!)?.name} /> <br /><br />
                            </Table.Body>
                        </Table>
                    </Grid.Row>
                    <Grid.Row>
                        <Segment style={{ margin: '0 auto', width: '100%' }}>
                            <Grid divided>
                                <Grid.Column width={2}>
                                    <Icon name='info' size='large' color='blue' style={{ display: 'inline' }} />
                                </Grid.Column>
                                <Grid.Column width={14}>
                                    <CustomTextArea
                                        rows={10}
                                        width='100%'
                                        placeholder={t('Contact information')}
                                        name='contactInformation' />
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row verticalAlign='middle'>
                        <Header icon style={{ margin: 0 }}>
                            <Icon name='graduation' style={{ margin: 0 }} />
                        </Header>
                        <Header
                            as='h1'
                            content={t('Students')}
                            style={{ margin: '1rem 0 0 0' }} />
                    </Grid.Row>
                    <Grid.Row style={{ padding: 0 }}>
                        <Table basic='very' compact unstackable>
                            <Table.Body>
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='check'
                                    label={t('Acceptance rate')}
                                    content={selectedInstitution?.acceptanceRate.toFixed(1) + '%'} />
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='graduation'
                                    label={t('Graduation rate')}
                                    content={selectedInstitution?.graduationRate.toFixed(1) + '%'} />
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='briefcase'
                                    label={t('Graduate employment rate')}
                                    content={selectedInstitution?.graduateEmploymentRate.toFixed(1) + '%'} />
                            </Table.Body>
                        </Table>
                    </Grid.Row>
                    <Grid.Row>
                        <Segment textAlign='center' style={{ margin: '0 auto' }}>
                            <Header as={'h2'} style={{ margin: 0 }}>
                                {selectedInstitution?.undergraduatesEnrolled}
                            </Header>
                            <Header style={{ margin: 0, top: '1rem' }}>
                                {t('Undergraduates enrolled')}
                            </Header>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row verticalAlign='middle'>
                        <Header icon style={{ margin: 0 }}>
                            <Icon name='universal access' style={{ margin: '0 0.5rem 0 0' }} />
                        </Header>
                        <Header
                            as='h1'
                            content={t('Specialties')}
                            style={{ margin: '1rem 0 0 0' }} />
                    </Grid.Row>
                    <Grid.Row>
                        <Table basic='very' compact unstackable>
                            <Table.Body>
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='check'
                                    label={t('Specialties count')}
                                    content={selectedInstitution?.specialtiesCount} />
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='check'
                                    label={t('Specialties coverage')}
                                    content={selectedInstitution?.graduateEmploymentRate.toFixed(1) + '%'} />
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='briefcase'
                                    label={t('Graduate employment rate')}
                                    content={((selectedInstitution?.specialtiesCount! / specialtyCoreRegistry.size) * 100).toFixed(1) + '%'} />
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='language'
                                    label={t('Language')}
                                    content={
                                        <CustomSelectInput
                                            width='18rem'
                                            options={languages}
                                            placeholder={t('Language')}
                                            name='languageIds'
                                            multiple={true} />} />
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='address book'
                                    label={t('Study form')}
                                    content={
                                        <CustomSelectInput
                                            width='18rem'
                                            options={studyForms}
                                            placeholder={t('Study form')}
                                            name='studyFormIds'
                                            multiple={true} />} />
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='address book'
                                    label={t('Scholarships')}
                                    content={<Icon name={selectedInstitution?.scholarship ? 'check' : 'x'} size='large' />} />
                            </Table.Body>
                        </Table>
                    </Grid.Row>
                </Grid >}
        </>
    )
})

