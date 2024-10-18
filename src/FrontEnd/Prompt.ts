import Gemini from "../Gemini/Gemini";
import Message from "./Message";

class Prompt {
    private static m_response: boolean = true;
    public static Init() {
        let _prompt = document.getElementById("prompt-text") as HTMLInputElement;
        _prompt.addEventListener("keydown", async (_event) => {
            _event.stopPropagation();
            if (_event.key === "Enter" && !_event.shiftKey) {
                await this.EventPrompt(_event, _prompt); 
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
        _event.stopPropagation();
        if (this.m_response) {
            this.m_response = false;
            await this.SendPrompt(_prompt);
            this.m_response = true;
        }
    }
    public static async SendPrompt(_prompt: HTMLInputElement) {
        let _msg = _prompt.value;
        if (_msg.length === 0)
            return;
        _prompt.value = '';
        Message.CreateMessageUser(_msg);
        let _response = await Gemini.Request(_msg);
        Message.CreateMessageGemini(_response);
        _prompt.value = '';
    }
}
export default Prompt;