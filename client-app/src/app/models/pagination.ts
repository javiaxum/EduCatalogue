export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    data: T;
    pagination: Pagination;

    constructor(data: T, pagination: Pagination) {
        this.data = data;
        this.pagination = pagination;
    }
}

export class InstitutionsPagingParams {
    pageNumber;
    pageSize;

    constructor(pageNumber = 1, pageSize = 7) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}
export class ReviewsPagingParams {
    pageNumber;
    pageSize;

    constructor(pageNumber = 1, pageSize = 7) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}

export class SpecialtiesPagingParams {
    pageNumber;
    pageSize;

    constructor(pageNumber = 1, pageSize = 6) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}

export class Pagination implements Pagination {
    constructor(init?: Pagination) {
        Object.assign(this, init);
    }
}
