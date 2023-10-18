require('colors');
const fs = require('fs');

const datosArchivo = require('./datos.json');
//const { Console } = require('console');

const main = async() =>{
    console.clear();
    console.log('**************************');
    console.log('**   PROYECTO CLASES    **');
    console.log('**************************\n');
    
    class Producto {
        #codigoProducto;
        #nombreProducto;
        #inventarioProducto;
        #precioProducto;

        constructor(){
            this.#codigoProducto = '';
            this.#nombreProducto = '';
            this.#inventarioProducto = 0;
            this.#precioProducto = 0;
        }

        set setCodigoProducto(value){
            this.#codigoProducto = value;
        }

        get getCodigoProducto(){
            return this.#codigoProducto;
        }

        set setNombreProducto(value){
            this.#nombreProducto = value;
        }

        get getNombreProducto(){
            return this.#nombreProducto;
        }

        set setInventarioProducto(value){
            this.#inventarioProducto = value;
        }

        get getInventarioProducto(){
            return this.#inventarioProducto;
        }

        set setPrecioProducto(value){
            this.#precioProducto = value;
        }

        get getPrecioProducto(){
            return this.#precioProducto;
        }
    }


class ProductosTienda{
    #listaProductos;

    constructor(){
        this.#listaProductos = [];
    }

    get getListaProductos(){
        return this.#listaProductos;
    }

    cargaArchivoProductos(){
        let contador = 0;
        if(datosArchivo.length > 0){
            datosArchivo.forEach(objeto => {
                contador++;
                let producto = new Producto;
                producto.setCodigoProducto = objeto.codigoProducto;
                producto.setNombreProducto = objeto.nombreProducto;
                producto.setInventarioProducto = objeto.inventarioProducto;
                producto.setPrecioProducto = objeto.precioProducto;
                this.#listaProductos.push(producto);
            });
        }else {
            console.log(`ERROR. el archivo datos.json no contiene datos\n` .bgGreen);
        }
        console.log(`Total de productos cargados ==> `.bgBlue + ` ${contador} ` .bgRed);
    } 

    grabaArchivoProductos(){
        const instanciaClaseAObjetos = this.getListaProductos.map(producto => {
            return {
                codigoProducto: producto.getCodigoProducto,
                nombreProducto: producto.getNombreProducto,
                inventarioProducto: producto.getInventarioProducto,
                precioProducto: producto.getPrecioProducto
            };
        });

        const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2);
        const nombreArchivo = 'datos.json';
        fs.writeFileSync(nombreArchivo, cadenaJson, `UTF-8`);

        console.log(`DATOS GUARDADOS EN ${nombreArchivo}`.bgMagenta);

    }

    mostrarProductos(){
        this.getListaProductos.forEach(producto => {
            console.log(`|     ` + producto.getCodigoProducto + `     |` +
                        `|   ` + producto.getNombreProducto + `           |` +
                        `|    ` + producto.getInventarioProducto +             ` |`   +   
                        `|         ` + producto.getPrecioProducto + `     |` );
        })
    }
      
}

    let productosTienda = new ProductosTienda;

    productosTienda.cargaArchivoProductos(),

    console.log(`DATOS APERTURA TIENDA` .bgBlue);

    productosTienda.mostrarProductos();

    productosTienda.getListaProductos.forEach(producto => {
        producto.setInventarioProducto = Math.floor(Math.random() * (20 - 1) + 1);
    });

    console.log(`DATOS CIERRE TIENDA`.bgGreen);
    productosTienda.mostrarProductos();

    productosTienda.grabaArchivoProductos();


}
main();