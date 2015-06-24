var JM = window.JM || {};

JM.OAuthHandler = (function ($) {
    "use strict";

    var _apiKey;

    var _init = function (apiKey) {
        _apiKey = apiKey;
    }

    var _handleOAuthErrorResponse = function (response, accessToken) {
        var errorResponse = JSON.parse(response.responseText);

        if (response.status === 401 && errorResponse && errorResponse.ErrorCode === "stale_token") {
            top.location.href = "https://secure.join.me/api/public/v1/auth/renewauthorization?client_id=" + _apiKey + "&access_token=" + accessToken;
        } else {
            $.ajax({
                type: "DELETE",
                url: 'oauth/v1/Cookie',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function () {
                    top.location.href = "/";
                }
            });
        }
    };

    return {
        Init: _init,
        HandleOAuthErrorResponse: _handleOAuthErrorResponse
    };
}(jQuery));