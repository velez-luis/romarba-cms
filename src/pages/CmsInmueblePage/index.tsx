import { useEffect, useState } from 'react';
import BarraFooter from '../../components/BarraFooter';
import './style.css'
import * as env from '../../env';
import { httpApiDelete, httpApiGet, httpApiPPPD } from '../../lib';
import GlobalLocalMsgModalSpinner from '../../components/GlobalLocalModalSpinner/GlobalLocalMsgModalSpinner';
import MsgDialog from '../../components/MsgDialog';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import ImgModal from './ImgModal';
import DataTable from "react-data-table-component";
import MsgYesNoDialog from '../../components/MsgYesNoDialog';
import CmsMenu from '../../components/CmsMenu';
import { FadeLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

const banner = require('../../assets/fotospaginas_Mesadetrabajo1.png');

const form: any = {};
const arrFile: any[] = [];

const Interno = () => {
 
    const globalData: any = useSelector((state: any) => state);
    
    const [formData, setFormData] = useState(form);
    let [formCar, setFormCar] = useState(form);   
    let   [filesList, setFileList] = useState(arrFile);  
    const [sHCarga, setSHCarga] = useState(false);  
    const [fileLoader, setFileLoader] = useState(false);      
    const [showYesNo, setShowYesNo] = useState(false);      
    const [showMsgApiResponse, setShowMsgApiResponse] = useState(false);   
    const [MsgApiResponse, setMsgApiResponse] = useState("");              
    const [propietaries, setPropietaries] = useState([]);
    const [tipoInmueble, setTipoInmueble] = useState([]);
    const [tipoPropiedades, setTipoPropiedades] = useState([]);   
    let [caracteristicas, setCaracteristicas] = useState([]);    
    const [barrios, setBarrios] = useState([]);      
    let [inmuebles, setInmuebles] = useState([]); 
    let [cpInmueble, setCpInmueble] = useState([]);
    const [idDelete, setIdDelete] = useState(0);    
    let [InsEdit, setInsEdit] = useState(0); 
    const [pending, setPending] = useState(true);

    //******************************************************
    // sección relacinada con la tabla o grilla de inmuebles
    const columnas = [
        {
            name: 'Código',
            selector: (row: any) => row.idInmueble,
            width: "90px",
            sortable: true,
        },  
        {
            name: 'Propietario',
            selector: (row: any) => row.nombresPropietario,
            width: "150px",
            wrap: true,
            sortable: true,
        }, 
        {
            name: 'Ciudad',
            selector: (row: any) => row.nombreCiudad,
            width: "150px",
            wrap: true,
            sortable: true,            
        },   
        {
            name: 'Barrio',
            selector: (row: any) => row.nombreBarrio,
            width: "130px",
            wrap: true,
            sortable: true,            
        },   
        {
            name: 'Descripción',
            selector: (row: any) => row.descripcion,
            width: "250px",
            wrap: true,
            sortable: true,              
        },   
        {
            name: 'Dirección',
            selector: (row: any) => row.direccion, 
            width: "250px",       
            wrap: true,
            sortable: true,             
        },   
        {
            name: 'Tipología',
            selector: (row: any) => row.tipoInmueble, 
            width: "120px",                 
        },                                      
        {
            name: 'Acciones',
            selector: (row: any) => 
                <div className='d-flex gap-3 justify-center align-items-center'>
                        <div>
                            <a href='#inicio' className=' text-warning' title="Edita el inmueble" onClick={()=>handlerEditIcon(row)} >
                                <FaPencilAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div> 
                        <div><a href='#!' className=' text-danger'  title="Borra el inmueble" onClick={()=>handlerDeleteIconInm(row.idInmueble)}>
                                <FaRegTrashAlt style={{width: "20px", height: "20px"}}/>
                            </a>
                        </div>
                </div>,
            width: "100px"
        },                             
    ];

    const pagOptions = {
        rowsPerPageText: "Filas por páginas",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };  

    const customStyles = {
        header: {
            style: {
                color: "#2A3482",
            },
        },
        headRow:{
            style: {
                color: "#2A3482",
                background:"#F5F5F5"
            },
        }
    }; 
    
    const conditionalRowStyles = [    
        {
            when: (row: any) => row.idInmueble === idDelete,
            style: {
              backgroundColor: '#D5D5D5',
            },
        }
    ]; 
    
    const changeTextFiltro = (evnt: any) => {

        let reg: never[] = [];

        if (evnt.target.value.indexOf("+") !== -1){
            let col: string = evnt.target.value.split("+")[0].trim().toUpperCase();
            let val: string = evnt.target.value.split("+")[1];
            val = val.trimStart();
            console.log(col);
            switch(col){
                case 'CÓDIGO':
                case 'CODIGO':
                    reg = cpInmueble.filter( (dato: any) => dato.idInmueble && dato.idInmueble.toString().includes(val.toUpperCase()));
                    break;
                case 'PROPIETARIO':
                    reg = cpInmueble.filter( (dato: any) => dato.nombresPropietario && dato.nombresPropietario.toUpperCase().includes(val.toUpperCase()));                    
                    break;
                case 'CIUDAD':
                    reg = cpInmueble.filter( (dato: any) => dato.nombreCiudad && dato.nombreCiudad.toUpperCase().includes(val.toUpperCase()));                    
                    break;
                case 'BARRIO': 
                    reg = cpInmueble.filter( (dato: any) => dato.nombreBarrio && dato.nombreBarrio.toUpperCase().includes(val.toUpperCase()));
                    break;
                case 'DESCRIPCIÓN':
                case 'DESCRIPCION': 
                    reg = cpInmueble.filter( (dato: any) => dato.descripcion && dato.descripcion.toUpperCase().includes(val.toUpperCase()));                
                    break;
                case 'DIRECCIÓN':
                case 'DIRECCION': 
                    reg = cpInmueble.filter( (dato: any) => dato.direccion && dato.direccion.toUpperCase().includes(val.toUpperCase()));
                    break;                 
                case 'TIPOLOGÍA':
                case 'TIPOLOGIA': 
                    reg = cpInmueble.filter( (dato: any) => dato.tipoInmueble && dato.tipoInmueble.toUpperCase().includes(val.toUpperCase()));
                    break;                                               
                default: 
                    break;
            }

        }else{
            reg = cpInmueble.filter((dato: any) => {
                return (
                    (dato.idInmueble && dato.idInmueble.toString().includes(evnt.target.value.toUpperCase())) || 
                    (dato.nombresPropietario && dato.nombresPropietario.toUpperCase().includes(evnt.target.value.toUpperCase())) || 
                    (dato.nombreCiudad && dato.nombreCiudad.toUpperCase().includes(evnt.target.value.toUpperCase())) ||
                    (dato.nombreBarrio && dato.nombreBarrio.toUpperCase().includes(evnt.target.value.toUpperCase()))|| 
                    (dato.descripcion && dato.descripcion.toUpperCase().includes(evnt.target.value.toUpperCase()))||                     
                    (dato.direccion && dato.direccion.toUpperCase().includes(evnt.target.value.toUpperCase())) ||
                    (dato.tipoInmueble && dato.tipoInmueble.toUpperCase().includes(evnt.target.value.toUpperCase()))
                ) 
            });             
        }

        setInmuebles([...reg]);             
    }  
    // fin sección 
    // *****************************************************

    const handler = (e: any) => {

        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }

    const handlerCar =  (e: any) => {

        const { id } = e.target;
        setFormCar({ ...formCar, [id]:!formCar[id]});
    }   
    
    const handlerSend = async (e: any) => {

        setSHCarga(true);

        if (!InsEdit){
            //Creación del inmueble
            const response: any = await httpApiPPPD("/inmueble", "POST", {
                "Authorization": `Bearer ${globalData.jwt}`,
                "Content-Type" : "application/json"
            }, formData);            
            if (response.code >= 400){
                setShowMsgApiResponse(true);
                setMsgApiResponse(response.message.message);  
            }else{
                const idInm: any = response.message.idInmueble;

                //Inserción de caracteristicas del inmueble
                const carac = [];
                for (const property in formCar){
                    if (formCar[property]){
                        carac.push(parseInt(property.split("-")[1]));
                    }
                }

                /**************************************/
                // consumo api inmueble caracteristicas 
                const respo = await httpApiPPPD(`/inmuebleCaracteristica/list`, "POST", {
                    "Authorization": `Bearer ${globalData.jwt}`,
                    "Content-Type" : "application/json"
                }, {idInmueble: idInm, caracteristica: carac});
                if (respo.code >= 400){
                    setSHCarga(false);   
                    setShowMsgApiResponse(true);
                    setMsgApiResponse("Se ha presentado un problema al guardar las caracteristicas del inmueble. Contacte al adminstrador: " + respo);  
                    return null;
                }

                //Se envían imagenes del inmueble
                const formData = new FormData();
                formData.append('idInmueble', idInm);

                filesList.forEach((file) => {
                    formData.append("foto", file);
                });
                const recurso = `${env.REACT_APP_API_URL_DEV}/inmuebleFoto/upload`;
                const resp = await fetch(recurso, {
                    method: 'POST',
                    body: formData,
                    headers: {
                                "Authorization": `Bearer ${globalData.jwt}`,
                    }
                }
                );
                if (resp.status >= 400){
                    setSHCarga(false);   
                    setShowMsgApiResponse(true);
                    setMsgApiResponse("Se ha presentado un problema al guardar las imágenes del inmueble. Contacte al adminstrador: " + respo);  
                    return null;
                }
                //Trae los inmuebles       
                const resUpdGrid = await httpApiGet("/inmueble/full");
                setInmuebles(resUpdGrid.message); 
                setShowMsgApiResponse(true);
                setMsgApiResponse("Inmueble creado exitosamente!!!"); 
                handleResetForm();  
            }            
        }else{
            const idInm = formData.idInmueble;
            //actualización del inmueble
            const response: any = await httpApiPPPD(`/inmueble/${idInm}`, "PUT", {
                "Authorization": `Bearer ${globalData.jwt}`,
                "Content-Type" : "application/json"
            }, formData);

            if (response.code >= 400){
                setShowMsgApiResponse(true);
                setMsgApiResponse(response.message.message);  
            }else{

                //Inserción de caracteristicas del inmueble
                const carac = [];
                for (const property in formCar){
                    if (formCar[property]){
                        carac.push(parseInt(property.split("-")[1]));
                    }
                }

                /**************************************/
                // consumo api inmueble caracteristicas 
                const respo = await httpApiPPPD(`/inmuebleCaracteristica/list`, "POST", {
                    "Authorization": `Bearer ${globalData.jwt}`,
                    "Content-Type" : "application/json"
                }, {idInmueble: idInm, caracteristica: carac});
                if (respo.code >= 400){
                    setSHCarga(false);   
                    setShowMsgApiResponse(true);
                    setMsgApiResponse("Se ha presentado un problema al actualizar las caracteristicas del inmueble. Contacte al adminstrador: " + respo);  
                    return null;
                }                 

                /********************************/
                //Se envían imagenes del inmueble
                const formData = new FormData();
                formData.append('idInmueble', idInm);
                filesList.forEach((file) => {
                    formData.append("foto", file);
                });

                const recurso = `${env.REACT_APP_API_URL_DEV}/inmuebleFoto/upload`;
                const response = await fetch(recurso, {
                    method: 'POST',
                    body: formData,
                    headers: {
                            "Authorization": `Bearer ${globalData.jwt}`,
                    }
                }
                );
                if (response.status >= 400){
                    setSHCarga(false);   
                    setShowMsgApiResponse(true);
                    setMsgApiResponse("Se ha presentado un problema al actualizar las imágenes del inmueble. Contacte al adminstrador: " + response);  
                    return null;
                }                 

                //Trae los inmuebles       
                const resUpdGrid = await httpApiGet("/inmueble/full");
                setInmuebles(resUpdGrid.message); 

                setShowMsgApiResponse(true);
                setMsgApiResponse("Inmueble actualizado exitosamente!!!"); 

                // regresa a modo de creación de inmueble
                InsEdit = 0;
                setInsEdit(InsEdit);      

                handleResetForm();  
            }
        }
        setSHCarga(false); 
    }  
    
    const handlerFileSet =  (e: any) => {

        if (InsEdit){
            const arrImgFiles: any[] = []; 
            [...e.target.files].map((fl: any)=>arrImgFiles.push(fl));
            setFileList([...filesList, ...arrImgFiles]);            
        }else{
            filesList = e.target.files;
            setFileList([...filesList]);            
        }

        let frm = document.getElementById("frmFileSet") as HTMLFormElement | null;
        frm?.reset();        

    }  
    
    const handlerDeleteIconInm = (id: any) => {

        setIdDelete(id);
        setShowYesNo(true);        

    }

    const handlerDeleteInmueble = () => {

        setShowYesNo(false);

    }    

    const handlerDeleteFotoGrid = async (idx: number) => {

        if (!InsEdit){
            filesList.splice(idx, 1);
            setFileList([...filesList]);
        }else{
            setSHCarga(true);
            console.log("Edit id image : ----> ", idx, filesList[idx].idImage);

            // borro la foto del inmueble llamando al endpoint
            if (filesList[idx].idImage >= 0){
                const response: any = await httpApiDelete(`/inmuebleFoto/${filesList[idx].idImage}`, "DELETE", {
                    "Authorization": `Bearer ${globalData.jwt}`,
                }, {});   
            }

            // borro la foto del arreglo de fotos
            filesList.splice(idx, 1);
            setFileList([...filesList]);            
          
            setSHCarga(false);
        }
    } 
    
    const urlToObjeto = async(imgUrl: string, idfoto: number) => {
        
        const response = await fetch(imgUrl);
        const blob =     await response.blob();
        const file = new File([blob], `image-${idfoto}.jpg`, {type: blob.type});
        return (file);
    }     

    const handlerEditIcon = async (id: any) => {

        // 1 indica que está en modo edición. 0 indica que está en modo añadir
        setInsEdit(1); 

        setIdDelete(id.idInmueble);

        formCar = {};
        setFormCar({...formCar});
        
        setFormData(id);

        setCaracteristicas([...caracteristicas]); 
        
        filesList = [];
        setFileList([...filesList]); 

        //Establece las caracteristicas del inmueble
        id.caracteristicas.map((car: any)=>{
            formCar = {...formCar, [`car-${car.idCaracteristica}`]:"true"};
        });
        setFormCar({...formCar});  

        setFileLoader(true);
        //*****Proceso de convertir img url to file in JS
        const arrImgObj = [];
        for (let idx = 0; (idx < id.fotos.length); idx++){
            const img = await urlToObjeto(id.fotos[idx].pathPhoto, id.fotos[idx].idInmuebleFoto);
            arrImgObj.push(img);
        }
        filesList = [...arrImgObj];
        setFileList([...filesList]);
        setFileLoader(false);    
    }    

    const handleResetForm = async() =>{

        // borra las cajas de datos de entrada
        const inputsArray = Object.entries(formData);
        const clearInputsArray = inputsArray.map(([key]) => [key, '']); // Recorremos el arreglo y retornamos un nuevo arreglo de arreglos conservando el key
        const inputsJson = Object.fromEntries(clearInputsArray); //Convertimos el arreglo de arreglos nuevamente a formato json
        setFormData(inputsJson);

        // Reinicializa las caracteristicas
        setFormCar([]);         
        const resp = await httpApiGet("/caracteristica");
        setCaracteristicas(resp.message);  
        
        // Reinicializa las imágenes
        filesList = [];
        setFileList([...filesList]);        
    }    

    const ImagePreview = (props: any) =>{

        //Creamos objeto la url
        const objectURL = URL.createObjectURL(props.file);  
        
        const [showImageLarge, setShowImageLarge] = useState(false);

        return(
            <div>
                <a><img src={objectURL} id="imgPrw" alt="" width={50} height={50} onClick={()=>setShowImageLarge(true)} className='fluid'/></a>
                <ImgModal 
                    Show={showImageLarge}
                    ListImages={filesList}
                    HandlerClick={()=>setShowImageLarge(false)}
                    index={props.index}
                />
            </div>
        )
    }

    useEffect(()=>{

        const inicilizacion = async () => {

            //Trae los propietarios
            let resp = await httpApiGet("/propietario");
            setPropietaries(resp.message);

            //Trae los tipos de propiedades
            resp = await httpApiGet("/tipoPropiedad");
            setTipoPropiedades(resp.message);            

            //Trae los estados de la propiedad
            resp = await httpApiGet("/tipoInmueble");
            setTipoInmueble(resp.message);             

            //Trae los caracteristicas        
            resp = await httpApiGet("/caracteristica");
            setCaracteristicas(resp.message);  
            
            //Trae las barrios        
            resp = await httpApiGet("/barrio");
            setBarrios(resp.message);   
            
            //Trae los inmuebles       
            resp = await httpApiGet("/inmueble/full");
            inmuebles = resp.message;
            setInmuebles([...inmuebles]); 
            cpInmueble = [...inmuebles];
            setCpInmueble([...cpInmueble]); 
            setPending(false);             
        }

        inicilizacion();

    }, []);    


  return (
    <div  className=' divInterno' >
        {/****************************
         * formulario
        *****************************/}
        <div className='rounded me-2' style={{boxShadow: "1px 2px 5px"}}>
            <form className="row g-1 ps-4 pe-4" id="form1">

                <div className='mb-3 h4'  style={{color: "#2A3482"}}>Datos del inmueble</div>

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="idPropietario" className="form-label">Propietario</label>
                    <select className="form-select form-select-sm" aria-label="Small select example" id="idPropietario" value={formData?.idPropietario} onChange={handler}>
                        <option value="0">Seleccione una opción</option>
                        {
                            propietaries.map((data: any) => <option value={data.idPropietario}>{data.nombres}</option>)
                        }
                    </select>
                </div>                    

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="idTipoInmueble" className="form-label">Tipo de Inmueble</label>
                    <select className="form-select form-select-sm" aria-label="Small select example" defaultValue="0" id="idTipoInmueble" value={formData?.idTipoInmueble} onChange={handler} >
                    <option value="0">Seleccione una opción</option>
                        {
                            tipoInmueble.map((data: any) => <option value={data.idTipoInmueble}>{data.tipoInmueble}</option>)
                        }
                    </select>
                </div>

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="idTipoPropiedad" className="form-label">Tipo de propiedad</label>
                    <select className="form-select form-select-sm" aria-label="Small select example" defaultValue="0" id="idTipoPropiedad" value={formData?.idTipoPropiedad} onChange={handler} >
                        <option value="0">Seleccione una opción</option>
                        {
                            tipoPropiedades.map((data: any) => <option value={data.idTipoPropiedad}>{data.tipo}</option>)
                        }
                    </select>
                </div> 

                <div className="col-lg-6 col-md-12">
                    <label htmlFor="ciudad" className="form-label">Ciudad</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control" value="Cartagena"  id="ciudad" 
                            aria-describedby="inputGroupPrepend"  placeholder="Ciudad" readOnly disabled />
                    </div>
                </div> 
                                 
                <div className="col-lg-6 col-md-12">
                    <label htmlFor="idBarrio" className="form-label">Barrio</label>
                    <select className="form-select form-select-sm" aria-label="Small select example" defaultValue="0" id="idBarrio" value={formData?.idBarrio} onChange={handler} >
                        <option value="0">Seleccione una opción</option>
                        {
                            barrios.map((data: any) => <option value={data.idBarrio}>{data.nombre}</option>)
                        }
                    </select>
                </div>  

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="modalidadServicio" className="form-label">Modo de servicio</label>
                    <select className="form-select form-select-sm" aria-label="Small select example" defaultValue="0" id="modalidadServicio" value={formData?.modalidadServicio} onChange={handler} >
                        <option value="0">Seleccione una opción</option>
                        <option value="1">Venta</option>
                        <option value="2">Servicio</option>
                    </select>
                </div>                     

                <div className="col-lg-8 col-md-12">
                    <label htmlFor="direccion" className="form-label">Dirección </label>
                    <input type="text" className="form-control" id="direccion"  placeholder=""  value={formData?.direccion} onChange={handler} />
                </div>

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="valor" className="form-label">Valor</label>
                    <input type="number" min={0}  className="form-control" id="valor"  value={formData?.valor} onChange={handler}  placeholder="" />
                </div>

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="referenciaCatastral" className="form-label">Ref. Catastral</label>
                    <input type="number" min={0}  className="form-control" id="referenciaCatastral"  value={formData?.referenciaCatastral} onChange={handler}  placeholder="Solo números" />
                </div> 

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="matriculaInmobiliaria" className="form-label">Matricula inmobiliaria</label>
                    <input type="number" min={0}  className="form-control" id="matriculaInmobiliaria"  value={formData?.matriculaInmobiliaria} onChange={handler} placeholder="Solo números" />
                </div>                    

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="anoConstruccion" className="form-label">Año construcción</label>
                    <input type="number" min={0} className="form-control" id="anoConstruccion"  value={formData?.anoConstruccion} onChange={handler}  placeholder="" />
                </div>

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="areaConstruida" className="form-label">Área construida</label>
                    <input type="number" min={0} className="form-control" id="areaConstruida"  value={formData?.areaConstruida} onChange={handler}   placeholder="" />
                </div>    

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="areaTotal" className="form-label">Área total </label>
                    <input type="number" className="form-control" id="areaTotal"  value={formData?.areaTotal} onChange={handler}  placeholder="" />
                </div>   

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="nroAlcobas" className="form-label">Nro. de alcobas</label>
                    <input type="number" className="form-control" id="nroAlcobas"  value={formData?.nroAlcobas} onChange={handler}   placeholder="" />
                </div> 

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="nroBanos" className="form-label">Nro. de baños</label>
                    <input type="number" className="form-control" id="nroBanos"  value={formData?.nroBanos} onChange={handler}  placeholder="" />
                </div>

                <div className="col-lg-4 col-md-12">
                    <label htmlFor="nroGarajes" className="form-label">Nro. Garajes</label>
                    <input type="number" className="form-control" id="nroGarajes"  value={formData?.nroGarajes} onChange={handler}  placeholder="" />
                </div> 

                <div className="col-lg-12">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea className="form-control" id="descripcion"  value={formData?.descripcion} onChange={handler}  rows={3} placeholder="" />
                </div>

                <div className="col-lg-12 mt-2">
                    <label htmlFor="validationCustom02" className="form-label fw-bold">CARACTERISTICAS</label>
                </div>  

                <div className=' gap-1 divFiles'>

                    <div className="col-lg-12 border rounded p-2 divCarcateristicas">   
                        {
                            caracteristicas.map((data: any, key: number) => {
                                return (
                                    <div className="form-check form-switch">
                                        <input key={key} className="form-check-input" type="checkbox" role="switch" id={"car-" + data.idCaracteristica} 
                                            name={data.idCaracteristica} 
                                            checked={formCar["car-" + data.idCaracteristica] || false}
                                            onChange={handlerCar}
                                        />
                                        <label className="form-check-label" htmlFor={"car-" + data.idCaracteristica}>{data.nombre}</label>                                                                             
                                    </div>
                                )
                            })
                        }                      
                    </div>   

                    <section id="multi-selector-uniq" className='p-2 border rounded divFilesWidth'>
                        <div className='mb-2'>
                            <label htmlFor="myfiles" className="form-label">Seleccione uno o más imágenes</label>
                            <form id="frmFileSet">
                                <input
                                    type="file"
                                    id="filename"
                                    onChange={handlerFileSet}
                                    className="form-control"
                                    accept="image/png, image/jpeg, image/gif, image/jpg"
                                    multiple
                                    placeholder='Añada imágen'
                                />
                                <div className='d-flex justify-content-end mt-2'>
                                    <button type='button'className='btn btn-danger d-flex flex-row align-items-center gap-3' disabled={!(filesList.length > 0)} onClick={(e: any)=> setFileList([])}>
                                        <div><FaRegTrashAlt className='text-light'/></div> 
                                        <div><label>Borra todas las imágenes</label></div>
                                    </button>   
                                </div>
                            </form>  
                   
                        </div>

                        <div id="preview" className=' mt-2 border rounded' style={{height: "200px", overflowX: "scroll", overflowY: "scroll"}}>
                            {
                                fileLoader 
                                    ? <div className='d-flex justify-content-center align-items-center h-100'><label htmlFor="">Cargando imágenes, espere ...</label><FadeLoader color="#FF7588" /></div>
                                    : null
                            }
                            {
                                filesList.map((fl: any, idx: number)=> 
                                    <div className='d-flex flex-row align-items-center gap-4 m-2 border '>
                                        <div style={{width: "5%"}}>   
                                            <button type='button' id={"img-"+idx}  className='btn' 
                                                onClick={()=>{
                                                    handlerDeleteFotoGrid(idx);
                                                }}                                   >
                                                <FaRegTrashAlt className='text-danger'/>
                                            </button>
                                        </div>
                                        <div className=' text-wrap' style={{width: "75%"}}>{fl.name}</div>
                                        <div className='text-center'   style={{width: "20%", cursor: "pointer"}}>
                                            <ImagePreview key={idx} file={fl} index={idx}/>                                                
                                        </div>
                                    </div> 
                                )
                            }
                        </div>
                    </section>                    

                </div>

                <div className="col-auto mt-3 "  style={{margin: "auto" }}>
                    <input type="button" value= { InsEdit ? "Actualizar" : "Guardar" } className="btn text-light border rounded fw-bold " style={{width: "150px", height: "42px", background: "#2A3482"}} 
                        /* style={{width: "150px", height: "42px", backgroundImage: `url(${bgImgButton})`, backgroundSize: "cover" }} */
                        onClick={handlerSend}
                    />      
                </div> 
            </form>  
            {/* Tabla con listado de inmuebles */} 
            <div className='ps-4 mt-4 pe-4'>
                <div className="d-flex flex-column col col-lg-6 mt-1 mb-1">
                    <label className="m-1">Busqueda </label>
                    <label className='fst-italic ms-1 mb-2' style={{fontSize: "12px"}}>
                        Sí quiere buscar por una columna específica, escriba el nombre de la columna, el símbolo +, seguido del dato a buscar. Ejem1: Ciudad+dato a buscar, Ejem2: Barrio+dato a buscar 
                    </label>
                    <input type="text" id="txtBuscar" className="form-control" onChange={changeTextFiltro} />
                </div>                
                <DataTable 
                    title="Lista de Inmuebles"
                    className="border rounded"
                    columns={columnas}
                    data={inmuebles} 
                    pagination
                    highlightOnHover
                    fixedHeader={true}
                    paginationComponentOptions={pagOptions}    
                    customStyles={customStyles}
                    conditionalRowStyles={conditionalRowStyles}    
                    progressPending={pending}
                    progressComponent={<FadeLoader color="#FF7588" />}             
                />
            </div>
        </div>
        <MsgDialog 
            Title="Gestión de inmuebles"
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
            Title='Gestión de inmuebles'
            Message={`¿Está ud seguro de eliminar el inmueble identificado con código: ${idDelete}?`}
            Icon='X'
            BtnOkName='Sí, continuar'
            BtnNokName='No, cancelar'
            Show={showYesNo}
            HanlerdClickNok={()=> setShowYesNo(false)}
            HandlerClickOk={handlerDeleteInmueble}
                            
        />     
    </div>            
  );
}


const CmsInmueblePage = () => {   


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

                <a id="inicio"></a>

                <div className='mt-4 mb-4 text-center' >
                    <h1 style={{color: "#2A3482"}}>CMS - GESTIÓN DE INMUEBLES</h1>
                </div>

                <div className=' d-flex justify-content-center mt-1 '>

                    <Interno/>

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

export default CmsInmueblePage;