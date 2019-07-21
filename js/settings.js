function saveDataOnChromeStorage() {
    var settings = {
        tags: $('#tags').val(),
        ignore_tags: $('#ignore_tags').val(),
        minimum_reputation: $('#minimum_reputation').val(),
        refresh_interval: $('#refresh_interval').val(),
        desktop_notifications: $('#desktop_notifications').prop('checked'),
        snooze_alert: $('#snooze_alert').val()
    };
    chrome.storage.sync.set({settings: settings});
    return settings;
}

function saveDataOnLocalStorage(settings) {
    localStorage.tags = settings.tags;
    localStorage.ignore_tags = settings.ignore_tags;
    localStorage.minimum_reputation = settings.minimum_reputation;
    localStorage.desktop_notifications = settings.desktop_notifications;
    localStorage.snooze_alert = settings.snooze_alert;
}

$(document).ready(function () {
    chrome.storage.sync.get('settings', function (data) {
        var settings = data.settings;
        if (settings && settings.tags) {
            $('#tags').val(settings.tags);
            $('#ignore_tags').val(settings.ignore_tags);
            $('#minimum_reputation').val(settings.minimum_reputation);
            $('#refresh_interval').val(settings.refresh_interval);
            $('#desktop_notifications').prop('checked', settings.desktop_notifications);
            if (settings.desktop_notifications !== undefined) {
                localStorage.desktop_notifications = settings.desktop_notifications;
            } else {
                localStorage.desktop_notifications = true;
            }
            $('#snooze_alert option[value=' + settings.snooze_alert + ']').attr('selected', 'selected');

            localStorage.refresh_interval = settings.refresh_interval;
            localStorage.tags = settings.tags;
            localStorage.ignore_tags = settings.ignore_tags;
            localStorage.minimum_reputation = settings.minimum_reputation;
            localStorage.snooze_alert = settings.snooze_alert;
        } else {
            localStorage.tags = '';
            localStorage.ignore_tags = '';
            localStorage.desktop_notifications = false;
            localStorage.minimum_reputation = 0;
            localStorage.refresh_interval = 0;
        }

        $('#tags').val(localStorage.tags);
        $('#ignore_tags').val(localStorage.ignore_tags);
        $('#refresh_interval').val(localStorage.refresh_interval);
        $('#desktop_notifications').prop('checked', localStorage.desktop_notifications);
        $('#minimum_reputation').val(localStorage.minimum_reputation);
        $('#snooze_alert').val(localStorage.snooze_alert);

    });

    $("#save").on("click", function () {
        var chrome_storage_saved_settings = saveDataOnChromeStorage();
        saveDataOnLocalStorage(chrome_storage_saved_settings);

        $(".closebtn").parent().css('visibility', 'visible');
    });

    // alert close
    $(".closebtn").on("click", function () {
        $(this).parent().css('visibility', 'hidden');
    });
});