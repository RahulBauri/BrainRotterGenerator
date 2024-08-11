import re
import sys

def adjust_srt(input_srt_path, output_srt_path):
    def split_sentences(text):
        # Split the text into sentences based on common punctuation
        return re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s', text.strip())

    def parse_time(time_str):
        """Parse SRT time format into seconds"""
        h, m, s = time_str.split(':')
        s, ms = s.split(',')
        return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000

    def format_time(seconds):
        """Format seconds into SRT time format"""
        h = int(seconds // 3600)
        m = int((seconds % 3600) // 60)
        s = int(seconds % 60)
        ms = int((seconds - int(seconds)) * 1000)
        return f"{h:02}:{m:02}:{s:02},{ms:03}"

    with open(input_srt_path, 'r') as file:
        lines = file.readlines()

    adjusted_lines = []
    index = 0
    subtitle_index = 1

    while index < len(lines):
        # Read the subtitle index
        if lines[index].strip().isdigit():
            # Skip the old index number
            index += 1
            continue

        # Read the start and end time
        times = lines[index].strip()
        index += 1
        if re.match(r'\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}', times):
            start_time, end_time = times.split(' --> ')
            
            # Read the subtitle text
            subtitle_text = lines[index].strip()
            index += 1
            
            if subtitle_text:
                sentences = split_sentences(subtitle_text)
                segment_duration = (parse_time(end_time) - parse_time(start_time)) / len(sentences)
                
                sentence_start_time = parse_time(start_time)
                
                for sentence in sentences:
                    sentence_end_time = sentence_start_time + segment_duration
                    adjusted_lines.append(f"{subtitle_index}\n")
                    adjusted_lines.append(f"{format_time(sentence_start_time)} --> {format_time(sentence_end_time)}\n")
                    adjusted_lines.append(f"{sentence}\n\n")
                    
                    sentence_start_time = sentence_end_time
                    subtitle_index += 1

            # Skip empty lines
            while index < len(lines) and not lines[index].strip():
                index += 1

    with open(output_srt_path, 'w') as file:
        file.writelines(adjusted_lines)

    print(f"Adjusted SRT file saved to: {output_srt_path}")

# Ensure script is run with command-line arguments
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python adjust_srt.py <input_srt_path> <output_srt_path>")
        sys.exit(1)

    input_srt_path = sys.argv[1]
    output_srt_path = sys.argv[2]

    adjust_srt(input_srt_path, output_srt_path)
