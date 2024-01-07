import { useEffect, useState } from 'react';
import BarraFooter from '../../components/BarraFooter';
import './style.css'
import { httpApiGet, httpApiPPPD } from '../../lib';
import MsgDialog from '../../components/MsgDialog';
import { FaEdit, FaTrash } from 'react-icons/fa';
import MsgYesNoDialog from '../../components/MsgYesNoDialog';
import GlobalLocalMsgModalSpinner from '../../components/GlobalLocalModalSpinner/GlobalLocalMsgModalSpinner';
import CmsMenu from '../../components/CmsMenu';
import { useSelector } from 'react-redux';

const banner = require('../../assets/fotospaginas_Mesadetrabajo1.png');
const bgImgButton = require("../../assets/botonenviar.png");

const form: any = {};

const Interno = () => {
 
    const globalData: any = useSelector((state: any) => state);
    const [formData, setFormData] = useState(form);
    const [caracteristicas, setCaracteristicas] = useState([]);
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
        if( formData.idCaracteristica ){
            handleEdit( formData )
        }else{
            //Creación del caracteristica
            const response: any = await httpApiPPPD("/caracteristica", "POST", {
                "Authorization": `Bearer ${globalData.jwt}`,
                "Content-Type" : "application/json"
            }, formData);

            if (response.code >= 400){
                setShowMsgApiResponse(true);
                setMsgApiResponse(response.message.message);  
            }else{
                setShowMsgApiResponse(true);
                setMsgApiResponse("Característica CREADA exitosamente!!!");  
                setFormData({});
            }
            setSHCarga(false);   
            // 
            let resp = await httpApiGet("/caracteristica");
            setCaracteristicas(resp.message);
        }     

        handleResetForm();
             
    }      
    const handleLoadEdit = async (id:any) => {
        // Lógica para abrir el formulario de edición con el id seleccionado
        setFormData(id)
        console.log(`Editar registro con ID: ${id}`);
    }

    const handleEdit = async (id:any) => {

        //Actualización del caracteristica
        const response: any = await httpApiPPPD(`/caracteristica/${id.idCaracteristica}`, "PUT", {
            "Authorization": `Bearer ${globalData.jwt}`,
            "Content-Type" : "application/json"
        }, formData);

        if (response.code >= 400){
            setShowMsgApiResponse(true);
            setMsgApiResponse(response.message.message);  
        }else{
            setShowMsgApiResponse(true);
            setMsgApiResponse("Característica ACTUALIZADA exitosamente!!!");  
        }
        setSHCarga(false);       
        
        // 
        let resp = await httpApiGet("/caracteristica");
        setCaracteristicas(resp.message);   
      };
    
    const handleDeleteDialog = (id:any) => {
        setModalYesNoDialog(true);
        setIdToDelete(id);
      };
    
    const handleDelete = async (id:any) => {

        setModalYesNoDialog(false);
        setSHCarga(true);
        //Creación del caracteristica
        const response: any = await httpApiPPPD(`/caracteristica/${id}`, "DELETE", {
            "Authorization": `Bearer ${globalData.jwt}`,
            "Content-Type" : "application/json"
        }, formData);
        console.log(response);
        if (response.code >= 400){
            setShowMsgApiResponse(true);
            setMsgApiResponse(response.message.message);  
        }else{
            setShowMsgApiResponse(true);
            setMsgApiResponse("Característica ELIMINADA exitosamente!!!");  
            setFormData({});
        }
        setSHCarga(false);   
        // 
        let resp = await httpApiGet("/caracteristica");
        console.log(resp.message);
        setCaracteristicas(resp.message);
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
                //Trae los caracteristicas
                let resp = await httpApiGet("/caracteristica");
                setCaracteristicas(resp.message);   
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

                <div className='mb-3 h4'>Datos de la caracteristica</div>                  

                <div className="col-lg-12 col-md-12">
                    <label htmlFor="caracteristica" className="form-label">Nombre Característica</label>
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
                <th>Nombre Característica</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {caracteristicas.map((registro:any) => (
                <tr key={registro.idCaracteristica}>
                    <td>{registro.idCaracteristica}</td>
                    <td>{registro.nombre}</td>
                    <td>
                    <FaEdit
                        onClick={() => handleLoadEdit(registro)}
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                        className='text-warning'
                    />
                    <FaTrash
                        onClick={() => handleDeleteDialog(registro.idCaracteristica)}
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
            Title="Gestión de Características"
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

const CmsCaracteristicaPage = () => {        
        
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
                    <h1 style={{color: "#2A3482"}}>CMS - GESTIÓN DE CARACTERISTICAS</h1>
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

export default CmsCaracteristicaPage;