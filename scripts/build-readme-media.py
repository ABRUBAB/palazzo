"""Generate animated GIF previews and mobile showcase WebP for README.md."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(r"d:\startup\Hospitality_hotel")
DOCS = ROOT / "docs"
DOCS.mkdir(parents=True, exist_ok=True)

SHOTS_DIR = Path(
    r"C:\Users\user\.gemini\antigravity\brain\84a28abd-1ed3-4b3e-8b57-4a738d0d8221\browser_sandbox\screenshots"
)

TOUR_FILES = [
    "step_5_shot_1_desktop_hero.png",
    "step_103_shot_2_final_desktop_explorer_f02.png",
    "step_35_shot_2_desktop_comparer.png",
    "step_46_shot_1_desktop_calculator.png",
    "step_48_shot_1_desktop_gallery_loc.png",
    "step_67_shot_1_desktop_reservation_confirmed.png",
]


def build_day_evening_gif() -> None:
    day = Image.open(ROOT / "public/images/comparer-daylight-960.webp").convert("RGB")
    eve = Image.open(ROOT / "public/images/comparer-evening-960.webp").convert("RGB")

    w, h = 704, 440
    day = day.resize((w, h), Image.Resampling.LANCZOS)
    eve = eve.resize((w, h), Image.Resampling.LANCZOS)

    # Smooth cosine sweep from left -> right -> left
    import math

    steps = 24
    positions = [0.5 - 0.38 * math.cos(2 * math.pi * i / steps) for i in range(steps)]

    frames: list[Image.Image] = []
    font = ImageFont.load_default()

    for pos in positions:
        split_x = int(w * pos)
        frame = eve.copy()
        left_crop = day.crop((0, 0, split_x, h))
        frame.paste(left_crop, (0, 0))

        draw = ImageDraw.Draw(frame, "RGBA")
        # Brushed brass vertical line & handle
        draw.line([(split_x, 0), (split_x, h)], fill=(217, 184, 126, 255), width=3)
        cy = h // 2
        draw.ellipse(
            [(split_x - 20, cy - 20), (split_x + 20, cy + 20)],
            fill=(217, 184, 126, 255),
            outline=(250, 247, 242, 255),
            width=2,
        )
        draw.text((split_x - 7, cy - 6), "<>", fill=(26, 23, 21, 255), font=font)

        # Corner labels
        draw.rounded_rectangle([(16, 16), (174, 44)], radius=10, fill=(20, 22, 19, 190))
        draw.text((28, 24), "08:30 Morning Sun", fill=(247, 243, 236, 255), font=font)

        draw.rounded_rectangle([(w - 182, 16), (w - 16, 44)], radius=10, fill=(20, 22, 19, 190))
        draw.text((w - 170, 24), "21:00 Evening Calm", fill=(217, 184, 126, 255), font=font)

        frames.append(frame.convert("P", palette=Image.Palette.ADAPTIVE, colors=160))

    out = DOCS / "day-evening-loop.gif"
    frames[0].save(
        out,
        save_all=True,
        append_images=frames[1:],
        duration=85,
        loop=0,
        optimize=True,
    )
    print(f"day-evening-loop.gif: {out.stat().st_size / 1024:.1f} KB")


def build_preview_tour_gif() -> None:
    w, h = 704, 440
    slides = [
        Image.open(SHOTS_DIR / name).convert("RGB").resize((w, h), Image.Resampling.LANCZOS)
        for name in TOUR_FILES
    ]

    frames: list[Image.Image] = []
    durations: list[int] = []

    for i, slide in enumerate(slides):
        nxt = slides[(i + 1) % len(slides)]
        # Hold main slide crisp
        frames.append(slide.convert("P", palette=Image.Palette.ADAPTIVE, colors=192))
        durations.append(1600)

        # Smooth 3-step crossfade
        for alpha in (0.28, 0.56, 0.84):
            blended = Image.blend(slide, nxt, alpha)
            frames.append(blended.convert("P", palette=Image.Palette.ADAPTIVE, colors=160))
            durations.append(75)

    out = DOCS / "preview-tour.gif"
    frames[0].save(
        out,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        optimize=True,
    )
    print(f"preview-tour.gif: {out.stat().st_size / 1024:.1f} KB")


def build_mobile_composite() -> None:
    m1 = Image.open(SHOTS_DIR / "step_97_shot_1_verify_mobile_360_hero.png").convert("RGB")
    m2 = Image.open(SHOTS_DIR / "step_78_shot_1_mobile_360_explorer.png").convert("RGB")

    # Clean 360x720 phone aspect panels inside a 920x780 cypress canvas
    pw, ph = 330, 710
    m1 = m1.resize((pw, ph), Image.Resampling.LANCZOS)
    m2 = m2.resize((pw, ph), Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (920, 790), (31, 48, 40))
    draw = ImageDraw.Draw(canvas)
    # Brass framing bezels
    for idx, (x0, img) in enumerate([(85, m1), (505, m2)]):
        y0 = 40
        draw.rounded_rectangle(
            [(x0 - 8, y0 - 8), (x0 + pw + 8, y0 + ph + 8)],
            radius=24,
            fill=(20, 22, 19),
            outline=(184, 147, 90),
            width=2,
        )
        canvas.paste(img, (x0, y0))

    out = DOCS / "mobile-preview.webp"
    canvas.save(out, format="WEBP", quality=82, method=6)
    print(f"mobile-preview.webp: {out.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    build_day_evening_gif()
    build_preview_tour_gif()
    build_mobile_composite()
