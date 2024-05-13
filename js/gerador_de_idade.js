function gerarIdade(dt_nascimento, data_atual){

    var data_nascimento = new Date(dt_nascimento);
    var data_atual = new Date(data_atual);

    var idade = data_atual.getFullYear() - data_nascimento.getFullYear();
    var mes = data_atual.getMonth() - data_nascimento.getMonth();

    if(mes < 0 || (mes === 0 && data_atual.getDate() < data_nascimento.getDate())){
        idade--;
    }

    return idade;

}