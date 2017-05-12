CREATE TABLE `Portfolio` (
  `PortfolioId` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `Asset` varchar(256) NOT NULL,
  `Count` double NOT NULL,
  `GameId` int(11) NOT NULL,
  `CostBasis` varchar(45) NOT NULL,
  PRIMARY KEY (`PortfolioId`),
  KEY `Port_Game_FK_idx` (`GameId`),
  KEY `Port_UserId_FK_idx` (`UserId`),
  CONSTRAINT `Port_Game_FK` FOREIGN KEY (`GameId`) REFERENCES `Game` (`GameId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Port_UserId_FK` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
