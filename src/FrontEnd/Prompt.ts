import Gemini from "../Gemini/Gemini";
import { Alert, AlertType_e } from "./Alert";
import Message from "./Message";

class Prompt {
    private static m_firstMessage: boolean = false;
    private static m_hasResponse: boolean = true;
    private static m_previusMsg: string = "";
    public static Init() {
        let _prompt = document.getElementById("prompt-text") as HTMLInputElement;
        _prompt.removeAttribute("disabled");
        _prompt.addEventListener("keydown", async (_event) => {
            _event.stopPropagation();
            if (_event.key === "Enter" && !_event.shiftKey) {
                await this.EventPrompt(_event, _prompt);
            }
            if (_event.key === "ArrowUp") {
                if (this.m_previusMsg != "" && this.m_hasResponse)
                    _prompt.value = this.m_previusMsg;
            }
        });
        _prompt.addEventListener("input", async (_event) => {
            _prompt.style.height = 'auto'; // Resetta l'altezza per calcolare il nuovo valore
            _prompt.style.height = (_prompt.scrollHeight) + 'px'; // Imposta l'altezza in base al contenuto
        });

        let _btnSend = document.getElementById("prompt-send") as HTMLElement;
        _btnSend.addEventListener("click", async (_event) => {
            await this.EventPrompt(_event, _prompt);
        });
    }
    public static async EventPrompt(_event: Event, _prompt: HTMLInputElement) {
        try {
            _event.stopPropagation();
            if (!this.m_firstMessage) {

                this.StartChattingAnimation();
                this.m_firstMessage = true;
            }
            if (this.m_hasResponse) {
                this.m_hasResponse = false;
                await this.SendPrompt(_prompt);
                this.m_hasResponse = true;
            }
        }
        catch (_ex: any) {
            Alert.Init("Gemini API", _ex.message, AlertType_e.error)
        }
    }
    public static async SendPrompt(_prompt: HTMLInputElement) {
        let _msg = _prompt.value;
        if (_msg.length === 0)
            return;
        this.m_previusMsg = _msg;
        _prompt.value = '';
        await Message.CreateMessageUser(_msg);
        let _response = await Gemini.Request(_msg);
        await Message.CreateMessageGemini(_response);
        _prompt.value = '';
    }
    public static StartChattingAnimation() {
        let _container = document.querySelector(".prompt-container") as HTMLElement;
        _container.classList.remove("init");
        _container.classList.add("start");
    }
}
export default Prompt;