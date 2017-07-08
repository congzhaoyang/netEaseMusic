var songID = sessionStorage.getItem('songID');

$(function() {
    $.get('./songs.json').then(function(object) {
        let obj = object[songID];
        let lyric = obj.lyric;
        let songName = obj.name;
        let songSrc = obj.url;
        $(".lyrics h1").html(songName);

        let array = lyric.split('\n');
        let regexp = /^\[(.+)\](.*)/;
        array = array.map(function(string, index) {
            let matches = string.match(regexp);
            if(matches) {
                return {time: matches[1], words: matches[2]};
            }   
        })

        let $lyric = $('.lyrics .container');
        array.map(function(object) {
            if(object) {
                let $p = $('<p/>');
                $p.attr('data-time', object.item).text(object.words);
                $p.appendTo($lyric);
            }
        })

        let audio = document.createElement('audio');
        audio.src = songSrc;
        audio.play();

        $(".fa-pause").click(function() {
            $(".fa-pause").addClass("disabled");
            $(".fa-play").removeClass("disabled");
            $(".cover, discLight").css("animation-play-state", "paused");
            audio.pause()
            $(".needle").css("transform", "rotate(-20deg)");
        })

        $(".fa-play").click(function() {
            $(".fa-play").addClass("disabled");
            $(".fa-pause").removeClass("disabled");
            $(".cover, .discLight").css("animation-play-state", "running"); 
            audio.play();
            $(".needle").css("transform", "rotate(0)");
        })            
    })
})
