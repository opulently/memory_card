var imgDizi = [
    'assets/bulbasaur.png',
    'assets/bulbasaur.png',
    'assets/charmander.png',
    'assets/charmander.png',
    'assets/clefairy.png',
    'assets/clefairy.png',
    'assets/ekans.png',
    'assets/ekans.png',
    'assets/onix.png',
    'assets/onix.png',
    'assets/pidges.png',
    'assets/pidges.png',
    'assets/pikachu.png',
    'assets/pikachu.png',
    'assets/squirtle.png',
    'assets/squirtle.png',
    'assets/staryu.png',
    'assets/staryu.png',
];
var randomDizi = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
var newRandom = new Array();
var karsilastirma = new Array();
var eslesenler = new Array();
var tikla = 0;
var eslesen = 0;
var dakika = 0;
var saniye = 0;
var baslat = false;
var zamanDurdur;
randomResim();

function zaman() {
    saniye += 1;
    if (saniye > 59) {
        dakika += 1;
        $(".dakika").html(dakika);
        saniye = 0;
    }
    $(".saniye").html(saniye);
}


function kontrol() {
    var secim1 = imgDizi[newRandom[karsilastirma[0]]];
    var secim2 = imgDizi[newRandom[karsilastirma[1]]];
    $("button").prop("disabled", true);
    setTimeout(function() {
        if (secim1 === secim2) {
            eslesen++;
            eslesenler.push(karsilastirma[0]);
            eslesenler.push(karsilastirma[1]);
            if (eslesen == 9) {
                clearInterval(zamanDurdur);
                alert("Tebrikler ! " + $(".hamle").html() + " hamlede " + $(".dakika").html() + " dakika " + $(".saniye").html() + " saniye içerisinde tamamladınız.");
                $("button").prop("disabled", true);
                return;
            }
        } else {
            $("#" + karsilastirma[0]).removeClass('donus');
            $("#" + karsilastirma[1]).removeClass('donus');
            $("#" + karsilastirma[0]).css("background-image", "url(assets/kapak.png)");
            $("#" + karsilastirma[1]).css("background-image", "url(assets/kapak.png)");
        }
        karsilastirma = [];
        $("button").prop("disabled", false);
        eslesenler.forEach(function(element) {
            $("#" + element).prop("disabled", true);
        });
    }, 1000);

    return;

}



$("button").click(function() {
    if (baslat == false) {
        zamanDurdur = setInterval(zaman, 1000);
        baslat = true;
    }
    var resimId = $(this).attr('id');
    tikla++;
    $(".hamle").html(tikla);
    $(this).addClass("donus");
    $(this).css("background-image", "url(" + imgDizi[newRandom[resimId]] + ")");
    $(this).prop("disabled", true);
    karsilastirma.push(resimId);
    if (karsilastirma.length === 2) {
        kontrol();
    }

});

$("#yenidenbaslat").click(function() {
    $("button").css("background-image", "url(assets/kapak.png)");
    randomDizi = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    newRandom = [];
    karsilastirma = [];
    clearInterval(zamanDurdur);
    tikla = 0;
    eslesen = 0;
    eslesenler = [];
    dakika = 0;
    saniye = 0;
    hamle = 0;
    $(".saniye").html(saniye);
    $(".hamle").html(hamle);
    $(".dakika").html(dakika);
    baslat = false;
    randomResim();
    $("button").prop("disabled", false);
    $("button").removeClass("donus");
});

function randomResim() {
    var indis;
    for (var i = 0; i < imgDizi.length; i++) {
        indis = Math.floor(Math.random() * randomDizi.length);
        newRandom.push(randomDizi[indis]);
        randomDizi.splice(indis, 1);
    }
}