using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using VaderSharp;

namespace SentimentAnalyser.Helper
{
    public class CommentAnalysisAction
    {
        public  CommentAnalysisAction()
        {

        }


        public Object[] evaluateCommentSentiment(List<String> values)
        {
            
            double positiveScore = 0;
            double negativeScore = 0;
            double neutralScore = 0;
            int commentCount = values.Count;
            SentimentIntensityAnalyzer analyzer = new SentimentIntensityAnalyzer();

            foreach (var comment in values)
            {

               
                var results = analyzer.PolarityScores(comment);
                if (results.Compound > 0)
                {
                    positiveScore += 1;
                }
                else if (results.Compound == 0)
                {
                    neutralScore += 1;
                }
                else
                {
                    negativeScore += 1;
                }
                
            }

            var data = new[]
            {
                  new { name = "Positive", y = positiveScore },
                  new { name = "Negative", y = negativeScore },
                  new { name = "Neutral",  y = neutralScore}

            };

            return data;
        }



    }



}