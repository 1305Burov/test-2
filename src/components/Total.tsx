import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type Props = {}

function Total({}: Props) {
    const data = useSelector((state: RootState) => state.data.value);

    return (
        <div className='total'>
            <div className='total__header'>
                <span>ByteCloud</span>
                <span>Storage</span>
            </div>
            {data.map(val => {
                
                for (const key in val) {
                    
                    return <div key={key} style={{margin: '105px 10px 0 10px'}}>
                        {key}
                        <div style={{display: 'flex', justifyContent: 'space-between', marginTop:'20px'}}>
                            <div>
                                <span>Latency: {val[key].nearestConnections.latency}</span>
                                <span> Download time: {Math.floor(val[key].nearestConnections.latency * 10 / 6)} sec</span>
                            </div>
                            <div>
                                <span> Latency: {val[key].latency} </span>
                                <span> Download time: {Math.floor(val[key].latency * 10 / 6)} sec </span> 
                            </div>
                        </div>
                    </div>
                }
                
            })}
        </div>
    )
}

export default Total