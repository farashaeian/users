export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}
export interface ApiResponse {
    data: User[];
    page: number;
    total_pages: number;
}
export interface UserInfo {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    onClick?: () => void;
}
export interface Message {
    text: string;
    type: 'error' | 'info';
}