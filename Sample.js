class UniqueInt {
    constructor() {
        this.seen = new Array(2047).fill(false);  // Boolean array for integers from -1023 to 1023
        this.minInt = -1023;
    }

    processFile(inputText) {
        this.resetSeenArray();
        const uniqueNumbers = this.readUniqueIntegers(inputText);
        const sortedUniqueNumbers = this.sortUniqueNumbers(uniqueNumbers);
        return sortedUniqueNumbers.join('\n');
    }

    resetSeenArray() {
        this.seen.fill(false);
    }

    readUniqueIntegers(inputText) {
        const lines = inputText.split('\n');
        const uniqueNumbers = [];
        lines.forEach(line => {
            const strippedLine = line.trim();
            if (strippedLine) {
                if (this.isValidIntegerLine(strippedLine)) {
                    const number = parseInt(strippedLine, 10);
                    if (number >= -1023 && number <= 1023) {  // Ensure the number is within range
                        if (!this.seen[number - this.minInt]) {
                            this.seen[number - this.minInt] = true;
                            uniqueNumbers.push(number);
                        }
                    } else {                                      // This will occur when the integer entered is not in the range given
                        console.log(`Number out of range: ${number}`);
                    }
                } else {
                    console.log(`Invalid integer line: ${strippedLine}`);
                }
            }
        });
        return uniqueNumbers;
    }

    isValidIntegerLine(line) {
        return !isNaN(line);
    }

    sortUniqueNumbers(numbers) {
        // Implementing Bubble Sort for simplicity
        let n = numbers.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (numbers[j] > numbers[j + 1]) {
                    [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
                }
            }
        }
        return numbers;
    }
}

function processFile() {
    const fileInput = document.getElementById('fileInput');
    const outputArea = document.getElementById('output');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file first');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        const uniqueIntProcessor = new UniqueInt();
        const result = uniqueIntProcessor.processFile(fileContent);
        outputArea.value = result;
    };

    reader.readAsText(file);
}
