var JM = window.JM || {};
JM.EndPoints = JM.EndPoints || {};

JM.EndPoints.StartMeeting = (function ($, OAuthHandler) {
    "use strict";

    var _addPresenterIframe = function (presenterLink) {
        $('<iframe>', {
            src: presenterLink,
            id: 'presenterFrame',
            style: "width: 100%;height: 350px;",
            frameborder: 0,
            scrolling: 'no'
        }).appendTo('#contentModalBodyContent');
    };

    var _startAdHocMeeting = function (accessToken) {
        $.ajax({
            url: "https://api.join.me/v1/meetings/start",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            method: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: "{ \"startWithPersonalUrl\":\"" + $("#adHocUsePURL").is(':checked') + "\"}",
            success: function (data) {
                _addPresenterIframe(data.presenterLink);
            },
            error: function (data) {
                OAuthHandler.HandleOAuthErrorResponse(data, accessToken);
            }
        });
    };

    var _startScheduledMeeting = function(accessToken, meetingId) {
        if ($('#presenterFrame')) {
            $('#presenterFrame').remove();
        }

        $.ajax({
            url: "https://api.join.me/v1/meetings/" + meetingId + "/start",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            method: "POST",
            success: function (data) {
                _addPresenterIframe(data.presenterLink);
            },
            error: function (data) {
                OAuthHandler.HandleOAuthErrorResponse(data, accessToken);
            }
        });
    };

    return {
        StartAdHocMeeting: _startAdHocMeeting,
        StartScheduledMeeting: _startScheduledMeeting
    };
}(jQuery, JM.OAuthHandler));