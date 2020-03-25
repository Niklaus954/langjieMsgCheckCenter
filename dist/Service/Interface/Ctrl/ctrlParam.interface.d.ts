export interface CreateCtrlI {
    english_name: string;
    chinese_name: string;
    is_virtual: boolean;
}
export interface UpdateCtrlI {
    english_name?: string;
    chinese_name?: string;
    is_virtual?: boolean;
}
