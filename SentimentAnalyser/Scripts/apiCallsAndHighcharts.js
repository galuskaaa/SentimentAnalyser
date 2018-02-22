/// <reference path="FileSaver.js" />
var myStringArray = [];



$(document).ready(function () {
    $("#proba").click(function (e) {
        var requestedVideoUrl = document.getElementById("videoUrl").value;
        insertYoutubePlayer();
        /**
         * @param {String} url - an URL which targets the youtube API and includes the information that must be retrieved.In this case a list of comments
         * @param {String} requestedVideoUrl - a String which is used as an uniq key of a youtube video.The value is retrieved from the user interface
         * @param {Number} arrayLength - In case of a succesfull request the arrayLength variable will hold the number of comments returned
         * @param {Object} myStringArray - An object which will hold the pure text of the returned comments
         */
        $.ajax({
            dataType: "json",
            type: 'GET',
            url: "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=50&videoId="+ requestedVideoUrl +"&fields=items%2Fsnippet%2FtopLevelComment%2Fsnippet%2FtextOriginal&key=AIzaSyBb1hVnsuI_8HLkANAt7CCPUmBiygPzAnE",
            success: function (result)
            {                
                var arrayLength = result.items.length;  
                for (var i = 0; i < arrayLength; i++)
                {
                    myStringArray[i] = (result.items[i].snippet.topLevelComment.snippet.textOriginal);
                }
                $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "VaderSharp/getComments",
                        datatype: "json",
                        data: JSON.stringify(myStringArray),
                        traditional: true,
                        success: function (result)
                        {
                            sentimentAnalysisData(result);
                            displayVaderComments();
                            
                        },
                        error: function (xmlhttprequest, textstatus, errorthrown)
                        {
                            alert("error: " + errorthrown);
                        }
                });
                $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "NaiveSentiment/naiveResult",
                        datatype: "json",
                        data: JSON.stringify(myStringArray),
                        traditional: true,                    
                        success: function (result)
                        {
                            sentimentNaiveData(result);
                            displayNaiveComments();
                        },
                        error: function (xmlhttprequest, textstatus, errorthrown)
                        {
                            console.log("error: " + errorthrown);
                            console.log(myStringArray);
                        }
                });
                document.getElementById("downloadTextFile").style.visibility = "visible";
            },
            error: function (xmlhttprequest, textstatus, errorthrown)
            {
                console.log("error: " + errorthrown);
                console.log(myStringArray);
            }
        });

    });
});


function displayVaderComments() {
    $.ajax({
        type: 'GET',
        url: "VaderSharp/vaderCommentValues",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (result) {
            $('#newList').remove();
            $('#vaderComments').append("<ul id='newList'></ul>").addClass("list-group");
            var keys = Object.keys(result);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (result[key] == 1) {

                    $("<li>" + key + "</li>").appendTo("#newList").addClass("list-group-item list-group-item-success");
                }
                else if (result[key] == -1) {
                    $("<li>" + key + "</li>").appendTo("#newList").addClass("list-group-item list-group-item-danger");
                }
                else {
                    $("<li>" + key + "</li>").appendTo("#newList").addClass("list-group-item").css("background-color", "lightgray");
                }

            }

        },
        error: function (xmlhttprequest, textstatus, errorthrown) {
            alert("error: " + errorthrown);

        }
    });
}

function displayNaiveComments() {
    $.ajax({
        type: 'GET',
        url: "NaiveSentiment/commentValues",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (result) {
            $('#newNaiveList').remove();
            $('#naiveComments').append("<ul id='newNaiveList'></ul>").addClass("list-group");
            var keys = Object.keys(result);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (result[key] == 1) {

                    $("<li>" + key + "</li>").appendTo("#newNaiveList").addClass("list-group-item list-group-item-success");
                }
                else if (result[key] == -1) {
                    $("<li>" + key + "</li>").appendTo("#newNaiveList").addClass("list-group-item list-group-item-danger");
                }
                else {
                    $("<li>" + key + "</li>").appendTo("#newNaiveList").addClass("list-group-item").css("background-color", "lightgray");
                }
            }
        },
        error: function (xmlhttprequest, textstatus, errorthrown) {
            alert("error: " + errorthrown);
        }
    });
}

//Construction of a pie chart with data returned from the controller
function sentimentAnalysisData(data) {
    var chart = new Highcharts.Chart({
        chart:
        {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            renderTo: 'highchart1'
        },
          exporting: {
      enabled: true,
      type: 'application/pdf'
    },
        credits:
        {
            enabled: false
        },
        title:
        {
            text: 'VaderSharp Analysis'
        },
        tooltip:
        {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series:
            [{
                data: data
            }]

    })
};



//Youtube Api call to get the video Like/Dislike ammount
$(document).ready(function () {
    $("#proba").click(function (e)
    {
        var requestedVideoUrl = document.getElementById("videoUrl").value;
        $.ajax({
            dataType: "json",
            type: 'GET',
            url: "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+ requestedVideoUrl + "&fields=items(statistics(dislikeCount%2ClikeCount))&key=AIzaSyBb1hVnsuI_8HLkANAt7CCPUmBiygPzAnE",
            success: function (result)
            {
                var dislikeCounter = result.items[0].statistics.dislikeCount;
                var likeCounter = result.items[0].statistics.likeCount;
                likeDislikeChart(likeCounter, dislikeCounter);
            },
            error: function (xmlhttprequest, textstatus, errorthrown)
            {
                console.log("error: " + errorthrown);
            }
        });
    });
});



//Construction of a pie chart that display the like/dislike ratio
function likeDislikeChart(likes,dislikes) {
    var chart = new Highcharts.Chart({
        chart:
        {
            
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            renderTo: 'highchart'
        },
        credits:
        {
            enabled: false
        },
        exporting: {
            enabled: true
           
        },
        title: {
            text: 'Like/Dislike ratio'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            colorByPoint: true,
            data: [{
                name: 'Likes',
                y: Number(likes)
            },
            {
                name: 'Dislikes',
                y: Number(dislikes)
                
            }]
        }]
    });
}



function sentimentNaiveData(data) {
    var chart = new Highcharts.Chart({
        chart:
        {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            renderTo: 'highchart3'
        },
        credits:
        {
            enabled: false
        },
        exporting: {
            enabled: true
        },
        title:
        {
            text: ' Naive Analysis'
        },
        tooltip:
        {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions:
        {
          pie:
            {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels:
                    {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style:
                        {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }   
                }
            }
        },
        series:
            [{
                data: data
            }]

    })


};

function saveTextFile()
{   
        filename = document.getElementById("videoUrl").value;
        var formatedText = [];
        for (var i = 0, len = myStringArray.length; i < len; i++)
        {
                formatedText[i] = i + 1 + ":" + myStringArray[i] + "\r\n";
        }
        var blob = new Blob(formatedText, { type: "text/plain;charset=utf-8" });
        saveAs(blob, filename + ".txt");
}

function insertYoutubePlayer()
{
    var divReference = document.getElementById("youtubeVideoBox");
    var parentReference = document.getElementById("youtubeContainer");
    var ifrm = document.createElement('iframe');
    ifrm.width = "853";
    ifrm.height = "480";
    divReference.innerHTML = "";
    ifrm.setAttribute('src',"https://www.youtube.com/embed/" + requestedVideoUrl());
    divReference.appendChild(ifrm);
    parentReference.style.display = "block";
}

function requestedVideoUrl()
{
    var reqdVideoUrl = document.getElementById("videoUrl").value;
    return reqdVideoUrl;
}