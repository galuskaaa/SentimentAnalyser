using SentimentAnalyser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

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
            return Json(new { Result = String.Format("Fist item in list: '{0}'", values[0]) }, JsonRequestBehavior.AllowGet);
        }

    }

}
