import './style.css';

const logo = require('../../assets/fondofooter2.png');

const BarraFooter = () => {

    return (
        <div style={{height:"54px"}}>
            <img src={logo} alt=""  className="img-fluid"/>
        </div>        
    );
};

export default BarraFooter;