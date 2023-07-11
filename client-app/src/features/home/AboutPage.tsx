import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Segment } from 'semantic-ui-react';

export default function AboutPage() {
    const { t } = useTranslation();
    let contents = `Welcome to our website-aggregator of Institutions, the place where all the information is gathered about the best universities of the country. Our platform is developed to provide an exhaustive information about various institutions, helping you to take informed desicions regarding your academic career.

Our main value is to connect the infor mation scattered across the Internet, including official website of institutions, ratings and reviews to maintain the full picture about every institution. Our team of researchers is working perpetually to gather the most accurate and relevant information about institutions so you don't have to spend hours researching yourself.

We recognize the choice of an institution as a pivotal decision which can influence your entire career and personal growth. Thus our goal is to provide the best user experience with our instruments which will help you to make a correct choice.
Our website has an intuitive interface to perform search of institutions, allowing users to apply various filters like tuition, location, specialty etc. Also it is possible to compare institutions and specialties inside our UI without the need to construct tables manually.

Thank you for choosing our service!`
    return (
        <Segment basic style={{width: '60rem', margin: '0 auto', padding: '6rem 0'}}>
            <div style={{fontSize: '4rem', fontWeight: 800, fontFamily: 'fantasy',color: '#33333a', textAlign: 'center'}}>
                {t('The best choice from here')}
            </div>
            <div style={{fontSize: '2rem', fontWeight: 800, padding: '2rem 0', color: '#888', textAlign: 'center'}}>
                {t('The platform for institutions search')}
            </div>
            <div style={{width: '100%'}}>
                <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                    {contents}
                </pre>
            </div>
        </Segment>
    )
}