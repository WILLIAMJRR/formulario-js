document.addEventListener('DOMContentLoaded', function () {
    const valores = {
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nacimiento: '',
        edad: '',
        profesion: '',
    };

    //add missing inputs
    const inputName = document.querySelector('#nombre');
    const inputApellidoPaterno = document.querySelector('#apellido_paterno');
    const inputApellidoMaterno = document.querySelector('#apellido_materno');
    const inputFechaNacimiento = document.querySelector('#fecha_nacimiento');
    const inputEdad = document.querySelector('#edad');
    const inputProfesion = document.querySelector('#profesion');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector(
        '#formulario button[type="submit"]',
    );
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //asignar eventos
    inputName.addEventListener('input', validar);
    inputApellidoPaterno.addEventListener('input', validar);
    inputApellidoMaterno.addEventListener('blur', validar);
    inputFechaNacimiento.addEventListener('blur', validar);
    inputEdad.addEventListener('blur', validar);
    inputProfesion.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarDatos);

    btnReset.addEventListener('click', (e) => {
        e.preventDefault();

        //reiniciar el objeto

        resetFormulario()
    });

    function enviarDatos(e) {
        e.preventDefault();

        spinner.classList.add('sk-fading-circle');
        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.remove('sk-fading-circle');
            spinner.classList.add('hidden');
            resetFormulario()
            window.location.href = 'nuevaPagina.html'
        }, 3000);
    }

    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(
                `El campo ${e.target.name} es obligatorio`,
                e.target.parentElement,
            );
            valores[e.target.id] = '';
            comprobarValores();
            return;
        }

        if (
            (e.target.name === 'nombre' ||
                e.target.name === 'apellido_paterno' ||
                e.target.name === 'apellido_materno') &&
            !validarTexto(e.target)
        ) {
            mostrarAlerta(
                `El ${e.target.name} no es valido`,
                e.target.parentElement,
            );
            valores[e.target.id] = '';

            comprobarValores();
            return;
        }

        if (e.target.name === 'fecha_nacimiento' && !validarFecha(e.target)) {
            mostrarAlerta(
                `La ${e.target.name} no es valida`,
                e.target.parentElement,
            );
            valores[e.target.id] = '';
            comprobarValores();
            return;
        }

        calcularEdad();

        limpiarAlerta(e.target.parentElement);

        valores[e.target.id] = e.target.value.trim().toLowerCase();
        console.log(valores);
        comprobarValores();
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        const error = document.createElement('P');

        error.textContent = mensaje;

        error.classList.add('form_error');

        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.form_error');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarTexto(inputName) {
        const regex = /^[a-zA-Z0-9]*$/;
        const isValid = regex.test(inputName.value);
        return isValid;
    }

    function validarFecha(inputFechaNacimiento) {
        const dateObject = new Date(inputFechaNacimiento.value);
        console.log(dateObject);

        const result =
            !isNaN(dateObject) &&
            inputFechaNacimiento.value &&
            dateObject.getFullYear() >= 1990 &&
            dateObject <= new Date(); // compara con la fecha actual

        return result;
    }

    // Agregar listener para evento input

    function calcularEdad() {
        formatearFecha();
        const fecha_nac = new Date(inputFechaNacimiento.value);
        const hoy = new Date();
        let edad_actual = hoy.getFullYear() - fecha_nac.getFullYear();
        const mes_actual = hoy.getMonth() + 1;
        const dia_actual = hoy.getDate();
        const mes_nac = fecha_nac.getMonth() + 1;
        const dia_nac = fecha_nac.getDate();
        if (
            mes_actual < mes_nac ||
            (mes_actual === mes_nac && dia_actual < dia_nac)
        ) {
            edad_actual--;
        }

        inputEdad.value = edad_actual;
    }

    function formatearFecha() {
        const fechaInput = document.querySelector('#fecha_nacimiento');
        const fechaHoy = new Date();
        const lastYear = '1900-01-01';
        const todayString = fechaHoy.toISOString().slice(0, 10); // Formatea la fecha actual como una cadena en formato YYYY-MM-DD
        fechaInput.setAttribute('max', todayString);
        fechaInput.setAttribute('min', lastYear);
        return;
        // fechaInput.addEventListener('blur', (e) => {
        //     const fechaSeleccionada = new Date(e.target.value);
        //     console.log(fechaSeleccionada > fechaHoy || fechaSeleccionada <= lastYear  )
        //     if (fechaSeleccionada > fechaHoy || fechaSeleccionada < lastYear  ) {
        //         alert(
        //             'Fecha inválida. Seleccione una fecha anterior o igual al día de hoy.',
        //         );
        //         e.target.value = ''; // Limpia el valor del input
        //     }
        // });
    }

    function comprobarValores() {
        if (Object.values(valores).includes('')) {
            btnSubmit.disabled = true;
            btnSubmit.classList.add('btn_opacity');
            return;
        } else {
            btnSubmit.classList.remove('btn_opacity');
            btnSubmit.disabled = false;
        }
    }

    function resetFormulario(){
         (valores.nombre = ''),
        (valores.apellido_paterno = ''),
        (valores.apellido_materno = ''),
        (valores.fecha_nacimiento = ''),
        (valores.profesion = '');
        (valores.edad = ''), formulario.reset();
        comprobarValores();
    }
});
