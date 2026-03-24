#!/usr/bin/env bash
set -euo pipefail

# ----------------------------
# Config
# ----------------------------
SOURCE_DIR="/Users/ianapplebaum/Library/Mobile Documents/com~apple~Keynote/Documents/4398-Capstone"
DEST_PDF_DIR="/Users/ianapplebaum/Documents/projects-in-computer-science/documentation/static/slides"
DEST_HTML_DIR="/Users/ianapplebaum/Documents/projects-in-computer-science/documentation/static/slides-html"

usage() {
  cat <<'EOF'
Usage: ./scripts/export-keynote.sh [--changed-only] [--dry-run]

Options:
  --changed-only  Export only files whose outputs are missing/outdated
  --dry-run       Print planned actions without writing files
  -h, --help      Show this help
EOF
}

# Modes
CHANGED_ONLY=false
DRY_RUN=false

for arg in "$@"; do
  case "$arg" in
    --changed-only)
      CHANGED_ONLY=true
      ;;
    --dry-run)
      DRY_RUN=true
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $arg" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "Source directory does not exist: $SOURCE_DIR" >&2
  exit 1
fi

# Temp staging (so rsync --delete stays safe/correct)
TMP_ROOT="$(mktemp -d)"
TMP_PDF_DIR="$TMP_ROOT/pdf"
TMP_HTML_DIR="$TMP_ROOT/html"
mkdir -p "$TMP_PDF_DIR" "$TMP_HTML_DIR"

cleanup() { rm -rf "$TMP_ROOT"; }
trap cleanup EXIT

mtime() { stat -f %m "$1" 2>/dev/null || echo 0; }

echo "Source: $SOURCE_DIR"
echo "PDF out: $DEST_PDF_DIR"
echo "HTML out: $DEST_HTML_DIR"
echo "Mode: $([[ "$CHANGED_ONLY" == true ]] && echo "changed-only" || echo "full")"
echo "Dry run: $DRY_RUN"
echo

found_any=false

while IFS= read -r -d '' file; do
  found_any=true

  rel_path="${file#$SOURCE_DIR/}"
  rel_dir="$(dirname "$rel_path")"
  base_name="$(basename "$file" .key)"
  [[ "$rel_dir" == "." ]] && rel_dir=""

  tmp_pdf_parent="$TMP_PDF_DIR/$rel_dir"
  tmp_html_parent="$TMP_HTML_DIR/$rel_dir"
  tmp_pdf="$tmp_pdf_parent/$base_name.pdf"
  tmp_html="$tmp_html_parent/$base_name"

  final_pdf="$DEST_PDF_DIR/$rel_dir/$base_name.pdf"
  final_html="$DEST_HTML_DIR/$rel_dir/$base_name"
  final_html_index="$final_html/index.html"

  mkdir -p "$tmp_pdf_parent" "$tmp_html_parent"

  should_export=true
  if [[ "$CHANGED_ONLY" == true ]]; then
    src_m="$(mtime "$file")"
    pdf_m=0
    html_m=0
    [[ -f "$final_pdf" ]] && pdf_m="$(mtime "$final_pdf")"
    [[ -f "$final_html_index" ]] && html_m="$(mtime "$final_html_index")"

    # Unchanged only if both outputs exist and are newer/equal.
    if [[ -f "$final_pdf" && -f "$final_html_index" && "$pdf_m" -ge "$src_m" && "$html_m" -ge "$src_m" ]]; then
      should_export=false
    fi
  fi

  if [[ "$should_export" == true ]]; then
    if [[ "$DRY_RUN" == true ]]; then
      echo "Would export: $rel_path"
      continue
    fi

    echo "Exporting: $rel_path"
    rm -f "$tmp_pdf"
    rm -rf "$tmp_html"

    osascript - "$file" "$tmp_pdf" "$tmp_html" <<'APPLESCRIPT'
on run argv
  set srcPath to item 1 of argv
  set pdfPath to item 2 of argv
  set htmlPath to item 3 of argv

  tell application "Keynote"
    set theDoc to open POSIX file srcPath
    export theDoc to POSIX file pdfPath as PDF
    export theDoc to POSIX file htmlPath as HTML
    close theDoc saving no
  end tell
end run
APPLESCRIPT
  else
    if [[ "$DRY_RUN" == true ]]; then
      echo "Would skip (unchanged): $rel_path"
      continue
    fi

    echo "Skipping (unchanged): $rel_path"

    # Preserve unchanged files in staging, so final --delete does not remove them.
    if [[ -f "$final_pdf" ]]; then
      cp -f "$final_pdf" "$tmp_pdf"
    fi
    if [[ -d "$final_html" ]]; then
      mkdir -p "$tmp_html"
      rsync -a "$final_html"/ "$tmp_html"/
    fi
  fi
done < <(find "$SOURCE_DIR" -type f -name "*.key" -print0)

if [[ "$found_any" == false ]]; then
  echo "No .key files found."
  exit 0
fi

if [[ "$DRY_RUN" == true ]]; then
  echo
  echo "Dry run complete. No files were written."
  exit 0
fi

echo
echo "Syncing PDFs..."
mkdir -p "$DEST_PDF_DIR"
rsync -a --delete "$TMP_PDF_DIR"/ "$DEST_PDF_DIR"/

echo "Syncing HTML..."
mkdir -p "$DEST_HTML_DIR"
rsync -a --delete "$TMP_HTML_DIR"/ "$DEST_HTML_DIR"/

echo "Generating manifest..."
node "$(dirname "$0")/generate-slides-manifest.js"

echo "Done."


