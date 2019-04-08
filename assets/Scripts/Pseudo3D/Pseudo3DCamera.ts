/**
 * 伪3D摄影机
 * @author wheatup
 */

import Pseudo3DObject from './Pseudo3DObject';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Pseudo3DCamera extends Pseudo3DObject {
	@property
	fov: number = 60;
}
