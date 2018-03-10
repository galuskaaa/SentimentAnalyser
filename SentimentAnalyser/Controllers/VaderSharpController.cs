using System;
using System.Collections.Generic;
using System.Web.Mvc;
using VaderSharp;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SentimentAnalyser.Helper;

namespace SentimentAnalyser.Controllers
{

    public class VaderSharpController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }


        [System.Web.Mvc.HttpPost]
        public JsonResult getComments(List<String> values)
        {
            VaderAnalysisAction vaderAnalysisAction = new VaderAnalysisAction();
            return Json(vaderAnalysisAction.evaluateCommentSentiment(values), JsonRequestBehavior.AllowGet);
        }


        [System.Web.Mvc.HttpGet]
        public JsonResult vaderCommentValues()
        {
            VaderAnalysisAction vaderAnalysisAction = new VaderAnalysisAction();
            return Json(vaderAnalysisAction.getVaderCommentAndValues(), JsonRequestBehavior.AllowGet);
        }

    }
}


