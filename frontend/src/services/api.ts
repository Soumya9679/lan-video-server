const API_BASE_URL = "http://127.0.0.1:8000";

export interface Video {
    id: string;
    title: string;
    filename: string;
    extension: string;
    size_bytes: number;
    size_mb: number;
}

export interface VideoLibraryResponse {
    total: number;
    videos: Video[];
}

export async function getVideos(): Promise<VideoLibraryResponse> {
    const response = await fetch(`${API_BASE_URL}/api/videos`);

    if (!response.ok) {
        throw new Error(`Failed to load videos: HTTP ${response.status}`);
    }

    return response.json() as Promise<VideoLibraryResponse>;
}