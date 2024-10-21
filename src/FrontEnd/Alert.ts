import exp from "constants";

enum AlertType_e {
    info,
    error
}
class Alert {
    public static Init(_title: string, _msg: string, _type: AlertType_e = AlertType_e.info) {
        let _container = this.AlertContainer();
        if (_container.firstElementChild)
            _container.removeChild(_container.firstElementChild);

        let _alert = document.createElement("div");
        _alert.className = "alert";
        if (_type == AlertType_e.error)
            _alert.style.backgroundColor = "rgb(202 80 80)";

        let _titleDOM = document.createElement("div");
        _titleDOM.className = "alert-title";
        _titleDOM.innerHTML = _title;

        let _msgAlert = document.createElement("div");
        _msgAlert.className = "alert-msg";
        _msgAlert.innerHTML = _msg;
        _container.appendChild(_alert);

        _alert.appendChild(_titleDOM);
        _alert.appendChild(_msgAlert);
    }
    public static AlertContainer = (): HTMLElement => document.getElementById("alert-container") as HTMLElement;
}
export { Alert, AlertType_e };