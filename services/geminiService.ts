
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT, QUESTION_CONTEXT } from "../constants";
import type { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        phanTichChung: {
            type: Type.STRING,
            description: 'Tóm tắt nội dung trả lời, đánh giá tâm lý, tinh thần, nhận thức, thái độ.',
        },
        mucCanhBao: {
            type: Type.STRING,
            description: 'Chọn 1 trong 3 mức: "Bình thường", "Cần quan tâm", "Có dấu hiệu bất ổn".',
            enum: ["Bình thường", "Cần quan tâm", "Có dấu hiệu bất ổn"]
        },
        khuyenNghi: {
            type: Type.STRING,
            description: 'Nêu biện pháp, hướng xử lý, hoặc định hướng tư tưởng phù hợp.',
        },
    },
    required: ['phanTichChung', 'mucCanhBao', 'khuyenNghi'],
};

export async function analyzeSoldierResponse(responseText: string): Promise<AnalysisResult> {
    try {
        const fullPrompt = `${QUESTION_CONTEXT}\n\nDưới đây là tổng hợp câu trả lời của quân nhân:\n\n---\n${responseText}\n---\n\nHãy tiến hành phân tích và trả về kết quả.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.3,
            },
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        return result as AnalysisResult;

    } catch (error) {
        console.error("Lỗi khi gọi Gemini API:", error);
        throw new Error("Không thể phân tích. Vui lòng kiểm tra lại thông tin và thử lại sau.");
    }
}
