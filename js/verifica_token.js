
var token_autentication = localStorage.getItem('token');

if(token_autentication == null){
    window.location.href = 'index.html';
}