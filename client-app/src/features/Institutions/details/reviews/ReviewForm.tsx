import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Container, Grid, Header, Icon, Image, Item, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Review, ReviewFormValues } from '../../../../app/models/review';
import { useStore } from '../../../../app/stores/store';
import CustomTextArea from '../../../../app/common/form/CustomTextArea';

export default observer(function ReviewForm() {
    const { institutionStore, commonStore } = useStore();
    const {
        loadInstitution,
        loadingInitial,
        createInstitution,
        editInstitution,
        setLoadingInitial,
        detailsMenuActiveItem,
        loading,
        createReview,
        setReviewForm } = institutionStore;
    const { id } = useParams();
    const { editMode, setEditMode } = commonStore;

    const [review, setReview] = useState<ReviewFormValues>(new ReviewFormValues())
    const [rating, setRating] = useState<number>(0);
    const [chosenRating, setChosenRating] = useState<number>(0);

    const validationSchema = Yup.object({
        rating: Yup.number().required(),
    })

    function handleReviewFormSubmit(review: ReviewFormValues) {
        review.rating = chosenRating;
        review.id = uuid();
        createReview(review, id!).then(() => {
            setReviewForm(false);
        });
    }
    let elements = [];
    for (let i = 1; i <= 5; i++) {
        elements.push((<Icon
            size='big'
            onMouseEnter={() => setRating(i)}
            onMouseLeave={() => setRating(chosenRating)}
            onClick={() => setChosenRating(i)}
            color='yellow'
            name={rating >= i ? 'star' : 'star outline'}
            style={{ marginBottom: '7px' }}
        />))
    }

    return (
        <>
            <Segment basic style={{ padding: '0' }}>
                <Header style={{ display: 'inline', margin: '0' }}>Rating: </Header>{elements}
            </Segment>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={review}
                onSubmit={values => handleReviewFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Grid>
                            <Grid.Column>
                                <CustomTextArea rows={4} placeholder='Review contents' name='reviewMessage' />
                                <Button
                                    positive
                                    type='submit'
                                    content='Submit review'
                                    loading={isSubmitting}
                                    disabled={!dirty || isSubmitting || !isValid || chosenRating === 0}
                                    style={{ marginLeft: '', backgroundColor: 'rgb(30, 71, 160)' }} />
                                <Button
                                    onClick={() => setReviewForm(false)}
                                    floated='right'
                                    type='button'
                                    content='Cancel'
                                    disabled={isSubmitting} />
                            </Grid.Column>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    )
})