using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SentimentAnalyser.Controllers
{
    public class NaiveAnalyserController : Controller
    {
        // GET: NaiveSentimentAnalyser
        public ActionResult Index()
        {
            return View();
        }
    }
}