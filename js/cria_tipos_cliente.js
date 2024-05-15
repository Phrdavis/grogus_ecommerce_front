var dados = ['Cliente', 'Funcionario', 'Administrador']

const url = 'http://localhost:6060/api/v1/tipos_usuario';

dados.forEach(tipo => {

    var dados = JSON.stringify({

        nome : tipo

    })
 
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dados
    };

    console.log(dados)

    
    fetch(url, requestOptions)
    .then(data =>{

        if(data.ok){

            return data.text();

        }else{

            throw new Error('Erro na requisição! Por favor, tente novamente mais tarde.');

        }

    })
    .then(data =>{

        console.log(data)

    })
    .catch(error => {
        console.error(error.message);
    })


})
