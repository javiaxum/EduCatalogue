import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button, Container, Divider, Grid, Header, Icon, Label, Segment, Table } from 'semantic-ui-react';
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import ImageUploadWidgetCropper from '../../../app/common/imageUpload/titleImage/ImageUploadWidgetCropper';
import ImageUploadWidgetDropzone from '../../../app/common/imageUpload/titleImage/ImageUploadWidgetDropzone';
import { useStore } from '../../../app/stores/store';
import TitleCollage from '../details/TitleCollage';

export default observer(function InstitutionDetailsInfoForm() {
    const { institutionStore, specialtyStore } = useStore();
    const {
        selectedInstitution,
        setTitleImage,
        uploading,
        loading,
        getCityById,
        getRegionById } = institutionStore;

    const { specialtyCoreRegistry, popularSpecialties, getSpecialtyCore } = specialtyStore;

    const { t } = useTranslation();

    const degrees = t("degreeOptions", { returnObjects: true }) as [{ text: string; value: number }]
    const languages = t("languageOptions", { returnObjects: true }) as [{ text: string; value: string }]
    const studyForms = t("studyFormOptions", { returnObjects: true }) as [{ text: string; value: number }]

    const specialtyLanguages = selectedInstitution?.languageIds.map((i) => languages[i == "en" ? 0 : 1 as number]?.text).join(", ");
    const specialtyStudyForms = selectedInstitution?.studyFormIds.map((i) => studyForms[i - 1]?.text).join(", ");


    return (
        <>
            {!loading &&
                <Grid style={{ width: '90%', margin: '0 auto 0 auto' }}>
                    <Grid.Row>
                        <TitleCollage />
                    </Grid.Row>
                    <Grid.Row>
                        <Header
                            as='h1'
                            content={t('Overview')} />
                    </Grid.Row>
                    <Grid.Row>
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
                                            <Table.Row>
                                                <Table.Cell style={{ minWidth: '3rem' }}>
                                                    <Icon
                                                        name='check'
                                                        size='large'
                                                        color='blue' />
                                                </Table.Cell>
                                                <Table.Cell style={{ minWidth: '12rem', maxWidth: '12rem' }}>
                                                    {t('Accreditation')}:
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <CustomTextInput
                                                        width='5.5rem'
                                                        type='number'
                                                        placeholder={t('Accreditation')}
                                                        name='accreditation' />
                                                </Table.Cell>
                                            </Table.Row>
                                            <Table.Row >
                                                <Table.Cell>
                                                    <Icon
                                                        name='money'
                                                        size='large'
                                                        color='blue' />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {t('Average tuition') + ': '}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {Math.round(selectedInstitution?.averageTuitionUAH! / 100)}00 UAH
                                                </Table.Cell>
                                            </Table.Row>
                                            <Table.Row >
                                                <Table.Cell>
                                                    <Icon
                                                        name='chain'
                                                        size='large'
                                                        color='blue' />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {t('Homepage')}:
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <CustomTextInput
                                                        width='100%'
                                                        placeholder={t('Homepage URL')}
                                                        name='siteURL' />
                                                </Table.Cell>
                                            </Table.Row>
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
                                                <Table.Row>
                                                    <Table.Cell style={{ width: '3rem' }}>
                                                        <Icon
                                                            name='check'
                                                            size='large'
                                                            color='blue' />
                                                    </Table.Cell>
                                                    <Table.Cell style={{ minWidth: '8rem', maxWidth: '10rem' }}>
                                                        {t('Acceptance rate')}:
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {selectedInstitution?.acceptanceRate.toFixed(1)}%
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell style={{ width: '3rem' }} >
                                                        <Icon
                                                            name='graduation'
                                                            size='large'
                                                            color='blue' />
                                                    </Table.Cell>
                                                    <Table.Cell style={{ minWidth: '8rem', maxWidth: '10rem' }}>
                                                        {t('Graduation rate')}:
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {selectedInstitution?.graduationRate.toFixed(1)}%
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell style={{ width: '3rem' }} >
                                                        <Icon
                                                            name='briefcase'
                                                            size='large'
                                                            color='blue' />
                                                    </Table.Cell>
                                                    <Table.Cell style={{ minWidth: '8rem', maxWidth: '10rem' }}>
                                                        {t('Graduate employment rate')}:
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {selectedInstitution?.graduateEmploymentRate.toFixed(1)}%
                                                    </Table.Cell>
                                                </Table.Row>
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
                        <Segment basic style={{ width: '50%', display: 'block' }}>
                            <Table basic='very' compact>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell style={{ width: '3rem' }}>
                                            <Icon
                                                name='check'
                                                size='large'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell style={{ minWidth: '8rem', maxWidth: '10rem' }}>
                                            {t('Specialties count')}:
                                        </Table.Cell>
                                        <Table.Cell>
                                            {selectedInstitution?.specialtiesCount}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{ width: '3rem' }}>
                                            <Icon
                                                name='check'
                                                size='large'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell style={{ minWidth: '8rem', maxWidth: '10rem' }}>
                                            {t('Specialties coverage')}:
                                        </Table.Cell>
                                        <Table.Cell>
                                            {(selectedInstitution?.specialtiesCount! / specialtyCoreRegistry.size) * 100}%
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon
                                                padding='0.4em 0.2em 0.4em 0.2em'
                                                name='language'
                                                size='big'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {t('Language') + ': '}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <CustomSelectInput
                                                width='18rem'
                                                options={languages}
                                                placeholder={t('Language')}
                                                name='languageIds'
                                                multiple={true} />
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon
                                                padding='0.4em 0.2em 0.4em 0.2em'
                                                name='address book'
                                                size='big'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {t('Study form') + ': '}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <CustomSelectInput
                                                width='18rem'
                                                options={studyForms}
                                                placeholder={t('Study form')}
                                                name='studyFormIds'
                                                multiple={true} />
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Icon
                                                padding='0.4em 0.2em 0.4em 0.2em'
                                                name='address card'
                                                size='big'
                                                color='blue' />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {t('Scholarships') + ': '}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Icon name={selectedInstitution?.scholarship ? 'check' : 'x'} size='large' />
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Segment>
                        <Segment style={{ width: '90%' }}>
                            <Header
                                as='h4'
                                content={t('10 MOST POPULAR SPECIALTIES')} />
                            <Table basic='very' compact>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            {t('Specialty')}
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            {t('Undergraduates')} / %
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {popularSpecialties && popularSpecialties.map((specialty) =>
                                        <Table.Row key={specialty.id}>
                                            <Table.Cell>
                                                {specialty.localSpecialtyCode} {getSpecialtyCore(specialty.localSpecialtyCode!)?.name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {specialty.undergraduatesEnrolled} / {((specialty.undergraduatesEnrolled / selectedInstitution?.undergraduatesEnrolled!) * 100).toPrecision(3)}%
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Row>
                </Grid>}
        </>
    )
})

