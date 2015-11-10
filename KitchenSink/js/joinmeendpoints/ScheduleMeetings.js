var JM = window.JM || {};
JM.EndPoints = JM.EndPoints || {};

JM.EndPoints.ScheduleMeetings = (function ($, OAuthHandler, TemplateManager, hello) {
    "use strict";

    var _addMeetingRow = function (meetingId, meetingName, meetingStart, meetingEnd) {
        if (meetingStart) {
            meetingStart = moment(meetingStart).format('MMMM Do YYYY, h:mm a');
        }

        if (meetingEnd) {
            meetingEnd = moment(meetingEnd).format('MMMM Do YYYY, h:mm a');
        }

        $('#scheduledMeetingsTable > tbody:last-child')
            .append(TemplateManager.GetMeetingRow({
                "meetingId": meetingId,
                "meetingName": meetingName,
                "meetingStart": meetingStart,
                "meetingEnd": meetingEnd
            }));
        $("#scheduledMeetingsTable").removeClass("hide");
        $("#scheduledPanelNoContent").addClass("hide");
    };

    var _getScheduledMeetings = function () {
        hello('joinme').api('/meetings').then(function(data) {
            for (var i = 0; i < data.meetings.length; i++) {
                _addMeetingRow(data.meetings[i].meetingId, data.meetings[i].meetingName, data.meetings[i].meetingStart, data.meetings[i].meetingEnd);
            }

            if (data.meetings.length === 0) {
                $("#scheduledMeetingsTable").addClass("hide");
                $("#scheduledPanelNoContent").removeClass("hide");
            }

            $("#scheduledProgressBar").addClass("hide");
            $("#scheduledPanelContent").removeClass("hide");
        }, OAuthHandler.HandleOAuthErrorResponse);
    };

    var _getScheduledMeeting = function (meetingId, callback) {
        hello('joinme').api('meetings/info', 'get', { id: meetingId }).then(callback, OAuthHandler.HandleOAuthErrorResponse);    
    };

    var _scheduleMeeting = function(usePurl, meetingName, meetingStart, meetingEnd, participants) {
        hello('joinme').api('meetings/schedule', 'post', {
            startWithPersonalUrl: usePurl,
            meetingStart: moment(meetingStart).utc().format(),
            meetingEnd: moment(meetingEnd).utc().format(),
            meetingName: meetingName,
            participants: participants
        }).then(function(data) {
            _addMeetingRow(data.meetingId, data.meetingName, data.meetingStart, data.meetingEnd);
            $("#contentModal").modal('hide');
            $("#modal-submit-button").button('reset');
            $("#modal-close-button").prop('disabled', false);
        }, OAuthHandler.HandleOAuthErrorResponse);
    };

    var _updateMeeting = function (meetingId, usePurl, meetingName, meetingStart, meetingEnd, participants) {
        hello('joinme').api('meetings/update', 'patch', {
            meetingId: meetingId,
            startWithPersonalUrl: usePurl,
            meetingStart: moment(meetingStart).utc().format(),
            meetingEnd: moment(meetingEnd).utc().format(),
            meetingName: meetingName,
            participants: participants || []
        }).then(function(data) {
            $("#meetingidrow-" + meetingId).remove();
            _addMeetingRow(data.meetingId, data.meetingName, data.meetingStart, data.meetingEnd);
            $("#contentModal").modal('hide');
            $("#modal-submit-button").button('reset');
            $("#modal-close-button").prop('disabled', false);
        }, OAuthHandler.HandleOAuthErrorResponse);
    };

    var _deleteMeeting = function(meetingId) {
        $("#meetingiddelete-" + meetingId).button('loading');
        $("#meetingidstart-" + meetingId).prop('disabled', true);
        $("#meetingidupdate-" + meetingId).prop('disabled', true);

        hello('joinme').api('meetings/delete', 'delete', { id: meetingId }).then(function() {
            $("#meetingidrow-" + meetingId).remove();

            if ($('#scheduledMeetingsTable > tbody:last-child').children().size() === 0) {
                $("#scheduledMeetingsTable").addClass("hide");
                $("#scheduledPanelNoContent").removeClass("hide");
            }
        }, OAuthHandler.HandleOAuthErrorResponse);
    };

    return {
        GetScheduledMeetings: _getScheduledMeetings,
        GetScheduledMeeting: _getScheduledMeeting,
        ScheduleMeeting: _scheduleMeeting,
        UpdateMeeting: _updateMeeting,
        DeleteMeeting: _deleteMeeting
    };
}(jQuery, JM.OAuthHandler, JM.TemplateManager, hello));