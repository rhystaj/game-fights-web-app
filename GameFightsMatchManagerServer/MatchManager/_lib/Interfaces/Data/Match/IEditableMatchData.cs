namespace MatchManager
{

    public interface IEditableMatchData : IMatchData
    {

        new string Title { get; set; }

        new IMatchDates Dates { get; set; }

    }

}
