
export enum WarningLevel {
    NORMAL = "Bình thường",
    NEEDS_ATTENTION = "Cần quan tâm",
    INSTABILITY_SIGNS = "Có dấu hiệu bất ổn"
}

export interface AnalysisResult {
    phanTichChung: string;
    mucCanhBao: WarningLevel | string;
    khuyenNghi: string;
}
