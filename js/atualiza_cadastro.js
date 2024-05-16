var formData = $('#form_dados_perfil');
var senha_dados_input = $("input[name='senha_dados']");
var senha_dados_confirmacao_input = $("input[name='senha_dados_confirmacao']");
var dataAtual;

var id_user = localStorage.getItem('id_user');

$(document).ready(function() {

    var date_input = $("input[name='dt_nascimento']");
    dataAtual = dataAtualFormatada();

    date_input.attr('min', '1900-01-01');
    date_input.attr('max', dataAtual);

})

$(formData).on('submit', function(e) {

    e.preventDefault();

    var formData = new FormData(this);

    var senha_dados = formData.get('senha_dados');
    var senha_dados_confirmacao = formData.get('senha_dados_confirmacao');
    var senha_dados_nova = formData.get('senha_dados_nova');
    var dt_nascimento = formData.get('dt_nascimento'); 

    var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!regex.test(senha_dados) || senha_dados.length < 8) {

        senha_dados_input.removeClass('border-0').addClass('border border-danger')

        alert('A senha deve conter pelo menos uma letra maiúscula, um número, um caractere especial e no mínimo 8 caracteres!');
        return false;

    }else if(senha_dados != senha_dados_confirmacao) {

        senha_dados_input.removeClass('border-0').addClass('border border-danger')
        senha_dados_confirmacao_input.removeClass('border-0').addClass('border border-danger');

        alert('As senhas não coincidem!');
        return false;
    }

    if(senha_dados_nova != '') {

        if(!regex.test(senha_dados_nova) || senha_dados_nova.length < 8) {

            senha_dados_input.removeClass('border-0').addClass('border border-danger')

            alert('A nova senha deve conter pelo menos uma letra maiúscula, um número, um caractere especial e no mínimo 8 caracteres!');
            return false;

        }

        senha = senha_dados_nova;

    }else{

        senha = senha_dados;

    }
    senha_dados_input.toggleClass('border-danger border-success')
    senha_dados_confirmacao_input.toggleClass('border-danger border-success');

    var dados = {

        id: id_user,
        nome: formData.get('nome'),
        dataNascimento: dt_nascimento,
        cpf: formData.get('cpf'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        senha: senha

    }   

    var requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados) // Convertendo o objeto em JSON
    };
    var url = 'http://localhost:6060/api/v1/usuarios/atualizar';


    console.log(dados);
    fetch(url, requestOptions)
    .then(response => {

        if(response.status == 200){

            return response.text();

        }else{
            throw new Error('Erro na requisição! Por favor, tente novamente mais tarde.');
        }
    })
    .then(data => {

        alert(data);
        location.reload;
    })
    .catch(error => {
        console.log(error);
        alert(error.message);
    });

}) 