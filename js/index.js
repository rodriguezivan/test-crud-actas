// const API = "http://192.168.1.23:80/test/rest-api-php/index.php/actas";
const API = "http://localhost/test/rest-api-php/index.php/actas";

/* Create */
function create() {      
    let newData = dataForm();
    let init = {
        method: 'POST',
        body: JSON.stringify(newData)        
    };

    fetch(API, init)
        .then(response => {
            return response.json();
        })
        .then(data => {            
            alert(data.message);
            read();                        
        });        
}
function dataForm() {
    let formNumero = document.querySelector('.form-numero.alta').value;
    let formTitulo = document.querySelector('.form-titulo.alta').value;
    let formFecha = document.querySelector('.form-fecha.alta').value;
    let formEstado = document.querySelector('.form-estado.alta').value;
    
    let newData = {
        numero: formNumero,
        titulo: formTitulo,
        fecha: formFecha,
        estado: formEstado
    }; 

    return newData;
}

/* Read */
function read() {    
    fetch(API)
        .then(response => response.json())    
        .then(json => {                                  
            render(json);                        
        });
}
function render(json) {
    let posts = JSON.stringify(json);
    let data = JSON.parse(posts);
    let dataContainer = document.querySelector(".data");
    
    dataContainer.innerHTML = "";

    data.forEach(element => { 
        let img = element.estado === "Aprobada" ? "img/sheet.png" : "img/sheet-out.png";                
        let inner = `<div class="item">
                    <figure class="imageContainer">
                        <img class="item-img" src="${img}" alt="Logo de acta"/>
                    </figure>
                    <div class="item-details">
                        <p><strong>Número: </strong>${element.numero}</p>                        
                        <p><strong>Título: </strong>${element.titulo}</p>
                        <p><strong>Estado: </strong>${element.estado}</p>
                        <div class="item-actions">
                            <a href="#" data-toggle="modal" data-target="#modal-update" onclick="dataEdit(${element.numero}, '${element.titulo}' , '${element.fecha}', '${element.estado}', ${element.id})">Editar</a>
                            <a>|</a>
                            <a onclick="remove(${element.id})">Borrar</a>
                        </div>                                             
                    </div>
                </div>`;                
        dataContainer.innerHTML += inner;                
    });   
}

/* Update */
function edit() {   
    let formNumero = document.querySelector('.form-numero').value;
    let formTitulo = document.querySelector('.form-titulo').value;
    let formFecha = document.querySelector('.form-fecha').value;
    let formEstado = document.querySelector('.form-estado').value;
    let formId = document.querySelector(".form-id").value;

    let uri = `${API}/${formId}`; 
    
    let editData = {
        numero: formNumero,
        titulo: formTitulo,
        fecha: formFecha,
        estado: formEstado
    }; 

    let init = {
        method: 'PUT',
        body: JSON.stringify(editData) 
    };

    fetch(uri, init)
        .then(response => {
            return response.json();
        })
        .then(data => {            
            alert(data.message);            
            read();
        });                
}
function dataEdit(numero, titulo, fecha , estado, id) {   
    var inputNumero = document.querySelector(".form-numero");    
    var inputTitulo = document.querySelector(".form-titulo"); 
    var inputFecha = document.querySelector(".form-fecha"); 
    var inputEstado = document.querySelector(".form-estado"); 
    var inputId = document.querySelector(".form-id");  
    var button = document.querySelector(".button-submit");         
         
    inputNumero.value = numero;  
    inputTitulo.value = titulo;
    inputFecha.value = fecha;
    inputEstado.value = estado;
    inputId.value = id;

    button.setAttribute("onclick", "edit()");    
}

/* Delete */
function remove(id) {    
    var result = confirm("¿Confirma borrar el item?");

    if (result) {      
        let uri = `${API}/${id}`;        
        let init = {
            method: 'DELETE'
        };
        
        fetch(uri, init)
        .then(response => {
            return response.json();
        })
        .then(data => {                        
            alert(data.message);   
            read();                                             
        });        
    }    
}

read();


  
    
  
