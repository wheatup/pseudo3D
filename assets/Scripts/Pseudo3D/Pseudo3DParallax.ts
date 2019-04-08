/**
 * 透视平移对象
 * @author wheatup
 */

import Pseudo3D from './Pseudo3D';
import Pseudo3DCamera from './Pseudo3DCamera';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Pseudo3DParallax extends cc.Component {
	@property
	speed: number = 0;

	@property(Pseudo3DCamera)
	camera: Pseudo3DCamera = null;

	private phase: number = 0;

	start() {
		if (!this.camera) {
			this.camera = Pseudo3D.$.currentCamera;
		}
	}

	update(dt) {
		let angle = this.camera.rotation;
		while (angle < 0) {
			angle += Math.PI;
		}
		let factor = Math.abs(angle / Math.PI) % 1;
		this.phase += this.speed * dt;
		this.node.x = -factor * this.node.width * 0.5 + this.phase;
		if (this.node.x <= -this.node.width * 0.5) {
			this.node.x += this.node.width * 0.5;
		} else if (this.node.x >= this.node.width * 0.5) {
			this.node.x -= this.node.width * 0.5;
		}
	}
}
