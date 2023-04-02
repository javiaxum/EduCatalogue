import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Segment, Button, Select, Transition, List, Loader } from 'semantic-ui-react';
import RatingStars from '../../../../app/common/rating/RatingStars';
import { useStore } from '../../../../app/stores/store';
import ReviewForm from './ReviewForm';
import ReviewListItem from './ReviewListItem';
import { ReviewsPagingParams } from '../../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMediaQuery } from 'react-responsive';

export default observer(function InstitutionDetailsSpecialtiesList() {
    const { institutionStore, commonStore, userStore } = useStore();
    const {
        reviewForm,
        reviewsLoading,
        reviewsPagination,
        setReviewForm,
        setReviewSorting,
        setReviewPagingParams,
        clearReviewsPagination,
        reviewSorting,
        reviewPagingParams,
        selectedInstitution,
        selectedInstitutionReviews,
        setReviewTargetRating,
        reviewTargetRating,
        clearInstitutionReviews,
        reviews } = institutionStore;
    const { editMode } = commonStore;
    const { t } = useTranslation();

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    useEffect(() => {
        setReviewPagingParams(new ReviewsPagingParams());
        return () => {
            clearInstitutionReviews();
            clearReviewsPagination();
        }
    }, [clearInstitutionReviews, clearReviewsPagination, setReviewPagingParams])

    function handleLoad() {
        if (!reviewsPagination || reviewsPagination?.currentPage! < reviewsPagination?.totalPages!)
            setReviewPagingParams(new ReviewsPagingParams(reviewsPagination?.currentPage! + 1));
    }
    if (!selectedInstitution) return <></>;

    let buttons = [];
    for (let i = 5; i > 0; i--) {
        buttons.push((<Button
            style={{ padding: '0.5rem 0 0.5rem 0' }}
            basic
            key={i}
            active={reviewTargetRating === i}
            onClick={() => {
                reviewTargetRating === i ? setReviewTargetRating(undefined) : setReviewTargetRating(i);
            }}>
            {<RatingStars rating={i} />}</Button>))
    }

    let placeholders = [];
    for (let i = 0; i < reviewPagingParams.pageSize; i++) {
        placeholders.push();
    }

    return (
        <Grid style={{ padding: isComputerOrTablet ? 0 : '1rem', width: '100%', margin: 0 }}>
            {!reviewForm &&
                <Grid.Row style={{ padding: 0 }}>
                    {isComputerOrTablet && buttons}
                    <Select
                        style={{ width: isMobile ? '100%' : '' }}
                        options={t("reviewSortingOptions", { returnObjects: true })}
                        value={reviewSorting}
                        onChange={(e, d) => {
                            setReviewSorting(d.value as string)
                        }} />
                </Grid.Row>}
            <Grid.Row>
                <Grid style={{ padding: '20px 0 0 0' }}>
                    {(reviews.length > 0 && !!!reviews.find((x) => x.author.username === userStore.user?.username)) && <>
                        {!reviewForm ?
                            <Button
                                positive
                                content={t('Add review')}
                                style={{ height: '3rem', backgroundColor: 'rgb(30, 71, 160)' }}
                                onClick={() => setReviewForm(true)} />
                            : <ReviewForm />}
                    </>}
                    <Grid.Row>
                        {((!selectedInstitutionReviews && reviewsPagination) || (reviews.length === 0 && !editMode && !reviewsLoading)) &&
                            <Segment style={{ color: '#444', minHeight: '9rem', maxHeight: '9rem', minWidth: '50rem' }}>There are no reviews available...</Segment>}
                        <InfiniteScroll
                            scrollThreshold={0.5}
                            dataLength={(reviewsPagination?.itemsPerPage! * reviewsPagination?.currentPage!) || 0}
                            next={handleLoad}
                            hasMore={!reviewsLoading && !!reviewsPagination
                                && reviewsPagination.currentPage < reviewsPagination.totalPages}
                            loader={<></>}>
                        </InfiniteScroll>
                        {reviews.map((review) => (
                            <ReviewListItem
                                review={review}
                                key={review.id} />
                        ))}
                    </Grid.Row>
                    <Grid.Row>
                        <Transition
                            visible={reviewsLoading}
                            duration={500} >
                            <Loader inline active={true} size='small' style={{ display: 'block', position: 'relative', top: 0 }} />
                        </Transition>
                    </Grid.Row>
                </Grid>
                <div style={{ height: '80rem' }}>
                </div>
            </Grid.Row>
        </Grid >
    )
})