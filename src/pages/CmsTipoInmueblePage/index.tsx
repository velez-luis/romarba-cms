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
 
    const [tipoInmuebles, setTipoInmuebles] = useState([]);

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
        if( formData.idTipoInmueble ){
            handleEdit( formData )
        }else{
            //Creación del tipoInmueble
            const response: any = await httpApiPPPD("/tipoInmueble", "POST", {
                "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiIiwidXNlckRhdGEiOjEsInN1YiI6ImFkbWluIiwiaWF0IjoxNzAyMzUwMDg4LCJleHAiOjE3MDIzNjgwODh9.QHhtp8bb5ru6Gx1jUtCYZGGYRGvCUnESCjX8oPQZe-5QzxeDsnJOoX8SWR7QtyAA",
                "Content-Type" : "application/json"
            }, formData);

            if (response.code >= 400){
                setShowMsgApiResponse(true);
                setMsgApiResponse(response.message.message);  
            }else{
                setShowMsgApiResponse(true);
                setMsgApiResponse("Tipo Inmueble CREADO exitosamente!!!");  
                setFormData({});
            }
            setSHCarga(false);   
            // 
            let resp = await httpApiGet("/tipoInmueble");
            setTipoInmuebles(resp.message);
        }     

        handleResetForm();
             
    }  

    const handleLoadEdit = async (id:any) => {
        // Lógica para abrir el formulario de edición con el id seleccionado
        setFormData(id)
        console.log(`Editar registro con ID: ${id}`);
    }

    const handleEdit = async (id:any) => {

        //Actualización del tipoInmueble
        const response: any = await httpApiPPPD(`/tipoInmueble/${id.idTipoInmueble}`, "PUT", {
            "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiIiwidXNlckRhdGEiOjEsInN1YiI6ImFkbWluIiwiaWF0IjoxNzAyMzUwMDg4LCJleHAiOjE3MDIzNjgwODh9.QHhtp8bb5ru6Gx1jUtCYZGGYRGvCUnESCjX8oPQZe-5QzxeDsnJOoX8SWR7QtyAA",
            "Content-Type" : "application/json"
        }, formData);

        if (response.code >= 400){
            setShowMsgApiResponse(true);
            setMsgApiResponse(response.message.message);  
        }else{
            setShowMsgApiResponse(true);
            setMsgApiResponse("Tipo Inmueble ACTUALIZADO exitosamente!!!");  
        }
        setSHCarga(false);       
        
        // 
        let resp = await httpApiGet("/tipoInmueble");
        setTipoInmuebles(resp.message);   
    };
    
    const handleDeleteDialog = (id:any) => {
        setModalYesNoDialog(true);
        setIdToDelete(id);
    };
    
    const handleDelete = async (id:any) => {

        setModalYesNoDialog(false);
        setSHCarga(true);
        //Creación del tipoInmueble
        const response: any = await httpApiPPPD(`/tipoInmueble/${id}`, "DELETE", {
            "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiIiwidXNlckRhdGEiOjEsInN1YiI6ImFkbWluIiwiaWF0IjoxNzAyMzUwMDg4LCJleHAiOjE3MDIzNjgwODh9.QHhtp8bb5ru6Gx1jUtCYZGGYRGvCUnESCjX8oPQZe-5QzxeDsnJOoX8SWR7QtyAA",
            "Content-Type" : "application/json"
        }, formData);
        console.log(response);
        if (response.code >= 400){
            setShowMsgApiResponse(true);
            setMsgApiResponse(response.message.message);  
        }else{
            setShowMsgApiResponse(true);
            setMsgApiResponse("Tipo Inmueble ELIMINADO exitosamente!!!");  
            setFormData({});
        }
        setSHCarga(false);   
        // 
        let resp = await httpApiGet("/tipoInmueble");
        console.log(resp.message);
        setTipoInmuebles(resp.message);
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
            //Trae los tipoInmuebles
            let resp = await httpApiGet("/tipoInmueble");
            setTipoInmuebles(resp.message);   
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

                <div className='mb-3 h4'>Datos de los Tipos de Inmuebles</div>                  

                <div className="col-lg-12 col-md-12">
                    <label htmlFor="tipoInmueble" className="form-label">Nombre Tipo Inmueble</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="tipoInmueble" 
                            aria-describedby="inputGroupPrepend"  placeholder="" 
                            value={formData?.tipoInmueble} onChange={handler} 
                            />
                    </div>
                </div>                           

                <div className="col-lg-12 col-md-12">
                    <label htmlFor="descripcion" className="form-label">Descripción </label>
                    <input type="text" className="form-control" id="descripcion"  placeholder=""  value={formData?.descripcion} onChange={handler} />
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
                <th>Nombre Tipo Inmueble</th>
                <th>Descripción</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tipoInmuebles.map((registro:any) => (
                <tr key={registro.idTipoInmueble}>
                    <td>{registro.idTipoInmueble}</td>
                    <td>{registro.tipoInmueble}</td>
                    <td>{registro.descripcion}</td>
                    <td>
                    <FaEdit
                        onClick={() => handleLoadEdit(registro)}
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                        className='text-warning'
                    />
                    <FaTrash
                        onClick={() => handleDeleteDialog(registro.idTipoInmueble)}
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
            Title="Gestión de Tipo Inmuebles"
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

const CmsTipoInmueblePage = () => {        
        
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
            <div className='' style={{border: "10px", borderColor: "red"}}>
                <div className="" style={{boxShadow: "1px 2px 5px"}}>
                    <img src={banner} alt="" height={365}  className="img-fluid "/>
                </div>

                <div className='mt-4 mb-4 text-center' >
                    <h1 style={{color: "#2A3482"}}>CMS - GESTIÓN DE TIPOS DE INMUEBLES</h1>
                </div>

                <div className=' d-flex justify-content-center mt-1 '>

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

export default CmsTipoInmueblePage;