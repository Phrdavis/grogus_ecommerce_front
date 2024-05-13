const logout_btn = $('#logout');

logout_btn.on('click', function() {

    localStorage.removeItem('token');
    localStorage.removeItem('email');

    window.location.href = 'index.html';

})
