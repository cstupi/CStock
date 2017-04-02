CREATE TABLE `Transaction` (
  `TransactionId` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `TransactionType` int(11) NOT NULL,
  `Asset` varchar(256) NOT NULL,
  `Count` double NOT NULL,
  `Price` double NOT NULL,
  `Date` date NOT NULL,
  `Status` int(11) NOT NULL,
  `Order` int(11) NOT NULL,
  PRIMARY KEY (`TransactionId`),
  KEY `UserId_PK` (`UserId`),
  KEY `Trans_Type_FK_idx` (`TransactionType`),
  KEY `Trans_Status_FK_idx` (`Status`),
  CONSTRAINT `Trans_Status_FK` FOREIGN KEY (`Status`) REFERENCES `MarketStatus` (`MarketStatusId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Trans_Order_FK` FOREIGN KEY (`Order`) REFERENCES `Order` (`OrderId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Trans_Type_FK` FOREIGN KEY (`TransactionType`) REFERENCES `TransactionType` (`TransactionTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Trans_UserId_FK` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
