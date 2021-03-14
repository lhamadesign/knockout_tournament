class TreeNode {
    right: TreeNode | null;
    left: TreeNode | null;
    value?: string;

    constructor(value: string) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
};

export class BinaryTree {
    root: TreeNode;

    constructor() {
        this.root = new TreeNode('');
    }

    public fillTree = (values: string[], node: TreeNode = this.root) => {
        if (values.length == 2) {
          node.left = new TreeNode(values[0]);
          node.right = new TreeNode(values[1]);
          return;  
        }
        
        node.left = new TreeNode('');
        this.fillTree(values.slice(0, values.length / 2), node.left);
        
        node.right = new TreeNode('');
        this.fillTree(values.slice(values.length / 2), node.right);
    };

    public preOrder = (node: TreeNode = this.root, storage: string[]) => {
        if (!(node.right && node.left)) {
            if (node.value)
                storage.push(node.value);
            return;
        }

        this.preOrder(node.left, storage);
        this.preOrder(node.right, storage);
    }
}