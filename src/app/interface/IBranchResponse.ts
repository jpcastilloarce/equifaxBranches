export interface IBranchResponse {
    latitude: string;
    longitude: string;
    data : IBranchResponseData
}

export interface IBranchResponseData {
    name: string;
    address: string;
}
