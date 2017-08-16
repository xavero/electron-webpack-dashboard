export function getAncestors(node) {
  const ancestors = [];
  let current = node;

  while (current.parent) {
    ancestors.unshift(current);
    current = current.parent;
  }

  return ancestors;
}

export function getAllChildren(rootNode) {
  const allChildren = [];

  const getChildren = node => {
    allChildren.push(node);

    if (node.children) {
      node.children.forEach(child => {
        getChildren(child);
      });
    }
  };

  getChildren(rootNode);

  return allChildren;
}

export function markDuplicates(nodes) {
  const fullNameList = {};

  nodes.forEach(item => {
    if (!item.fullName) {
      return;
    }

    const lastIndex = item.fullName.lastIndexOf('~');
    if (lastIndex !== -1) {
      const fullName = item.fullName.substring(lastIndex);

      if (fullName in fullNameList) {
        item.duplicate = true;
        fullNameList[fullName].duplicate = true;
      } else {
        fullNameList[fullName] = item;
      }
    }
  });
}
