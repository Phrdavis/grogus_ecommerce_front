var formData = $('#form_autentica_usuario');

$(formData).on('submit', function(e) {

    console.log('Formulário enviado!');
    e.preventDefault();

    var formData = new FormData(this);

    var email = formData.get('usuario');
    var senha = formData.get('senha');

    // if(email == '' || senha == '') {
    //     alert('Preencha todos os campos!');
    //     return false;
    // }else if(senha < 8) {
    //     alert('A senha deve ter no mínimo 8 caracteres!');
    //     return false;
    // }else if(senha.includes(' ')) {
    //     alert('A senha não pode conter espaços em branco!');
    //     return false;
    // }else{
    //     var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //     if(!regex.test(senha)) {
    //         alert('A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial!');
    //         return false;
    //     }
    // }

    var dados = {

        email: email,
        senha: senha

    }

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados) // Convertendo o objeto em JSON
    };
    var url = 'http://localhost:6060/api/v1/usuarios/login';


    fetch(url, requestOptions)
    .then(response => {
        if (response.status == 401) {

            throw new Error('E-mail ou senha incorretos!');

        }else if(response.status == 200){

            return response.text();

        }else{
            throw new Error('Erro na requisição! Por favor, tente novamente mais tarde.');
        }
    })
    .then(data => {
        console.log('Resposta da API:', data);
        var token_decoded  = decodeJwtToken(data);

        localStorage.setItem('token', data)
        localStorage.setItem('email_user', token_decoded.sub);
        localStorage.setItem('id_user', token_decoded.userId);
        localStorage.setItem('tipo_user', token_decoded.userTipo);

        window.location.href = 'inicio_catalogo.html';
    })
    .catch(error => {
        alert(error.message);
    });

})

function decodeJwtToken(token) {
    var tokenParts = token.split('.');
    // if (tokenParts.length !== 3) {
    //     throw new Error('Token JWT inválido');
    // }
    
    var payloadBase64 = tokenParts[1];
    var decodedPayload = atob(payloadBase64);
    var payload = JSON.parse(decodedPayload);

    return {
        userId: payload.id, 
        userTipo: payload.tipo, 
        sub: payload.sub 
    };
}