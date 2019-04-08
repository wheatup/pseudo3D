import Pseudo3DCamera from '../Pseudo3D/Pseudo3DCamera';

const { ccclass, property } = cc._decorator;

/**
 * 摄影机控制器
 * @author wheatup
 */

@ccclass
export default class CameraControl extends cc.Component {
	@property
	rotateSpeed: number = 3.14;

	@property
	walkSpeed: number = 1000;

	keys = {
		UP: false,
		DOWN: false,
		LEFT: false,
		RIGHT: false
	};

	camera: Pseudo3DCamera = null;

	onLoad() {
		this.camera = this.node.getComponent(Pseudo3DCamera);
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
	}

	onDestroy() {
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
	}

	onKeyDown({ keyCode }) {
		if (keyCode === cc.macro.KEY.w || keyCode === cc.macro.KEY.up) {
			this.keys.UP = true;
		} else if (keyCode === cc.macro.KEY.a || keyCode === cc.macro.KEY.left) {
			this.keys.LEFT = true;
		} else if (keyCode === cc.macro.KEY.s || keyCode === cc.macro.KEY.down) {
			this.keys.DOWN = true;
		} else if (keyCode === cc.macro.KEY.d || keyCode === cc.macro.KEY.right) {
			this.keys.RIGHT = true;
		}
	}

	onKeyUp({ keyCode }) {
		if (keyCode === cc.macro.KEY.w || keyCode === cc.macro.KEY.up) {
			this.keys.UP = false;
		} else if (keyCode === cc.macro.KEY.a || keyCode === cc.macro.KEY.left) {
			this.keys.LEFT = false;
		} else if (keyCode === cc.macro.KEY.s || keyCode === cc.macro.KEY.down) {
			this.keys.DOWN = false;
		} else if (keyCode === cc.macro.KEY.d || keyCode === cc.macro.KEY.right) {
			this.keys.RIGHT = false;
		}
	}

	update(dt) {
		if (this.camera) {
			if (this.keys.LEFT) {
				this.camera.rotation -= this.rotateSpeed * dt;
			} else if (this.keys.RIGHT) {
				this.camera.rotation += this.rotateSpeed * dt;
			}

			let dir = new cc.Vec2(Math.sin(this.camera.rotation), Math.cos(this.camera.rotation));
			dir.mul(this.walkSpeed * dt, dir);
			if (this.keys.UP) {
				this.camera.position.x += dir.x;
				this.camera.position.z += dir.y;
			} else if (this.keys.DOWN) {
				this.camera.position.x -= dir.x;
				this.camera.position.z -= dir.y;
			}
		}
	}
}
