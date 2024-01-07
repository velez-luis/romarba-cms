
import { FaCheckDouble, FaHome, FaPeopleArrows, FaTasks, FaRegBuilding, FaCity, FaStreetView, FaSlidersH, FaPowerOff} from "react-icons/fa";
import { Link } from "react-router-dom";
import './style.css';
import { useSelector } from "react-redux";

const logo = require('../../assets/logo.png');

const CmsMenu = () => {

    const globalData: any = useSelector((state: any) => state);

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container imgFondoCut justify-content-start" >
                {/* Imagén marca fluida */}
                <div style={{width: "40%"}}>
                    <img src={logo} alt="" className="img-fluid" style={{width: "70%"}}/>
                </div>
                {/* Ícono de hamburguesa en modo responsive*/}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Menú gestión*/} 
                        <li className="nav-item dropdown  me-3 ">
                            <Link to="/" className={`nav-link dropdown-toggle text-decoration-none me-2 d-flex flex-row align-items-center gap-1 `}  id="navbarDropdownReferencia" role="button" data-bs-toggle="dropdown" aria-expanded="false" key={0}> 
                                <FaCheckDouble />Gestión
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownReferencia">                               
                                <li><Link className={`dropdown-item `} to="/cms/creaInmueble" ><FaHome /> Inmuebles</Link></li>
                                <li><Link className={`dropdown-item `} to="/cms/creaPropietario" ><FaPeopleArrows /> Propietarios</Link></li>                                                     
                            </ul>    
                        </li>

                        {/* Menú parametrización*/} 
                        <li className="nav-item dropdown  me-3 ">
                            <Link to="/" className={`nav-link dropdown-toggle text-decoration-none me-2 d-flex flex-row align-items-center gap-1 `}  id="navbarDropdownReferencia" role="button" data-bs-toggle="dropdown" aria-expanded="false" key={0}> 
                                <FaSlidersH />Parámetrización
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownReferencia">                               
                        {/*                                 <li><Link className={`dropdown-item `} to="/" ><FaShopify /> Compras</Link></li> */}
                                <li><Link className={`dropdown-item `} to="/cms/creaCiudad" ><FaCity /> Ciudades</Link></li>
                                <li><Link className={`dropdown-item `} to="/cms/creaCiudad" ><FaStreetView /> Barrios</Link></li>
                                <li><Link className={`dropdown-item `} to="/cms/creaTipoInmueble" ><FaRegBuilding /> Tipo Inmuebles</Link></li>
                                <li><Link className={`dropdown-item `} to="/cms/creaCaracteristica" ><FaTasks /> Características</Link></li>
{/*                                 <li><Link className={`dropdown-item `} to="/" ><FaUserFriends /> Vendedores</Link></li>
                                <li><Link className={`dropdown-item `} to="/" ><FaUsers /> Usuarios</Link></li> */}
                        {/*                                 <li><Link className={`dropdown-item `} to="/" ><FaLandmark /> Hipotecas</Link></li>
                                <li><Link className={`dropdown-item `} to="/" ><FaDollarSign /> Avalúos</Link></li>   */}                                                             
                            </ul>    
                        </li>

                        {/* Menú nosotros*/} 
                        <div className="d-flex gap-3 me-3 ">
                            <div className="d-flex align-items-center fw-bold">
                                <label >Hola, {`${globalData.user}`}</label>
                            </div>
                            <div className="h3 text-success"><a href="/" className="text-success"><FaPowerOff /></a></div>            
                        </div>   
                    </ul>
                </div>
            </div>
        </nav>        
    );
};

export default CmsMenu;