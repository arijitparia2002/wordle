import re
import os

def process_text(input_filename, output_filename):
    with open(input_filename, 'r') as input_file:
        content = input_file.read()

        # Use regular expression to extract words containing only alphabets
        words = re.findall(r'\b[a-zA-Z]+\b', content)

        # Filter words with length 6
        five_letter_words = list(set([word.lower() for word in words if len(word) == 5]))

    with open(output_filename, 'w') as output_file:
        # Write each 6-letter word on a new line in the output file
        output_file.write('\n'.join(five_letter_words))

if __name__ == '__main__':
    # Read wordbank directory, and process each file and write to same filename.txt, ignoring .gitkeep file
    print('Processing...')
    for filename in os.listdir('wordbank'):
        if filename != '.gitkeep':
            process_text('wordbank/' + filename, 'output/' + filename)
    print('Done!')