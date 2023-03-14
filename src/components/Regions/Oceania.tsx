import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Men from '../Men/Men';
import phone from '../../assets/large.png';
import tablet from '../../assets/medium.png';
import laptop from '../../assets/small.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {
    EST_US_OCEANIA_LG,
    EST_US_OCEANIA_MD,
    EST_US_OCEANIA_SM,
    GERMANY_OCEANIA_LG,
    GERMANY_OCEANIA_MD,
    GERMANY_OCEANIA_SM,
    SINGAPORE_OCEANIA_LG,
    SINGAPORE_OCEANIA_MD,
    SINGAPORE_OCEANIA_SM,
    WEST_US_OCEANIA_LG,
    WEST_US_OCEANIA_MD,
    WEST_US_OCEANIA_SM,
} from '../../images';
import { updateData } from '../../store/slices/dataSlice';

type Props = {}

const devicesList = [
    <img key={phone} src={phone} alt="Phone" width={'40px'} style={{ position: 'absolute', left: '15px', top: '35px' }} />,
    <img key={tablet} src={tablet} alt="Tablet" width={'40px'} style={{ position: 'absolute', left: '-30px', top: '40px' }} />,
    <img key={laptop} src={laptop} alt="Laptop" width={'40px'} style={{ position: 'absolute', left: '65px', top: '40px' }} />
];

const serverDistances = [
    {region: 'singapore', latency: 8, connections: [SINGAPORE_OCEANIA_LG, SINGAPORE_OCEANIA_MD, SINGAPORE_OCEANIA_SM]},
    {region: 'germany', latency: 10, connections: [GERMANY_OCEANIA_LG, GERMANY_OCEANIA_MD, GERMANY_OCEANIA_SM]},
    {region: 'eastUsa', latency: 15, connections: [EST_US_OCEANIA_LG, EST_US_OCEANIA_MD, EST_US_OCEANIA_SM]},
    {region: 'westUsa', latency: 18, connections: [WEST_US_OCEANIA_LG, WEST_US_OCEANIA_MD, WEST_US_OCEANIA_SM]}
];

const animation = [ 
    <div key={'oceania-mobile'} className="color_mobile" style={{ left: '28px', top: '46px', animation: 'progres 4s forwards linear', zIndex: '2'}} ></div>,
    <div key={'oceania-tablet'} className="color_tablet" style={{ left: '-20px', top: '46px', zIndex: '2'}} ></div>,
    <div key={'oceania-laptop'} className="color_laptop" style={{ left: '69px', top: '48px', zIndex: '2'}} ></div>
];

function Oceania({}: Props) {
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
            dispatch(updateData( { 'Oceania': {...mainServer, latency: mainServerLatency, nearestConnections } } ));
        }
    }, [step])

    return (
        <Box sx={{ position: 'absolute', top: '525px', left: '1025px' }}>
            {!usersCount && <Men setUsersCount={setUsersCount} region='Oceania' />}

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

            { result }
            <Box> 
            </Box>

        </Box>
    )
}

export default Oceania