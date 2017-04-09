
function User(UserId, Username, Password, Locked, JoinDate, ConfirmKey, ConfirmDate, DataAccess) {
    this.UserId = UserId;
    this.Username = Username;
    this.Password = Password;
    this.Locked = Locked;
    this.JoinDate = JoinDate;
    this.ConfirmKey = ConfirmKey;
    this.ConfirmDate = ConfirmDate;
    this.DataAccess = DataAccess;
}
User.prototype.GetUser = function(username, callback, datasource){
	if(!datasource)
		return DataAccess.GetUser(username);
	return datasource.GetUser(username);
}
User.prototype.Register = function(datasource){
	if(!datasource)
		return DataAccess.CreateUser(Username, Password);
	return datasource.CreateUser(Username, Password);
}
User.prototype.GetUserById = function(userid, callback, datasource){
	if(!datasource)
		DataAccess.GetUserById(userid, callback);
	else
		datasource.GetUserById(userid, callback);
}

module.exports = User;