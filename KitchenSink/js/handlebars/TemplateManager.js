var JM = window.JM || {};

JM.TemplateManager = (function ($) {
    "use strict";

    //Templates
    var _schedulerFormTemplate;
    var _meetingRowTemplate;

    var _getDateTimePicker = function () {
        var rawTemplate = '<div class="modal-div">'
            + '<label>{{label}}</label>'
            + '<div class="modal-form input-group date" id="{{datepickerId}}">'
            + '<input id="{{inputId}}" type="text" class="form-control" />'
            + '<span class="input-group-addon">'
            + '<span class="glyphicon glyphicon-calendar"></span>'
            + '</span></div></div>';
        Handlebars.registerPartial('datePicker', rawTemplate);
    };

    var _getSchedulerForm = function(meetingName) {
        if (!_schedulerFormTemplate) {
            _getDateTimePicker();
            var rawTemplate = '<div class="modal-div"><label>Meeting Name</label><input id="meetingName" type="text" class="modal-form form-control" value="{{meetingName}}"/></div>'
                + '{{> datePicker label= "Meeting Start" inputId = "meetingStart" datepickerId = "startdatetimepicker"}}'
                + '{{> datePicker label= "Meeting End" inputId = "meetingEnd" datepickerId = "enddatetimepicker"}}'
                + '<div class="modal-div participants"><label>Participants (enter comma delimited list of emails)</label><textarea rows="5" id="meetingParticipants" class="modal-form form-control"></textarea></div>'
                + '<div class="modal-div checkbox"><label><input id="adHocUsePURLModal" type="checkbox">Use Personal URL?</label></div>'
                + '<div id="modal-sched-alert" class="alert alert-danger hide" role="alert">Error goes here</div>';
            _schedulerFormTemplate = Handlebars.compile(rawTemplate);
        }

        return $(_schedulerFormTemplate({ "meetingName": meetingName }));
    };

    var _getMeetingRow = function (data) {
        if (!_meetingRowTemplate) {
            var rawTemplate = '<tr id="meetingidrow-{{meetingId}}">'
                + '<td class="sched-meeting-name">{{meetingName}}</td>'
                + '<td class="sched-meeting-start">{{meetingStart}}</td>'
                + '<td class="sched-meeting-end">{{meetingEnd}}</td>'
                + '<td><button id="meetingidstart-{{meetingId}}" class="btn btn-primary" data-toggle="modal" data-target="#contentModal" data-triggervalue="startScheduled-{{meetingId}}">Start</button></td>'
                + '<td><button id="meetingidupdate-{{meetingId}}" class="btn btn-primary" data-toggle="modal" data-target="#contentModal" data-triggervalue="updateScheduled-{{meetingId}}">Update</button></td>'
                + '<td><button id="meetingiddelete-{{meetingId}}" class="btn btn-primary" data-loading-text="Deleting..." onclick="JM.EndPoints.ScheduleMeetings.DeleteMeeting(\'{{meetingId}}\');">Delete</button></td>'
                + '</tr>';
            _meetingRowTemplate = Handlebars.compile(rawTemplate);
        }

        return $(_meetingRowTemplate(data));
    };

    return {
        GetSchedulerForm: _getSchedulerForm,
        GetMeetingRow: _getMeetingRow
    };
}(jQuery));