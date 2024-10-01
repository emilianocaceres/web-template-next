export interface CaseDTO {
    caseNumber: number;
    validationDate: Date;
    fiscalNumber: string;
    fullName: string;
    analysisDate: Date;
    risk: 'HIGH' | 'MEDIUM' | 'LOW';
}
