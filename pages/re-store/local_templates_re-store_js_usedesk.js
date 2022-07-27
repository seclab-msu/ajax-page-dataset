window.__usedeskWidgetInitedCallback = function() {
    if(!usedesk.token) {
        var token = window.usedeskMessenger.getChatToken();
        $.ajax({
            type: 'POST',
            data: JSON.stringify({ action: 'setTokenForChat', token: token }),
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            url: '/local/classes/vue/rest-vue/user.php',
            success: function (result) { console.log(result) },
            error: function (err) { console.log(err) }
        });

        var ddlUser = usedesk || { };
        window.usedeskMessenger.userIdentify({
            name: ((ddlUser.lastName || '') + ' ' + (ddlUser.firstName || '')).trim(),
            email: ddlUser.email || '',
            phone: ddlUser.phone || '',
            token: token
        });
    }
}

window.__widgetInitCallback = function (widget) {
    var expectedWidget = window.usedeskMessenger;
    var ddlUser = usedesk || {};
    var params = {
        email: ddlUser.email || '',
        phone: ddlUser.phone || '',
        name: ((ddlUser.lastName || '') + ' ' + (ddlUser.firstName || '')).trim()
    };

    if(usedesk.token) { params.token = usedesk.token }
    expectedWidget.identify(params);

    $(document).on('click', '#uw-close-chat-button', function () {
        window.usedeskMessenger.close();
    });
}