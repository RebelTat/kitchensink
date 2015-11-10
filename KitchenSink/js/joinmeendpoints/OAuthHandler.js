var JM = window.JM || {};

JM.OAuthHandler = (function (hello) {
    "use strict";

    var _apiKey;

    var _init = function (apiKey) {
        _apiKey = apiKey;
    }

    var _handleOAuthErrorResponse = function (response) {
        var session = hello('joinme').getAuthResponse();

        if (session && session.access_token) {
            var _errorResponse = JSON.parse(response.responseText);

            if (response.status === 401 && _errorResponse && _errorResponse.ErrorCode === "stale_token") {
                top.location.href = "https://secure.join.me/api/public/v1/auth/renewauthorization?client_id=" + _apiKey + "&access_token=" + session.access_token;
                return;
            }
        }

        top.location.href = "/";
    };

    return {
        Init: _init,
        HandleOAuthErrorResponse: _handleOAuthErrorResponse
    };
}(hello));