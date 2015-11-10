<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="KitchenSink.Default" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>join.me API Kitchen Sink</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/joinme-bootstrap-theme.css" rel="stylesheet">
    <link href="css/bootstrap-datetimepicker.css" rel="stylesheet">
    <link href="css/kitchensink.css" rel="stylesheet">
  </head>
  <body>
      <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand">join.me - API Kitchen Sink</a>
            </div>
        </div>
      </nav>
    
    <div id="oauth-needed" style="display:none">
        <div class="container">
            <div class="oauth-needed-description lead">Welcome to the join.me api kitchen sink application!</div>
            <div class="oauth-needed-description lead">This application has been built to help familiarize our developer community with the functionality of the join.me api.  To get started, simply grant OAuth access by clicking the button below.  This access will be kept for 24 hours, at which point you will be prompted to do so again.  You can always revoke access later at <a href="https://join.me">join.me</a>.</div>
            <div class="oauth-needed-description lead">For more details, please visit <a href="https://developer.join.me/">https://developer.join.me</a>. Enjoy!</div>
            <div><a id="oauthbutton" class="btn btn-primary btn-lg" href="javascript:void(0);" role="button">Allow join.me OAuth Access</a></div>
        </div>
    </div>

    <div id="oauth" style="display:none">
        <div class="row">
            <div class="col-md-6">
                <div id="userPanel" class="panel panel-default">
                    <div id="userName" class="panel-heading">User Information</div>
                    <div class="panel-body">
                        <div id="userProgressBar">
                            <div class="progress panel-progress">
                                <div class="progress-bar panel-progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width: 90%;">
                                    Retrieving User Information...
                                </div>
                            </div>
                        </div>
                        
                        <div id="userPanelContent" class="hide">
                            <div class="row">
                                <div class="col-xs-6">Email:</div>
                                <div id="email" class="col-xs-6"></div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">Language:</div>
                                <div id="language" class="col-xs-6"></div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">Personal Url:</div>
                                <div id="personalUrl" class="col-xs-6"></div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">Registration Date:</div>
                                <div id="registrationDate" class="col-xs-6"></div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">Subscription Type:</div>
                                <div id="subscriptionType" class="col-xs-6"></div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">Number of Meetings Hosted:</div>
                                <div id="numberOfMeetingsHosted" class="col-xs-6"></div>
                            </div>
                            <div id="confSettingsRow" class="row conf-settings">
                                <div class="col-xs-4">Conference Settings:</div>
                                <div id="conferenceSettings" class="col-xs-8">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-xs-6">Conference ID:</div>
                                                <div id="conferenceId" class="col-xs-6"></div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-6">Conference Call Numbers URL:</div>
                                                <div id="conferenceCallNumbersUrl" class="col-xs-6"></div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-6">Organizer Code:</div>
                                                <div id="organizerCode" class="col-xs-6"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div id="startPanel" class="panel panel-default ">
                    <div class="panel-heading">Start Ad Hoc Meeting</div>
                    <div id="startAdHocButtonContainer">
                        <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#contentModal" data-triggervalue="startAdHoc">Start ad hoc Meeting</button>
                        <div class="checkbox">
                            <label>
                                <input id="adHocUsePURL" type="checkbox">Use Personal URL
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div id="scheduledMeetingsPanel" class="panel panel-default">
                    <div class="panel-heading">Scheduled Meetings</div>
                    <div class="panel-body">
                        <div id="scheduledProgressBar">
                            <div class="progress panel-progress">
                                <div class="progress-bar panel-progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width: 90%;">
                                    Retrieving Scheduled Meeting Information...
                                </div>
                            </div>
                        </div>
                    
                        <div id="scheduledPanelContent" class="hide">
                            <button type="button" class="schedule-button btn btn-primary btn-lg" data-toggle="modal" data-target="#contentModal" data-triggervalue="scheduleMeeting">Schedule</button>
                            <table id="scheduledMeetingsTable" class="table">
                                <thead>
                                    <tr>
                                        <th>Meeting Name</th>
                                        <th>Meeting Start</th>
                                        <th>Meeting End</th>
                                        <th>Start Meeting</th>
                                        <th>UpdateMeeting</th>
                                        <th>Delete Meeting</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>

                        <div id="scheduledPanelNoContent" class="hide">
                            There are no meetings currently scheduled...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="contentModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                </div>
                <div id="contentModalBody" class="kitchen-sink-modal modal-body">
                    <div id="modalProgressBar" class="hide">
                        <div class="progress panel-progress">
                            <div class="progress-bar panel-progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="width: 90%;">
                                Retrieving Meeting Information...
                            </div>
                        </div>
                    </div>
                    <div id="contentModalBodyContent">
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="modal-close-button" type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                    <button id="modal-submit-button" data-loading-text="Processing..." type="button" class="btn btn-primary hide" autocomplete="off">Submit</button>
                </div>
            </div>
        </div>
    </div>
      
    <script src="js/hello/hello.all.min.js"></script>
    <script src="js/handlebars/handlebars-v3.0.3.js"></script>
    <script src="js/json2/json2.js"></script>
    <script src="js/jquery/jquery.min.1.11.2.js"></script>
    <script src="js/momentjs/moment.js"></script>
    <script src="js/bootstrap/bootstrap.min.js"></script>
    <script src="js/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js"></script>
      
    <script src="js/handlebars/TemplateManager.js"></script>
    <script src="js/joinmeendpoints/OAuthHandler.js"></script>
    <script src="js/joinmeendpoints/User.js"></script>
    <script src="js/joinmeendpoints/StartMeeting.js"></script>
    <script src="js/joinmeendpoints/ScheduleMeetings.js"></script>
    <script src="js/DefaultPageController.js"></script>
      
      <script>
          $(function () {
              hello.init({
                  joinme: '<%= this.APIKey %>'
              },
              {
                  scope: 'user_info,scheduler,start_meeting',
                  force: false
              });

              var joinme = hello("joinme");

              function login() {
                  joinme.login().then(function () {
                      // Success
                      $("#oauth-needed").hide();
                      $("#oauth").show();
                      JM.OAuthHandler.Init('<%= this.APIKey %>');
                      JM.DefaultPageController.Init();
                  }, function () {
                      // Fail
                      $("#oauth").hide();
                      $("#oauth-needed").show();
                  });
              }

              var session = joinme.getAuthResponse();
              var currentTime = (new Date()).getTime() / 1000;

              if (session && session.access_token && session.expires > currentTime) {
                  // Already has a valid token, perform login
                  login();
              } else {
                  $("#oauth-needed").show();
              }

              $('#oauthbutton').on('click', login);
          });
      </script>
  </body>
</html>