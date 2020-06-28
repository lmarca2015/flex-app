export interface Movie {

    popularity?: number;
    vote_count?: number;
    video?: boolean;
    poster_path?: string;
    id?: number;
    adult?: boolean;
    backdrop_path?: any;
    original_language?: string;
    genre_ids?: any;
    title?: string;
    vote_average?: number;
    overview?: string;
    release_date?: string;

    page?: number;
    total_results?: number;
    total_pages?: number;
}


export interface InfoMovie {

    page?: number;
    total_results?: number;
    total_pages?: number;
    results?: Movie[];
}