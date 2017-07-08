
$(function() {
    let list = $(".latest-music a"); 
    list.click(function() {
        var songID = list.index(this);
        sessionStorage.setItem('songID', songID);
    })
})