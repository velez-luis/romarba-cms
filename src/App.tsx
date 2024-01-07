import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CmsMantenimientoPage from './pages/CmsMantenimientoPage';
import CmsTipoInmueblePage from './pages/CmsTipoInmueblePage';
import CmsCaracteristicaPage from './pages/CmsCaracteristicaPage';
import CmsCiudadPage from './pages/CmsCiudadPage';
import CmsPropietarioPage from './pages/CmsPropietarioPage';
import CmsInmueblePage from './pages/CmsInmueblePage';
import LandingPage from './pages/LandingPage';
import PageLogin from './pages/Login';

function App() {
  return (
    <div>
      <BrowserRouter>      
        <Routes>
        <Route path="/cms/creaInmueble" element={<CmsInmueblePage />}/>          
          <Route path="/cms/creaPropietario" element={<CmsPropietarioPage />}/>             
          <Route path="/cms/creaCiudad" element={<CmsCiudadPage />}/>                
          <Route path="/cms/creaCaracteristica" element={<CmsCaracteristicaPage />}/>       
          <Route path="/cms/creaTipoInmueble" element={<CmsTipoInmueblePage />}/>   
          <Route path="/cms/mantenimiento" element={<CmsMantenimientoPage />}/>   
          <Route path="/landingpage" element={<LandingPage />}/>          
          <Route path="/" element={<PageLogin />}/>
        </Routes>              
      </BrowserRouter>
    </div>
  );
}

export default App;
