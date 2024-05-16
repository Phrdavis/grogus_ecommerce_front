

var tipo_usuario = handleSearch('Administrador')
.then(data=>{

    var dados = {
        
        nome: "Davi Pinheiro de Souza",
        dataNascimento: "2024-04-27",
        cpf: "07350368950",
        email: "davipi_sou@hotmail.com",
        telefone: "47984818904",
        senha: "SenhaAdmin123@",
        ativo: true,
        tipo: data
    
    } 
    
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados) // Convertendo o objeto em JSON
    };
    var url = 'http://localhost:6060/api/v1/usuarios/cadastrar';


    fetch(url, requestOptions)
    .then(response => {

        if(response.status == 200){

            return response.text();

        }else{
            throw new Error('Erro na requisição! Por favor, tente novamente mais tarde.');
        }
    })
    .then(data => {

        console.log(data)
    })
    .catch(error => {
        console.log(error.message);
    });


})

