from pathlib import Path
from typing import Any

VIDEO_EXTENSIONS = {
    ".mp4",
    ".mkv",
    ".avi",
    ".mov",
    ".webm",
    ".m4v",
    ".mpeg",
    ".mpg",
    ".wmv",
    ".3gp",
}

VIDEO_DIRECTORY = Path(__file__).resolve().parent / "Videos"


def scan_videos() -> list[dict[str, Any]]:
    """Discover video files inside the configured video directory."""

    VIDEO_DIRECTORY.mkdir(parents=True, exist_ok=True)

    videos = []

    for file_path in VIDEO_DIRECTORY.rglob("*"):
        if not file_path.is_file():
            continue

        if file_path.suffix.lower() not in VIDEO_EXTENSIONS:
            continue

        try:
            file_size = file_path.stat().st_size

            videos.append(
                {
                    "id": file_path.relative_to(
                        VIDEO_DIRECTORY
                    ).as_posix(),
                    "title": file_path.stem,
                    "filename": file_path.name,
                    "extension": file_path.suffix.lower(),
                    "size_bytes": file_size,
                    "size_mb": round(file_size / (1024 * 1024), 2),
                }
            )

        except OSError:
            # Ignore files that cannot be accessed.
            continue

    return sorted(
        videos,
        key=lambda video: video["title"].lower(),
    )