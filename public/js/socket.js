/*
{
    "id": "14",
    "type": "user",
    "domain": "vitalsign.com",
    "subdomain": "app",
    "iat": 1516239022
}
*/
//var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE0IiwidHlwZSI6InVzZXIiLCJkb21haW4iOiJ2aXRhbHNpZ24uY29tIiwic3ViZG9tYWluIjoiYXBwIiwiaWF0IjoxNTE2MjM5MDIyfQ.fsfHXNluB7Aw-CyPbp2iT6gj3rEI4sis8iTByMjkDvg";
/*
{
    "id": "254",
    "type": "user",
    "domain": "vitalsign.com",
    "subdomain": "app",
    "iat": 1516239022
}
*/
//var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1NCIsInR5cGUiOiJ1c2VyIiwiZG9tYWluIjoidml0YWxzaWduLmNvbSIsInN1YmRvbWFpbiI6ImFwcCIsImlhdCI6MTUxNjIzOTAyMn0.WoNkZQAbLa-PoEpYzQuDrJ1uiyvgMRdO01a1_4_CuhI";
/*
{
    "domain": "vitalsign.com",
    "subdomain": "app",
    "iat": 1516239022
}
*/
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJ2aXRhbHNpZ24uY29tIiwic3ViZG9tYWluIjoiYXBwIiwiaWF0IjoxNTE2MjM5MDIyfQ.3b-9mPc6mZaIQpJ5ja4IqGQuFy77gw2nu4pu6hW4tW0";

var socket = io('http://localhost:3000', {
    query: {
        auth: token
    }
});

socket.on('connect', function() {
    console.log('Conectado al servidor');
});
socket.on('event', function(data) {
    console.log('Evento', data);
});
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});
/*
socket.emit('entrarChat', usuario, function(resp) {
    renderizarUsuarios(resp);
});
*/