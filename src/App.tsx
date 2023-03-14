import type { RootState } from './store/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { increase } from './store/slices/stepsSlice'
import { Box } from '@mui/material';
import Regions from './components/Regions/Regions';
import Servers from './components/Servers';
import map from './assets/map.png';
import './style.css';
import Total from './components/Total';

const stepsTitle = [
    'Where are your users? Choose the number for every region.',
    'Where is your data located? Choose one spot for Object Storage system',
    'Choose minimum two additional spots for ByteCloud and press',
];

function App() {
    const step = useSelector((state: RootState) => state.step.value);
    const regions = useSelector((state: RootState) => state.regions.value);
    const servers = useSelector((state: RootState) => state.servers.value);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        const timer_second: any = step === 4 && setTimeout(() => dispatch(increase(5)), 8000);
        const timer_first: any = step === 3 && setTimeout(() => {
            dispatch(increase(4));
        }, 5000);

        step === 0 && regions.every(region => region.usersCount > 0) && dispatch(increase(1));
        step === 2 && servers.every(server => server.isActive === true) && dispatch(increase(3));
        step === 3 && timer_first;
        return () => {
            clearTimeout(timer_first);
            clearTimeout(timer_second);
        }
    }, [regions, servers, step])
    
    const activeServersCount = servers.reduce( (acc, server) => {
        if (server.isActive) {
            return acc + 1;
        }
        return acc
    }, 0)


    return (
        <section className='container'>
            <h2 style={{height: '40px'}}> 
                { stepsTitle[step] }
                { step === 0 && regions.some(region => region.usersCount >= 1) && <button onClick={() => dispatch(increase(1))} className='next-btn'>Next</button> } 
                { step === 2 && <button disabled={activeServersCount < 3} onClick={() => dispatch(increase(3))} className='next-btn'>Start</button> } 
            </h2>
            <Box sx={{ position: 'relative' }}>
                <img src={map} alt="World Map" />
                {(step >= 1) && <Servers />}
                <Regions />
            </Box>

            {step === 5 && <Total />}
        </section>
    )
}

export default App
