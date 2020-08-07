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

    }

}
