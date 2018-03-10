using LiteMiner.classes;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SentimentAnalyser.Controllers
{
    public class CommentProcessingController : Controller
    {

        private static List<string> englishComments = new List<string>();


        // GET: CommentProcessing
        public ActionResult Index()
        {
            return View();
        }


        [System.Web.Mvc.HttpPost]
        public JsonResult getComments(List<String> values)
        {
            englishComments.Clear();
            LanguageDetector languageDetector = new LanguageDetector();
            foreach (var comment in values)
            {

                string lanCode = languageDetector.Detect(comment);
                if (languageDetector.GetLanguageNameByCode(lanCode) == "English")
                {
                    englishComments.Add(comment);
                }
            }
            return Json(englishComments, JsonRequestBehavior.AllowGet);
        }

    }
}