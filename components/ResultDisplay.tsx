
import React from 'react';
import { AnalysisResult, WarningLevel } from '../types';
import { AnalysisIcon, WarningIcon, RecommendationIcon } from './Icons';

interface ResultDisplayProps {
    result: AnalysisResult;
}

const getWarningLevelStyles = (level: WarningLevel | string): string => {
    switch (level) {
        case WarningLevel.NORMAL:
            return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
        case WarningLevel.NEEDS_ATTENTION:
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/40 dark:text-yellow-200";
        case WarningLevel.INSTABILITY_SIGNS:
            return "bg-red-100 text-red-800 dark:bg-red-800/40 dark:text-red-200";
        default:
            return "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";
    }
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    return (
        <div className="bg-white dark:bg-slate-800/50 shadow-lg rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in">
             <div className="p-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">BÁO CÁO PHÂN TÍCH TƯ TƯỞNG</h2>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 p-6 space-y-6">
                
                {/* Phân tích chung */}
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <AnalysisIcon />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-1">1. Phân tích chung</h3>
                        <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap text-justify leading-relaxed">
                            {result.phanTichChung}
                        </p>
                    </div>
                </div>

                {/* Mức cảnh báo */}
                <div className="flex items-start space-x-4">
                     <div className="flex-shrink-0">
                        <WarningIcon />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">2. Mức cảnh báo</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getWarningLevelStyles(result.mucCanhBao)}`}>
                            {result.mucCanhBao}
                        </span>
                    </div>
                </div>

                {/* Khuyến nghị */}
                 <div className="flex items-start space-x-4">
                     <div className="flex-shrink-0">
                        <RecommendationIcon />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-1">3. Khuyến nghị</h3>
                        <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap text-justify leading-relaxed">
                            {result.khuyenNghi}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultDisplay;
