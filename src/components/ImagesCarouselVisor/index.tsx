import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ImagesCarouselVisor(props: {listImages: any, index: number}) {

  const [index, setIndex] = useState(props.index);

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index}  onSelect={handleSelect} >
        {
            props.listImages.map((file: any)=>
                    <Carousel.Item title={file.name}>                    
                            <img src={URL.createObjectURL(file)} alt='' style={{objectFit: "cover", width: "100%", height: "100%"}}
                            />
                            <Carousel.Caption>
                                <h5 className='w-100 text-light fw-bolder rounded' style={{backgroundColor: "#2A3482", height: "32px"}}>{file.name}</h5>
                            </Carousel.Caption>                                       
                    </Carousel.Item>                    
            )
        }
    </Carousel>
  );
}

export default ImagesCarouselVisor;