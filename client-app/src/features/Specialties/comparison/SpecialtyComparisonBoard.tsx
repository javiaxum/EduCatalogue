import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Image, Header, Icon, Label, Table, Transition } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Institution } from '../../../app/models/institution';
import { Specialty } from '../../../app/models/specialty';
import { useStore } from '../../../app/stores/store';
import AddInstitutionHeaderCellPlaceholderMobile from '../../Institutions/comparison/AddInstitutionHeaderCellPlaceholderMobile';
import AddSpecialtyHeaderCellPlaceholderMobile from '../../Institutions/comparison/AddSpecialtyHeaderCellPlaceholderMobile';
import InstitutionComparisonBoardRow from '../../Institutions/comparison/InstitutionComparisonBoardRow';
import InstiutionComparisonParameterCellFixedMobile from '../../Institutions/comparison/InstiutionComparisonParameterCellFixedMobile';
import { router } from '../../routers/Routes';


export default observer(function SpecialtyComparisonBoard() {
    const { institutionStore, specialtyStore } = useStore();
    const { selectedSpecialtyIds,
        loadSpecialty,
        toggleSelectedSpecialtyId,
        getSpecialtyCoreISCEDString,
        getSpecialtyCore,
        getSkill } = specialtyStore;

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    const [selectedSpecialties, setSelectedSpecialties] = useState<Specialty[]>([]);
    const [specialtyInstitutions, setSpecialtyInstitutions] = useState<Map<string, Institution>>(new Map<string, Institution>());
    const [loading, setLoading] = useState<boolean>(true);
    const [scrollY, setScrollY] = useState<number>(0);
    const location = useLocation();

    const { t } = useTranslation();

    useEffect(() => {
        if (selectedSpecialties.length < selectedSpecialtyIds.length)
            loadSpecialties().then((result) => {
                setSelectedSpecialties(Array.from(result.values()));
                loadInstitutions(Array.from(result.values()).map((s) => s.institutionId)).then((result) => { setSpecialtyInstitutions(result); setLoading(false); })
            });

        async function loadSpecialties() {
            let specialties = new Map<string, Specialty>();
            await Promise.all(selectedSpecialtyIds.map((x) => loadSpecialty(x).then((result) => { if (result) specialties.set(x, result);  })));
            return specialties;
        }
        async function loadInstitutions(ids: string[]) {
            let institutions = new Map<string, Institution>();
            await Promise.all(ids.map((x) => institutionStore.loadInstitution(x).then((result) => { if (result) institutions.set(x, result);  })));
            return institutions;
        }
    }, [institutionStore, loadSpecialty, selectedSpecialties, selectedSpecialtyIds])

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, [])

    useEffect(() => {
        if (selectedSpecialtyIds.length === 0 && location.pathname === '/specialties/comparison')
            router.navigate('/institutions');
    }, [location.pathname, selectedSpecialtyIds])

    const componentRef = useRef<HTMLDivElement>(null);
    const handleWindowScroll = (e: any) => {
        const component = componentRef.current;
        component!.style.left = `-${e.currentTarget.scrollLeft}px`;
    };


    const degrees = t("degreeOptions", { returnObjects: true }) as [{ text: string; value: number }]
    const languages = t("languageOptions", { returnObjects: true }) as [{ text: string; value: string }]
    const studyForms = t("studyFormOptions", { returnObjects: true }) as [{ text: string; value: number }]

    if (loading) return <LoadingComponent />

    return (
        <>
            {isComputerOrTablet &&
                <>
                    <div onScroll={(e) => handleWindowScroll(e)} style={{ overflow: 'scroll' }} >
                        <Transition
                            visible={scrollY > 300}
                            duration={200}
                            transitionOnMount>
                            <div ref={componentRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000, overflow: 'scroll' }}>
                                <Table celled padded selectable compact collapsing>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell style={{ minWidth: '18rem', maxWidth: '18rem' }} />
                                            {selectedSpecialties.map((i) => {
                                                const institution = specialtyInstitutions.get(i.institutionId);
                                                return (
                                                    <Table.HeaderCell
                                                        textAlign='center'
                                                        key={i.id}
                                                        style={{ minWidth: '18rem', maxWidth: '18rem' }}>
                                                        <div style={{ margin: '0 auto' }}>
                                                            <div>
                                                                <Button
                                                                    basic
                                                                    floated='right'
                                                                    style={{ position: 'relative', padding: 0, border: 'none', boxShadow: 'none', width: '3rem', height: '3rem' }}
                                                                    onClick={() => {
                                                                        setSelectedSpecialties(selectedSpecialties.filter((x) => x.id !== i.id))
                                                                        toggleSelectedSpecialtyId(i.id)
                                                                    }}>
                                                                    <Icon name='close' size='large' style={{ left: '0.5rem', bottom: '0.05rem', position: 'relative' }} />
                                                                </Button>
                                                            </div>
                                                            <Image
                                                                onClick={() => router.navigate(`/institutions/${i.institutionId}`)}
                                                                src={institution?.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                                                                style={{ margin: '0 auto', objectFit: 'cover', right: '-1.5rem', height: '6rem', width: '6rem', borderRadius: '10px' }} />
                                                            <div onClick={() => router.navigate(`/institutions/${i.institutionId}`)}>
                                                                {institution?.name}
                                                            </div>
                                                            <Container as={Link} to={`/specialties/${i.id}`} style={{ height: 'inherit', width: '100%', display: 'block' }}>
                                                                {i.localSpecialtyCode} {getSpecialtyCore(i.localSpecialtyCode!)?.name}
                                                                <Label style={{ display: 'block' }} content={`${t('ISCED code')}: ${getSpecialtyCoreISCEDString(i.localSpecialtyCode)}`} />
                                                            </Container>
                                                        </div>
                                                    </Table.HeaderCell>)
                                            })}
                                            <Table.HeaderCell style={{ minWidth: '18rem', maxWidth: '18rem' }}>
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
                                        </Table.Row>
                                    </Table.Header>
                                </Table>
                            </div>
                        </Transition>
                        <Table celled padded selectable compact collapsing style={{ maxWidth: `${(selectedSpecialtyIds.length + 2) * 18}rem` }}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell style={{ minWidth: '18rem', maxWidth: '18rem' }} />
                                    {selectedSpecialties.map((i) => {
                                        const institution = specialtyInstitutions.get(i.institutionId);
                                        return (<Table.HeaderCell
                                            textAlign='center'
                                            key={i.id}
                                            style={{ minWidth: '18rem', maxWidth: '18rem' }}>
                                            <div style={{ margin: '0 auto' }}>
                                                <div>
                                                    <Button
                                                        basic
                                                        floated='right'
                                                        style={{ position: 'relative', right: 0, padding: 0, border: 'none', boxShadow: 'none', width: '3rem', height: '3rem' }}
                                                        onClick={() => {
                                                            setSelectedSpecialties(selectedSpecialties.filter((x) => x.id !== i.id))
                                                            toggleSelectedSpecialtyId(i.id)
                                                        }}>
                                                        <Icon name='close' size='large' style={{ left: '0.5rem', bottom: '0.05rem', position: 'relative' }} />
                                                    </Button>
                                                </div>
                                                <Image
                                                    onClick={() => router.navigate(`/institutions/${i.institutionId}`)}
                                                    src={institution?.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                                                    style={{ margin: '0 auto', objectFit: 'cover', right: '-1.5rem', height: '6rem', width: '6rem', borderRadius: '10px' }} />
                                                <div onClick={() => router.navigate(`/institutions/${i.institutionId}`)}>
                                                    {institution?.name}
                                                </div>
                                                <Container as={Link} to={`/specialties/${i.id}`} style={{ height: 'inherit', width: '100%', display: 'block' }}>
                                                    {i.localSpecialtyCode} {getSpecialtyCore(i.localSpecialtyCode!)?.name}
                                                    <Label style={{ display: 'block' }} content={`${t('ISCED code')}: ${getSpecialtyCoreISCEDString(i.localSpecialtyCode)}`} />
                                                </Container>
                                            </div>
                                        </Table.HeaderCell>)
                                    })}
                                    <Table.HeaderCell style={{ minWidth: '18rem', maxWidth: '18rem' }}>
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
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <InstitutionComparisonBoardRow
                                    header={t('DEGREE')}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {degrees[i.degreeId - 1].text}
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('ECTS CREDITS')}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.ectsCredits}
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('TUITION')}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.tuitionUSD >= 100 ? `${Math.round(i.tuitionUSD / 100)}00` : i.tuitionUSD} USD
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('FREE EDUCATION')}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            <Icon name={i.freeEducation ? 'check' : 'x'} style={{ margin: 0 }} />
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('ENROLLED STUDENTS')}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.undergraduatesEnrolled}
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('ACCEPTANCE RATE')}
                                    array={selectedSpecialties.map((i) =>
                                        <Header
                                            as='h4'
                                            style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }}>
                                            {i.acceptanceRate.toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedSpecialties.map((i) => i.acceptanceRate)} />
                                <InstitutionComparisonBoardRow
                                    header={t('GRADUATION RATE')}
                                    array={selectedSpecialties.map((i) =>
                                        <Header
                                            as='h4'
                                            style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }}>
                                            {i.graduationRate.toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedSpecialties.map((i) => i.graduationRate)} />
                                <InstitutionComparisonBoardRow
                                    header={t('EMPLOYMENT RATE')}
                                    array={selectedSpecialties.map((i) =>
                                        <Header
                                            as='h4'
                                            style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }}>
                                            {i.graduateEmploymentRate.toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedSpecialties.map((i) => i.graduateEmploymentRate)} />
                                <InstitutionComparisonBoardRow
                                    header={t('LANGUAGE OF EDUCATION')}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.languageIds.map((l) => languages[l == "en" ? 0 : 1 as number]?.text).join(", ")}
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('EDUCATION PERIOD')}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.startYear + ' - ' + i.endYear}
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('STUDY FORM')}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.studyFormIds.map((s) => studyForms[s - 1]?.text).join(", ")}
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('SKILLS')}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.skillIds.map((skill) => <Label key={skill} content={getSkill(skill)?.name} style={{ margin: '0.2rem' }} />)}
                                        </Header>)} />
                            </Table.Body>
                        </Table>
                    </div>
                </>}
            {isMobile &&
                <>
                    <div ref={componentRef} style={{ position: 'fixed', zIndex: 1000, overflow: 'scroll' }}>
                        <Table
                            celled
                            padded
                            selectable
                            compact
                            collapsing
                            unstackable>
                            <Table.Header>
                                <Table.Row>
                                    {selectedSpecialties.map((i) => {
                                        const institution = specialtyInstitutions.get(i.institutionId);
                                        return (<Table.HeaderCell
                                            textAlign='center'
                                            key={i.id}
                                            style={{ minWidth: '50vw', maxWidth: '50vw' }}>
                                            <div style={{ margin: '0 auto' }}>
                                                <div>
                                                    <Button
                                                        basic
                                                        floated='right'
                                                        style={{ position: 'relative', right: 0, padding: 0, border: 'none', boxShadow: 'none', width: '3rem', height: '3rem' }}
                                                        onClick={() => {
                                                            setSelectedSpecialties(selectedSpecialties.filter((x) => x.id !== i.id))
                                                            toggleSelectedSpecialtyId(i.id)
                                                        }}>
                                                        <Icon name='close' size='large' style={{ left: '0.5rem', bottom: '0.05rem', position: 'relative' }} />
                                                    </Button>
                                                </div>
                                                <Image
                                                    onClick={() => router.navigate(`/institutions/${i.institutionId}`)}
                                                    src={institution?.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                                                    style={{ margin: '0 auto', objectFit: 'cover', right: '-1.5rem', height: '6rem', width: '6rem', borderRadius: '10px' }} />
                                                <div onClick={() => router.navigate(`/institutions/${i.institutionId}`)}>
                                                    {institution?.name}
                                                </div>
                                                <Container as={Link} to={`/specialties/${i.id}`} style={{ height: 'inherit', width: '100%' }}>
                                                    {i.localSpecialtyCode} {getSpecialtyCore(i.localSpecialtyCode!)?.name}
                                                    <Label content={`${t('ISCED code')}: ${getSpecialtyCoreISCEDString(i.localSpecialtyCode)}`} />
                                                </Container>
                                            </div>
                                        </Table.HeaderCell>)
                                    })}
                                    <AddSpecialtyHeaderCellPlaceholderMobile />
                                </Table.Row>
                            </Table.Header>
                        </Table>
                    </div>
                    <div onScroll={(e) => handleWindowScroll(e)} style={{ overflow: 'scroll' }}>
                        <Table
                            celled
                            padded
                            selectable
                            compact
                            collapsing
                            unstackable>
                            <Table.Header>
                                <Table.Row>
                                    {selectedSpecialties.map((i) => {
                                        const institution = specialtyInstitutions.get(i.institutionId);
                                        return (<Table.HeaderCell
                                            textAlign='center'
                                            key={i.id}
                                            style={{ minWidth: '50vw', maxWidth: '50vw' }}>
                                            <div style={{ margin: '0 auto' }}>
                                                <div>
                                                    <Button
                                                        basic
                                                        floated='right'
                                                        style={{ position: 'relative', right: 0, padding: 0, border: 'none', boxShadow: 'none', width: '3rem', height: '3rem' }}
                                                        onClick={() => {
                                                            setSelectedSpecialties(selectedSpecialties.filter((x) => x.id !== i.id))
                                                            toggleSelectedSpecialtyId(i.id)
                                                        }}>
                                                        <Icon name='close' size='large' style={{ left: '0.5rem', bottom: '0.05rem', position: 'relative' }} />
                                                    </Button>
                                                </div>
                                                <Image
                                                    onClick={() => router.navigate(`/institutions/${i.institutionId}`)}
                                                    src={institution?.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                                                    style={{ margin: '0 auto', objectFit: 'cover', right: '-1.5rem', height: '6rem', width: '6rem', borderRadius: '10px' }} />
                                                <div onClick={() => router.navigate(`/institutions/${i.institutionId}`)}>
                                                    {institution?.name}
                                                </div>
                                                <Container as={Link} to={`/specialties/${i.id}`} style={{ height: 'inherit', width: '100%' }}>
                                                    {i.localSpecialtyCode} {getSpecialtyCore(i.localSpecialtyCode!)?.name}
                                                    <Label content={`${t('ISCED code')}: ${getSpecialtyCoreISCEDString(i.localSpecialtyCode)}`} />
                                                </Container>
                                            </div>
                                        </Table.HeaderCell>)
                                    })}
                                    <AddInstitutionHeaderCellPlaceholderMobile />
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <InstiutionComparisonParameterCellFixedMobile name={t('DEGREE')} columns={selectedSpecialtyIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('DEGREE')}
                                    headerLess={true}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {degrees[i.degreeId - 1].text}
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('ECTS CREDITS')} columns={selectedSpecialtyIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('ECTS CREDITS')}
                                    headerLess={true}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.ectsCredits}
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('TUITION')} columns={selectedSpecialtyIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('TUITION')}
                                    headerLess={true}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.tuitionUSD} USD
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('FREE EDUCATION')} columns={selectedSpecialtyIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('FREE EDUCATION')}
                                    headerLess={true}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            <Icon name={i.freeEducation ? 'check' : 'x'} style={{ margin: 0 }} />
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('ENROLLED STUDENTS')} columns={selectedSpecialtyIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('ENROLLED STUDENTS')}
                                    headerLess={true}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.undergraduatesEnrolled}
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('ACCEPTANCE RATE')} columns={selectedSpecialtyIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('ACCEPTANCE RATE')}
                                    headerLess={true}
                                    array={selectedSpecialties.map((i) =>
                                        <Header
                                            as='h4'
                                            style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }}>
                                            {i.acceptanceRate.toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedSpecialties.map((i) => i.acceptanceRate)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('GRADUATION RATE')} columns={selectedSpecialtyIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('GRADUATION RATE')}
                                    headerLess={true}
                                    array={selectedSpecialties.map((i) =>
                                        <Header
                                            as='h4'
                                            style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }}>
                                            {i.graduationRate.toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedSpecialties.map((i) => i.graduationRate)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('EMPLOYMENT RATE')} columns={selectedSpecialtyIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('EMPLOYMENT RATE')}
                                    headerLess={true}
                                    array={selectedSpecialties.map((i) =>
                                        <Header
                                            as='h4'
                                            style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }}>
                                            {i.graduateEmploymentRate.toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedSpecialties.map((i) => i.graduateEmploymentRate)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('LANGUAGE OF EDUCATION')} columns={selectedSpecialtyIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('LANGUAGE OF EDUCATION')}
                                    headerLess={true}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.languageIds.map((l) => languages[l == "en" ? 0 : 1 as number]?.text).join(", ")}
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('EDUCATION PERIOD')} columns={selectedSpecialtyIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('EDUCATION PERIOD')}
                                    headerLess={true}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.startYear + ' - ' + i.endYear}
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('STUDY FORM')} columns={selectedSpecialtyIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('STUDY FORM')}
                                    headerLess={true}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.studyFormIds.map((s) => studyForms[s - 1]?.text).join(", ")}
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('SKILLS')} columns={selectedSpecialtyIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('SKILLS')}
                                    headerLess={true}
                                    array={selectedSpecialties.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.skillIds.map((skill) => <Label key={skill} content={getSkill(skill)?.name} style={{ margin: '0.2rem' }} />)}
                                        </Header>)} />
                            </Table.Body>
                        </Table>
                    </div>
                </>}
        </>
    )
})