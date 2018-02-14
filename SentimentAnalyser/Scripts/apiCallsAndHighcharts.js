$(document).ready(function () {
    $("#proba").click(function (e) {
        var requestedVideoUrl = document.getElementById("videoUrl").value;
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
                var myStringArray = [];
                for (var i = 0; i < arrayLength; i++)
                {
                    //* @param {Object} result - Contains the returned Json from the GET call mentioned above.In order to retrieve
                    // the pure text we have to extract it.
                    myStringArray[i] = (result.items[i].snippet.topLevelComment.snippet.textOriginal);
                }


                //We are still in the "success" callback.After a succesfull GET request and after parsing the comments we are sending
                //a POST request to our controller
                /**
                *@param {Object} myStringArray - It is an Array which containts Strings.These are the actuall youtube comments.
                */
                $.ajax
                    ({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "VaderSharp/getComments",
                    datatype: "json",
                    data: JSON.stringify(myStringArray),
                    traditional: true,
                    /**
                    *@param {Object} result - It contains a Key-Value structure which is returned from the controller.
                    We are using this result in order to build the setnimentAnalysis chart.
                    */
                    success: function (result)
                    {

                        //A function which constructs the highchart.
                        sentimentAnalysisData(result);

                        /*A GET request to retrieve a structure which contains Comment-Value pairs.The value will determinate
                        /if the comment is positive or not.The comment will be added in an unordered list with the representative
                        class attached to it
                        */
                        $.ajax({                     
                            type: 'GET',
                            url: "NaiveSentiment/commentValues",
                            contentType: "application/json; charset=utf-8",
                            datatype: "json",
                            success: function (result) {
                                //$('#naiveComments').append("<h2>Naive Analysis</h2>").css("color","white");
                                $('#naiveComments').append("<ul id='newList'></ul>").addClass("list-group");
                                var keys = Object.keys(result);
                                for (var i = 0; i < keys.length; i++)
                                {
                                    var key = keys[i];
                                    console.log(result[key]);
                                    if (result[key] == 1)
                                    {
                                    
                                        $("<li>" + key + "</li>").appendTo("#newList").addClass("list-group-item list-group-item-success");
                                    }
                                    else if (result[key] == -1)
                                    {
                                        $("<li>" + key + "</li>").appendTo("#newList").addClass("list-group-item list-group-item-danger");
                                    }
                                    else 
                                    {
                                        $("<li>" + key + "</li>").appendTo("#newList").addClass("list-group-item").css("background-color","lightgray");
                                    }
                                
                                   
                                }
                                $.ajax({
                                  
                                    type: 'GET',
                                    url: "VaderSharp/vaderCommentValues",
                                    contentType: "application/json; charset=utf-8",
                                    datatype: "json",
                                    success: function (result) {
                                     //   $('#vaderComments').append("<h2>VaderSharp Analysis</h2>").css("color","white");
                                        $('#vaderComments').append("<ul id='newList'></ul>").addClass("list-group");
                                        var keys = Object.keys(result);
                                        for (var i = 0; i < keys.length; i++)
                                        {
                                            var key = keys[i];
                                            console.log(result[key]);
                                            if (result[key] == 1)
                                            {
                
                                                $("<li>" + key + "</li>").appendTo("#newList").addClass("list-group-item list-group-item-success");
                                            }
                                            else if (result[key] == -1)
                                            {
                                                $("<li>" + key + "</li>").appendTo("#newList").addClass("list-group-item list-group-item-danger");
                                            }
                                            else {
                                                $("<li>" + key + "</li>").appendTo("#newList").addClass("list-group-item").css("background-color","lightgray");
                                            }

                                        }

                                    },
                                    error: function (xmlhttprequest, textstatus, errorthrown) {
                                        alert("error: " + errorthrown);

                                    }
                                })

                           
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
                });
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
                    });
            }

        });

    });
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
