import Modal from 'react-bootstrap/Modal';
import './style.css';
import ImagesCarouselVisor from '../../../components/ImagesCarouselVisor';

const ImgModal = (props: {Show: boolean, HandlerClick: any, ListImages: any, index: number}) => {

return (
      <div>
        <Modal show={props.Show} centered={true} size="xl" onHide={props.HandlerClick}  >
            <Modal.Header closeButton >
                <Modal.Title className='h5 text-center'>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ImagesCarouselVisor 
                    listImages={props.ListImages}
                    index={props.index}
                />
            </Modal.Body>                
            <Modal.Footer>                                   
            </Modal.Footer>
        </Modal>
      </div>
  );
}

export default ImgModal;