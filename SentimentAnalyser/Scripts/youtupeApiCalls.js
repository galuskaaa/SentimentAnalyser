

//Comment visszaterites/1
$(document).ready(function () {
    $("#proba").click(function (e) {
        $.ajax({
            dataType: "json",
            type: 'GET',
            url: "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=5&videoId=lyZQPjUT5B4&fields=items%2Fsnippet%2FtopLevelComment%2Fsnippet%2FtextOriginal&key=AIzaSyBb1hVnsuI_8HLkANAt7CCPUmBiygPzAnE",
            success: function (result) {
                /*data = result;
                $('.data').text(data);*/
               
                console.log(result);
            }
           
        });
     
    });
});




