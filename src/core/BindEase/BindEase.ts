
import { Node } from "./type";
export class BindEase{
    private root: Node;
    private keys: string[];

    constructor(){
        //初始化根节点
        this.root = {
            key: '',
            children: new Map(),
        };
        this.keys = [];

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyDown);
    }

    private handleKeyDown(event: KeyboardEvent) {
        this.keys.push(event.key);
        this.trigger(this.keys);
    }

    private handleKeyUp(event: KeyboardEvent) {
        const index = this.keys.indexOf(event.key);
        if (index !== -1) {
            this.keys.splice(index, 1);
        }
        // 释放一个键是否需要触发检索事件？
    }

    private trigger(keys: string[]) {
        let node = this.root;
        for (let key of keys) {
            if (!node.children.has(key)) {
               return;
            } 
            node = node.children.get(key)!;
        }
        if (node.callback) {
            node.callback();
        }
    }

    bind(keys: string[], callback: () => void) {
        let node = this.root;
        for (let key of keys) {
            if (!node.children.has(key)) {
                node.children.set(key, {
                    key,
                    parent: node,
                    children: new Map(),
                });
            }
            node = node.children.get(key)!;
        }
        node.callback = callback;
    }
}