// Variables
let array = [], arraySize = 10, delay = 100, isSorting = false, comparisons = 0, swaps = 0;
const delays = [0, 1000, 500, 100, 50, 10]; // Indexed by speed value

// DOM elements
const arrayContainer = document.getElementById('array-container');
const newArrayBtn = document.getElementById('new-array');
const arraySizeInput = document.getElementById('array-size');
const sortingSpeedInput = document.getElementById('sorting-speed');
const algorithmSelect = document.getElementById('algorithm-select');
const startSortBtn = document.getElementById('start-sort');
const sizeValueDisplay = document.getElementById('size-value');
const speedValueDisplay = document.getElementById('speed-value');

// Initialize on page load
window.onload = () => {
    // Event listeners
    newArrayBtn.addEventListener('click', generateNewArray);
    arraySizeInput.addEventListener('input', () => {
        arraySize = parseInt(arraySizeInput.value);
        sizeValueDisplay.textContent = arraySize;
        if(!isSorting) generateNewArray();
    });
    
    sortingSpeedInput.addEventListener('input', () => {
        const speed = parseInt(sortingSpeedInput.value);
        const speedTexts = ['', 'Extremely Slow', 'Slow', 'Medium', 'Fast', 'Extremely Fast'];
        delay = delays[speed];
        speedValueDisplay.textContent = speedTexts[speed];
    });
    
    startSortBtn.addEventListener('click', () => {
        const algorithm = algorithmSelect.value;
        if(algorithm) {
            const algorithms = {
                'bubble': bubbleSort,
                'selection': selectionSort,
                'insertion': insertionSort,
                'merge': mergeSort,
                'quick': quickSort
            };
            startSorting(algorithms[algorithm], algorithm.charAt(0).toUpperCase() + algorithm.slice(1) + ' Sort');
        } else {
            alert('Please select a sorting algorithm');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if(!isSorting) {
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(redrawArray, 250);
        }
    });
    
    generateNewArray();
};

// Generate a new random array
function generateNewArray() {
    arrayContainer.innerHTML = '';
    array = [];
    
    // Calculate dimensions
    const containerHeight = 400 - 60;
    const barWidth = calculateBarWidth();
    
    // Generate random values and create bars
    for(let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 96 + 5)); // 5-100 range
    }
    
    // Calculate scale based on max value
    const maxValue = Math.max(...array);
    const heightScale = (containerHeight * 0.9) / maxValue;
    
    // Create visual elements
    array.forEach(value => {
        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * heightScale}px`;
        bar.style.width = `${barWidth}px`;
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = value;
        
        barContainer.appendChild(bar);
        barContainer.appendChild(label);
        arrayContainer.appendChild(barContainer);
    });
    
    comparisons = swaps = 0;
}

// Calculate optimal bar width
function calculateBarWidth() {
    const containerWidth = arrayContainer.offsetWidth - 40;
    const gap = 6;
    let barWidth = Math.floor((containerWidth / arraySize) - gap);
    return Math.max(15, Math.min(60, barWidth));
}

// Redraw the current array (for resizing)
function redrawArray() {
    const currentArray = [...array];
    arrayContainer.innerHTML = '';
    
    const containerHeight = 400 - 60;
    const maxVal = Math.max(...currentArray);
    const heightScale = (containerHeight * 0.9) / maxVal;
    const barWidth = calculateBarWidth();
    
    currentArray.forEach((value, i) => {
        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * heightScale}px`;
        bar.style.width = `${barWidth}px`;
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = value;
        
        barContainer.appendChild(bar);
        barContainer.appendChild(label);
        arrayContainer.appendChild(barContainer);
    });
}

// Start sorting
async function startSorting(algorithm, name) {
    if(isSorting) return;
    isSorting = true;
    
    // Disable controls except speed
    [newArrayBtn, startSortBtn, arraySizeInput, algorithmSelect].forEach(el => el.disabled = true);
    document.body.style.cursor = 'wait';
    
    comparisons = swaps = 0;
    
    try {
        await algorithm();
        document.querySelectorAll('.bar').forEach(bar => bar.classList.add('sorted'));
    } catch (error) {
        console.error('Sorting error:', error);
    } finally {
        [newArrayBtn, startSortBtn, arraySizeInput, algorithmSelect].forEach(el => el.disabled = false);
        document.body.style.cursor = 'default';
        isSorting = false;
    }
}

// Helper functions for visualization
async function sleep() {
    return new Promise(resolve => setTimeout(resolve, delay));
}

function getBars() {
    return document.querySelectorAll('.bar');
}

async function compareElements(i, j) {
    const bars = getBars();
    
    bars[i].classList.add('comparing');
    bars[j].classList.add('comparing');
    
    comparisons++;
    await sleep();
    
    bars[i].classList.remove('comparing');
    bars[j].classList.remove('comparing');
    
    return array[i] > array[j];
}

async function swapElements(i, j) {
    const bars = getBars();
    const labels = document.querySelectorAll('.bar-label');
    
    bars[i].style.transition = bars[j].style.transition = 'height 0.25s ease-in-out';
    
    // Swap heights, labels, and array values
    [bars[i].style.height, bars[j].style.height] = [bars[j].style.height, bars[i].style.height];
    [labels[i].textContent, labels[j].textContent] = [labels[j].textContent, labels[i].textContent];
    [array[i], array[j]] = [array[j], array[i]];
    
    swaps++;
    await sleep();
}

async function updateBar(index, value, isComparing = false) {
    const bars = getBars();
    const labels = document.querySelectorAll('.bar-label');
    
    const maxVal = Math.max(...array);
    const heightScale = (340 * 0.9) / maxVal;
    
    if (isComparing) bars[index].classList.add('comparing');
    
    bars[index].style.transition = 'height 0.2s ease-in-out';
    bars[index].style.height = `${value * heightScale}px`;
    labels[index].textContent = value;
    
    await sleep();
    
    if (isComparing) bars[index].classList.remove('comparing');
}

async function markSorted(index) {
    const bars = getBars();
    bars[index].style.transition = 'background-color 0.3s ease';
    bars[index].classList.add('sorted');
}

function updateAllBarsHeight() {
    const bars = getBars();
    const labels = document.querySelectorAll('.bar-label');
    
    const maxVal = Math.max(...array);
    const heightScale = (340 * 0.9) / maxVal;
    
    array.forEach((value, i) => {
        bars[i].style.height = `${value * heightScale}px`;
        labels[i].textContent = value;
    });
}

// Sorting Algorithms
async function bubbleSort() {
    const n = array.length;
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n - i - 1; j++) {
            if(await compareElements(j, j + 1)) {
                await swapElements(j, j + 1);
            }
        }
        await markSorted(n - i - 1);
    }
}

async function selectionSort() {
    const n = array.length;
    
    for(let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for(let j = i + 1; j < n; j++) {
            if(await compareElements(minIndex, j)) {
                minIndex = j;
            }
        }
        
        if(minIndex !== i) await swapElements(i, minIndex);
        await markSorted(i);
    }
    
    await markSorted(n - 1);
}

async function insertionSort() {
    const n = array.length;
    
    await markSorted(0);
    
    for(let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        
        while(j >= 0) {
            await compareElements(j, j+1);
            
            if(array[j] > key) {
                array[j+1] = array[j];
                await updateBar(j+1, array[j+1]);
                j--;
            } else break;
        }
        
        array[j+1] = key;
        await updateBar(j+1, key);
        await markSorted(i);
    }
}

async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);
}

async function mergeSortHelper(start, end) {
    if(start < end) {
        const mid = Math.floor((start + end) / 2);
        
        await mergeSortHelper(start, mid);
        await mergeSortHelper(mid + 1, end);
        
        await merge(start, mid, end);
    } else {
        await markSorted(start);
    }
}

async function merge(start, mid, end) {
    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;
    
    while(i < leftArray.length && j < rightArray.length) {
        const leftIndex = start + i;
        const rightIndex = mid + 1 + j;
        
        // Show comparison
        const bars = getBars();
        bars[leftIndex].classList.add('comparing');
        bars[rightIndex].classList.add('comparing');
        
        comparisons++;
        await sleep();
        
        bars[leftIndex].classList.remove('comparing');
        bars[rightIndex].classList.remove('comparing');
        
        if(leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i++];
        } else {
            array[k] = rightArray[j++];
        }
        
        await updateBar(k++, array[k-1]);
    }
    
    while(i < leftArray.length) {
        array[k] = leftArray[i++];
        await updateBar(k++, array[k-1]);
    }
    
    while(j < rightArray.length) {
        array[k] = rightArray[j++];
        await updateBar(k++, array[k-1]);
    }
    
    updateAllBarsHeight();
    await sleep();
    
    for(let i = start; i <= end; i++) {
        await markSorted(i);
    }
}

async function quickSort() {
    await quickSortHelper(0, array.length - 1);
}

async function quickSortHelper(low, high) {
    if(low < high) {
        const pivotIndex = await partition(low, high);
        
        await quickSortHelper(low, pivotIndex - 1);
        await quickSortHelper(pivotIndex + 1, high);
    } else if(low === high) {
        await markSorted(low);
    }
}

async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;
    
    for(let j = low; j < high; j++) {
        await compareElements(j, high);
        
        if(array[j] <= pivot) {
            i++;
            await swapElements(i, j);
        }
    }
    
    await swapElements(i + 1, high);
    await markSorted(i + 1);
    
    return i + 1;
} 