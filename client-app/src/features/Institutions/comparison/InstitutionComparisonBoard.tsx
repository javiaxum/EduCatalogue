import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Button, Header, Icon, Image, Table, Transition } from 'semantic-ui-react';
import RatingStars from '../../../app/common/rating/RatingStars';
import { Institution } from '../../../app/models/institution';
import { Specialty } from '../../../app/models/specialty';
import { useStore } from '../../../app/stores/store';
import { router } from '../../routers/Routes';
import AddInstitutionHeaderCellPlaceholderMobile from './AddInstitutionHeaderCellPlaceholderMobile';
import InstitutionComparisonBoardRow from './InstitutionComparisonBoardRow';
import InstiutionComparisonParameterCellFixedMobile from './InstiutionComparisonParameterCellFixedMobile';
import { useLocation } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default observer(function InstitutionComparisonBoard() {
    const { institutionStore, specialtyStore } = useStore();
    const { selectedInstitutionIds, loadInstitution, institutionsRegistry, getCityById, getRegionById } = institutionStore;
    const { specialtyCoreRegistry, loadPopularSpecialties, getSpecialtyCore } = specialtyStore;
    const [loading, setLoading] = useState(true);
    const [selectedInstitutions, setSelectedInstitutions] = useState<Institution[]>([]);
    const [popularSpecialties, setPopularSpecialties] = useState<Map<string, Specialty[]>>(new Map<string, Specialty[]>());
    const [scrollY, setScrollY] = useState<number>(0);

    const { t } = useTranslation();
    const location = useLocation();

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    enum romanNumbers {
        NaN,
        I,
        II,
        III,
        IV,
    }
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, [])
    useEffect(() => {
        if (selectedInstitutionIds.length === 0 && location.pathname === '/institutions/comparison')
            router.navigate('/institutions');
    },[location.pathname, selectedInstitutionIds])

    const componentRef = useRef<HTMLDivElement>(null);
    const handleWindowScroll = (e: any) => {
        const component = componentRef.current;
        component!.style.left = `-${e.currentTarget.scrollLeft}px`;
    };

    useEffect(() => {
        setLoading(true);
        if (selectedInstitutions.length < selectedInstitutionIds.length) {
            Promise.all([
                loadSpecialties().then((result) => { setPopularSpecialties(result); }),
                loadInstitutions().then(() => {
                    setSelectedInstitutions(selectedInstitutionIds.map((i) => institutionsRegistry.get(i)!));
                    selectedInstitutions.map((i) => institutionsRegistry.get(i.id)!)
                })
            ]).then().finally(() => setLoading(false))
        }
        async function loadInstitutions() {
            await Promise.all(selectedInstitutionIds.map((x) => loadInstitution(x)));
        }
        async function loadSpecialties() {
            let specialties = new Map<string, Specialty[]>();
            await Promise.all(selectedInstitutionIds.map((x) => loadPopularSpecialties(x).then((result) => { if (result) specialties.set(x, result) })));
            return specialties;
        }
    }, [])

    const languages = t("languageOptions", { returnObjects: true }) as [{ text: string; value: string }]
    const studyForms = t("studyFormOptions", { returnObjects: true }) as [{ text: string; value: number }]

    if (loading) return <LoadingComponent />

    return (
        <>
            {isComputerOrTablet &&
                <>
                    <div onScroll={(e) => handleWindowScroll(e)} style={{ overflow: 'scroll' }} >
                        <Transition
                            visible={scrollY > 200}
                            duration={200}
                            transitionOnMount>
                            <div ref={componentRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000, overflow: 'scroll' }}>
                                <Table celled padded selectable compact collapsing>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell style={{ minWidth: '18rem', maxWidth: '18rem' }} />
                                            {selectedInstitutions.map((i) =>
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
                                                                    setSelectedInstitutions(selectedInstitutions.filter((x) => x.id !== i.id))
                                                                    institutionStore.toggleSelectedInstitutionId(i.id)
                                                                    if (institutionStore.selectedInstitutionIds.length === 0) router.navigate('/institutions')
                                                                }}>
                                                                <Icon name='close' size='large' style={{ left: '0.5rem', bottom: '0.05rem', position: 'relative' }} />
                                                            </Button>
                                                        </div>
                                                        <Image
                                                            onClick={() => router.navigate(`/institutions/${i.id}`)}
                                                            src={i.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                                                            style={{ margin: '0 auto', objectFit: 'cover', right: '-1.5rem', height: '6rem', width: '6rem', borderRadius: '10px' }} />
                                                        <div onClick={() => router.navigate(`/institutions/${i.id}`)}>
                                                            {i.name}
                                                        </div>
                                                    </div>
                                                </Table.HeaderCell>)}
                                            <Table.HeaderCell style={{ minWidth: '18rem', maxWidth: '18rem' }}>
                                                <div
                                                    style={{
                                                        border: 'dashed 3px #aaa',
                                                        height: '12rem',
                                                        width: '12rem',
                                                        borderRadius: '2rem',
                                                        textAlign: 'center',
                                                    }}>
                                                    <Icon name='plus' size='huge' style={{ color: '#aaa', marginTop: '3rem  ' }} />
                                                </div>
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                </Table>
                            </div>
                        </Transition>
                        <Table celled padded selectable compact collapsing style={{ maxWidth: `${(selectedInstitutionIds.length + 2) * 18}rem` }}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell style={{ minWidth: '18rem', maxWidth: '18rem' }} />
                                    {selectedInstitutions.map((i) =>
                                        <Table.HeaderCell
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
                                                            setSelectedInstitutions(selectedInstitutions.filter((x) => x.id !== i.id))
                                                            institutionStore.toggleSelectedInstitutionId(i.id)
                                                            if (institutionStore.selectedInstitutionIds.length === 0) router.navigate('/institutions')
                                                        }}>
                                                        <Icon name='close' size='large' style={{ left: '0.5rem', bottom: '0.05rem', position: 'relative' }} />
                                                    </Button>
                                                </div>
                                                <Image
                                                    onClick={() => router.navigate(`/institutions/${i.id}`)}
                                                    src={i.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                                                    style={{ right: '-1.5rem', margin: '0 auto', objectFit: 'cover', height: '12rem', width: '12rem', borderRadius: '10px' }} />
                                                <div onClick={() => router.navigate(`/institutions/${i.id}`)}>
                                                    {i.name}
                                                </div>
                                            </div>
                                        </Table.HeaderCell>)}
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
                                    header={t('RATING')}
                                    array={selectedInstitutions.map((i) =>
                                        <>
                                            <div style={{ width: 'fit-content', margin: '0 auto' }}>
                                                <RatingStars rating={i.rating} />
                                            </div>
                                            <Header as='h4' style={{ color: '#777', display: 'block', padding: 0, margin: 0 }} >
                                                {i.reviewsCount + ' ' + t('відгуків')}
                                            </Header>
                                        </>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('ACCREDITATION')}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {romanNumbers[i.accreditation]}
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('ENROLLED STUDENTS')}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.undergraduatesEnrolled}
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('SPECIALTIES COVERAGE')}
                                    array={selectedInstitutions.map((i) =>
                                        <Header
                                            as='h4'
                                            style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }}>
                                            {((i.specialtiesCount / specialtyCoreRegistry.size) * 100).toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedInstitutions.map((i) => ((i.specialtiesCount / specialtyCoreRegistry.size) * 100))} />
                                <InstitutionComparisonBoardRow
                                    header={t('AVERAGE EMPLOYMENT RATE')}
                                    array={selectedInstitutions.map((i) =>
                                        <Header
                                            as='h4'
                                            style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }}>
                                            {i.graduateEmploymentRate.toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedInstitutions.map((i) => i.graduateEmploymentRate)} />
                                <InstitutionComparisonBoardRow
                                    header={t('AVERAGE TUITION')}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {Math.round(i.averageTuitionUAH! / 100)}00 UAH
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('LANGUAGE OF EDUCATION')}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.languageIds.map((i) => languages[i === "en" ? 0 : 1 as number]?.text).join(", ")}
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('STUDY FORM')}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.studyFormIds.map((i) => studyForms[i - 1]?.text).join(", ")}
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('ACCEPTANCE RATE')}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.acceptanceRate.toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedInstitutions.map((i) => i.acceptanceRate)} />
                                <InstitutionComparisonBoardRow
                                    header={t('GRADUATION RATE')}
                                    array={selectedInstitutions.map((i) =>
                                        <Header
                                            as='h4'
                                            style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }}>
                                            {i.graduationRate.toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedInstitutions.map((i) => i.graduationRate)} />
                                <InstitutionComparisonBoardRow
                                    header={t('FREE EDUCATION AVAILABLE')}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            <Icon name={i.scholarship ? 'check' : 'x'} size='large' />
                                        </Header>)} />
                                <InstitutionComparisonBoardRow
                                    header={t('LOCATION')}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.streetAddress},  {" "}
                                            {getCityById(i.cityId!, i.regionId!)?.name}, {" "}
                                            {getRegionById(i.regionId!)?.name}
                                        </Header>)} />
                                <Table.Row verticalAlign='top'>
                                    <Table.Cell>
                                        <Header as='h4' textAlign='center' color='grey'>
                                            {t('10 MOST POPULAR SPECIALTIES')}
                                        </Header>
                                    </Table.Cell>
                                    {selectedInstitutions.map((i) =>
                                        <Table.Cell
                                            key={i.id}
                                            textAlign='center'>
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
                                                    {popularSpecialties && popularSpecialties.size !== 0 && popularSpecialties.get(i.id)?.map((specialty) =>
                                                        <Table.Row key={specialty.id}>
                                                            <Table.Cell>
                                                                {specialty.localSpecialtyCode} {getSpecialtyCore(specialty.localSpecialtyCode!)?.name}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {specialty.undergraduatesEnrolled} / {((specialty.undergraduatesEnrolled / i.undergraduatesEnrolled!) * 100).toPrecision(3)}%
                                                            </Table.Cell>
                                                        </Table.Row>)}
                                                </Table.Body>
                                            </Table>
                                        </Table.Cell>)}
                                    <Table.Cell>
                                    </Table.Cell>
                                </Table.Row>
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
                                    {selectedInstitutions.map((i) =>
                                        <Table.HeaderCell
                                            textAlign='center'
                                            key={i.id}
                                            style={{ minWidth: '50vw', maxWidth: '50vw' }}>
                                            <div style={{ margin: '0 auto' }}>
                                                <div>
                                                    <Button
                                                        basic
                                                        floated='right'
                                                        style={{ position: 'relative', padding: 0, border: 'none', boxShadow: 'none', width: '3rem', height: '3rem' }}
                                                        onClick={() => {
                                                            setSelectedInstitutions(selectedInstitutions.filter((x) => x.id !== i.id))
                                                            institutionStore.toggleSelectedInstitutionId(i.id)
                                                            if (institutionStore.selectedInstitutionIds.length === 0) router.navigate('/institutions')
                                                        }}>
                                                        <Icon name='close' size='large' style={{ left: '0.5rem', bottom: '0.05rem', position: 'relative' }} />
                                                    </Button>
                                                </div>
                                                <Image
                                                    onClick={() => router.navigate(`/institutions/${i.id}`)}
                                                    src={i.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                                                    style={{ margin: '0 auto', objectFit: 'cover', right: '-1.5rem', height: '6rem', width: '6rem', borderRadius: '10px' }} />
                                                <div onClick={() => router.navigate(`/institutions/${i.id}`)}>
                                                    {i.name}
                                                </div>
                                            </div>
                                        </Table.HeaderCell>)}
                                    <AddInstitutionHeaderCellPlaceholderMobile />
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
                                    {selectedInstitutions.map((i) =>
                                        <Table.HeaderCell
                                            textAlign='center'
                                            key={i.id}
                                            style={{ minWidth: '50vw' }}>
                                            <div style={{ margin: '0 auto' }}>
                                                <div>
                                                    <Button
                                                        basic
                                                        floated='right'
                                                        style={{ position: 'relative', padding: 0, border: 'none', boxShadow: 'none', width: '3rem', height: '3rem' }}
                                                        onClick={() => {
                                                            setSelectedInstitutions(selectedInstitutions.filter((x) => x.id !== i.id))
                                                            institutionStore.toggleSelectedInstitutionId(i.id)
                                                            if (institutionStore.selectedInstitutionIds.length === 0) router.navigate('/institutions')
                                                        }}>
                                                        <Icon name='close' size='large' style={{ left: '0.5rem', bottom: '0.05rem', position: 'relative' }} />
                                                    </Button>
                                                </div>
                                                <Image
                                                    onClick={() => router.navigate(`/institutions/${i.id}`)}
                                                    src={i.titleImageUrl || '/assets/institutionTitleImagePlaceholder.png'}
                                                    style={{ margin: '0 auto', objectFit: 'cover', right: '-1.5rem', height: '6rem', width: '6rem', borderRadius: '10px' }} />
                                                <div onClick={() => router.navigate(`/institutions/${i.id}`)}>
                                                    {i.name}
                                                </div>
                                            </div>
                                        </Table.HeaderCell>)}
                                    <AddInstitutionHeaderCellPlaceholderMobile />
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <InstiutionComparisonParameterCellFixedMobile name={t('RATING')} columns={selectedInstitutionIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('RATING')}
                                    headerLess={true}
                                    array={selectedInstitutions.map((i) =>
                                        <>
                                            <div style={{ width: 'fit-content', margin: '0 auto' }}>
                                                <RatingStars rating={i.rating} />
                                            </div>
                                            <Header as='h4' style={{ color: '#777', display: 'block', padding: 0, margin: 0 }} >
                                                {i.reviewsCount + ' ' + t('відгуків')}
                                            </Header>
                                        </>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('ACCREDITATION')} columns={selectedInstitutionIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('ACCREDITATION')}
                                    headerLess={true}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {romanNumbers[i.accreditation]}
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('ENROLLED STUDENTS')} columns={selectedInstitutionIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('ENROLLED STUDENTS')}
                                    headerLess={true}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.undergraduatesEnrolled}
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('SPECIALTIES COVERAGE')} columns={selectedInstitutionIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('SPECIALTIES COVERAGE')}
                                    headerLess={true}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {(i.specialtiesCount / specialtyCoreRegistry.size * 100).toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedInstitutions.map((i) => i.specialtiesCount / specialtyCoreRegistry.size * 100)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('AVERAGE EMPLOYMENT RATE')} columns={selectedInstitutionIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('AVERAGE EMPLOYMENT RATE')}
                                    headerLess={true}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {(i.graduateEmploymentRate).toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedInstitutions.map((i) => i.graduateEmploymentRate)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('AVERAGE TUITION')} columns={selectedInstitutionIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('AVERAGE TUITION')}
                                    headerLess={true}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {Math.round(i.averageTuitionUAH! / 100)}00 UAH
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('LANGUAGE OF EDUCATION')} columns={selectedInstitutionIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('LANGUAGE OF EDUCATION')}
                                    headerLess={true}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.languageIds.map((i) => languages[i === "en" ? 0 : 1 as number]?.text).join(", ")}
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('STUDY FORM')} columns={selectedInstitutionIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('STUDY FORM')}
                                    headerLess={true}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.studyFormIds.map((i) => studyForms[i - 1]?.text).join(", ")}
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('ACCEPTANCE RATE')} columns={selectedInstitutionIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('ACCEPTANCE RATE')}
                                    headerLess={true}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {(i.acceptanceRate).toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedInstitutions.map((i) => i.acceptanceRate)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('GRADUATION RATE')} columns={selectedInstitutionIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('GRADUATION RATE')}
                                    headerLess={true}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {(i.graduationRate).toFixed(1)}%
                                        </Header>)}
                                    pieChart={true}
                                    data={selectedInstitutions.map((i) => i.graduationRate)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('FREE EDUCATION AVAILABLE')} columns={selectedInstitutionIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('FREE EDUCATION AVAILABLE')}
                                    headerLess={true}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            <Icon name={i.scholarship ? 'check' : 'x'} size='large' />
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('LOCATION')} columns={selectedInstitutionIds.length + 1} />
                                <InstitutionComparisonBoardRow
                                    header={t('LOCATION')}
                                    headerLess={true}
                                    array={selectedInstitutions.map((i) =>
                                        <Header as='h4' style={{ color: '#111', display: 'inline-block', padding: 0, margin: 0 }} >
                                            {i.streetAddress},  {" "}
                                            {getCityById(i.cityId!, i.regionId!)?.name}, {" "}
                                            {getRegionById(i.regionId!)?.name}
                                        </Header>)} />
                                <InstiutionComparisonParameterCellFixedMobile name={t('10 MOST POPULAR SPECIALTIES')} columns={selectedInstitutionIds.length + 1} />
                                <Table.Row verticalAlign='top'>
                                    {selectedInstitutions.map((i) =>
                                        <Table.Cell
                                            key={i.id}
                                            textAlign='center'>
                                            <Table basic='very' compact unstackable size='small'>
                                                <Table.Header>
                                                    <Table.Row>
                                                        <Table.HeaderCell colSpan={2}>
                                                            {t('Specialty')} {' | '} {t('Undergraduates')}
                                                        </Table.HeaderCell>
                                                    </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                    {popularSpecialties && popularSpecialties.size !== 0 && popularSpecialties.get(i.id)?.map((specialty) =>
                                                        <Table.Row key={specialty.id}>
                                                            <Table.Cell>
                                                                {specialty.localSpecialtyCode} {getSpecialtyCore(specialty.localSpecialtyCode!)?.name}
                                                            </Table.Cell>
                                                            <Table.Cell style={{ width: '1rem' }}>
                                                                {specialty.undergraduatesEnrolled}
                                                            </Table.Cell>
                                                        </Table.Row>)}
                                                </Table.Body>
                                            </Table>
                                        </Table.Cell>)}
                                    <Table.Cell>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                </>}
        </>
    )
})