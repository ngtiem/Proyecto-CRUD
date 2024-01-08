let listaEmpleados = [];
const objEmpleado = {
    id: '',
    nombre: '',
    rut: '',
    correo: ''
};
let editando = false;
const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const rutInput = document.querySelector('#rut');
const correoInput = document.querySelector('#correo');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if (nombreInput.value === '' || rutInput.value === '' || correoInput.value === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.rut = rutInput.value;
        objEmpleado.correo = correoInput.value;
        agregarEmpleado();
    }

    limpiarFormulario();
}

function agregarEmpleado() {
    listaEmpleados.push({ ...objEmpleado });
    mostrarEmpleados();
    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.rut = '';
    objEmpleado.correo = '';
}

function mostrarEmpleados() {
    limpiarHTML();
    const divEmpleados = document.querySelector('.div-empleados');

    listaEmpleados.forEach(empleado => {
        const { id, nombre, rut, correo } = empleado;
        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} ${rut} ${correo}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');

        parrafo.appendChild(editarBoton);
        parrafo.appendChild(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado(empleado) {
    const { id, nombre, rut, correo } = empleado;
    nombreInput.value = nombre;
    rutInput.value = rut;
    correoInput.value = correo;
    objEmpleado.id = id;
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

function editarEmpleado() {
    objEmpleado.nombre = nombreInput.value;
    objEmpleado.rut = rutInput.value;
    objEmpleado.correo = correoInput.value;

    for (let i = 0; i < listaEmpleados.length; i++) {
        if (listaEmpleados[i].id === objEmpleado.id) {
            listaEmpleados[i] = { ...objEmpleado };
            break;
        }
    }

    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false;
}

function limpiarFormulario() {
    nombreInput.value = '';
    rutInput.value = '';
    correoInput.value = '';
}

function eliminarEmpleado(id) {

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);
    
    limpiarHTML();
    mostrarEmpleados();
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while (divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}


