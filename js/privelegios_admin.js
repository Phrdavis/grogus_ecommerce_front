
$(document).ready(function(e) {

    const cadastro_dropdown = $('.cadastro-dropdown');
    var tipo_user = localStorage.getItem('tipo_user');

    switch (tipo_user) {
        case 'Cliente':
            cadastro_dropdown.hide();
            break;
        case 'Funcionario':
                cadastro_dropdown.show();
                break;
        case 'Administrador':
            cadastro_dropdown.show();
            break;
        default:
            break;
    }

})