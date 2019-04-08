/**
 * 节点移动
 * @author wheatup
 */

import Pseudo3DObject from '../Pseudo3D/Pseudo3DObject';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Move extends cc.Component {
	start() {
		let obj = this.node.getComponent(Pseudo3DObject);
		new Wheen(obj.position)
			.to({ x: obj.position.x + 1000 }, 800, Wheen.Easing.Quint.easeInOut)
			.to({ x: obj.position.x }, 800, Wheen.Easing.Quint.easeInOut)
			.loop()
			.start();
	}
}
