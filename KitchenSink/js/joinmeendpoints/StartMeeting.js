var JM = window.JM || {};
JM.EndPoints = JM.EndPoints || {};

JM.EndPoints.StartMeeting = (function ($, OAuthHandler, hello) {
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

    var _startAdHocMeeting = function () {
        hello('joinme').api('meetings/start/adhoc', 'post', {
            startWithPersonalUrl: $("#adHocUsePURL").is(":checked")
        }).then(function(data) {
            _addPresenterIframe(data.presenterLink);
        }, OAuthHandler.HandleOAuthErrorResponse);
    };

    var _startScheduledMeeting = function(meetingId) {
        if ($('#presenterFrame')) {
            $('#presenterFrame').remove();
        }

        hello('joinme').api('meetings/start/scheduled', 'post', { meetingId: meetingId }).then(function(data) {
            _addPresenterIframe(data.presenterLink);
        }, OAuthHandler.HandleOAuthErrorResponse);
    };

    return {
        StartAdHocMeeting: _startAdHocMeeting,
        StartScheduledMeeting: _startScheduledMeeting
    };
}(jQuery, JM.OAuthHandler, hello));