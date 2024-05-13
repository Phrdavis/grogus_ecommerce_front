const produtos_div = document.getElementById('produtos');

$(document).ready(function() {

    var token_autentication = localStorage.getItem('token');

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Autorization': 'Bearer ' + token_autentication
        }
    };
    const url = 'http://localhost:6060/api/v1/produtos';

    fetch(url, requestOptions)
    .then(data =>{

        if(data.ok){

            return data.json();

        }else{

            throw new Error('Erro na requisição! Por favor, tente novamente mais tarde.');

        }

    })
    .then(response =>{

        console.log('Resposta da API:', response);


        response.forEach(produto => {

            var preco_parcela = (produto.preco/10).toFixed(2).replace('.',',');

            var card = $("<a class='card mt-3 mx-3 text-decoration-none' style='max-width: 15em;max-height: 26em;'></a>");
            var card_img = $(`<img class='card-img-top img-card' src='${produto.imagem}' alt='Imagem do produto'>`);
            var card_body = $("<div class='card-body'></div>");
            var card_title = $(`<h5 class='card-title overflow-y-hidden' style='max-height: 6em'>${produto.nome}</h5>`);
            var card_preco = $(`<p class='card-text mb-0 mt-4 text-success fw-bolder fs-3'>R$ ${produto.preco}</p>`);
            var card_parcela = $(`<p class='card-text pix'>10x de R$ ${preco_parcela} sem juros</p>`);
        
            card_img.appendTo(card);
            card_title.appendTo(card_body);
            card_preco.appendTo(card_body);
            card_parcela.appendTo(card_body);
            card_body.appendTo(card);
            
            // Adicionar o card ao elemento pai (produtos_div)
            card.appendTo(produtos_div);

        })

    })
    .catch(error => {
        alert(error.message);
    })

})