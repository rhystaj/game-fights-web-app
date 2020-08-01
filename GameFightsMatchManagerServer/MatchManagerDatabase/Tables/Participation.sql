CREATE TABLE [dbo].[Participation]
(
	[Fighter] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY, -- Fighters can only participate in one match at a time.
    [Match] INT NOT NULL

	CONSTRAINT FK_Participation_Fighter FOREIGN KEY ([Fighter]) REFERENCES [Fighters]([Id]),
	CONSTRAINT FK_Participation_Match FOREIGN KEY ([Match]) REFERENCES [Matches](Id)

)
