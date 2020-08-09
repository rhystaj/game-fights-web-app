using System;

namespace MatchManager
{
    public struct Question : IQuestion
    {

        public long Id { get; }

        public string Text { get; }

        public Question(long id, string text)
        {
            Id = id;
            Text = text;
        }

        public override bool Equals(object obj)
        {
            return obj is Question question &&
                   Id == question.Id &&
                   Text == question.Text;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Text);
        }
    }

}
