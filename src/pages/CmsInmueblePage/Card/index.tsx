import { useState } from "react";
import { Button } from "react-bootstrap";
import "./style.css";

const CardCarrousel = (props: any) =>{

    const [masdetalles, setMasDetalles] = useState(true);

    return (
            <div className="card border-0 w-100"  key={props.idx} >
                {/*****************************************
                 * Carrusel de imagenes
                 ******************************************/}
                <div id={`Carrousel-${props.idx}`} className="carousel slide bg-warning   ">
                    <div className="carousel-inner">              
                        {
                            props.data.imagenes.map((img: any, idx: number)=>
                                <div className={`carousel-item ${(idx < 1) ? "active" : ""}`}>
                                    <div key={idx}  className="d-flex flex-row justify-content-center">
                                        <img src={img.url} className="d-block w-100 " alt="..."/>                            
                                    </div>
                                </div>    
                            )
                        }
                    </div>

                    <button className="carousel-control-prev " type="button" data-bs-target={`#Carrousel-${props.idx}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#Carrousel-${props.idx}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>  
                {/*****************************************
                 * Listado de caracteristicas del inmueble
                 ******************************************/}
                <div id="texto" className="card-body d-flex flex-column gap-2">

                    <div className=" d-flex flex-row gap-2">
                        <div className="w-75 bg-light "><label>Área</label></div>
                        <div className="w-25 bg-light "><label>{props.data.ARE}</label></div>
                    </div>

                    <div className=" d-flex flex-row gap-2">
                        <div className="w-75 bg-light "><label>Habitaciones</label></div>
                        <div className="w-25 bg-light "><label>{props.data.HAB}</label></div>
                    </div>      

                    <div className=" d-flex flex-row gap-2">
                        <div className="w-75 bg-light "><label>Baños</label></div>
                        <div className="w-25 bg-light "><label>{props.data.BAN}</label></div>
                    </div>     

                    <div className=" d-flex flex-row gap-2">
                        <div className="w-75 bg-light "><label>Garajes</label></div>
                        <div className="w-25 bg-light "><label>{props.data.GAR}</label></div>
                    </div>    

                        <div className={`d-flex flex-row gap-2 ${masdetalles ? 'd-none': ''}`} >
                            <div className="w-75 bg-light "><label>Aire acondicionado</label></div>
                            <div className="w-25 bg-light "><label>{props.data.AA}</label></div>
                        </div>   

                        <div className={`d-flex flex-row gap-2 ${masdetalles ? 'd-none': ''}`} >
                            <div className="w-75 bg-light "><label>BBQ</label></div>
                            <div className="w-25 bg-light "><label>{props.data.BBQ}</label></div>
                        </div>   

                        <div className={`d-flex flex-row gap-2 ${masdetalles ? 'd-none': ''}`} >
                            <div className="w-75 bg-light "><label>Lavadora</label></div>
                            <div className="w-25 bg-light "><label>{props.data.LAV}</label></div>
                        </div>     

                        <div className={`d-flex flex-row gap-2 ${masdetalles ? 'd-none': ''}`} >
                            <div className="w-75 bg-light "><label>Microondas</label></div>
                            <div className="w-25 bg-light "><label>{props.data.MIC}</label></div>
                        </div>   

                        <div className={`d-flex flex-row gap-2 ${masdetalles ? 'd-none': ''}`} >
                            <div className="w-75 bg-light "><label></label>Refrigerador</div>
                            <div className="w-25 bg-light "><label>{props.data.REF}</label></div>
                        </div>   

                        <div className={`d-flex flex-row gap-2 ${masdetalles ? 'd-none': ''}`} >
                            <div className="w-75 bg-light "><label>Wifi</label></div>
                            <div className="w-25 bg-light "><label>{props.data.WIF}</label></div>
                        </div>   

                        <div className={`d-flex flex-row gap-2 ${masdetalles ? 'd-none': ''}`} >
                            <div className="w-75 bg-light "><label>Sauna</label></div>
                            <div className="w-25 bg-light "><label>{props.data.SAU}</label></div>
                        </div>      

                        <div className={`d-flex flex-row gap-2 ${masdetalles ? 'd-none': ''}`} >
                            <div className="w-75 bg-light "><label>Piscina</label></div>
                            <div className="w-25 bg-light "><label>{props.data.PIS}</label></div>
                        </div>   

                        <div className={`d-flex flex-row gap-2 ${masdetalles ? 'd-none': ''}`} >
                            <div className="w-75 bg-light "><label>Gimnasio</label></div>
                            <div className="w-25 bg-light "><label>{props.data.GYM}</label></div>
                        </div> 

                    <div>
                        <Button className="border-0" onClick={()=>setMasDetalles(!masdetalles)} style={{backgroundColor: "#574B94"}}>Más detalles</Button>
                    </div>                     
                </div>
            </div>        
    );
};

export default CardCarrousel;