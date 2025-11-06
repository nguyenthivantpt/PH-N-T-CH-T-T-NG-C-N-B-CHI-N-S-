
import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import { analyzeSoldierResponse } from '../services/geminiService';
import ResultDisplay from './ResultDisplay';
import LoadingSpinner from './LoadingSpinner';
import { InitialStateIcon } from './Icons';

const IdeologyAnalyzer: React.FC = () => {
    const [responseText, setResponseText] = useState<string>('');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!responseText.trim()) {
            setError("Vui lòng nhập nội dung trả lời của quân nhân.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            const result = await analyzeSoldierResponse(responseText);
            setAnalysisResult(result);
        } catch (err: any) {
            setError(err.message || "Đã xảy ra lỗi không xác định.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleClear = () => {
        setResponseText('');
        setAnalysisResult(null);
        setError(null);
        setIsLoading(false);
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800/50 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700">
                <form onSubmit={handleAnalyze} className="p-6">
                    <label htmlFor="responseText" className="block text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Nội dung trả lời của cán bộ, chiến sĩ
                    </label>
                    <textarea
                        id="responseText"
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="Nhập hoặc dán toàn bộ nội dung trả lời của quân nhân vào đây để bắt đầu phân tích..."
                        rows={10}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out text-sm"
                        disabled={isLoading}
                    />
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClear}
                            disabled={isLoading}
                            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Xoá
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out disabled:bg-sky-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading && <LoadingSpinner />}
                            Phân tích
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-8">
                {error && (
                    <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">
                        <strong className="font-bold">Lỗi! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                {!isLoading && !analysisResult && !error && (
                    <div className="text-center text-slate-500 dark:text-slate-400 p-8 bg-white dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700">
                        <InitialStateIcon />
                        <h3 className="mt-4 text-lg font-medium">Sẵn sàng tiếp nhận dữ liệu</h3>
                        <p className="mt-1 text-sm">Kết quả phân tích sẽ được hiển thị tại đây.</p>
                    </div>
                )}
                
                {isLoading && (
                     <div className="text-center text-slate-500 dark:text-slate-400 p-8 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-center items-center">
                            <svg className="animate-spin h-8 w-8 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <h3 className="mt-4 text-lg font-medium">Đang phân tích...</h3>
                        <p className="mt-1 text-sm">Vui lòng chờ trong giây lát.</p>
                    </div>
                )}

                {analysisResult && <ResultDisplay result={analysisResult} />}
            </div>
        </div>
    );
};

export default IdeologyAnalyzer;
