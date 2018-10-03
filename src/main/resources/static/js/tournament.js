$(function () {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $(document).ajaxSend(function (e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
});

function postMatchInfo(matchID, data, cb) {
    $.ajax("/m/" + matchID, {
        type: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    }).done(cb);
}

function getMatchInfo(matchID, cb) {
   $.ajax("/m/" + matchID, {
       type: "GET",
       dataType: "json"
   }).done(function (data) {
        cb({
            name1: data.data.name1,
            name2: data.data.name2,
            score1: data.data.score1,
            score2: data.data.score2
        });
   });
}

function updateMatch(matchId) {
    getMatchInfo(matchId, function (matchInfo) {
        var ariaControlsMatch = "[aria-controls='" + matchId + "']";
        var spanScore1 = $(ariaControlsMatch + ' .score1');
        var spanScore2 = $(ariaControlsMatch + ' .score2');
        spanScore1.text(matchInfo.score1);
        spanScore2.text(matchInfo.score2);
    });
}

$(".changeScoreButton").click(function () {
    var matchID = $(this).parent().parent().parent().attr("aria-controls");
    $("#pointsModal").attr("data-matchID", matchID);
    getMatchInfo(matchID, function (matchInfo) {
        $("#modalNameTeam1").text(matchInfo.name1);
        $("#modalNameTeam2").text(matchInfo.name2);
        $("#score1Input").val(matchInfo.score1);
        $("#score2Input").val(matchInfo.score2);
        // open modal
        $("#pointsModal").modal('show');
    });
});

$(".startGameButton").click(function () {
    var matchID = $(this).parent().parent().attr("aria-controls");
    var matchInfo = {
        "live": true,
        "score1": 0,
        "score2": 0
    };
    postMatchInfo(matchID, matchInfo, function () {updateMatch(matchID)});
});

$("#submitScoreButton").click(function () {
    var matchID = $("#pointsModal").attr("data-matchID");
    var matchInfo = {
        "live": ($("#isLiveInput").is(":checked")),
        "score1": $("#score1Input").val(),
        "score2": $("#score2Input").val()
    };
    postMatchInfo(matchID, matchInfo, function () {
        updateMatch(matchID);
        $('#pointsModal').modal('hide');
    });
});



