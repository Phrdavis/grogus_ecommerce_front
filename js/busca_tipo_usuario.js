
async function buscaTipoUsuario(nome){

    var dados = {

        nome: nome

    }

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const url = `http://localhost:6060/api/v1/tipos_usuario/${nome}`;


    try{

        const response = await fetch(url, requestOptions);

        if(response.status == 200){

            return await response.json();

        }else {
            throw new Error('Erro na requisição! Por favor, tente novamente mais tarde.');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }

}

async function handleSearch(nome){
    
    try {
        const tipo_usuario = await buscaTipoUsuario(nome);
        return tipo_usuario;
    } catch (error) {
        console.error('Erro ao buscar tipo de usuário:', error.message);
        throw error;
    }

}