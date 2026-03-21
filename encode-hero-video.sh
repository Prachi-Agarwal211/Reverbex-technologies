#!/bin/bash
# encode-hero-video.sh
# Optimized hero video encoding script
# Generates WebM (VP9), MP4 (H.264), and poster image

set -e

INPUT="public/hero-video-source.mp4"
OUTPUT_WEBM="public/hero-video.webm"
OUTPUT_MP4="public/hero-video.mp4"
OUTPUT_POSTER="public/hero-poster.jpg"

echo "🎬 Encoding hero video..."

# Check if input file exists
if [ ! -f "$INPUT" ]; then
    echo "❌ Error: Input file $INPUT not found!"
    echo "Please place your source video at $INPUT"
    exit 1
fi

# Create WebM (VP9 + Opus) - Best for Chrome/Firefox
echo "📦 Encoding WebM (VP9)..."
ffmpeg -i "$INPUT" \
    -c:v libvpx-vp9 \
    -b:v 1.5M \
    -c:a libopus \
    -b:a 128k \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -y "$OUTPUT_WEBM"

# Create MP4 (H.264 + AAC) - Safari fallback
echo "📦 Encoding MP4 (H.264)..."
ffmpeg -i "$INPUT" \
    -c:v libx264 \
    -b:v 2M \
    -profile:v high \
    -level 4.0 \
    -c:a aac \
    -b:a 128k \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -y "$OUTPUT_MP4"

# Extract poster frame (at 1 second mark)
echo "🖼️  Extracting poster image..."
ffmpeg -i "$INPUT" \
    -ss 00:00:01 \
    -vframes 1 \
    -vf "scale=1920:1080" \
    -q:v 2 \
    -y "$OUTPUT_POSTER"

echo "✅ Encoding complete!"
echo "   - WebM: $OUTPUT_WEBM ($(du -h "$OUTPUT_WEBM" | cut -f1))"
echo "   - MP4: $OUTPUT_MP4 ($(du -h "$OUTPUT_MP4" | cut -f1))"
echo "   - Poster: $OUTPUT_POSTER ($(du -h "$OUTPUT_POSTER" | cut -f1))"
