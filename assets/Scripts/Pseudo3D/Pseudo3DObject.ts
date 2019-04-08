/**
 * 伪3D对象
 * @author wheatup
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class Pseudo3DObject extends cc.Component {
	@property(cc.Node)
	body: cc.Node = null;

	@property(cc.Node)
	shadow: cc.Node = null;

	@property(cc.Vec3)
	position: cc.Vec3 = new cc.Vec3(0, 0, 0);

	@property
	fixedZIndex: number = 0;

	@property
	rotation: number = 0;

	orgPosition: cc.Vec2 = null;
	orgScale: cc.Vec2 = null;

	orgShadowPosition: cc.Vec2 = null;
	orgShadowScale: cc.Vec2 = null;

	onLoad() {
		this.body = this.body || this.node.children[0] || this.node;

		this.orgPosition = new cc.Vec2(this.body.x, this.body.y);
		this.orgScale = new cc.Vec2(this.node.scaleX, this.node.scaleY);

		if (this.shadow) {
			this.orgShadowPosition = new cc.Vec2(this.shadow.x, this.shadow.y);
			this.orgShadowScale = new cc.Vec2(this.shadow.scaleX, this.shadow.scaleY);
		}
		this.node.zIndex = this.fixedZIndex;
	}
}
