/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* insertarContenedoresAceiteValencia.js
* AppContainer: Rosa y Santi
* 
* IMPORTANTE: No volver a ejecutar este script ya que volverá a cargar
* todos los contenedores en la base de datos (la conexión a la BBDD
* está comentada por si acaso somos tontos)
*
* © Copyright: 
* Creación: 21/01/2020
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const sqlite3 = require("sqlite3")
const bodyParser = require('body-parser')
const fs = require('fs')

/*
// abrir base de datos
let db = new sqlite3.Database("../bd/datos.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Conectado a datos.db ');
});*/

//Leer el archivo json
fs.readFile('jsonContenedores/aceiteValencia.json', (err, data) => {
    if (err) throw err;
    let datos = JSON.parse(data)

    //Localizacion Contenedor
    //Longitud
    console.log("Longitud: " + datos.features[0].geometry.coordinates[0]);
    //Latitud
    console.log("Latitud: " + datos.features[0].geometry.coordinates[1]);

    var array = datos.features;
    
    console.log("------ Añadir contenedores a la bd --------");
    array.forEach(element => {
        var tipoContenedor = element.properties.tipo_resid;

        var idTipo = 7;
        var longitud = element.geometry.coordinates[0];
        var latitud = element.geometry.coordinates[1];
        var ciudad = "Valencia";
        var horario = null;

        var textoSQL = 'insert into ContenedoresValencia values( $Id, $IdTipoContenedor, $Ciudad, $Latitud, $Longitud, $Horario);'
        var valoresParaSQL = {
            $Id: null,
            $IdTipoContenedor: idTipo,
            $Ciudad: ciudad,
            $Latitud: latitud,
            $Longitud: longitud,
            $Horario: horario,
        }
        db.run(textoSQL, valoresParaSQL);
    });

    // cerra la conexión con la base de datos
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Cerrando la conexión a la bd');
    });
});