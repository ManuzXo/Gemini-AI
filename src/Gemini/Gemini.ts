import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

class Gemini{
    public static m_generativeAI : GoogleGenerativeAI;
    public static m_model: GenerativeModel;
    
    public static Init(){
        const _urlParams = new URLSearchParams(window.location.search);
        let _token = _urlParams.get('t');
        console.log(_token);
        if(_token == null)
        {
            alert("Gemini token Mancate. Nell'url digitare ?t=<token>");
            location.reload();
        }
        this.m_generativeAI = new GoogleGenerativeAI(_token as string);
        this.m_model = this.m_generativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    public static async Request(_msg : string) : Promise<string>
    {
        var _response = await this.m_model.generateContent(_msg);
        return _response.response.text();
    }
}
export default Gemini;