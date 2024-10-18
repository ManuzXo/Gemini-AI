import { marked } from "marked";

class Message{

        public static async CreateMessageUser(_msg : string)
        {
            let _separetor = this.MessageSeparetor();
            _separetor.classList.add("left");
            await this.CreateMessage(_separetor, _msg);
        }
        public static async CreateMessageGemini(_msg: string)
        {
            let _separetor = this.MessageSeparetor();
            await this.CreateMessage(_separetor, _msg);
        }
        private static async CreateMessage(_separetor: HTMLElement, _msg: string)
        {
            let _label = await this.MessageLabel(_msg);
            _separetor.appendChild(_label);
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
        private static async MessageLabel(_msg: string) : Promise<HTMLLabelElement>
        {
            let _label = document.createElement("label") as HTMLLabelElement;
            _label.className = "msg-label";
            _label.innerHTML =  await marked.parse(_msg);
            return _label;
        }
        
        private static GetMSGContainer = ():HTMLElement => document.querySelector(".msg-container") as HTMLElement;
}
export default Message;