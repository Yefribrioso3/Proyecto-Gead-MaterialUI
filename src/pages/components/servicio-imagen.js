'use strict';

const boton_foto = document.querySelector('#btn-foto');
const imagen = document.querySelector('#equipment-foto');

    // ----------  informacion de coneccion  ------------ 
let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'dikwnsuwc',
    uploadPreset: 'preset_Gead'

}, (err, result) => {
    if(!err && result && result.event === 'success'){
        console.log('Imagen subida con exito', result.info);
        imagen.src = result.info.secure_url;
    }
});

boton_foto.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);