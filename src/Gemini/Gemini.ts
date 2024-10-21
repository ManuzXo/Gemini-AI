import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import Alert from "../FrontEnd/Alert";

class Gemini {
    public static m_generativeAI: GoogleGenerativeAI;
    public static m_model: GenerativeModel;

    public static Init() : boolean {
        const _urlParams = new URLSearchParams(window.location.search);
        let _token = _urlParams.get('t');
        if (_token == null) {
            Alert.Init("API TOKEN", 'Manca il token per gemini, nell\'url inserire ?t=< token ><br>Per avere il token visitare <a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank">api-token</a>');
            return false;
        }
        this.m_generativeAI = new GoogleGenerativeAI(_token as string);
        this.m_model = this.m_generativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        return true;
    }
    public static async Request(_msg: string): Promise<string> {
        var _response = await this.m_model.generateContent(_msg);
        return _response.response.text();
    }
}
export default Gemini;