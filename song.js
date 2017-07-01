$(function() {
	$.get('./lyric/lyric2.json').then(function(object){
        //let lyric = object.lyric;
        let {lyric} = object; //ES6
        let array = lyric.split('\n');
        let regexp = /^\[(.+)\](.*)/;
        array = array.map(function(string, index) {
            let matches = string.match(regexp);
            if(matches) {
                return {time: matches[1], words: matches[2]};
            }
            
        })
        console.log(array);

        let $lyric = $('.lyrics .container');
        array.map(function(object) {
            if(object) {
                let $p = $('<p/>');
                $p.attr('data-time', object.item).text(object.words);
                $p.appendTo($lyric);
            }
        })
    })

    let audio = document.createElement('audio');
    audio.src = './music/朴树 - 平凡之路.mp3';
    audio.play();

    $(".fa-pause").click(function() {
        $(".fa-pause").addClass("disabled");
        $(".fa-play").removeClass("disabled");
        $(".cover, discLight").css("animation", "none");
        audio.pause()
        $(".needle").css("transform", "rotate(-20deg)");
    })

    $(".fa-play").click(function() {
        $(".fa-play").addClass("disabled");
        $(".fa-pause").removeClass("disabled");
        $(".cover, .discLight").css("animation", "rotating 20s infinite linear"); 
        audio.play();
        $(".needle").css("transform", "rotate(0)");
    }) 
})