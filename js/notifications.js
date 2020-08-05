// const API = "http://192.168.1.24:80/test/rest-api-php/index.php/actas";
const API = "http://localhost/test/rest-api-php/index.php/actas";

function read() {    
    fetch(API)
        .then(response => response.json())    
        .then(json => {                                  
            renderNotifications(json);                        
        });
}

function renderNotifications(json) {  
    var data = JSON.stringify(json);
    var actas = JSON.parse(data); 

    var actasFiltradas = actas.filter(acta => acta.estado === 'Desgrabar');

    var container = document.querySelector('.app-notification');    

    actasFiltradas.forEach(acta => {
        var notification = `<div>                
                                <strong>¡Pendiente! : ${acta.titulo}</strong>
                                <a>x</a>
                            </div>`; 
                            
        container.innerHTML += notification;                            
    });
}

read();
