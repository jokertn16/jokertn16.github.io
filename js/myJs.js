const textConfig = {
    text1: "Chào pạn Hy nhó . Mìn là Bông dễ huông đêi!",
    text2: "Có điều này mình muốn nói với bạn, mong bạn Hy xem nha !",
    text3: "Bạn hãy vì sự dễ huông của chiếc web này <br> mà tha lỗi cho mình nha nha <3 <3 ",
    text4: "",
    text5: "Còn lâu :) ",
    text6: "Nốt lần này thôi đóa",
    text7: "Ehehe cảm ơn Hy nhìu lắm lắm lun ý :>> ",
    text8: "Đây nè :>",
    text9: "Vì a vui tánh vlllll",
    text10: "Tha lỗi cho Bông nha <3",
    text11: " Để mà lói về vấn đề thơ thủng, tại sao lúc nào cũng phải theo vần, tại sao chúng ta lại làm việc một cách máy móc như vậy, chúng ta phải tiến bộ lên chứ đúng ko, nên là cho mình chin nhỗi nhó.",
    text12: "Bấm zô đêi để đi mắng Bông !!",
};


$(document).ready(function() {
    var audio = new Audio("sound/bgsound.mp3");

    // process bar
    setTimeout(function() {
        firstQuestion();
        $(".spinner").fadeOut();
        $("#preloader").delay(350).fadeOut("slow");
        $("body").delay(350).css({
            overflow: "visible",
        });
    }, 600);

    $("#text3").html(textConfig.text3);
    $("#text4").html(textConfig.text4);
    $("#no").html(textConfig.text5);
    $("#yes").html(textConfig.text6);
    $("#yes1").html(textConfig.text6);

    $(document).mousemove(function() {
        audio.play();
    });

    function firstQuestion() {
        $(".content").hide();
        Swal.fire({
            title: textConfig.text1,
            text: textConfig.text2,
            imageUrl: "img/hy.jpg",
            imageWidth: 300,
            imageHeight: 300,
            background: '#fff url("img/bgHy.jpg")',
            imageAlt: "Custom image",
        }).then(function() {
            $(".content").show(200);
        });
    }

    // switch button position
    function switchButton() {
        var audio = new Audio("sound/duck.mp3");
        audio.play();
        var leftNo = $("#no").css("left");
        var topNO = $("#no").css("top");
        var leftY = $("#yes").css("left");
        var topY = $("#yes").css("top");
        $("#no").css("left", leftY);
        $("#no").css("top", topY);
        $("#yes").css("left", leftNo);
    }
    // move random button póition
    function moveButton() {
        var audio = new Audio("sound/Swish1.mp3");
        audio.play();
        if (screen.width <= 600) {
            var x = Math.random() * 300;
            var y = Math.random() * 500;
        } else {
            var x = Math.random() * 500;
            var y = Math.random() * 500;
        }
        var left = x + "px";
        var top = y + "px";
        $("#no").css("left", left);
        $("#no").css("top", top);
    }

    var n = 0;
    $("#no").mousemove(function() {
        if (n < 1) switchButton();
        if (n > 1) moveButton();
        n++;
    });

    $("#no").click(() => {
        if (screen.width >= 900) switchButton();
    });

    // generate text in input
    function textGenerate() {
        var n = "";
        var text = " " + textConfig.text9;
        var a = Array.from(text);
        var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
        var count = textVal.length;
        if (count > 0) {
            for (let i = 1; i <= count; i++) {
                n = n + a[i];
                if (i == text.length + 1) {
                    $("#txtReason").val("");
                    n = "";
                    break;
                }
            }
        }
        $("#txtReason").val(n);
    }

    // show popup
    $("#yes").click(function() {
        var audio = new Audio("sound/tick.mp3");
        audio.play();
        Swal.fire({
            title: textConfig.text7,
            html: true,
            width: 900,
            padding: "3em",
            html: "<input type='text' disabled class='form-control' id='txtReason' placeholder='Bạn nghe một chút tấm lòng của mình nha :> ' >",
            background: '#fff url("img/bgHy.jpg")',
            backdrop: `
                      rgba(0,0,123,0.4)
                      url("img/vitcon.gif")
                      left top
                      no-repeat
                    `,
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonColor: "#fe8a71",
            cancelButtonColor: "#f6cd61",
            confirmButtonText: textConfig.text8,
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    width: 900,
                    confirmButtonText: textConfig.text12,
                    background: '#fff url("img/bgHy.jpg")',
                    title: textConfig.text10,
                    text: textConfig.text11,
                    confirmButtonColor: "#83d0c9",
                    onClose: () => {
                        window.location = "https://www.facebook.com/messages/t/100014358183324";
                    },
                });
            }
        });

        $("#txtReason").focus(function() {
            var handleWriteText = setInterval(function() {
                textGenerate();
            }, 10);
            $("#txtReason").blur(function() {
                clearInterval(handleWriteText);
            });
        });
    });
});