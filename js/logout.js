

$(document).on('load', function(){

    const logout_btn = document.getElementById('logout');

    
    logout_btn.addEventListener('click', function(e){
        
            localStorage.removeItem('token');
            localStorage.removeItem('email');
        
            window.location.href = 'index.html';

    })

})
