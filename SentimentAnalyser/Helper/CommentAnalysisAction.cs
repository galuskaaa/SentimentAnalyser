using System;
using System.Collections.Generic;
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

            return data;
        }



    }



}