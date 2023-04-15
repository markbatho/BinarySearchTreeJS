const Tree = require('./lib/Tree');

function driver(arraySize, min, max) {
    const array = [];
    
    min = Math.ceil(min);
    max = Math.floor(max);

    while (array.length !== arraySize) {
        const num = Math.floor(Math.random() * (max - min) + min);

        if (array.indexOf(num) > -1) {
            continue;
        } else {
            array.push(num);
        }
    }

    const bst = new Tree(array);

    console.log(array);
    bst.prettyPrint();

    console.log(bst.isBalanced());

    console.log('LevelOrder', bst.levelOrder());
    console.log('PreOrder', bst.preorder());
    console.log('PostOrder', bst.postorder());
    console.log('InOrder', bst.inorder());

    bst.insert(125);
    bst.insert(248);
    bst.insert(142);
    bst.insert(111);
    bst.insert(377);

    console.log(bst.isBalanced());

    bst.rebalance();

    console.log(bst.isBalanced());

    bst.prettyPrint();

    console.log('LevelOrder', bst.levelOrder());
    console.log('PreOrder', bst.preorder());
    console.log('PostOrder', bst.postorder());
    console.log('InOrder', bst.inorder());
}

driver(10, 1, 100);
