$(document).ready(function () {
    $("#proba").click(function (e) {
        var requestedVideoUrl = document.getElementById("videoUrl").value;
        $.ajax({
            dataType: "json",
            type: 'GET',
            url: "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=50&videoId="+ requestedVideoUrl +"&fields=items%2Fsnippet%2FtopLevelComment%2Fsnippet%2FtextOriginal&key=AIzaSyBb1hVnsuI_8HLkANAt7CCPUmBiygPzAnE",
            success: function (result) {
                //arrayLength = in case of a succesfull request a JSON object with 50 comments is returned.
                var arrayLength = result.items.length;
                var myStringArray = [];
                //we loop till there is no element left in the returned object in order to retrieve only the comment.
                for (var i = 0; i < arrayLength; i++)
                {
                    //myStringArray -> an array containing strings/comments
                    myStringArray[i] = (result.items[i].snippet.topLevelComment.snippet.textOriginal);
                }
                
                //We are still in the GET method success callback/now we will send a POST to the mvc controller with the pure text comments
                $.ajax
                    ({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "YoutubeApi/getComments",
                    datatype: "json",
                    data: JSON.stringify(myStringArray),
                    traditional: true,
                    //in case of a succesfull post the data is sent to the controller which returns a json.This json contains the result we need in order 
                    //to render the highchart
                    success: function (result)
                    {
                        sentimentAnalysisData(result); //calling the function which will construct the pie chart
                        $.ajax({
                            //dataType: "json",
                            type: 'GET',
                            url: "NaiveSentiment/commentValues",
                            contentType: "application/json; charset=utf-8",
                            datatype: "json",
                            success: function (result) {
                                $('#naiveComments').append("<ul id='newList'></ul>");
                                var keys = Object.keys(result);
                                for (var i = 0; i < keys.length; i++) {
                                    var key = keys[i];
                                    console.log(result[key]);
                                    if (result[key] == 1)
                                    {
                                        console.log("hereeeeee");
                                        $("<li>" + key + "</li>").appendTo("#newList").addClass("positive");
                                    }
                                    else if (result[key] == -1)
                                    {
                                        $("<li>" + key + "</li>").appendTo("#newList").addClass("negative");
                                    }
                                    else
                                    {
                                        $("<li>" + key + "</li>").appendTo("#newList").addClass("neutral");
                                    }
                                
                                   
                                }
                           
                            },
                            error: function (xmlhttprequest, textstatus, errorthrown) {
                                alert("error: " + errorthrown);
                                
                            }
                        })
                       
                    },
                    error: function (xmlhttprequest, textstatus, errorthrown)
                    {
                        console.log("error: " + errorthrown);
                        console.log(myStringArray);
                    }
                });//end of the post request
                $.ajax
                    ({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "NaiveSentiment/naiveResult",
                        datatype: "json",
                        data: JSON.stringify(myStringArray),
                        traditional: true,
                        //in case of a succesfull post the data is sent to the controller which returns a json.This json contains the result we need in order 
                        //to render the highchart
                        success: function (result) {
                            sentimentNaiveData(result); //calling the function which will construct the pie chart

                        },
                        error: function (xmlhttprequest, textstatus, errorthrown) {
                            console.log("error: " + errorthrown);
                            console.log(myStringArray);
                        }
                    });//end of the post request

            }//end of the GET success callback

        });//end of the ajax function

    });//end of the onClick method
});


//Construction of a pie chart with data returned from the controller
function sentimentAnalysisData(data) {
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
        title:
        {
            text: 'Sentiment Analysis'
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
            error: function (xmlhttprequest, textstatus, errorthrown) {
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
            renderTo: 'highchart1'
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
        title:
        {
            text: 'Sentiment Analysis'
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
