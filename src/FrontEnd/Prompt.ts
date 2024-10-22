import Gemini from "../Gemini/Gemini";
import DeviceDetection from "../Utils/DeviceDetection";
import { Alert, AlertType_e } from "./Alert";
import Message from "./Message";

class Prompt {
    private static m_firstMessage: boolean = false;
    private static m_hasResponse: boolean = true;
    private static m_previusMsg: string = "";
    public static Init() {
        let _prompt = document.getElementById("prompt-text") as HTMLInputElement;
        _prompt.removeAttribute("disabled");

        if (DeviceDetection.isDesktopDevice()) {
            _prompt.addEventListener("keydown", async (_event) => {
                _event.stopPropagation();
                if (_event.key === "Enter" && !_event.shiftKey) {
                    _event.preventDefault();
                    // if(!DeviceDetection.isDesktopDevice())
                    //      _prompt.blur();
                    await this.EventPrompt(_event, _prompt);
                }
                if (_event.key === "ArrowUp") {
                    //ripristina il messaggio se il box è vuoto, se ce stato un vecchio messaggio e che gemini abbia risposto
                    if (_prompt.value === '' && this.m_previusMsg != "" && this.m_hasResponse) {
                        _prompt.value = this.m_previusMsg;
                        _event.preventDefault();
                    }
                }
            });
        }
        //aggiorna il text area        
        _prompt.addEventListener("input", async (_event) => {
            _prompt.style.height = 'auto';
            _prompt.style.height = (_prompt.scrollHeight) + 'px';
        });

        //call back del pulsante invio
        let _btnSend = document.getElementById("prompt-send") as HTMLElement;
        _btnSend.addEventListener("click", async (_event) => {
            _event.stopPropagation();
            await this.EventPrompt(_event, _prompt);
        });
    }
    public static async EventPrompt(_event: Event, _prompt: HTMLInputElement) {
        try {
            if (this.m_hasResponse) {

                this.m_hasResponse = false;

                let _msg = _prompt.value;
                //se il msg che invia ha del contenuto lo manda senno skippa
                if (_msg.length != 0) {
                    //clear del textarea
                    _prompt.value = '';

                    //se è il primo messaggio porta il prompt sotto
                    if (!this.m_firstMessage) {
                        this.StartChattingAnimation();
                        this.m_firstMessage = true;
                    }
                    //salva il messaggio inviato per la funzione ArrowUp
                    this.m_previusMsg = _msg;

                    //invia a gemini il messagio
                    await this.SendPrompt(_msg);
                }
                this.m_hasResponse = true;
            }
        }
        catch (_ex: any) {
            Alert.Init("Gemini API", _ex.message, AlertType_e.error)
        }
    }
    public static async SendPrompt(_msg: string) {

        await Message.CreateMessageUser(_msg);
        let _response = await Gemini.Request(_msg);
        await Message.CreateMessageGemini(_response);
    }
    public static StartChattingAnimation() {
        let _container = document.querySelector(".prompt-container") as HTMLElement;
        _container.classList.remove("init");
        _container.classList.add("start");
    }
}
export default Prompt;