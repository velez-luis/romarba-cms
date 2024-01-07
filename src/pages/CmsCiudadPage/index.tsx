import { useEffect, useState } from 'react';
import BarraFooter from '../../components/BarraFooter';
import './style.css'
import { httpApiGet, httpApiPPPD } from '../../lib';
import MsgDialog from '../../components/MsgDialog';
import { FaEdit, FaTrash } from 'react-icons/fa';
import MsgYesNoDialog from '../../components/MsgYesNoDialog';
import GlobalLocalMsgModalSpinner from '../../components/GlobalLocalModalSpinner/GlobalLocalMsgModalSpinner';
import CmsMenu from '../../components/CmsMenu';

const banner = require('../../assets/fotospaginas_Mesadetrabajo1.png');
const bgImgButton = require("../../assets/botonenviar.png");

const form: any = {};

const Interno = (props: any) => {
 
    const [formData, setFormData] = useState(form);
    const [ciudads, setciudads] = useState([]);
    const [sHCarga, setSHCarga] = useState(false);  
    const [modalYesNoDialog, setModalYesNoDialog] = useState(false);  
    const [idToDelete, setIdToDelete] = useState(-1);
    const [showMsgApiResponse, setShowMsgApiResponse] = useState(false);   
    const [MsgApiResponse, setMsgApiResponse] = useState("");      

    const handler = (e: any) => {

        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }
    
    const handlerSend = async (e: any) => {

        setSHCarga(true);
        if( formData.idCiudad ){
            handleEdit( formData )
        }else{
            //Creación del ciudad
            const response: any = await httpApiPPPD("/ciudad", "POST", {
                "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiIiwidXNlckRhdGEiOjEsInN1YiI6ImFkbWluIiwiaWF0IjoxNzAyMzUwMDg4LCJleHAiOjE3MDIzNjgwODh9.QHhtp8bb5ru6Gx1jUtCYZGGYRGvCUnESCjX8oPQZe-5QzxeDsnJOoX8SWR7QtyAA",
                "Content-Type" : "application/json"
            }, formData);

            if (response.code >= 400){
                setShowMsgApiResponse(true);
                setMsgApiResponse(response.message.message);  
            }else{
                setShowMsgApiResponse(true);
                setMsgApiResponse("Ciudad CREADA exitosamente!!!");  
                setFormData({});
            }
            setSHCarga(false);   
            // 
            let resp = await httpApiGet("/ciudad");
            setciudads(resp.message);
        }     

        handleResetForm();
             
    }      
    const handleLoadEdit = async (id:any) => {
        // Lógica para abrir el formulario de edición con el id seleccionado
        setFormData(id)
        console.log(`Editar registro con ID: ${id}`);
    }

    const handleEdit = async (id:any) => {

        //Actualización del ciudad
        const response: any = await httpApiPPPD(`/ciudad/${id.idCiudad}`, "PUT", {
            "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiIiwidXNlckRhdGEiOjEsInN1YiI6ImFkbWluIiwiaWF0IjoxNzAyMzUwMDg4LCJleHAiOjE3MDIzNjgwODh9.QHhtp8bb5ru6Gx1jUtCYZGGYRGvCUnESCjX8oPQZe-5QzxeDsnJOoX8SWR7QtyAA",
            "Content-Type" : "application/json"
        }, formData);

        if (response.code >= 400){
            setShowMsgApiResponse(true);
            setMsgApiResponse(response.message.message);  
        }else{
            setShowMsgApiResponse(true);
            setMsgApiResponse("Ciudad ACTUALIZADA exitosamente!!!");  
        }
        setSHCarga(false);       
        
        // 
        let resp = await httpApiGet("/ciudad");
        setciudads(resp.message);   
    };
    
    const handleDeleteDialog = (id:any) => {
        setModalYesNoDialog(true);
        setIdToDelete(id);
    };
    
    const handleDelete = async (id:any) => {

        setModalYesNoDialog(false);
        setSHCarga(true);
        //Creación del ciudad
        const response: any = await httpApiPPPD(`/ciudad/${id}`, "DELETE", {
            "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiIiwidXNlckRhdGEiOjEsInN1YiI6ImFkbWluIiwiaWF0IjoxNzAyMzUwMDg4LCJleHAiOjE3MDIzNjgwODh9.QHhtp8bb5ru6Gx1jUtCYZGGYRGvCUnESCjX8oPQZe-5QzxeDsnJOoX8SWR7QtyAA",
            "Content-Type" : "application/json"
        }, formData);
        console.log(response);
        if (response.code >= 400){
            setShowMsgApiResponse(true);
            setMsgApiResponse(response.message.message);  
        }else{
            setShowMsgApiResponse(true);
            setMsgApiResponse("Ciudad ELIMINADA exitosamente!!!");  
            setFormData({});
        }
        setSHCarga(false);   
        // 
        let resp = await httpApiGet("/ciudad");
        console.log(resp.message);
        setciudads(resp.message);
        // Lógica para eliminar el registro con el id seleccionado
        console.log(`Eliminar registro con ID: ${id}`);
    };
    
    const handleResetForm = () =>{
        const inputsArray = Object.entries(formData);

        // Recorremos el arreglo y retornamos un nuevo arreglo de arreglos conservando el key
        const clearInputsArray = inputsArray.map(([key]) => [key, '']);

        //Convertimos el arreglo de arreglos nuevamente a formato json
        const inputsJson = Object.fromEntries(clearInputsArray);

        setFormData(inputsJson);
    }

    useEffect(()=>{

        const inicilizacion = async () => {
            //Trae los ciudads
            let resp = await httpApiGet("/ciudad");
            setciudads(resp.message);   
        }

        inicilizacion();

    }, []);

  return (
    <div  className=' w-100' >
        {/****************************
         * formulario
        *****************************/}
        <div className='rounded me-2' style={{boxShadow: "1px 2px 5px"}}>
            <form className="row g-1 p-4" id="form1">

                <div className='mb-3 h4'>Datos de la ciudad</div>                  

                <div className="col-lg-12 col-md-12">
                    <label htmlFor="ciudad" className="form-label">Nombre Ciudad</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="nombre" 
                            aria-describedby="inputGroupPrepend"  placeholder="" 
                            value={formData?.nombre} onChange={handler} 
                            />
                    </div>
                </div>          


                <div className="col-lg-12 col-md-12 mt-3 text-center"  style={{margin: "auto" }}>
                    <input type="button" value= "" className="border-0 rounded" style={{width: "150px", height: "42px", backgroundImage: `url(${bgImgButton})`, backgroundSize: "cover" }}
                        onClick={handlerSend}
                    />
                </div> 
            </form>   

        {/****************************
         * Tabla Regitros
        *****************************/}

        <table className="table table-hover">
            <thead className="table table-primary">
                <tr>
                <th>ID</th>
                <th>Nombre Ciudad</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {ciudads.map((registro:any) => (
                <tr key={registro.idCiudad}>
                    <td>{registro.idCiudad}</td>
                    <td>{registro.nombre}</td>
                    <td>
                    <FaEdit
                        onClick={() => handleLoadEdit(registro)}
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                        className='text-warning'
                    />
                    <FaTrash
                        onClick={() => handleDeleteDialog(registro.idCiudad)}
                        style={{ cursor: 'pointer' }}
                        className='text-danger'
                    />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

        </div>
        <MsgDialog 
            Title="Gestión de Ciudades"
            Icon="!"
            Show={showMsgApiResponse}
            BtnNokName=""
            BtnOkName="Cerrar"
            Message={MsgApiResponse}
            HandlerClickOk={()=>setShowMsgApiResponse(false)}
            HanlerdClickNok={null}
        />        
        <GlobalLocalMsgModalSpinner 
            Show={sHCarga}
            text="Un momento por favor, procesando..."
            color="#FF7588"
        />         

        <MsgYesNoDialog 
            Title="Confirmar Eliminación"
            Icon="!"
            Show={modalYesNoDialog}
            BtnNokName="Cancelar"
            BtnOkName="Aceptar"
            Message={"¿Está seguro que desea eliminar el registro seleccionado?"}
            HandlerClickOk={()=>handleDelete(idToDelete)}
            HanlerdClickNok={()=>setModalYesNoDialog(false)}
        />    
    </div>            
  );
}

const CmsCiudadPage = () => {        
        
    return(
        <div className='container'>
            {/*******************
             * Header - only MenuBar
            *********************/}              
            <div className='text-center '>
                <CmsMenu /> 
            </div>
            {/*******************
             * Body
            *********************/}  
            <div>
                <div className="" style={{boxShadow: "1px 2px 5px"}}>
                    <img src={banner} alt="" height={365}  className="img-fluid "/>
                </div>

                <div className='mt-4 mb-4 text-center' >
                    <h1 style={{color: "#2A3482"}}>CMS - GESTIÓN DE CIUDADES</h1>
                </div>

                <div className=' d-flex justify-content-center mt-1'>

                    <Interno />

                </div>
            </div>

            <div style={{height: "40px"}} className='imgFondoCut'></div>   
            {/*******************
             * Footer
            *********************/}         
            <div className='text-center'>
                <BarraFooter />
            </div>                         
        </div>
    )

};

export default CmsCiudadPage;