/**
  * Name:tree-utils.js
  * Date:2019/5/29
  * @Author:ykx
  * @Desc: 树操作方法集合
*/
import {cloneDeep} from 'lodash/lang'

/**
 * 判断是否有parent节点
 * @param {Array} rows 片平化 节点数据结构
 * @param {Object} row 判断的节点
 * @returns {boolean}
 */
export function hasParent(rows,row) {
    let parentKey = row.parentKey;
    return rows.find(row => row.key === parentKey);
}

/**
 * 构造树方法（给节点添加 parentNodes parentKeys parentTexts 属性,便于操作）
 * @param {Array} 具有key,parentKey的扁平数据结构，text为标题title
 * @param {Object}
 * @returns {Array} 处理后的树状数据结构
 */
export function convertToTree(rows) {
    rows = cloneDeep(rows);

    let nodes = [];

    //获取所有顶级节点

    nodes = rows.filter(row => !hasParent(rows,row))

    //需要处理的节点
    let toDo = nodes.map(v => v);//?? 克隆？

    while(toDo.length){
        let node = toDo.shift();
        rows.forEach(row => {
            //找到子节点
            if(node.key === row.parentKey){
                let child = cloneDeep(row);
                let parentKeys = [node.key];
                if(node.parentKeys){
                    parentKeys = node.parentKeys.concat(node.key);
                }
                //追加parentKeys属性（包含树集key数组）
                child.parentKeys = parentKeys;

                let parentTexts = [node.text];

                if(node.parentKeys){
                    parentTexts = node.parentKeys.concat(node.text);
                }

                //追加树集标题title数组

                child.parentTexts = parentTexts;

                const tempNode = cloneDeep(node);
                delete tempNode.children;
                delete tempNode.parentKeys;
                delete tempNode.parentTexts;

                let parentNodes = [tempNode];

                if(node.parentNodes){
                    parentNodes = node.parentNodes.concat(parentNodes);
                }

                //追加父级节点数组
                child.parentNodes = parentNodes;


                if(node.children){
                    node.children.push(child);
                }else{
                    node.children = [child];
                }

                //child加入 toDo中 继续处理(递归操作)
                toDo.push(child)

            }
        })
    }

    //返回处理后的节点（这里nodes虽然返回了新的数组，但是数组对象中存在引用关系）

    return nodes;
}