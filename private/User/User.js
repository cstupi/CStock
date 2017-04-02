
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
User.prototype.GetUser = function(){

}

module.exports = User;