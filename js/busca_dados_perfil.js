var nome = $('#nome');
var dt_nascimento = $('#dt_nascimento');
var cpf = $('#cpf');
var email = $('#email');
var telefone = $('#telefone');
var nome_titulo = $('.nome_titulo')
var id = localStorage.getItem('id_user');


$(document).ready(function() {
    
    var requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var url = `http://localhost:6060/api/v1/usuarios/${id}`;

    fetch(url, requestOptions)
    .then(response => {

        if(response.status == 200){

            return response.json();

        }else{
            throw new Error('Não foi possível recuperar os dados do perfil!');
        }
    })
    .then(data => {

        console.log(data);
        nome_titulo.html(data.nome)
        nome.val(data.nome);
        dt_nascimento.val(data.dataNascimento);
        cpf.val(data.cpf);
        email.val(data.email);
        telefone.val(data.telefone);
        
    })
    .catch(error => {
        console.log(error);
        alert(error.message);
    });
})