import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Placeholder, Segment } from 'semantic-ui-react';
import { Institution } from '../../../app/models/institution';

export default function InstitutionsListItemPlaceholder() {
    return (
        <Fragment>
            <Placeholder fluid style={{ marginTop: 10 }}>
                <Segment.Group>
                    <Segment style={{ minHeight: 110 }}>
                        <Placeholder>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </Segment>
                </Segment.Group>
            </Placeholder>
        </Fragment>
    );
};