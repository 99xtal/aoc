export function expandDiskMap(diskMap: string) {
    let blocks: string[] = [];
    let isFile = true;
    let fileId = 0;

    for (const char of diskMap) {
        const num = parseInt(char);

        if (isFile) {
            blocks.push(...new Array(num).fill(fileId.toString()))
            fileId++;
        } else {
            blocks.push(...new Array(num).fill('.'))
        }

        isFile = !isFile;
    }

    return blocks;
}

export function compactDisk(diskInpt: string[]) {
    let disk = Array.from(diskInpt);
    let fileIndex = disk.length - 1;
    let freeIndex = 0;

    while (fileIndex > freeIndex) {
        if (disk[fileIndex] !== '.') {
            while (disk[freeIndex] !== '.') {
                freeIndex++;
            }
            if (freeIndex > fileIndex) {
                break;
            }

            disk[freeIndex] = disk[fileIndex];
            disk[fileIndex] = '.'
        }

        fileIndex--;
    }

    return disk;
}

export function compactDiskWholeFiles(diskInpt: string[]) {
    let disk = Array.from(diskInpt);
    let fileIndex = disk.length - 1;
    let fileId = disk[fileIndex];
    let fileLength = 0;

    while (fileIndex > 0) {
        if (disk[fileIndex] !== '.') {
            fileLength = 1;

            fileId = disk[fileIndex];
            while (disk[fileIndex - 1] === fileId) {
                fileLength += 1;
                fileIndex--;
            }

            let freeLength = 0;
            for (let freeIndex = 0; freeIndex < fileIndex; freeIndex++) {
                if (disk[freeIndex] === '.') {
                    freeLength += 1;
                } else {
                    freeLength = 0;
                }

                const freeStart = freeIndex - freeLength + 1;
                if (freeLength >= fileLength) {
                    for (let i = 0; i < fileLength; i++) {
                        disk[freeStart + i] = disk[fileIndex + i];
                        disk[fileIndex + i] = '.'
                    }
                    break;
                }
            }
        }

        fileIndex--;
    }

    return disk;
}

export function getChecksum(disk: string[]) {
    let checksum = 0;

    for (let i = 0; i < disk.length; i++) {
        if (disk[i] !== '.') {
            const fileId = parseInt(disk[i]);
            checksum += fileId * i;
        }
    }

    return checksum;
}