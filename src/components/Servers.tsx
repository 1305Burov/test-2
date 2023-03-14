import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { increase } from '../store/slices/stepsSlice';
import { updateServerInfo } from '../store/slices/serversSlice';
import * as images from '../images';


type Props = {}

function Servers({}: Props) {
    const step = useSelector((state: RootState) => state.step.value);
    const servers = useSelector((state: RootState) => state.servers.value);
    const dispatch = useDispatch();

    const positions: any = {
        westUsa: { position: 'absolute', left: '175px', top: '325px', zIndex: '100' },
        eastUsa: { position: 'absolute', left: '355px', top: '305px', zIndex: '100' },
        germany: { position: 'absolute', left: '615px', top: '275px', zIndex: '100' },
        singapore: { position: 'absolute', left: '960px', top: '485px', zIndex: '100' },
    }

    const isMainSet = servers.some(server => server.isMain);

    const handleClick = (server: {region: string, isMain: boolean, isActive: boolean}) => {
        const updServer = {...server};

        if (!isMainSet) {
            updServer.isMain = true;
            dispatch(increase(2));
        }
        updServer.isActive = true;

        dispatch(updateServerInfo(updServer));
    }

    return (
        <div>
            {servers.map(server => {
                if (server.isMain) {
                    return <img src={images.server_main} alt="Server main icon" key={server.region} width={'40px'} style={positions[server.region]} />
                }else if (server.isActive) {
                    return <img src={images.server_cloud} alt="Cloud server icon" key={server.region} width={'40px'} style={positions[server.region]} />
                }else if ( step < 3 ){
                    return <img src={images.circle_empty} className="server-position" alt="Server place icon" key={server.region} width={'40px'} style={positions[server.region]} onClick={() => handleClick(server)} />
                }
            })}
        </div>
    )
}

export default Servers 