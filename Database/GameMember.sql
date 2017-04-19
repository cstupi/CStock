CREATE TABLE `GameMember` (
  `GameId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `JoinDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `GameMember_Game_FK_idx` (`GameId`),
  KEY `GameMember_UserId_FK_idx` (`UserId`),
  CONSTRAINT `GameMember_Game_FK` FOREIGN KEY (`GameId`) REFERENCES `Game` (`GameId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `GameMember_UserId_FK` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
