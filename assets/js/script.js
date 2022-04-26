let estudiantes = window.localStorage.getItem('estudiantes')
let array_est = JSON.parse(estudiantes)

if (estudiantes != null) {
    estudiantes = JSON.parse(estudiantes)

    estudiantes.forEach(estudiante => {

        insertar_fila(estudiante)
    });
}



let btn_enviar = document.getElementById('enviar_info')

let form_crear = document.getElementById('form_crear')

form_crear.style.display = "none"

let btn_crear = document.getElementById('crear_est')

btn_crear.addEventListener('click', () => {
    form_crear.style.display = "block"
    btn_crear.style.display = "none"
})

let cancelar_info = document.getElementById('cancelar_info')

cancelar_info.addEventListener('click', () => {
    form_crear.style.display = "none"
    btn_crear.style.display = "block"

    recorrerInputs(element => {
        element.value = ''
    })

    //console.log(vector_inputs);
})

btn_enviar.addEventListener('click', () => {

    let estudiante = {}

    recorrerInputs(input => {
        let value_input = input.value

        estudiante = {
            ...estudiante,
            [input.name]: input.value
        }

        if (value_input.length == 0) {
            alert(`el campo ${input.getAttribute('placeholder')} se encuentra vacío`)
        }
    })

    estudiante = {
        id: uuidv4(),
        ...estudiante
    }

    let estudiantes = window.localStorage.getItem('estudiantes')

    if (estudiantes == null) {
        window.localStorage.setItem('estudiantes', JSON.stringify([estudiante]))
    } else {
        estudiantes = JSON.parse(estudiantes)

        estudiantes.push(estudiante)

        window.localStorage.setItem('estudiantes', JSON.stringify(estudiantes))
    }


    insertar_fila(estudiante)


    cancelar_info.click()
})


function insertar_fila(estudiante) {
    let template_registro = `
        <tr>
            <td>${estudiante.id}</td>
            <td>${estudiante.correo}</td>
            <td>${estudiante.apellido}</td>
            <td>
                <button class="detalles">Detalles</button>
                <button class="modificar">Modificar</button>
                <button class="eliminar">Eliminar</button>
            </td>
        </tr>
    `

    let tbody = document.querySelector('tbody')

    //tbody.appendChild(template_registro)

    tbody.innerHTML = tbody.innerHTML + template_registro

    eliminar_registro()
}

let input_cedula = document.getElementById('cedula')

input_cedula.addEventListener('keypress', (e) => {
    e.preventDefault()

    if ((/[0-9]/i.test(e.key))) {
        input_cedula.value = input_cedula.value + e.key
    }
})

function recorrerInputs(tarea) {
    let vector_inputs = document.querySelectorAll('input')

    vector_inputs.forEach(input => {
        tarea(input)
    });
}


function eliminar_registro() {
    let btns_eliminar = document.querySelectorAll('.eliminar')

    btns_eliminar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            array_est = array_est.filter(item => item.id !== btn.parentElement.parentElement.firstElementChild.innerHTML)
            window.localStorage.setItem("estudiantes", array_est)
            btn.parentElement.parentElement.remove()
        })

    });
}
function modificar_registro() {
    let btns_modificar = document.querySelectorAll('.modificar')

    btns_modificar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            form_crear.style.display = "block"
            btn_crear.style.display = "none"
            est = array_est.find(item => item.id === btn.parentElement.parentElement.firstElementChild.innerHTML)
            console.log(est)
            console.log(document.getElementById("nombre").value = est.nombre) 
        })
    });
}
modificar_registro()
eliminar_registro()

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}