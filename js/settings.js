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