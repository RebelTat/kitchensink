var JM = window.JM || {};
JM.EndPoints = JM.EndPoints || {};

JM.EndPoints.ScheduleMeetings = (function ($, OAuthHandler, TemplateManager) {
    "use strict";

    var _addMeetingRow = function (accessToken, meetingId, meetingName, meetingStart, meetingEnd) {
        if (meetingStart && meetingStart !== "") {
            meetingStart = moment(meetingStart).format('MMMM Do YYYY, h:mm a');
        }

        if (meetingEnd && meetingEnd !== "") {
            meetingEnd = moment(meetingEnd).format('MMMM Do YYYY, h:mm a');
        }

        $('#scheduledMeetingsTable > tbody:last-child')
            .append(TemplateManager.GetMeetingRow({
                "meetingId": meetingId,
                "meetingName": meetingName,
                "meetingStart": meetingStart,
                "meetingEnd": meetingEnd,
                "accessToken": accessToken
            }));
        $("#scheduledMeetingsTable").removeClass("hide");
        $("#scheduledPanelNoContent").addClass("hide");
    };

    var _getScheduledMeetings = function (accessToken) {
        $.ajax({
            url: "https://api.join.me/v1/meetings",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            success: function (data) {
                for (var i = 0; i < data.meetings.length; i++) {
                    _addMeetingRow(accessToken, data.meetings[i].meetingId, data.meetings[i].meetingName, data.meetings[i].meetingStart, data.meetings[i].meetingEnd);
                }

                if (data.meetings.length === 0) {
                    $("#scheduledMeetingsTable").addClass("hide");
                    $("#scheduledPanelNoContent").removeClass("hide");
                }

                $("#scheduledProgressBar").addClass("hide");
                $("#scheduledPanelContent").removeClass("hide");
            },
            error: function (data) {
                OAuthHandler.HandleOAuthErrorResponse(data, accessToken);
            }
        });
    };

    var _getScheduledMeeting = function(accessToken, meetingId, callback) {
        $.ajax({
            url: "https://api.join.me/v1/meetings/" + meetingId,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            success: function (data) {
                callback(data);
            },
            error: function (data) {
                OAuthHandler.HandleOAuthErrorResponse(data, accessToken);
            }
        });
    };

    var _scheduleMeeting = function (accessToken, usePurl, meetingName, meetingStart, meetingEnd, participants) {
        $.ajax({
            method: "POST",
            url: "https://api.join.me/v1/meetings/",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(
                {
                    startWithPersonalUrl: usePurl,
                    meetingStart: moment(meetingStart).utc().format(),
                    meetingEnd: moment(meetingEnd).utc().format(),
                    meetingName: meetingName,
                    participants: participants
                }),
            success: function (data) {
                _addMeetingRow(accessToken, data.meetingId, data.meetingName, data.meetingStart, data.meetingEnd);
                $("#contentModal").modal('hide');
                $("#modal-submit-button").button('reset');
                $("#modal-close-button").prop('disabled', false);
            },
            error: function (data) {
                OAuthHandler.HandleOAuthErrorResponse(data, accessToken);
            }
        });
    };

    var _updateMeeting = function (accessToken, meetingId, usePurl, meetingName, meetingStart, meetingEnd, participants) {
        $.ajax({
            method: "PATCH",
            url: "https://api.join.me/v1/meetings/" + meetingId,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(
                {
                    meetingId: meetingId,
                    startWithPersonalUrl: usePurl,
                    meetingStart: moment(meetingStart).utc().format(),
                    meetingEnd: moment(meetingEnd).utc().format(),
                    meetingName: meetingName,
                    participants: participants
                }),
            success: function (data) {
                $("#meetingidrow-" + meetingId).remove();
                _addMeetingRow(accessToken, data.meetingId, data.meetingName, data.meetingStart, data.meetingEnd);
                $("#contentModal").modal('hide');
                $("#modal-submit-button").button('reset');
                $("#modal-close-button").prop('disabled', false);
            },
            error: function (data) {
                OAuthHandler.HandleOAuthErrorResponse(data, accessToken);
            }
        });
    };

    var _deleteMeeting = function (accessToken, meetingId) {
        $("#meetingiddelete-" + meetingId).button('loading');
        $("#meetingidstart-" + meetingId).prop('disabled', true);
        $("#meetingidupdate-" + meetingId).prop('disabled', true);

        $.ajax({
            method: "DELETE",
            url: "https://api.join.me/v1/meetings/" + meetingId,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            success: function () {
                $("#meetingidrow-" + meetingId).remove();

                if ($('#scheduledMeetingsTable > tbody:last-child').children().size() === 0) {
                    $("#scheduledMeetingsTable").addClass("hide");
                    $("#scheduledPanelNoContent").removeClass("hide");
                }
            },
            error: function (data) {
                OAuthHandler.HandleOAuthErrorResponse(data, accessToken);
            }
        });
    };

    return {
        GetScheduledMeetings: _getScheduledMeetings,
        GetScheduledMeeting: _getScheduledMeeting,
        ScheduleMeeting: _scheduleMeeting,
        UpdateMeeting: _updateMeeting,
        DeleteMeeting: _deleteMeeting
    };
}(jQuery, JM.OAuthHandler, JM.TemplateManager));