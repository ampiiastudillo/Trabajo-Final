const urlBase = 'https://api.yumserver.com/16784/products';

function ObtenerProductos() {
    fetch(urlBase)
    .then(response => response.json())
    .then(MostrarProductos)
    .catch(error => console.error('Error:', error));
}

function MostrarProductos(productos) {
    let html = '';
    for (let i = 0; i < productos.length; i++) {
        html +=
            `<tr>
                <td><b>${productos[i].idcod}</b></td>
                <td><b>${productos[i].titulo}</b></td>
                <td><b>${productos[i].precioPeso}</b></td>
                <td><b>${productos[i].precioDolar}</b></td>
                <td><b>${productos[i].fecha}</b></td>
                <td>
                    <button onclick="Borrar('${productos[i].idcod}')">Borrar</button>
                    <button onclick="ApareceModificar('${productos[i].idcod}')">Modificar</button>
                </td>
            </tr>`;
    }
    document.getElementById('resultados').innerHTML = html;
}

function guardarProducto() {
    fetch(urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titulo: document.getElementById("titulo").value,
            precioPeso: document.getElementById("precioPeso").value,
            precioDolar: document.getElementById("precioDolar").value,
            fecha: document.getElementById("fecha").value
        })
    })
    .then(response => response.text())
    .then(function (vuelta) {
        if (vuelta == "OK") {
            alert('Producto guardado exitosamente');
            ObtenerProductos();
        } else {
            alert(vuelta);
        }
    })
    .catch(error => console.error('Error:', error));
}

function Borrar(idcod) {
    fetch(urlBase, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idcod: idcod
        })
    })
    .then(response => response.text())
    .then(function (vuelta) {
        if (vuelta === "OK") {
            alert('Producto borrado exitosamente');
            ObtenerProductos();
        } else {
            alert(vuelta);
        }
    })
    .catch(error => console.error('Error:', error));
}

function ApareceModificar(idcod) {
    document.getElementById('frmModificar').style.display = 'block';
    fetch(urlBase + '/' + idcod)
    .then(response => response.json())
    .then(producto => {
    document.getElementById('tituloModificar').value = producto.titulo;
    document.getElementById('precioPesoModificar').value = producto.precioPeso;
    document.getElementById('precioDolarModificar').value = producto.precioDolar;
    document.getElementById('fechaModificacion').value = producto.fecha;
    document.getElementById('btnModificar').innerHTML = `<button onclick="Modificar('${idcod}')">Guardar</button>`;
  })
}

function Modificar(idcod) {
    fetch(urlBase, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idcod: idcod,
            titulo: document.getElementById("tituloModificar").value,
            precioPeso: document.getElementById("precioPesoModificar").value,
            precioDolar: document.getElementById("precioDolarModificar").value,
            fecha: document.getElementById("fechaModificacion").value
        })
    })
    .then(response => response.text())
    .then(function (vuelta) {
        if (vuelta == "OK") {
            alert('Producto modificado correctamente');
            ObtenerProductos();
        } else {
            alert(vuelta);
        }
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', ObtenerProductos);