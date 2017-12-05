


//Comment lekerese,success eseten POST a controllerhez.
/*$(document).ready(function () {
    $("#proba").click(function (e) {
        $.ajax({
            dataType: "json",
            type: 'GET',
            url: "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=50&videoId=lyZQPjUT5B4&fields=items%2Fsnippet%2FtopLevelComment%2Fsnippet%2FtextOriginal&key=AIzaSyBb1hVnsuI_8HLkANAt7CCPUmBiygPzAnE",
            success: function (result)
            {
                var arrayLength = result.items.length;
                var myStringArray = [];
                for (var i = 0; i < arrayLength; i++)
                {
                    myStringArray[i] = (result.items[i].snippet.topLevelComment.snippet.textOriginal);
                }
                
                
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "YoutubeApi/getComments",
                    datatype: "json",
                    data: JSON.stringify(myStringArray),
                    traditional: true,
                    success: function (result)
                    {

                        alert("SUCCESS = " + result.d);
                    },
                    error: function (xmlhttprequest, textstatus, errorthrown)
                    {
                        alert(" conection to the server failed ");
                        console.log("error: " + errorthrown);
                        console.log(myStringArray);
                    }
                });


            }

        });

    });
});
*/

//HighChart felepitese.A sikeres POST kuldes eseten,a controllerben megjelenik egy Lista amely tartalmazza a commenteket,majd az erzelemtesztelo
//kiertekeli ezeket es egy JSON objektumot kuld vissza.Ha ez sikeres,akkor felepitem a Highchartot a visszakuldott adatbol.

function sentimentAnalysisData(data)
    //$(document).ready(function ()
{
    var chart = new Highcharts.Chart({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            renderTo: 'highchart'
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Sentiment Analysis'
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
            data: data
        }]
           
        //});
    })
};

$(document).ready(function () {
    $("#proba").click(function (e) {
        $.ajax({
            dataType: "json",
            type: 'GET',
            url: "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=50&videoId=lyZQPjUT5B4&fields=items%2Fsnippet%2FtopLevelComment%2Fsnippet%2FtextOriginal&key=AIzaSyBb1hVnsuI_8HLkANAt7CCPUmBiygPzAnE",
            success: function (result) {
                var arrayLength = result.items.length;
                var myStringArray = [];
                for (var i = 0; i < arrayLength; i++) {
                    myStringArray[i] = (result.items[i].snippet.topLevelComment.snippet.textOriginal);
                }


                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "YoutubeApi/getComments",
                    datatype: "json",
                    data: JSON.stringify(myStringArray),
                    traditional: true,
                    success: function (result) {
                        sentimentAnalysisData(result);
                        alert("SUCCESS = " + result.d);
                    },
                    error: function (xmlhttprequest, textstatus, errorthrown) {
                        alert(" conection to the server failed ");
                        console.log("error: " + errorthrown);
                        console.log(myStringArray);
                    }
                });


            }

        });

    });
});






