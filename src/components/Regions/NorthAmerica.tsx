import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import Box from '@mui/material/Box';
import Men from '../Men/Men';
import phone from '../../assets/large.png';
import tablet from '../../assets/medium.png';
import laptop from '../../assets/small.png';
import {
    EST_US_NORTH_AMERICA_LG,
    EST_US_NORTH_AMERICA_MD,
    EST_US_NORTH_AMERICA_SM,
    GERMANY_NORTH_AMERICA_LG,
    GERMANY_NORTH_AMERICA_MD,
    GERMANY_NORTH_AMERICA_SM,
    SINGAPORE_NORTH_AMERICA_LG,
    SINGAPORE_NORTH_AMERICA_MD,
    SINGAPORE_NORTH_AMERICA_SM,
    WEST_US_NORTH_AMERICA_LG,
    WEST_US_NORTH_AMERICA_MD,
    WEST_US_NORTH_AMERICA_SM,
} from '../../images';
import { updateData } from '../../store/slices/dataSlice';

type Props = {}

const devicesList = [
    <img key={phone} src={phone} alt="Phone" width={'40px'} style={{ position: 'absolute', right: '0' }} />,
    <img key={tablet} src={tablet} alt="Tablet" width={'40px'} style={{ position: 'absolute', left: '0', top: '30px' }} />,
    <img key={laptop} src={laptop} alt="Laptop" width={'40px'} style={{ position: 'absolute', left: '50px', top: '0' }} />
];

const serverDistances = [
    {region: 'eastUsa', latency: 6, connections: [EST_US_NORTH_AMERICA_LG, EST_US_NORTH_AMERICA_MD, EST_US_NORTH_AMERICA_SM]},
    {region: 'westUsa', latency: 10, connections: [WEST_US_NORTH_AMERICA_LG, WEST_US_NORTH_AMERICA_MD, WEST_US_NORTH_AMERICA_SM]},
    {region: 'germany', latency: 15, connections: [GERMANY_NORTH_AMERICA_LG, GERMANY_NORTH_AMERICA_MD, GERMANY_NORTH_AMERICA_SM]},
    {region: 'singapore', latency: 18, connections: [SINGAPORE_NORTH_AMERICA_LG, SINGAPORE_NORTH_AMERICA_MD, SINGAPORE_NORTH_AMERICA_SM]},
];

const animation = [ 
    <div key={'na-mobile'} className="color_mobile" style={{ left: '-27px', top: '11px', animation: 'progres 4s forwards linear', zIndex: '2'}} ></div>,
    <div key={'na-tablet'} className="color_tablet" style={{ left: '10px', top: '36px', zIndex: '2'}} ></div>,
    <div key={'na-laptop'} className="color_laptop" style={{ left: '54px', top: '8px', zIndex: '2'}} ></div>
];

function NorthAmerica({}: Props) {
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
            dispatch(updateData( { 'NorthAmerica': {...mainServer, latency: mainServerLatency, nearestConnections } } ));
        }
    }, [step])

    return (
        <Box sx={{ position: 'absolute', top: '280px', left: '240px' }}>
            {!usersCount && <Men setUsersCount={setUsersCount} region='NorthAmerica' />}

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

export default NorthAmerica