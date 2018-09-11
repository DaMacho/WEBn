var Body = {
    setBackgroundColor: function (color) {
        // document.querySelector('body').style.backgroundColor = color;
        $('body').css('color', color);
    },
    setColor: function (color) {
        // document.querySelector('body').style.color = color;
        $('body').css('backgroundcolor', color);
    }
}

var Links = {
    setColor: function (color) {
        // var alist = document.querySelectorAll('a');
        // var i = 0;
        // while (i < alist.length) {
        //     alist[i].style.color = color;
        //     i++;
        // }
        $('a').css('color', color);
    }
}

function nightDayHandler(self) {
    if (self.value === 'night') {
        Body.setBackgroundColor('black');
        Body.setColor('white');

        Links.setColor('powderblue');

        self.value = 'day';
    } else {
        Body.setBackgroundColor('white');
        Body.setColor('black');

        Links.setColor('blue');

        self.value = 'night';
    }
}