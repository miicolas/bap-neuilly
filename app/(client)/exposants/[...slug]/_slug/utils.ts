const MINIO_BASE_URL = "https://minio-bap-neuilly.nicolas-becharat.com/bap-neuilly";

export const getMinioUrl = (path: string | null) =>
    path ? `${MINIO_BASE_URL}/${path}` : null; 