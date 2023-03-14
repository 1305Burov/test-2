import NorthAmerica from './NorthAmerica';
import SouthAmerica from './SouthAmerica';
import Europe from './Europe';
import Asia from './Asia';
import Oceania from './Oceania';

type Props = {}

function Regions({}: Props) {
    return (
        <>
            <NorthAmerica />
            <SouthAmerica />
            <Europe />
            <Asia />
            <Oceania />
        </>
    )
}

export default Regions