import { useEffect, useState } from 'react';
import BarraFooter from '../../components/BarraFooter';
import './style.css'
import { httpApiGet, httpApiPPPD } from '../../lib';
import LocalMsgModalSpinner from './LocalModalSpinner/LocalMsgModalSpinner';
import MsgDialog from '../../components/MsgDialog';
import { FaEdit, FaTrash } from 'react-icons/fa';
import MsgYesNoDialog from '../../components/MsgYesNoDialog';
import CmsMenu from '../../components/CmsMenu';

const banner = require('../../assets/fotospaginas_Mesadetrabajo1.png');
const bgImgButton = require("../../assets/botonenviar.png");

const form: any = {};

const Interno = (props: any) => {
 
    const [formData, setFormData] = useState(form);
 
    const [propietarios, setPropietarios] = useState([]);

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
        if( formData.idPropietario ){
            handleEdit( formData )
        }else{
            //Creación del propietario
            const response: any = await httpApiPPPD("/propietario", "POST", {
                "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiIiwidXNlckRhdGEiOjEsInN1YiI6ImFkbWluIiwiaWF0IjoxNzAyMzUwMDg4LCJleHAiOjE3MDIzNjgwODh9.QHhtp8bb5ru6Gx1jUtCYZGGYRGvCUnESCjX8oPQZe-5QzxeDsnJOoX8SWR7QtyAA",
                "Content-Type" : "application/json"
            }, formData);

            if (response.code >= 400){
                setShowMsgApiResponse(true);
                setMsgApiResponse(response.message.message);  
            }else{
                setShowMsgApiResponse(true);
                setMsgApiResponse("Propietario creado exitosamente!!!");  
                setFormData({});
            }
            setSHCarga(false);   
            // 
            let resp = await httpApiGet("/propietario");
            setPropietarios(resp.message);
        }     

        handleResetForm();  
             
    }      
    const handleLoadEdit = async (id:any) => {
        // Lógica para abrir el formulario de edición con el id seleccionado
        setFormData(id)
        console.log(`Editar registro con ID: ${id}`);
    }

    const handleEdit = async (id:any) => {

        //Actualización del propietario
        const response: any = await httpApiPPPD(`/propietario/${id.idPropietario}`, "PUT", {
            "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiIiwidXNlckRhdGEiOjEsInN1YiI6ImFkbWluIiwiaWF0IjoxNzAyMzUwMDg4LCJleHAiOjE3MDIzNjgwODh9.QHhtp8bb5ru6Gx1jUtCYZGGYRGvCUnESCjX8oPQZe-5QzxeDsnJOoX8SWR7QtyAA",
            "Content-Type" : "application/json"
        }, formData);

        if (response.code >= 400){
            setShowMsgApiResponse(true);
            setMsgApiResponse(response.message.message);  
        }else{
            setShowMsgApiResponse(true);
            setMsgApiResponse("Propietario ACTUALIZADO exitosamente!!!");  
        }
        setSHCarga(false);       
        
        // 
        let resp = await httpApiGet("/propietario");
        console.log(resp.message);
        setPropietarios(resp.message);   
      };
    
    const handleDeleteDialog = (id:any) => {
        setModalYesNoDialog(true);
        setIdToDelete(id);
      };
    
    const handleDelete = async (id:any) => {

        setModalYesNoDialog(false);
        setSHCarga(true);
        //Creación del propietario
        const response: any = await httpApiPPPD(`/propietario/${id}`, "DELETE", {
            "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiIiwidXNlckRhdGEiOjEsInN1YiI6ImFkbWluIiwiaWF0IjoxNzAyMzUwMDg4LCJleHAiOjE3MDIzNjgwODh9.QHhtp8bb5ru6Gx1jUtCYZGGYRGvCUnESCjX8oPQZe-5QzxeDsnJOoX8SWR7QtyAA",
            "Content-Type" : "application/json"
        }, formData);
        console.log(response);
        if (response.code >= 400){
            setShowMsgApiResponse(true);
            setMsgApiResponse(response.message.message);  
        }else{
            setShowMsgApiResponse(true);
            setMsgApiResponse("Propietario ELIMINADO exitosamente!!!");  
            setFormData({});
        }
        setSHCarga(false);   
        // 
        let resp = await httpApiGet("/propietario");
        console.log(resp.message);
        setPropietarios(resp.message);
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
                //Trae los propietarios
                let resp = await httpApiGet("/propietario");
                setPropietarios(resp.message);   
            }

            inicilizacion();

        }, []);
  return (
    <div  className=' divInterno' >
        {/****************************
         * formulario
        *****************************/}
        <div className='rounded me-2' style={{boxShadow: "1px 2px 5px"}}>
            <form className="row g-1 p-4" id="frmFileSet" >

                <div className='mb-3 h4'>Datos del Propietario</div>                  

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="ciudad" className="form-label">Identificación</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" id="identificacion" 
                            aria-describedby="inputGroupPrepend"  placeholder="" 
                            value={formData?.identificacion} onChange={handler} 
                            />
                    </div>
                </div>                    

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="direccion" className="form-label">Nombre completo </label>
                    <input type="text" className="form-control" id="nombres"  placeholder=""  value={formData?.nombres} onChange={handler} />
                </div>

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="valor" className="form-label">Dirección</label>
                    <input type="text"  className="form-control" id="direccion"  value={formData?.direccion} onChange={handler}  placeholder="" />
                </div>

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="referenciaCatastral" className="form-label">Teléfono</label>
                    <input type="text"   className="form-control" id="telefono"  value={formData?.telefono} onChange={handler}  placeholder="" />
                </div> 

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="matriculaInmobiliaria" className="form-label">Email</label>
                    <input type="text"  className="form-control" id="email"  value={formData?.email} onChange={handler} placeholder="" />
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
                <th>Identificación</th>
                <th>Nombres</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {propietarios.map((registro:any) => (
                <tr key={registro.idPropietario}>
                    <td>{registro.idPropietario}</td>
                    <td>{registro.identificacion}</td>
                    <td>{registro.nombres}</td>
                    <td>{registro.direccion}</td>
                    <td>{registro.telefono}</td>
                    <td>{registro.email}</td>
                    <td>
                    <FaEdit
                        onClick={() => handleLoadEdit(registro)}
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                        className='text-warning'
                    />
                    <FaTrash
                        onClick={() => handleDeleteDialog(registro.idPropietario)}
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
            Title="Gestión de Propietarios"
            Icon="!"
            Show={showMsgApiResponse}
            BtnNokName=""
            BtnOkName="Cerrar"
            Message={MsgApiResponse}
            HandlerClickOk={()=>setShowMsgApiResponse(false)}
            HanlerdClickNok={null}
        />        
        <LocalMsgModalSpinner 
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

const CmsPropietarioPage = () => {        
        
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
                    <h1 style={{color: "#2A3482"}}>CMS - GESTIÓN DE PROPIETARIOS</h1>
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

export default CmsPropietarioPage;