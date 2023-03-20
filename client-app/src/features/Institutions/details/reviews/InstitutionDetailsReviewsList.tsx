import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Item, Segment, Image, Button, Icon, Select } from 'semantic-ui-react';
import RatingStars from '../../../../app/common/rating/RatingStars';
import { useStore } from '../../../../app/stores/store';
import ReviewForm from './ReviewForm';
import ReviewListItem from './ReviewListItem';
import InfiniteScroll from 'react-infinite-scroller';
import { ReviewsPagingParams } from '../../../../app/models/pagination';

export default observer(function InstitutionDetailsSpecialtiesList() {
    const { institutionStore, commonStore, userStore } = useStore();
    const { reviewForm, debouncedLoadReviews, reviewsLoading, reviewsPagination, setReviewForm, setReviewSorting, setReviewPagingParams, reviewSorting, selectedInstitution } = institutionStore;
    const { editMode } = commonStore;
    const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);
    const { t } = useTranslation();

    useEffect(() => {
        institutionStore.loadReviews();
    }, [institutionStore])

    function handleLoad() {
        setReviewPagingParams(new ReviewsPagingParams(reviewsPagination?.currentPage! + 1));
        debouncedLoadReviews();
    }
    if (!selectedInstitution || !selectedInstitution.reviews) return <></>

    let buttons = [];
    for (let i = 5; i > 0; i--) {
        buttons.push((<Button
            basic
            key={i}
            active={selectedRating === i}
            disabled={!!!selectedInstitution.reviews.find((x) => x.rating === i)}
            onClick={() => {
                selectedRating === i ? setSelectedRating(undefined) : setSelectedRating(i);
            }}>
            {<RatingStars rating={i} />}</Button>))
    }

    return (
        <Grid style={{ padding: '20px' }}>
            {!reviewForm && <Grid.Column width={16} style={{ padding: '0' }}>
                {buttons}
                <Select
                    options={t("reviewSortingOptions", { returnObjects: true })}
                    value={reviewSorting}
                    onChange={(e, d) => {
                        setReviewSorting(d.value as string)
                    }} />
            </Grid.Column>}
            <Grid.Column width={9}>
                <Grid style={{ padding: '20px 0 0 0' }}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleLoad}
                        hasMore={!reviewsLoading && !!reviewsPagination && reviewsPagination.currentPage < reviewsPagination.totalPages}
                        initialLoad={false}>
                        <Item.Group divided>
                            <Item>
                                <Item.Content>
                                    {
                                        !!!selectedInstitution.reviews.find((x) => x.author.username === userStore.user?.username) && <>
                                            {!reviewForm ? <Button
                                                positive
                                                content={t('Add review')}
                                                style={{ marginLeft: '', backgroundColor: 'rgb(30, 71, 160)' }}
                                                onClick={() => setReviewForm(true)} />
                                                : <ReviewForm />}
                                        </>
                                    }
                                </Item.Content>
                            </Item>
                            {(selectedInstitution.reviews && selectedInstitution.reviews.length > 0)
                                ? <>
                                    {selectedInstitution.reviews.map((review) => (
                                        <ReviewListItem
                                            review={review}
                                            key={review.id} />
                                    ))}
                                </>
                                : <>{!editMode && <Segment style={{ color: '#444', width: '300px' }}>There are no reviews available...</Segment>}</>}
                        </Item.Group>
                    </InfiniteScroll>
                </Grid>
            </Grid.Column>
            <Grid.Column width={6} floated='right'>
                <Image
                    src={selectedInstitution.images.find((x) => x.id === selectedInstitution.titleImageId)?.url || '/assets/institutionTitleImagePlaceholder.png'}
                    style={{ objectFit: 'cover', maxHeight: '26rem', maxWidth: '26rem', borderRadius: '30px' }} />
            </Grid.Column>
        </Grid>
    )
})