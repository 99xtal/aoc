interface GraphNode {
    next?: GraphNode[];
}

export function dfs<T extends GraphNode>(start: T, visit: (n: T) => void) {
    const visited: Set<T> = new Set();
    const stack: T[] = [start];

    while (stack.length > 0) {
        const node = stack.pop()!;

        if (!visited.has(node)) {
            visited.add(node);
            visit(node);

            const children = node.next as T[] ?? [];
            for (let i = children.length - 1; i >= 0; i--) {
                const childNode = children[i];
                if (!visited.has(childNode)) {
                    stack.push(childNode);
                }
            }
        }
    }
}