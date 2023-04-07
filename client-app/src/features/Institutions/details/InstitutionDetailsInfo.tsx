import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Button, Divider, Grid, Header, Icon, Image, Placeholder, Search, Segment, Table } from 'semantic-ui-react';
import { Specialty } from '../../../app/models/specialty';
import { useStore } from '../../../app/stores/store';
import TableItem from './TableItem';
import TableItemLink from './TableItemLink';
import TitleCollage from './TitleCollage';
import FadePlaceholderAnimationWrapper from '../../../app/common/animations/FadeAnimationWrapper';

export default observer(function InstitutionDetailsInfo() {
    const { institutionStore, specialtyStore } = useStore();
    const { popularSpecialties, getSpecialtyCore, specialtyCoreRegistry } = specialtyStore;
    const { loading, selectedInstitution, getCityById, getRegionById, loadingInitial, setActiveMenuItem } = institutionStore;
    const { t } = useTranslation();
    const { arabToRoman } = require('roman-numbers');
    const [descriptionOpened, setDescriptionOpened] = useState(false);

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    const languages = t("languageOptions", { returnObjects: true }) as [{ text: string; value: string }]
    const studyForms = t("studyFormOptions", { returnObjects: true }) as [{ text: string; value: number }]

    const specialtyLanguages = selectedInstitution?.languageIds.map((i) => languages[i == "en" ? 0 : 1 as number]?.text).join(", ");
    const specialtyStudyForms = selectedInstitution?.studyFormIds.map((i) => studyForms[i - 1]?.text).join(", ");

    return (
        <>
            {isComputerOrTablet &&
                <Grid style={{ width: '90%', margin: '0 auto' }}>
                    <Grid.Row>
                        <TitleCollage />
                        <Button
                            className='show-photos'
                            content={t('Show all photos')}
                            inverted
                            style={{ position: 'absolute', bottom: '2rem', right: '1rem', backgroundColor: 'rgba(51, 51, 51, 0.775)' }}
                            type='button'
                            onClick={() => setActiveMenuItem('Gallery')} />
                    </Grid.Row>
                    <Grid.Row>
                        <Header
                            as='h1'
                            content={t('Overview')} />
                    </Grid.Row>
                    <Grid.Row>
                        <div>
                            <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap', width: '80%' }}>
                                <>
                                    {selectedInstitution?.description.slice(0, descriptionOpened ? 6000 : 400)}
                                    {(!descriptionOpened && selectedInstitution?.description.length! > 400) && <>...
                                        <Button
                                            type='button'
                                            basic
                                            size='small'
                                            onClick={() => setDescriptionOpened(true)}>
                                            {t('Read more') + '>>'}
                                        </Button>
                                    </>}
                                </>
                            </pre>
                        </div>
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
                                                content={arabToRoman(selectedInstitution?.accreditation)} />
                                            <TableItem
                                                loading={(loading || loadingInitial)}
                                                icon='money'
                                                label={t('Average tuition')}
                                                content={selectedInstitution?.averageTuitionUAH ? (Math.round(selectedInstitution?.averageTuitionUAH! / 100) + '00 UAH') : 0} />
                                            <TableItemLink
                                                loading={(loading || loadingInitial)}
                                                icon='chain'
                                                label={
                                                    <a href={`https://${selectedInstitution?.siteURL}`}>
                                                        {t('Visit the homepage') + '>>'}
                                                    </a>} />
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                                {selectedInstitution?.streetAddress && selectedInstitution?.cityId && selectedInstitution?.regionId &&
                                    <Grid.Column width={8}>
                                        <Icon name='point' style={{ color: 'rgb(38, 94, 213)' }} /> {selectedInstitution?.streetAddress},  {" "}
                                        {getCityById(selectedInstitution?.cityId!, selectedInstitution?.regionId!)?.name}, {" "}
                                        {getRegionById(selectedInstitution?.regionId!)?.name} <br /><br />
                                        {selectedInstitution?.contactInformation}
                                    </Grid.Column>}
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
                                        content={((selectedInstitution?.specialtiesCount! / specialtyCoreRegistry.size) * 100).toFixed(1) + '%'} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='language'
                                        label={t('Language')}
                                        content={specialtyLanguages} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='address book'
                                        label={t('Study form')}
                                        content={specialtyStudyForms} />
                                    <TableItem
                                        loading={(loading || loadingInitial)}
                                        icon='address book'
                                        label={t('Free education')}
                                        content={<Icon name={selectedInstitution?.scholarship ? 'check' : 'x'} size='large' />} />
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
                                        </Table.Row>)}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Row>
                </Grid>}
            {isMobile &&
                <Grid style={{ width: '100%', margin: 0 }}>
                    <Grid.Row style={{ padding: 0 }}>
                        <FadePlaceholderAnimationWrapper
                            loading={loadingInitial || loading}
                            placeholder={
                                <Placeholder style={{ width: '100%', minHeight: '24rem', maxWidth: '100%' }}>
                                    <Placeholder.Image />
                                </Placeholder>}>
                            <div style={{ height: '24rem', width: '100%' }}>
                                <Image
                                    alt='TitleImage'
                                    src={selectedInstitution?.titleImageUrl || '/assets/placeholder.png'}
                                    style={{ objectFit: 'cover', height: '100%', width: '100%', overflow: 'hidden' }} />
                                <Button
                                    className='show-photos'
                                    content={t('Show all photos')}
                                    inverted
                                    style={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: 'rgba(51, 51, 51, 0.775)' }}
                                    type='button'
                                    onClick={() => setActiveMenuItem('Gallery')} />
                            </div>
                        </FadePlaceholderAnimationWrapper>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem' }}>
                        <Header
                            as='h1'
                            content={t('Overview')} />
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem' }}>
                        <div>
                            <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap', width: '100%' }}>
                                <>
                                    {selectedInstitution?.description.slice(0, descriptionOpened ? 6000 : 400)}
                                    {(!descriptionOpened && selectedInstitution?.description.length! > 400) && <>...
                                        <Button
                                            type='button'
                                            basic
                                            size='small'
                                            onClick={() => setDescriptionOpened(true)}>
                                            {t('Read more') + '>>'}
                                        </Button>
                                    </>}
                                </>
                            </pre>
                        </div>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem' }}>
                        <Table basic='very' compact unstackable>
                            <Table.Body>
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='check'
                                    label={t('Accreditation')}
                                    content={arabToRoman(selectedInstitution?.accreditation)} />
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='money'
                                    label={t('Average tuition')}
                                    content={Math.round(selectedInstitution?.averageTuitionUAH! / 100) + '00 UAH'} />
                                <TableItemLink
                                    loading={(loading || loadingInitial)}
                                    icon='chain'
                                    label={
                                        <a href={`https://${selectedInstitution?.siteURL}`}>
                                            {t('Visit the homepage') + '>>'}
                                        </a>} />
                                <TableItemLink
                                    loading={(loading || loadingInitial)}
                                    icon='point'
                                    label={selectedInstitution?.streetAddress + " " +
                                        getCityById(selectedInstitution?.cityId!, selectedInstitution?.regionId!)?.name + " " +
                                        getRegionById(selectedInstitution?.regionId!)?.name} />
                            </Table.Body>
                        </Table>
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem' }}>
                        <Segment style={{ margin: '0 auto', width: '100%' }}>
                            <Grid divided>
                                <Grid.Column width={2}>
                                    <Icon name='info' size='large' style={{ display: 'inline', color: 'rgb(38, 94, 213)' }} />
                                </Grid.Column>
                                <Grid.Column width={14}>
                                    {selectedInstitution?.contactInformation}
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row verticalAlign='middle' style={{ padding: '0 1rem' }}>
                        <Header icon style={{ margin: 0 }}>
                            <Icon name='graduation' style={{ margin: 0 }} />
                        </Header>
                        <Header
                            as='h1'
                            content={t('Students')}
                            style={{ margin: '1rem 0 0 0' }} />
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem' }}>
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
                    <Grid.Row style={{ padding: '1rem' }}>
                        <Segment textAlign='center' style={{ margin: '0 auto' }}>
                            <Header as={'h2'} style={{ margin: 0 }}>
                                {selectedInstitution?.undergraduatesEnrolled}
                            </Header>
                            <Header style={{ margin: 0, top: '1rem' }}>
                                {t('Undergraduates enrolled')}
                            </Header>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row verticalAlign='middle' style={{ padding: '0 1rem' }}>
                        <Header icon style={{ margin: 0 }}>
                            <Icon name='universal access' style={{ margin: '0 0.5rem 0 0' }} />
                        </Header>
                        <Header
                            as='h1'
                            content={t('Specialties')}
                            style={{ margin: '1rem 0 0 0' }} />
                    </Grid.Row>
                    <Grid.Row style={{ padding: '1rem' }}>
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
                                    content={((selectedInstitution?.specialtiesCount! / specialtyCoreRegistry.size) * 100).toFixed(1) + '%'} />
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='language'
                                    label={t('Language')}
                                    content={specialtyLanguages} />
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='address book'
                                    label={t('Study form')}
                                    content={specialtyStudyForms} />
                                <TableItem
                                    loading={(loading || loadingInitial)}
                                    icon='address book'
                                    label={t('Free education')}
                                    content={<Icon name={selectedInstitution?.scholarship ? 'check' : 'x'} size='large' />} />
                            </Table.Body>
                        </Table>
                        <Segment style={{ width: '100%' }}>
                            <Header
                                as='h4'
                                content={t('10 MOST POPULAR SPECIALTIES')} />
                            <Table basic='very' compact unstackable>
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
                                        </Table.Row>)}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Row>
                </Grid >}
        </>
    )
})