// Importa las funciones necesarias desde el SDK de Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Agrega los SDK de productos de Firebase que desees utilizar
// Consulta la documentación de Firebase para obtener más información: https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de Firebase para tu aplicación web
export const firebaseConfig = {
  apiKey: 'tu_clave_de_api',
  authDomain: 'tu_domino.firebaseapp.com',
  databaseURL: 'https://tu_base_de_datos.firebaseio.com',
  projectId: 'tu_id_de_proyecto',
  storageBucket: 'tu_bucket_de_almacenamiento.appspot.com',
  messagingSenderId: 'tu_ID_de_mensajería',
  appId: 'tu_ID_de_aplicación',
};

// Inicializa Firebase con la configuración proporcionada
export const firebaseApp = initializeApp(firebaseConfig);

// Obtiene una referencia a la base de datos de Firebase
export const firebaseDatabase = getDatabase(firebaseApp);
