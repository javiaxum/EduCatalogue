import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ReviewFormValues } from '../../../../app/models/review';
import { useStore } from '../../../../app/stores/store';
import CustomTextArea from '../../../../app/common/form/CustomTextArea';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

export default observer(function ReviewForm() {
    const { institutionStore } = useStore();
    const {
        createReview,
        setReviewForm } = institutionStore;
    const { id } = useParams();

    const [review, setReview] = useState<ReviewFormValues>(new ReviewFormValues())
    const [rating, setRating] = useState<number>(0);
    const [chosenRating, setChosenRating] = useState<number>(0);

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' })
    
    const { t } = useTranslation();
    const validationSchema = Yup.object({
        rating: Yup.number().required(),
        reviewMessage: Yup.string().required(),
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
        <div style={{ width: isComputerOrTablet ? '60%' : '100%' }}>
            <Header style={{ display: 'inline', margin: '0' }}>Rating: </Header>{elements}
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={review}
                onSubmit={values => handleReviewFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <CustomTextArea rows={4} placeholder={t('Review contents')} name='reviewMessage' />
                        <Button
                            positive
                            type='submit'
                            content={t('Submit review')}
                            loading={isSubmitting}
                            disabled={!dirty || isSubmitting || !isValid || chosenRating === 0}
                            style={{ marginLeft: '', backgroundColor: 'rgb(30, 71, 160)' }} />
                        <Button
                            onClick={() => setReviewForm(false)}
                            floated='right'
                            type='button'
                            content={t('Cancel')}
                            disabled={isSubmitting} />
                    </Form>
                )}
            </Formik>
        </div>
    )
})