using SentimentAnalyser.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace SentimentAnalyser.Helper
{
    public class NaiveAnalysisAction
    {

        private readonly IDictionary<string, int> wordDictionary;
        public IDictionary<string, int> Words { get { return wordDictionary; } }
        public int WordsCount { get { return wordDictionary.Count; } }





        public NaiveAnalysisAction()
        {
            var filePath = @"D:\Licens\SentimentAnalyser\SentimentAnalyser\AFINN-111.txt";
            wordDictionary = new Dictionary<string, int>();
            using (var file = new StreamReader(filePath))
            {
                string line;
                while ((line = file.ReadLine()) != null)
                {
                    var wordStructure = line.Split('\t');
                    wordDictionary.Add(wordStructure[0], int.Parse(wordStructure[1]));
                }
            }
        }


        private static IEnumerable<string> Tokenize(string input)
        {
            input = Regex.Replace(input, "[^a-zA-Z ]+", "");
            input = Regex.Replace(input, @"\s+", " ");
            input = input.ToLower();
            return input.Split(' ');
        }


        public ScoreModel GetScore(string input)
        {
            var score = new ScoreModel { Tokens = Tokenize(input) };

            foreach (var token in score.Tokens)
            {
                if (!wordDictionary.ContainsKey(token)) continue;

                var item = wordDictionary[token];
                score.Words.Add(token);

                if (item > 0) score.Positive.Add(token);
                if (item < 0) score.Negative.Add(token);

                score.Sentiment += item;
            }

            return score;
        }


        public Object[] evaluateNaiveSentiment(List<String> values)
        {
            double positiveScore = 0;
            double negativeScore = 0;
            NaiveAnalysisAction naiveAnalysisAction = new NaiveAnalysisAction();
            foreach (var comment in values)
            {
                var results = naiveAnalysisAction.GetScore(comment);
                if (results.Sentiment > 0) positiveScore += 1;
                if (results.Sentiment < 0) negativeScore += 1;

            }
            var data = new[]
           {
                  new { name = "Positive", y = positiveScore },
                  new { name = "Negative", y = negativeScore }
                  
            };
            return data;
        }
    }
}
