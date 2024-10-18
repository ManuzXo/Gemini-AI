import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

class Gemini{
    public static readonly API_KEY = "AIzaSyAEhCH3rKMQ_RH_cHthwZCg0AVwMNJ2gR4";
    public static m_generativeAI : GoogleGenerativeAI;
    public static m_model: GenerativeModel;
    
    public static Init(){
        this.m_generativeAI = new GoogleGenerativeAI(this.API_KEY);
        this.m_model = this.m_generativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    public static async Request(_msg : string) : Promise<string>
    {
        var _response = await this.m_model.generateContent(_msg);
        return _response.response.text();
    }
}
export default Gemini;