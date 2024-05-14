const nome = $('#nome');
const dt_nascimento = $('#dt_nascimento');
const cpf = $('#cpf');
const email = $('#email');
const telefone = $('#telefone');
const id = localStorage.getItem('id_user');

$(document).ready(function() {
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const url = `http://localhost:6060/api/v1/usuarios/${id}`;

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
        nome.val(data.nome);
        dt_nascimento.val(data.nascimento);
        cpf.val(data.cpf);
        email.val(data.email);
        telefone.val(data.telefone);
        
    })
    .catch(error => {
        console.log(error);
        alert(error.message);
    });
})