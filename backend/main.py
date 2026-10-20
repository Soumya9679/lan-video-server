from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from video_library import scan_videos

app = FastAPI(
    title="LAN Video Server",
    description="A personal media streaming server.",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT"],
    allow_headers=["Content-Type"],
)


@app.get("/")
def root():
    return {
        "message": "Welcome to LAN Video Server 2.0!",
        "status": "running",
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "application": "LAN Video Server",
        "version": "2.0.0",
    }


@app.get("/api/videos")
def get_videos():
    videos = scan_videos()

    return {
        "total": len(videos),
        "videos": videos,
    }