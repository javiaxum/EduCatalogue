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

    useEffect(() => {
        setReviewPagingParams(new ReviewsPagingParams(1));
        return () => {
            clearInstitutionReviews();
            clearReviewsPagination();
        }
    }, [clearInstitutionReviews, clearReviewsPagination, setReviewPagingParams])

    function handleLoad() {
        console.log(reviewsPagination)
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
        <Grid style={{ padding: '20px' }}>
            {!reviewForm && <Grid.Row style={{ padding: '0' }}>
                {buttons}
                <Select
                    options={t("reviewSortingOptions", { returnObjects: true })}
                    value={reviewSorting}
                    onChange={(e, d) => {
                        console.log(d.value)
                        setReviewSorting(d.value as string)
                    }} />
            </Grid.Row>}
            <Grid.Row>
                <Grid style={{ padding: '20px 0 0 0' }}>
                    <Grid.Row>
                        {(reviews.length > 0 && !!!reviews.find((x) => x.author.username === userStore.user?.username)) && <>
                            {!reviewForm ? <Button
                                positive
                                content={t('Add review')}
                                style={{ marginLeft: '', backgroundColor: 'rgb(30, 71, 160)' }}
                                onClick={() => setReviewForm(true)} />
                                : <ReviewForm />}
                        </>}
                    </Grid.Row>
                    <Grid.Row>
                        {((!selectedInstitutionReviews && reviewsPagination) || (reviews.length === 0 && !editMode && !reviewsLoading)) &&
                            <Segment style={{ color: '#444', minHeight: '9rem', maxHeight: '9rem', minWidth: '50rem' }}>There are no reviews available...</Segment>}
                        <InfiniteScroll
                            style={{ overflow: 'hidden' }}
                            dataLength={(reviewsPagination?.itemsPerPage! * reviewsPagination?.currentPage!) || 0}
                            next={handleLoad}
                            hasMore={!reviewsLoading && !!reviewsPagination
                                && reviewsPagination.currentPage < reviewsPagination.totalPages}
                            loader={
                                <Transition
                                    visible={reviewsLoading}
                                    duration={500}
                                    size='huge'
                                    verticalAlign='middle'>
                                    <Loader inline active={true} size='small' style={{ marginLeft: '20rem', zIndex: 100 }} />
                                </Transition>}>
                            <Transition.Group
                                as={List}
                                duration={500}
                                size='huge'
                                verticalAlign='middle'>
                                {reviews.map((review) => (
                                    <List.Item>
                                        <ReviewListItem review={review} key={review.id} />
                                    </List.Item>
                                ))}
                            </Transition.Group>
                        </InfiniteScroll>
                        <div style={{ height: '80rem' }}>
                        </div>
                    </Grid.Row>
                </Grid>
            </Grid.Row >
        </Grid >
    )
})