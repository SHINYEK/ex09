import React from 'react'
import { useState } from 'react';
import { Map , MapMarker} from 'react-kakao-maps-sdk';

const LocalMap = ({local}) => {
    const{x,y} = local;
    const[toggle,setToggle] = useState(false);
  return (
    <Map center={{lat: y,lng: x,}}
    style={{width: "100%",height: "450px",}}
    level={3}>
      <MapMarker position={{lat: y,lng: x}} onClick={()=>setToggle(!toggle)}>
          {toggle &&
          <div style={{color:'blue',padding:'10px',fontSize:'12px'}}>
              

          </div>
      }
      </MapMarker>
    </Map>
    

  )
}

export default LocalMap