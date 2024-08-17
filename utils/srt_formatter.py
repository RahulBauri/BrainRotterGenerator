import re
import sys

def is_valid_timestamp(timestamp):
    """Check if a timestamp is valid in the SRT format."""
    return re.match(r'\d{2}:\d{2}:\d{2},\d{3}', timestamp) is not None

def escape_special_characters(text):
    """Escape special characters for FFmpeg drawtext compatibility."""
    return text.replace("'", r"\'").replace(":", r'\:')

def correct_srt_format(input_srt_path, output_srt_path):
    with open(input_srt_path, 'r', encoding='utf-8') as infile, open(output_srt_path, 'w', encoding='utf-8') as outfile:
        sequence_number = 1
        subtitle_block = []
        
        for line in infile:
            line = line.strip()
            if re.match(r'^\d+$', line):
                if subtitle_block:
                    write_block(subtitle_block, sequence_number, outfile)
                    sequence_number += 1
                    subtitle_block = []
                subtitle_block.append(line)
                
            elif '-->' in line:
                subtitle_block.append(line)
                
            elif line:
                subtitle_block.append(escape_special_characters(line))
        
        if subtitle_block:
            write_block(subtitle_block, sequence_number, outfile)
    
    print(f"Formatted SRT file saved to: {output_srt_path}")

def write_block(block, sequence_number, outfile):
    outfile.write(f"{sequence_number}\n")
    
    for line in block[1:]:
        if '-->' in line:
            outfile.write(f"{line}\n")
        else:
            outfile.write(f"{line}\n")
    
    outfile.write("\n")

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python srt_formatter.py <input_srt_path> <output_srt_path>")
        sys.exit(1)
    input_srt_path = sys.argv[1]
    output_srt_path = sys.argv[2]
    correct_srt_format(input_srt_path, output_srt_path)
