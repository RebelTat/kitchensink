var JM = window.JM || {};
JM.EndPoints = JM.EndPoints || {};

JM.EndPoints.User = (function ($, OAuthHandler) {
    "use strict";

    var _processUserEndPoint = function (accessToken) {
        $.ajax({
            url: "https://api.join.me/v1/user",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            success: function (data) {
                //Update the user information panel on the kitchen sink application.
                $("#userName").html(data.fullName);
                $("#email").html(data.email);
                $("#language").html(data.language);
                $("#personalUrl").html(data.personalUrl);
                $("#registrationDate").html(data.registrationDate);
                $("#subscriptionType").html(data.subscriptionType);
                $("#numberOfMeetingsHosted").html(data.numberOfMeetingsHosted);
                $("#userProgressBar").addClass("hide");
                $("#userPanelContent").removeClass("hide");
            },
            error: function (data) {
                OAuthHandler.HandleOAuthErrorResponse(data, accessToken);
            }
        });
    };

    return {
        ProcessUserEndPoint: _processUserEndPoint
    };
}(jQuery, JM.OAuthHandler));