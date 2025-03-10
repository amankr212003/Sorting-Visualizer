# Sorting Visualizer

This project is an interactive web application for visual demonstration of various sorting algorithms. It helps you understand how sorting algorithms work.

## Features

- **Multiple Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort.
- **Visual Representation**: Watch how different algorithms sort the array in real-time.
- **Element Display**: Shows the actual values below each bar.
- **Array Size Range**: Set the array size from 5 to 20 elements.
- **Dynamic Sizing**: Container and bars adjust automatically based on the array size.
- **Speed Control**: Five speed levels - Extremely Slow, Slow, Medium, Fast, and Extremely Fast.
- **Simple Selection**: Choose algorithms from a dropdown menu.
- **Randomize Array**: Generate a new random array with one click.
- **Responsive Design**: Works well on any device and window size.
- **Dark Mode Support**: Automatically adapts according to your system theme.

## How to Use

1. Access the web application (run the index.html file on a local server).
2. Adjust the array size using the "Size" slider (5-20 elements).
3. Adjust the sorting speed using the "Speed" slider (Extremely Slow to Extremely Fast).
4. Click the "Randomize Array" button to generate a new random array.
5. Select a sorting algorithm from the dropdown menu.
6. Click "Start Sorting" to begin the visualization.
7. Watch the visualization and gain insights.

## How to Run the Project

You can run this project in the following ways:

### Option 1: Open directly in browser
1. Double-click on the `index.html` file in your file explorer
2. It will open in your default web browser

### Option 2: Use a local development server
If you have Node.js installed, you can run a simple web server:

1. Open terminal and navigate to the project directory
2. Run the following command:
   ```
   npx serve
   ```
3. Go to `http://localhost:5000` in your browser

### Option 3: VS Code Live Server Extension
If you use Visual Studio Code:

1. Install the [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Open the `index.html` file and click the "Go Live" button in the bottom-right corner of the editor

## Technologies

- HTML5
- CSS3 (variables, flexbox, grid, animations)
- JavaScript (ES6+, async/await)

## Sorting Algorithm Information

### Bubble Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Description**: Works by repeatedly comparing adjacent elements and swapping them if needed.

### Selection Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Description**: Selects the minimum element from the unsorted subarray and puts it at the end of the sorted subarray.

### Insertion Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Description**: Like a card player, it takes one element at a time and places it in the correct position.

### Merge Sort
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- **Description**: Divide and conquer algorithm that divides the array, sorts, and then combines.

### Quick Sort
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(log n)
- **Description**: Selects a pivot and places all smaller elements before the pivot and larger elements after it. 