// .....................................................................
// Autor: Santiago Pérez
// Fecha inicio: 07/12/2019
// Última actualización: 07/12/2019
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")
/*const SimpleCrypto = require("simple-crypto-js").default;*/
// .....................................................................
// .....................................................................


module.exports = class Logica {

  // .................................................................
  // menorBD: Texto
  // -->
  // constructor () -->
  // .................................................................
  constructor(nombreBD, cb) {
    this.laConexion = new sqlite3.Database(
      nombreBD,
      (err) => {
        if (!err) {
          this.laConexion.run("PRAGMA foreign_keys = ON")
        }
        cb(err)
      })
  } // ()

  // .................................................................
  // cerrar() -->
  // .................................................................
  cerrar() {
    return new Promise((resolver, rechazar) => {
      this.laConexion.close((err) => {
        (err ? rechazar(err) : resolver())
      })
    })
  } // ()

} // class
// .....................................................................
// .....................................................................
