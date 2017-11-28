

//Comment visszaterites/1
/*$(document).ready(function () {
    $("#proba").click(function (e) {
        $.ajax({
            dataType: "json",
            type: 'GET',
            url: "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=50&videoId=lyZQPjUT5B4&fields=items%2Fsnippet%2FtopLevelComment%2Fsnippet%2FtextOriginal&key=AIzaSyBb1hVnsuI_8HLkANAt7CCPUmBiygPzAnE",
            success: function (result) {
           
                console.log(result);
                var arrayLength = result.items.length;
                var myStringArray=[];
                for (var i = 0; i < arrayLength; i++)
                {
                    myStringArray[i] = (result.items[i].snippet.topLevelComment.snippet.textOriginal);
                    console.log(result.items[i].snippet.topLevelComment.snippet.textOriginal);
                }
                    
               
            }
           
        });
     
    });
});

*/


//Comment visszaterites/1
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
                   console.log(result.items[i].snippet.topLevelComment.snippet.textOriginal);
                }
                
                console.log(typeof (myStringArray));
                
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "YoutubeApi/getComments",
                    datatype: "json",
                    data: JSON.stringify(myStringArray),
                   
                    traditional: true,
                    success: function (result) {

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








