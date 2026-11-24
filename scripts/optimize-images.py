"""Optimize raw images into responsive 16:10 / 4:5 AVIF and WebP variants strictly < 195 KB."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

RAW_DIR = Path(
    r"C:\Users\user\.gemini\antigravity\brain\9c0b77d5-990e-46f6-9e05-9c16e61c50e6\scratch\raw_images"
)
OUT_DIR = Path(r"d:\startup\Hospitality_hotel\public\images")
MAX_BYTES = 180 * 1024  # Target <= 180 KB, hard fail above 195 KB
HARD_LIMIT_BYTES = 195 * 1024

TARGETS: dict[str, tuple[tuple[int, int], list[int]]] = {
    "hero-palazzo": ((16, 10), [480, 960, 1440]),
    "comparer-daylight": ((16, 10), [480, 960, 1440]),
    "comparer-evening": ((16, 10), [480, 960, 1440]),
    "suite-terrazza": ((16, 10), [480, 960, 1440]),
    "suite-loggia": ((16, 10), [480, 960, 1440]),
    "suite-piano-nobile": ((16, 10), [480, 960, 1440]),
    "suite-cortile": ((16, 10), [480, 960, 1440]),
    "gallery-breakfast": ((4, 5), [480, 960]),
    "gallery-aperitivo": ((4, 5), [480, 960]),
    "gallery-bath": ((4, 5), [480, 960]),
    "gallery-detail": ((4, 5), [480, 960]),
}


def find_source(stem: str) -> Path | None:
    for ext in (".jpg", ".jpeg", ".png", ".webp", ".avif"):
        candidate = RAW_DIR / f"{stem}{ext}"
        if candidate.exists():
            return candidate
    return None


def save_under_budget(
    img: Image.Image, out_path: Path, fmt: str, qualities: list[int]
) -> tuple[int, int]:
    for q in qualities:
        kwargs: dict[str, object] = {"quality": q}
        if fmt == "WEBP":
            kwargs["method"] = 6
        elif fmt == "AVIF":
            kwargs["speed"] = 4
        img.save(out_path, format=fmt, **kwargs)
        size = out_path.stat().st_size
        if size <= MAX_BYTES:
            return size, q
    return out_path.stat().st_size, qualities[-1]


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    if not RAW_DIR.exists():
        print(f"ERROR: Raw image directory not found: {RAW_DIR}", file=sys.stderr)
        return 1

    manifest_rows: list[tuple[str, int, int, str, float, int]] = []
    errors: list[str] = []

    for stem, ((ar_w, ar_h), widths) in TARGETS.items():
        src = find_source(stem)
        if src is None:
            errors.append(f"Missing raw image for {stem}")
            continue

        with Image.open(src) as raw:
            im = ImageOps.exif_transpose(raw).convert("RGB")
            for w in widths:
                target_h = round(w * ar_h / ar_w)
                fitted = ImageOps.fit(
                    im,
                    (w, target_h),
                    method=Image.Resampling.LANCZOS,
                    centering=(0.5, 0.5),
                )

                webp_path = OUT_DIR / f"{stem}-{w}.webp"
                webp_bytes, webp_q = save_under_budget(
                    fitted, webp_path, "WEBP", [82, 76, 70, 64, 56, 48, 40]
                )
                manifest_rows.append(
                    (webp_path.name, w, target_h, "WEBP", webp_bytes / 1024, webp_q)
                )
                if webp_bytes > HARD_LIMIT_BYTES:
                    errors.append(
                        f"{webp_path.name} exceeded 195 KB ({webp_bytes / 1024:.1f} KB)"
                    )

                avif_path = OUT_DIR / f"{stem}-{w}.avif"
                avif_bytes, avif_q = save_under_budget(
                    fitted, avif_path, "AVIF", [66, 58, 50, 44, 38, 32]
                )
                manifest_rows.append(
                    (avif_path.name, w, target_h, "AVIF", avif_bytes / 1024, avif_q)
                )
                if avif_bytes > HARD_LIMIT_BYTES:
                    errors.append(
                        f"{avif_path.name} exceeded 195 KB ({avif_bytes / 1024:.1f} KB)"
                    )

    print(f"{'File':<32} {'Dim':<12} {'Fmt':<6} {'KB':>8} {'Q':>4}")
    print("-" * 68)
    for name, w, h, fmt, kb, q in manifest_rows:
        print(f"{name:<32} {f'{w}x{h}':<12} {fmt:<6} {kb:>8.1f} {q:>4}")

    if errors:
        print("\nERRORS:", file=sys.stderr)
        for err in errors:
            print(f" - {err}", file=sys.stderr)
        return 1

    print(
        f"\nSuccess: {len(manifest_rows)} responsive images generated, all strictly < 195 KB."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
