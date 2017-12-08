using System;
using System.Collections.Generic;
using System.Web.Mvc;
using VaderSharp;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;



namespace SentimentAnalyser.Controllers
{

    public class YoutubeApiController : Controller
    {

        public ActionResult Index()
        {
            return View();
          
        }


        [System.Web.Mvc.HttpPost]
        public JsonResult getComments(List<String> values)
        {

            double positiveScore = 0;
            double negativeScore = 0;
            double neutralScore = 0;
            int commentCount = values.Count;
            SentimentIntensityAnalyzer analyzer = new SentimentIntensityAnalyzer();

            foreach (var comment in values )
            {
                var results = analyzer.PolarityScores(comment);
                positiveScore += results.Positive / commentCount;
                negativeScore += results.Negative / commentCount;
                neutralScore += results.Compound / commentCount;
            }

                var data = new[]
                {
                  new { name = "Positive", y = positiveScore },
                  new { name = "Negative", y = negativeScore },
                  new { name = "Neutral" , y = neutralScore }
                
                };

        
            return Json(data, JsonRequestBehavior.AllowGet);

        }
    }
}


