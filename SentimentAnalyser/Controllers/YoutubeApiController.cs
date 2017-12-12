﻿using System;
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

    public class YoutubeApiController : Controller
    {

        public ActionResult Index()
        {
            return View();
          
        }


        [System.Web.Mvc.HttpPost]
        public JsonResult getComments(List<String> values)
        {

            CommentAnalysisAction commentAnalysisAction = new CommentAnalysisAction();
            return Json(commentAnalysisAction.evaluateCommentSentiment(values), JsonRequestBehavior.AllowGet);

        }
    }
}


