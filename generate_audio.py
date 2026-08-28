import wave
import math
import struct
import os

os.makedirs('assets/audio', exist_ok=True)

sample_rate = 44100
num_channels = 2
sample_width = 2 # 16-bit PCM

# Romantic Piano Chord Progression (Canon in D / Wedding Romance style)
# D - A - Bm - F#m - G - D - G - A
chords = [
    [293.66, 369.99, 440.00, 587.33, 739.99, 880.00], # D
    [220.00, 329.63, 440.00, 554.37, 659.25, 880.00], # A
    [246.94, 293.66, 369.99, 493.88, 587.33, 739.99], # Bm
    [185.00, 277.18, 369.99, 440.00, 554.37, 739.99], # F#m
    [196.00, 293.66, 392.00, 493.88, 587.33, 783.99], # G
    [293.66, 369.99, 440.00, 587.33, 739.99, 880.00], # D
    [196.00, 246.94, 293.66, 392.00, 493.88, 587.33], # G
    [220.00, 277.18, 329.63, 440.00, 554.37, 659.25]  # A
]

total_duration = 32.0 # seconds
samples_total = int(sample_rate * total_duration)
audio_data = [0.0] * samples_total

note_duration = 0.5 # 0.5s per note
chord_duration = note_duration * 8 # 4.0s per chord

def add_piano_note(freq, start_time, duration=3.5, velocity=0.5):
    start_sample = int(start_time * sample_rate)
    num_samples = int(duration * sample_rate)
    for i in range(num_samples):
        idx = start_sample + i
        if idx >= samples_total:
            break
        t = i / sample_rate
        # Acoustic piano envelope (soft strike, lingering decay)
        env = math.exp(-2.8 * t) * (1.0 - math.exp(-80.0 * t))
        # Warm acoustic piano harmonics
        val = 0.65 * math.sin(2 * math.pi * freq * t)
        val += 0.22 * math.sin(2 * math.pi * freq * 2 * t) * math.exp(-1.2 * t)
        val += 0.09 * math.sin(2 * math.pi * freq * 3 * t) * math.exp(-2.2 * t)
        val += 0.04 * math.sin(2 * math.pi * freq * 4 * t) * math.exp(-3.2 * t)
        audio_data[idx] += val * env * velocity

# Generate harmonious arpeggios
for c_idx, chord in enumerate(chords):
    c_start = c_idx * chord_duration
    # Deep warm bass foundation
    add_piano_note(chord[0] / 2.0, c_start, duration=3.8, velocity=0.7)
    # Romantic sparkling melody arpeggios
    pattern = [0, 1, 2, 3, 4, 3, 2, 1]
    for p_idx, note_pos in enumerate(pattern):
        n_start = c_start + p_idx * note_duration
        note_freq = chord[note_pos]
        add_piano_note(note_freq, n_start, duration=2.6, velocity=0.42 + (0.18 if p_idx % 2 == 0 else 0))

# Normalize volume to 0.85
max_val = max(max(abs(x) for x in audio_data), 0.001)
scale = 0.85 / max_val

with wave.open('assets/audio/wedding_music.wav', 'w') as wav_file:
    wav_file.setnchannels(num_channels)
    wav_file.setsampwidth(sample_width)
    wav_file.setframerate(sample_rate)
    frames = bytearray()
    for s in audio_data:
        val = int(s * scale * 32767.0)
        val = max(-32767, min(32767, val))
        frame = struct.pack('<hh', val, val)
        frames.extend(frame)
    wav_file.writeframes(frames)

print("assets/audio/wedding_music.wav created successfully!")
