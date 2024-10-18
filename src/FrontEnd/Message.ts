class Message{

        public static CreateMessageUser(_msg : string)
        {
            let _separetor = this.MessageSeparetor();
            _separetor.classList.add("left");
            this.CreateMessage(_separetor, _msg);
        }
        public static CreateMessageGemini(_msg: string)
        {
            let _separetor = this.MessageSeparetor();
            this.CreateMessage(_separetor, _msg);
        }
        private static CreateMessage(_separetor: HTMLElement, _msg: string)
        {
            _separetor.appendChild(this.MessageLabel(_msg));
            this.GetMSGContainer().appendChild(_separetor);
            _separetor.scrollIntoView({
                behavior: 'smooth', // Scorrimento animato
                block: 'start',    // Centra l'elemento verticalmente
                inline: 'start'    // Centra l'elemento orizzontalmente (opzionale)
            });
        }
        private static MessageSeparetor(): HTMLElement{
            let _separetor = document.createElement("div");
            _separetor.className = "msg-separetor";
            return _separetor;
        }
        private static MessageLabel(_msg: string) : HTMLLabelElement
        {
            let _label = document.createElement("label") as HTMLLabelElement;
            _label.className = "msg-label";
            _label.innerHTML = _msg;
            return _label;
        }
        private static GetMSGContainer = ():HTMLElement => document.querySelector(".msg-container") as HTMLElement;
}
export default Message;