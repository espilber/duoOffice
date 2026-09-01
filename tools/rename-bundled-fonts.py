#!/usr/bin/env python3
"""Replace inherited product names in duoOffice's modified bundled fonts."""

from pathlib import Path
from tempfile import NamedTemporaryFile
import os

from fontTools.ttLib import TTFont
from fontTools.ttLib.woff2 import WOFF2FlavorData


ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = ROOT / "apps/docs/src/renderer/fonts"


def rename_font(path: Path) -> int:
    font = TTFont(path)
    changed = 0
    for record in font["name"].names:
        value = record.toUnicode()
        renamed = value.replace("GenOffice", "duoOffice")
        if renamed == value:
            continue
        record.string = renamed.encode(record.getEncoding())
        changed += 1

    if not changed:
        return 0

    font.flavor = "woff2"
    font.flavorData = WOFF2FlavorData(transformedTables=())
    with NamedTemporaryFile(dir=path.parent, suffix=".woff2", delete=False) as output:
        temp_path = Path(output.name)
    try:
        font.save(temp_path)
        check = TTFont(temp_path)
        assert all("GenOffice" not in record.toUnicode() for record in check["name"].names)
        os.replace(temp_path, path)
    finally:
        temp_path.unlink(missing_ok=True)
    return changed


def main() -> None:
    total = 0
    for path in sorted(FONT_DIR.glob("duoOffice*.woff2")):
        changed = rename_font(path)
        total += changed
        print(f"{path.name}: {changed} name records changed")
    print(f"Updated {total} name records.")


if __name__ == "__main__":
    main()
