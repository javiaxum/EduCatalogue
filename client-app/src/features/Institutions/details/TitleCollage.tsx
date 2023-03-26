import { observer } from 'mobx-react-lite';
import { Grid, Image, Placeholder, Segment, Transition } from 'semantic-ui-react';
import FadePlaceholderAnimationWrapper from '../../../app/common/animations/FadeAnimationWrapper';
import FadeAnimationWrapper from '../../../app/common/animations/FadeAnimationWrapper';
import { useStore } from '../../../app/stores/store';
import CollageImageForm from './CollageImageForm';

export default observer(function TitleCollage() {
    const { institutionStore, commonStore: { editMode } } = useStore();
    const { selectedInstitution, images, imagesLoading, imagesLoadingInitial, loading, loadingInitial } = institutionStore;
    return (
        <Segment style={{ width: '100%', margin: '0 auto 0 auto', padding: '0.2rem' }}>
            <Grid style={{ margin: 0 }}>
                <Grid.Column style={{ width: '43%', padding: 0, height: 'inherit' }}>
                    <div style={{ height: '34.6rem', overflow: 'hidden', padding: '0 0.2rem 0.2rem 0' }}>
                        {!editMode && <FadePlaceholderAnimationWrapper
                            loading={loadingInitial || loading}
                            placeholder={
                                <Placeholder style={{ minWidth: '100%', minHeight: '100%', position: 'absolute', top: 0 }}>
                                    <Placeholder.Image />
                                </Placeholder>}>
                            <Image
                                alt='TitleImage'
                                src={selectedInstitution?.titleImageUrl || '/assets/placeholder.png'}
                                style={{ objectFit: 'cover', height: '100%', filter: editMode ? 'brightness(50%)' : 'none' }} />
                        </FadePlaceholderAnimationWrapper>}
                        {editMode && <CollageImageForm />}
                    </div>
                </Grid.Column>
                <Grid.Column style={{ padding: 0, width: '56.5%' }} floated='right'>
                    <Grid style={{ margin: 0, height: '34.6rem' }}>
                        <Grid.Row style={{ height: '17.1rem', padding: '0 0 0.2rem 0', overflow: 'hidden' }}>
                            <FadePlaceholderAnimationWrapper
                                loading={imagesLoadingInitial || imagesLoading}
                                placeholder={
                                    <Placeholder style={{ minWidth: '100%', minHeight: '100%', position: 'absolute' }}>
                                        <Placeholder.Image />
                                    </Placeholder>}>
                                <Image
                                    alt='TitleImage'
                                    src={images[0]?.url || '/assets/placeholder.png'}
                                    style={{ objectFit: 'cover', width: '100%', filter: editMode ? 'brightness(50%)' : 'none' }} />
                            </FadePlaceholderAnimationWrapper>
                        </Grid.Row>
                        <Grid.Row style={{ height: '17.1rem', padding: '0 0 0.2rem 0', overflow: 'hidden' }}>
                            <FadePlaceholderAnimationWrapper
                                loading={imagesLoadingInitial || imagesLoading}
                                placeholder={
                                    <Placeholder style={{ minWidth: '100%', minHeight: '100%', position: 'absolute' }}>
                                        <Placeholder.Image />
                                    </Placeholder>}>
                                <Image
                                    alt='TitleImage'
                                    src={images[1]?.url || '/assets/placeholder.png'}
                                    style={{ objectFit: 'cover', width: '100%', filter: editMode ? 'brightness(50%)' : 'none' }} />
                            </FadePlaceholderAnimationWrapper>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})