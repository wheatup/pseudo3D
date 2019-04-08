/**
 * 节点跳跃
 * @author wheatup
 */

import Pseudo3DObject from "../Pseudo3D/Pseudo3DObject";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Jump extends cc.Component {

	@property
	height: number = 800;

    start () {
		let obj = this.node.getComponent(Pseudo3DObject);
		new Wheen(obj.position)
			.to({y: this.height}, 500, Wheen.Easing.Cubic.easeOut)
			.to({y: 0}, 500, Wheen.Easing.Cubic.easeIn)
			.loop()
			.start();
    }
}
