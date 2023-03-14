import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Men from '../Men/Men';
import phone from '../../assets/large.png';
import tablet from '../../assets/medium.png';
import laptop from '../../assets/small.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {EST_US_ASIA_LG, EST_US_ASIA_MD, EST_US_ASIA_SM,GERMANY_ASIA_LG, GERMANY_ASIA_MD, GERMANY_ASIA_SM, SINGAPORE_ASIA_LG, SINGAPORE_ASIA_MD, SINGAPORE_ASIA_SM,WEST_US_ASIA_LG, WEST_US_ASIA_MD, WEST_US_ASIA_SM} from '../../images';
import { updateData } from '../../store/slices/dataSlice';

type Props = {}

const animation = [ 
    <div key={'asia-mobile'} className="color_mobile" style={{ left: '133px', top: '-39px', animation: 'progres 4s forwards linear', zIndex: '2'}} ></div>,
    <div key={'asia-tablet'} className="color_tablet" style={{ left: '-30px', top: '46px', zIndex: '2'}} ></div>,
    <div key={'asia-laptop'} className="color_laptop" style={{ left: '74px', top: '33px', zIndex: '2'}} ></div>
];

const devicesList = [
    <img key={phone} src={phone} alt="Phone" width={'40px'} style={{ position: 'absolute', left: '120px', top: '-50px' }} />,
    <img key={tablet} src={tablet} alt="Tablet" width={'40px'} style={{ position: 'absolute', left: '-40px', top: '40px' }} />,
    <img key={laptop} src={laptop} alt="Laptop" width={'40px'} style={{ position: 'absolute', left: '70px', top: '25px' }} />
];

const serverDistances = [
    {region: 'singapore', latency: 8, connections: [SINGAPORE_ASIA_LG, SINGAPORE_ASIA_MD, SINGAPORE_ASIA_SM]},
    {region: 'germany', latency: 12, connections: [GERMANY_ASIA_LG, GERMANY_ASIA_MD, GERMANY_ASIA_SM]},
    {region: 'eastUsa', latency: 15, connections: [EST_US_ASIA_LG, EST_US_ASIA_MD, EST_US_ASIA_SM]},
    {region: 'westUsa', latency: 18, connections: [WEST_US_ASIA_LG, WEST_US_ASIA_MD, WEST_US_ASIA_SM]}
];

function Asia({}: Props) {
    const step = useSelector((state: RootState) => state.step.value);
    const servers = useSelector((state: RootState) => state.servers.value);

    const dispatch = useDispatch();
    
    const [usersCount, setUsersCount] = useState<null | number>(null);

    const result = [];

    if (usersCount) {
        for (let i = 0; i < usersCount; i++) {
            result.push(devicesList[i]);
        }
    }

    const activeServers = servers.filter(i => i.isActive === true);
    const mainServer = servers[servers.findIndex(i => i.isMain === true)] || {};
    const connectionsIdx = serverDistances.findIndex(item => item.region === mainServer.region);
    const connections = serverDistances[connectionsIdx] || [];

    let nearestConnections: {
        region: string;
        connections: string[];
    } | any = {};

    nearestConnections = serverDistances.find(connection => {
        return activeServers.find(server => connection.region === server.region );
    })
    
    useEffect(() => {
        if (step === 3 && usersCount) {
            const mainServerLatency = serverDistances.find((value) => value.region === mainServer.region)?.latency;
            dispatch(updateData( { 'Asia': {...mainServer, latency: mainServerLatency, nearestConnections } } ));
        }
    }, [step])

    return (
        <Box sx={{ position: 'absolute', top: '340px', left: '900px' }}>
            {!usersCount && <Men setUsersCount={setUsersCount} region='Asia' />}

            {step === 3 && usersCount && nearestConnections && nearestConnections.connections.map((value: any, i: any) => {
                return i < usersCount && <div key={i}>
                    <img key={value} src={value} alt="connections" style={{ position: 'fixed', left: '15px', top: '65px', zIndex: '1'}} /> 
                    {animation[i]}
                </div>
            })}

            {step === 4 && usersCount && connections.connections && connections.connections.map((value, i) => {
                return i < usersCount && <div key={i}>
                    <img key={value} src={value} alt="connections" style={{ position: 'fixed', left: '15px', top: '65px', zIndex: '1'}} /> 
                    {animation[i]}
                </div>
            })}

            <Box> 
                { result } 
            </Box>  
        </Box>
    )
}

export default Asia