const form_adiciona_carrinho = $('#form_adiciona_carrinho');

$(form_adiciona_carrinho).on('submit', function(e){


    e.preventDefault();

    const formData = new FormData(form_adiciona_carrinho[0]);

    var qtd_produto = $("input[name='qtd_produto']").val();
    var produto_id = $("input[name='id_produto']").val()
    var id_user = localStorage.getItem('id_user');

    if(qtd_produto <= 0){

        alert('Não é possível adicionar quantidade ZERO ou negativa ao carrinho!')
        return false;

    }
    var token_autentication = localStorage.getItem('token');
    var id_user = localStorage.getItem('id_user');

    var dados = {

        'produto': {"id": produto_id},
        'quantidade': qtd_produto,
        'usuario': {"id": id_user}

    }

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Autorization': 'Bearer ' + token_autentication
        },
        body: JSON.stringify(dados) // Convertendo o objeto em JSON
    };

    var url = `http://localhost:6060/api/v1/carrinhos/adicionar`;


    fetch(url, requestOptions)
    .then(data =>{

        if(data.ok){

            alert("Produto adicionado ao Carrinho!")
            window.location.href ='carrinho.html'

        }else{

            throw new Error('Erro na requisição! Por favor, tente novamente mais tarde.');

        }

    })
    .catch(error => {
        alert(error.message);
    })

})