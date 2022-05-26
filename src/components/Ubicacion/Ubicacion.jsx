import React from 'react'

const geoUserLocation = async () => {    
        return new Promise ((res, rej)=>{
            navigator.geolocation.getCurrentPosition(
                ({coords})=>{
                    res([coords.longitude, coords.latitude])
                },
                (err)=>{
                    alert('no se pudo obtener la licalizacion')
                    console.log("no se pudo obtener la licalizacion");
                    console.log(err);
                    rej();
                }
            )
        })    
}

export default geoUserLocation
