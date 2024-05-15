const formData = $('#form_cadastro_usuario');
const senha_cadastro_input = $("input[name='senha_cadastro']");
const senha_cadastro_confirmacao_input = $("input[name='senha_cadastro_confirmacao']");
var dataAtual;

$(document).ready(function() {

    const date_input = $("input[name='dt_nascimento']");
    dataAtual = dataAtualFormatada();

    date_input.attr('min', '1900-01-01');
    date_input.attr('max', dataAtual);

})

const tipo_usuario = handleSearch('Cliente')
.then(data=>{
    $(formData).on('submit', function(e){
    
        e.preventDefault();
    
        const formData = new FormData(this);
    
        var senha_cadastro = formData.get('senha_cadastro');
        var senha_cadastro_confirmacao = formData.get('senha_cadastro_confirmacao');
        var dt_nascimento = formData.get('dt_nascimento'); 
    
        var idade = gerarIdade(dt_nascimento, dataAtual);
    
        var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!regex.test(senha_cadastro) || senha_cadastro.length < 8) {
    
            senha_cadastro_input.removeClass('border-0').addClass('border border-danger')
    
            alert('A senha deve conter pelo menos uma letra maiúscula, um número, um caractere especial e no mínimo 8 caracteres!');
            return false;
    
        }else if(senha_cadastro != senha_cadastro_confirmacao) {
    
            senha_cadastro_input.removeClass('border-0').addClass('border border-danger')
            senha_cadastro_confirmacao_input.removeClass('border-0').addClass('border border-danger');
    
            alert('As senhas não coincidem!');
            return false;
        }
        senha_cadastro_input.toggleClass('border-danger border-success')
        senha_cadastro_confirmacao_input.toggleClass('border-danger border-success');
    
    
        var dados = {
    
            nome: formData.get('nome'),
            idade: idade,
            cpf: formData.get('cpf'),
            email: formData.get('email'),
            telefone: formData.get('telefone'),
            senha: senha_cadastro,
            ativo: true,
            tipo: data
    
        }   
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados) // Convertendo o objeto em JSON
        };
        const url = 'http://localhost:6060/api/v1/usuarios/cadastrar';
    
    
        fetch(url, requestOptions)
        .then(response => {
    
            if(response.status == 200){
    
                return response.text();
    
            }else{
                throw new Error('Erro na requisição! Por favor, tente novamente mais tarde.');
            }
        })
        .then(data => {
    
            alert('Usuário cadastrado com sucesso!');
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.log(error);
            alert(error.message);
        });
    
    }) 
});