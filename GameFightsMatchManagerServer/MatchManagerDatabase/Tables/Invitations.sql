CREATE TABLE [dbo].[Invitations]
(
	[Fighter] UNIQUEIDENTIFIER NOT NULL , 
    [Match] INT NOT NULL, 
    
    PRIMARY KEY ([Match], [Fighter]),

    CONSTRAINT FK_Invitations_Fighter FOREIGN KEY ([Fighter]) REFERENCES [Fighters]([Id]),
    CONSTRAINT FK_Invitations_Match FOREIGN KEY ([Match]) REFERENCES [Matches](Id)
)