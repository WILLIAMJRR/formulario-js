document.addEventListener('DOMContentLoaded', function () {
    const btn_anterior = document.querySelector('.btn_anterior');
    const btn_finalizar = document.querySelector('.btn_finalizar');
    const titulo = document.querySelector('.titulo');

    btn_anterior.addEventListener('click', (e) => {
        e.preventDefault();
        location.href = 'index.html';
    });

    btn_finalizar.addEventListener('click', (e) => {
        e.preventDefault();
        btn_finalizar.disabled = true;
        btn_anterior.disabled = true;
        btn_anterior.classList.add('btn_opacity');
        btn_finalizar.classList.add('btn_opacity');

        document
            .querySelector('.btn_container')
            .setAttribute('disabled', 'true');
        titulo.textContent = 'Finalizo la tarea muchas gracias';
    });
});
