let ingresar = document.getElementById("login");
let registrar = document.getElementById("registro");
let usReg = document.getElementById("usReg");
let passReg = document.getElementById("passReg");
let usLog = document.getElementById("usLog");
let passLog = document.getElementById("passLog");
let reg = document.getElementById("reg");
let usuarios = []
let form1 = document.getElementById("formulario1");
let form2 = document.getElementById("formulario2");
let formBut = document.getElementById("formEl")

form2.style.display = "none"

formBut.addEventListener("click",()=>{
    form1.style.display = "none";
    form2.style.display = "flex";
})

class Usuario {
    constructor(usuario, contraseña){
        this.usuario = usuario;
        this.contraseña = contraseña;
    }
}

registrar.addEventListener("submit", regForm)

function regForm(e){
    e.preventDefault();
    if (passReg.value != "" && usReg.value != ""){
        let nuevoUsuario = new Usuario(usReg.value, passReg.value);
        usuarios.push(nuevoUsuario);
        console.log(usuarios)
        Swal.fire({
            icon: 'success',
            title: 'Cuenta creada correctamente',
            text: 'Hola ' + usReg.value + `, gracias por registrarte`,
          })
        form1.style.display = "flex";
        form2.style.display = "none";
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algún campo esta vacío, intente nuevamente',
          })
    }
}

ingresar.addEventListener("submit", (e)=>{
    e.preventDefault();
    let us = usLog.value;
    let ps = passLog.value;
    for(let user of usuarios){
        if(us == user.usuario && ps == user.contraseña){
            window.location.href = "cartelera.html";
            localStorage.setItem("usuario", user.usuario)
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario o contraseña incorrectos.',
              })
        }
    }
})
