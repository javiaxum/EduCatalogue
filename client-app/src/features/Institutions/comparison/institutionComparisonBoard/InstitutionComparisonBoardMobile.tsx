import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Button, Header, Icon, Image, Table, Transition } from 'semantic-ui-react';
import RatingStars from '../../../../app/common/rating/RatingStars';
import { Institution } from '../../../../app/models/institution';
import { Specialty } from '../../../../app/models/specialty';
import { useStore } from '../../../../app/stores/store';
import { router } from '../../../routers/Routes';
import { useLocation } from 'react-router-dom';
import LoadingComponent from '../../../../app/layout/LoadingComponent';
import AddInstitutionHeaderCellPlaceholderMobile from '../AddInstitutionHeaderCellPlaceholderMobile';
import InstiutionComparisonParameterCellFixedMobile from '../InstiutionComparisonParameterCellFixedMobile';
import InstitutionComparisonBoardRow from '../InstitutionComparisonBoardRow';

export default observer(function InstitutionComparisonBoardMobile() {
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
    }, [location.pathname, selectedInstitutionIds])

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
                                        {i.reviewsCount + ' ' + t('reviews')}
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
                                    {Math.round(i.averageTuitionUSD! / 100)}00 USD
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
        </>
    )
})