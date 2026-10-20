from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="LAN Video Server",
    description="A personal media streaming server.",
    version="2.0.0",
)

# Development configuration.
# We will tighten this when we configure production networking.
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