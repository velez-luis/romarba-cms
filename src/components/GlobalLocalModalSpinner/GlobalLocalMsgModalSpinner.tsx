import { Modal } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

const GlobalLocalMsgModalSpinner = (props: any) =>{

    return(
        <>
            <Modal size="lg" show={props.Show} centered>
                <Modal.Body>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <label>
                            <BeatLoader color={props.color} />
                        </label>                        
                        <label className="h5 text-center">
                            {props.text}
                        </label>
                        <label>
                            <BeatLoader color={props.color} />
                        </label>
                    </div>
                </Modal.Body>
            </Modal>
        </> 
    );
};

export default GlobalLocalMsgModalSpinner;