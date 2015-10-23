$(document).ready(function () {
    $(".wpcf7-submit").click(function () {

        isError = false;

        thisButton = $(this);

        if (!thisButton.hasClass("btn-warning"))
        {
            alert("Уже отправлено");
            return;
        }


        receiverField = $("#requestform").find("[name=receiver]");
        receiverField.removeClass("error");
        receiverString = receiverField.val();

        isErrorEmail = false;
        emailChars = "_-.@~qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
        emailString = receiverString;
        if (emailString.length < 6) {
            isErrorEmail = true;
        }
        else {
            i = 0;
            HasAt = false;
            while (ch = emailString.substr(i, 1)) {
                if (emailChars.indexOf(ch) == -1) {
                    isErrorEmail = true;
                    break;
                }
                if (ch == "@") {
                    HasAt = true;
                }
                i++;
            }
            if (!HasAt) {
                isErrorEmail = true;
            }
        }

        isErrorPhone = false;
        phoneChars = " +-()1234567890";
        phoneString = receiverString;
        if (phoneString.length < 10) {
            isErrorPhone = true;
        }
        else {
            i = 0;
            while (ch = phoneString.substr(i, 1)) {
                if (phoneChars.indexOf(ch) == -1) {
                    isErrorPhone = true;
                    break;
                }
                i++;
            }
        }

        if (isErrorEmail && isErrorPhone) {
            receiverField.addClass("error");
            isError = true;
        }

        messageField = $("#requestform").find("[name=message]");
        messageString = messageField.val();
        if (messageString.length < 5) {
            messageField.addClass("error");
            isError = true;
        }

        if (isError) {
            alert("Пожалуйста, заполните все поля корректно.");
        }
        else
        {

            thisButton.attr("disabled", "disabled");
            thisButton.val("ОТПРАВЛЕНО");
            thisButton.removeClass("btn-warning");

            $.post('/Home/Feedback',
            {
                receiver: receiverString,
                message: messageString
            },
            function (data) {
                alert(data.Message);
                thisButton.removeAttr("disabled");
            }, "json");

        }

    });

});