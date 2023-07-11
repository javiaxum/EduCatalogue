import { observer } from 'mobx-react-lite';
import { useMediaQuery } from 'react-responsive';
import InstitutionComparisonBoardDesktop from './institutionComparisonBoard/InstitutionComparisonBoardDesktop';
import InstitutionComparisonBoardMobile from './institutionComparisonBoard/InstitutionComparisonBoardMobile';


export default observer(function InstitutionComparisonBoard() {

    const isComputerOrTablet = useMediaQuery({ query: '(min-width: 800px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 799px)' });

    return (
        <>
            {isComputerOrTablet && <InstitutionComparisonBoardDesktop />}
            {isMobile && <InstitutionComparisonBoardMobile />}
        </>
    )
})