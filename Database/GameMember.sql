CREATE TABLE `CStock`.`GameMember` (
  `GameId` INT NOT NULL,
  `UserId` INT NOT NULL,
  INDEX `GameMember_Game_FK_idx` (`GameId` ASC),
  INDEX `GameMember_UserId_FK_idx` (`UserId` ASC),
  CONSTRAINT `GameMember_Game_FK`
    FOREIGN KEY (`GameId`)
    REFERENCES `CStock`.`Game` (`GameId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `GameMember_UserId_FK`
    FOREIGN KEY (`UserId`)
    REFERENCES `CStock`.`User` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
