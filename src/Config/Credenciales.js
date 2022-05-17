/// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyDjemGeMK3dXDNIzqkjiiBEoOreRc2_2oA",
    authDomain: "checador-97e97.firebaseapp.com",
    projectId: "checador-97e97",
    storageBucket: "checador-97e97.appspot.com",
    messagingSenderId: "556181589982",
    appId: "1:556181589982:web:e8004c1fa9cc94726f574f"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;