import { useSelector } from 'react-redux';
import BarraFooter from '../../components/BarraFooter';
import BarraMenu from '../../components/CmsMenu';
import './style.css'

const banner = require('../../assets/bannerpaginaprincipal.png');

const PageLandingPage = () => {

    const globalData: any = useSelector((state: any) => state);

    return(
        <div className='container'>
            <div className='text-center '>
                <BarraMenu /> 
            </div>

            <div className=" img-fluid  " style={{boxShadow: "1px 2px 5px"}}>
                <img src={banner} alt="" height={365}  className="img-fluid "/>
            </div>
            <br/>
            <br/>
            <h2>{`BIenvenido ${globalData.user}`}</h2>
            <br/>
            <br/>
            <div className='text-center'>
                <BarraFooter />
            </div>             
        </div>
    )

};

export default PageLandingPage;