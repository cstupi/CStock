CREATE TABLE `Game` (
  `GameId` int(11) NOT NULL AUTO_INCREMENT,
  `GameName` varchar(256) NOT NULL,
  `GamePassword` varchar(256) DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDate` datetime DEFAULT NULL,
  PRIMARY KEY (`GameId`),
  UNIQUE KEY `GameName_UNIQUE` (`GameName`),
  KEY `Game_UserId_FK_idx` (`CreatedBy`),
  CONSTRAINT `Game_UserId_FK` FOREIGN KEY (`CreatedBy`) REFERENCES `User` (`UserId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
