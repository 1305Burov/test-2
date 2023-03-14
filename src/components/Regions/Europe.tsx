import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Men from '../Men/Men';
import phone from '../../assets/large.png';
import tablet from '../../assets/medium.png';
import laptop from '../../assets/small.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {
    EST_US_EUROPE_LG,
    EST_US_EUROPE_MD,
    EST_US_EUROPE_SM,
    GERMANY_EUROPE_LG,
    GERMANY_EUROPE_MD,
    GERMANY_EUROPE_SM,
    SINGAPORE_EUROPE_LG,
    SINGAPORE_EUROPE_MD,
    SINGAPORE_EUROPE_SM,
    WEST_US_EUROPE_LG,
    WEST_US_EUROPE_MD,
    WEST_US_EUROPE_SM,
} from '../../images';
import { updateData } from '../../store/slices/dataSlice';

type Props = {}

const devicesList = [
        <img key={phone} src={phone} alt="Phone" width={'40px'} style={{ position: 'absolute', left: '100px' }} />,
        <img key={tablet} src={tablet} alt="Tablet" width={'40px'} style={{ position: 'absolute', left: '-60px', top: '60px' }} />,
        <img key={laptop} src={laptop} alt="Laptop" width={'40px'} style={{ position: 'absolute', left: '30px', top: '25px' }} />
];

const serverDistances = [
    {region: 'germany', latency: 4, connections: [GERMANY_EUROPE_LG, GERMANY_EUROPE_MD, GERMANY_EUROPE_SM]},
    {region: 'eastUsa', latency: 10, connections: [EST_US_EUROPE_LG, EST_US_EUROPE_MD, EST_US_EUROPE_SM]},
    {region: 'westUsa', latency: 15, connections: [WEST_US_EUROPE_LG, WEST_US_EUROPE_MD, WEST_US_EUROPE_SM]},
    {region: 'singapore' , latency: 18, connections: [SINGAPORE_EUROPE_LG, SINGAPORE_EUROPE_MD, SINGAPORE_EUROPE_SM]},
];

const animation = [ 
    <div key={'europe-mobile'} className="color_mobile" style={{ left: '113px', top: '11px', animation: 'progres 4s forwards linear', zIndex: '2'}} ></div>,
    <div key={'europe-tablet'} className="color_tablet" style={{ left: '-50px', top: '66px', zIndex: '2'}} ></div>,
    <div key={'europe-laptop'} className="color_laptop" style={{ left: '34px', top: '33px', zIndex: '2'}} ></div>
];

function Europe({}: Props) {
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
            dispatch(updateData( { 'Europe': {...mainServer, latency: mainServerLatency, nearestConnections } } ));
        }
    }, [step])

    return (
        <Box sx={{ position: 'absolute', top: '250px', left: '635px' }}>
            {!usersCount && <Men setUsersCount={setUsersCount} region='Europe' />}

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

export default Europe