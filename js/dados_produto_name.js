
$(document).ready(function() {

    const urlParams = new URLSearchParams(window.location.search);
    const produto = urlParams.get('produto')
    const img_product = $('#img-principal');

    var token_autentication = localStorage.getItem('token');

    var requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Autorization': 'Bearer ' + token_autentication
        }
    };
    var url = `http://localhost:6060/api/v1/produtos/${produto}`;

    fetch(url, requestOptions)
    .then(data =>{

        if(data.ok){

            return data.json();

        }else{

            throw new Error('Erro na requisição! Por favor, tente novamente mais tarde.');

        }

    })
    .then(response =>{


        img_product.attr('src', response.imagem)
        console.log(response)

    })
    .catch(error => {
        alert(error.message);
    })

})