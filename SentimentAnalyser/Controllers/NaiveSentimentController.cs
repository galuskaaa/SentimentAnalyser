using SentimentAnalyser.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SentimentAnalyser.Controllers
{
    public class NaiveSentimentController : Controller
    {
        // GET: NaiveSentiment
        public ActionResult Index()
        {
            return View();
        }

        [System.Web.Mvc.HttpPost]
        public JsonResult naiveResult(List<String> values)
        {

            NaiveAnalysisAction naiveAnalysisAction = new NaiveAnalysisAction();
            return Json(naiveAnalysisAction.evaluateNaiveSentiment(values), JsonRequestBehavior.AllowGet);

        }
    }
}