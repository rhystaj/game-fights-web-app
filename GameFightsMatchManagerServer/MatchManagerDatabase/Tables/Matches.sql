CREATE TABLE [dbo].[Matches]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1, 1), 
    [Title] NCHAR(100) NOT NULL, 
    [MatchDate] DATETIME NULL, 
    [AnswersOpenDate] DATETIME NULL, 
    [AnswersCloseDate] DATETIME NULL, 
    [Judge] UNIQUEIDENTIFIER NOT NULL

    CONSTRAINT FK_Invitations_Judge FOREIGN KEY ([Judge]) REFERENCES [Fighters](Id)
)
