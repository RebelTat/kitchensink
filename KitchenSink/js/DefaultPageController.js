var JM = window.JM || {};

JM.DefaultPageController = (function ($) {
    var _validateScheduleFormData = function () {
        if ($("#meetingName").val() === "" || $("#meetingStart").val() === "" || $("#meetingEnd").val() === "") {
            $('#modal-submit-button').prop('disabled', true);
            $('#modal-sched-alert').html('Meeting Name, Meeting Start and Meeting End are all required fields.');
            $('#modal-sched-alert').removeClass('hide');
            return;
        }

        if (moment($("#meetingStart").val()) >= moment($("#meetingEnd").val())) {
            $('#modal-submit-button').prop('disabled', true);
            $('#modal-sched-alert').html('The Meeting Start must occur before Meeting End.');
            $('#modal-sched-alert').removeClass('hide');
            return;
        }

        $('#modal-sched-alert').addClass('hide');
        $('#modal-submit-button').prop('disabled', false);
    };

    var _addScheduleFormData = function (meetingName, startMeetingDateTime, endMeetingDateTime, participants) {
        $('#contentModalBodyContent').append(JM.TemplateManager.GetSchedulerForm(meetingName));

        if (meetingName === "" || $("#meetingStart").val() === "" || $("#meetingEnd").val() === "") {
            $('#modal-submit-button').prop('disabled', true);
        }

        $('#startdatetimepicker').datetimepicker({
            defaultDate: startMeetingDateTime,
            minDate: moment().format()
        });

        $('#meetingName').change(_validateScheduleFormData);
        $('#startdatetimepicker').on('dp.change', _validateScheduleFormData);
        $('#enddatetimepicker').on('dp.change', _validateScheduleFormData);

        $('#enddatetimepicker').datetimepicker({
            defaultDate: endMeetingDateTime,
            minDate: moment().format()
        });

        if (participants) {
            $('#meetingParticipants').val(participants.join(", "));
        }

        _validateScheduleFormData();
    };

    var _init = function (accessToken) {
        JM.EndPoints.User.ProcessUserEndPoint(accessToken);
        JM.EndPoints.ScheduleMeetings.GetScheduledMeetings(accessToken);

        $('#contentModal').on('show.bs.modal', function (event) {
            $("#contentModalBodyContent").empty();
            $("#modal-submit-button").addClass("hide");

            var button = $(event.relatedTarget);
            var recipient = button.data('triggervalue');
            var modal = $(this);

            if (recipient === 'startAdHoc') {
                modal.find('.modal-title').text('Starting ad hoc Meeting');
                JM.EndPoints.StartMeeting.StartAdHocMeeting(accessToken);
            } else if (recipient.length > 15 && recipient.substring(0, 15) === "startScheduled-") {
                modal.find('.modal-title').text('Starting Scheduled Meeting');
                JM.EndPoints.StartMeeting.StartScheduledMeeting(accessToken, recipient.substring(15));
            } else if (recipient === 'scheduleMeeting') {
                $("#modal-submit-button").removeClass("hide");

                modal.find('.modal-title').text('Schedule Meeting');
                _addScheduleFormData("");

                $("#modal-submit-button").unbind("click");
                $("#modal-submit-button").click(function () {
                    $(this).button('loading');
                    $("#modal-close-button").prop('disabled', true);

                    var participantsArr = null;
                    if ($('#meetingParticipants').val() !== "") {
                        participantsArr = $('#meetingParticipants').val().split(',');
                    }

                    JM.EndPoints.ScheduleMeetings.ScheduleMeeting(
                        accessToken,
                        ($("#adHocUsePURLModal").is(':checked')),
                        $("#meetingName").val(),
                        $("#meetingStart").val(),
                        $("#meetingEnd").val(),
                        participantsArr);
                });
            } else if (recipient.length > 16 && recipient.substring(0, 16) === "updateScheduled-") {
                $("#modalProgressBar").removeClass("hide");
                $("#contentModalBodyContent").addClass("hide");
                $("#modal-submit-button").removeClass("hide");
                var meetingId = recipient.substring(16);

                modal.find('.modal-title').text('Update Scheduled Meeting');

                JM.EndPoints.ScheduleMeetings.GetScheduledMeeting(accessToken, meetingId, function (data) {
                    _addScheduleFormData(
                        data.meetingName,
                        data.meetingStart,
                        data.meetingEnd,
                        data.participants
                    );

                    $("#modal-submit-button").unbind("click");

                    $("#modal-submit-button").click(function () {
                        $(this).button('loading');
                        $("#modal-close-button").prop('disabled', true);

                        var participantsArr = null;
                        if ($('#meetingParticipants').val() !== "") {
                            participantsArr = $('#meetingParticipants').val().replace(/ /g, '').split(',');
                        }

                        JM.EndPoints.ScheduleMeetings.UpdateMeeting(
                            accessToken,
                            meetingId,
                            ($("#adHocUsePURLModal").is(':checked')),
                            $("#meetingName").val(),
                            $("#meetingStart").val(),
                            $("#meetingEnd").val(),
                            participantsArr);
                    });

                    $("#modalProgressBar").addClass("hide");
                    $("#contentModalBodyContent").removeClass("hide");
                });
            }
        });    
    };

    return {
        Init: _init
    };
}(jQuery, JM.OAuthHandler, JM.TemplateManager));