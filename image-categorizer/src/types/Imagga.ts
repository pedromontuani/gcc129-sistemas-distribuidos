export interface ImaggaResponse {
    result: unknown,
    status: {
        text: string,
        type: string,
    }
}

export interface TagsResponse extends ImaggaResponse {
    result: {
        tags: Array<{
            confidence: number,
            tag: {
                en: string,
            }
        }>,
    }
}

export interface CategoriesResponse extends ImaggaResponse {
    result: {
        categories: Array<{
            confidence: number,
            name: {
                en: string,
            }
        }>
    }
}

export interface CategorizersResponse extends ImaggaResponse {
    result: {
        categorizers: Array<{
            id: string,
            labels: string[],
            title: string,
        }>
    }
}
