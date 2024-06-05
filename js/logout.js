

$(document).on('load', function(){

    const logout_btn = $("a[name='logout']");

    
    logout_btn.on('click', function() {
    
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    
        window.location.href = 'index.html';
    
    })

})
