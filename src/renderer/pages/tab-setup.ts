export interface TabSetup<T> {
    pageCode: PageCode,
    title: string,
    id: string,
    content: T,
}

export type PageCode = 'settings' | 'endpoints' | 'scenarios';

export function makeTabSetup<T>(
    pageCode: PageCode,
    title: string,
    id: string,
    content: T): TabSetup<T> {
    return {
        pageCode,
        title,
        id,
        content,
    };
}
