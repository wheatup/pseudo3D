/**
 * 伪3D渲染类
 * @author wheatup
 */

import Pseudo3DCamera from './Pseudo3DCamera';
import Pseudo3DObject from './Pseudo3DObject';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Pseudo3D extends cc.Component {
	static $: Pseudo3D = null;

	@property(cc.Node)
	pseudo3DScene: cc.Node = null;

	cameras: Pseudo3DCamera[] = [];
	objects: Pseudo3DObject[] = [];
	currentCamera: Pseudo3DCamera = null;

	updating: boolean = true;

	private cameraMatrix: number[] = [];

	onLoad() {
		Pseudo3D.$ = this;

		if (!this.pseudo3DScene) {
			this.pseudo3DScene = this.node;
		}

		// 将所有子节点归类
		this.pseudo3DScene.children.forEach(node => {
			let cam = node.getComponent(Pseudo3DCamera);
			if (cam) {
				this.cameras.push(cam);
			} else {
				let obj = node.getComponent(Pseudo3DObject);
				if (obj) {
					this.objects.push(obj);
				}
			}
		});

		// 设置当前摄影机
		if (this.cameras.length > 0) {
			this.currentCamera = this.cameras[0];
		}
	}

	update() {
		if (this.updating) this.redraw();
	}

	private redraw() {
		this.updateCameraMatrix();
		this.drawObjects();
	}

	// 更新摄影机的旋转矩阵
	private updateCameraMatrix() {
		this.cameraMatrix[0] = Math.cos(this.currentCamera.rotation);
		this.cameraMatrix[1] = -Math.sin(this.currentCamera.rotation);
		this.cameraMatrix[2] = Math.sin(this.currentCamera.rotation);
		this.cameraMatrix[3] = Math.cos(this.currentCamera.rotation);
	}

	// 绘制所有伪3D对象
	private drawObjects() {
		this.objects.forEach(obj => {
			// 将对象位置转换为摄影机相对位置
			let v = obj.position.z - this.currentCamera.position.z;
			let h = obj.position.x - this.currentCamera.position.x;

			// 应用摄影机旋转矩阵
			let p = Pseudo3D.matrix2d(new cc.Vec2(h, v), this.cameraMatrix);

			if (p.y < -200) {
				// 过于靠近摄影机则不可见
				obj.node.active = false;
			} else {
				if (!obj.node.active) {
					obj.node.active = true;
				}

				// 计算x轴和y轴
				if (obj.body) {
					obj.body.x = obj.orgPosition.x + p.x;
					obj.body.y = obj.orgPosition.y + obj.position.y;
				}

				// 计算z轴
				obj.node.scaleX = obj.orgScale.x * Pseudo3D.dist2Scale(p.y, this.currentCamera.fov);
				obj.node.scaleY = obj.orgScale.y * Pseudo3D.dist2Scale(p.y, this.currentCamera.fov);

				// 计算zIndex
				if (!obj.fixedZIndex) {
					obj.node.zIndex = -p.y;
				}

				// 计算投影
				if (obj.shadow) {
					obj.shadow.x = obj.orgShadowPosition.x + p.x;
					obj.shadow.scaleX = obj.orgShadowScale.x * (1 / (obj.position.y * 0.005 + 1));
					obj.shadow.scaleY = obj.orgShadowScale.y * (1 / (obj.position.y * 0.005 + 1));
				}
			}
		});
	}

	// 通过距离和摄影机视野计算缩放值
	static dist2Scale(dist, fov) {
		return 1 / (dist * 2e-5 * fov + 1);
	}

	// 应用旋转矩阵
	static matrix2d(vec2, mat2) {
		let x = vec2.x * mat2[0] + vec2.y * mat2[1];
		let y = vec2.x * mat2[2] + vec2.y * mat2[3];
		return { x, y };
	}
}
