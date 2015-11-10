var JM = window.JM || {};
JM.EndPoints = JM.EndPoints || {};

JM.EndPoints.User = (function ($, OAuthHandler, hello) {
    "use strict";

    var _processUserEndPoint = function () {
        hello('joinme').api('user').then(function(data) {
            //Update the user information panel on the kitchen sink application.
            $("#userName").html(data.fullName);
            $("#email").html(data.email);
            $("#language").html(data.language);
            $("#personalUrl").html(data.personalUrl);
            $("#registrationDate").html(data.registrationDate);
            $("#subscriptionType").html(data.subscriptionType);
            $("#numberOfMeetingsHosted").html(data.numberOfMeetingsHosted);

            if (data.conferenceSettings) {
                $("#conferenceId").html(data.conferenceSettings.conferenceId);
                $("#conferenceCallNumbersUrl").html('<a href="' + data.conferenceSettings.conferenceCallNumbersUrl + '" target="_blank">Conference Call Numbers</a>');
                $("#organizerCode").html(data.conferenceSettings.organizerCode);
            } else {
                $("#confSettingsRow").addClass("hide");
            }

            $("#userProgressBar").addClass("hide");
            $("#userPanelContent").removeClass("hide");
        }, OAuthHandler.HandleOAuthErrorResponse);
    };

    return {
        ProcessUserEndPoint: _processUserEndPoint
    };
}(jQuery, JM.OAuthHandler, hello));