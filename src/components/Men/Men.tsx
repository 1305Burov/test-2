import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateCount } from '../../store/slices/regionsSlice'

import './men.css';

type Props = {
    setUsersCount: React.Dispatch<React.SetStateAction<null | number>>,
    region: string
}

function Men({setUsersCount, region}: Props) {
    const step = useSelector((state: RootState) => state.step.value);
    const dispatch = useDispatch();

    const clickHandler = (num: number) => {
        setUsersCount(num);
        dispatch(updateCount({region: region, usersCount: num}));
    }
    
    return (
        <Stack
            direction={'row'}
            alignItems={'flex-end'}
            flexDirection={'row-reverse'}
        >
            {step < 1 && 
                <>
                    <div className='man__image man__image-3' onClick={ () => clickHandler(3) }></div>
                    <div className='man__image man__image-2' onClick={ () => clickHandler(2) }></div>
                    <div className='man__image man__image-1' onClick={ () => clickHandler(1) }></div>
                </>
            }
        </Stack>
    )
}

export default Men