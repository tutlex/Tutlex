#pragma strict
public var Ball : GameObject;
public var distanceFromBall_z :double;
public var distanceFromBall_y:double;
function Start () {

}

function Update () {
	if (CharacterBallController.isDead == false)
 		gameObject.transform.position = Vector3(Ball.transform.position.x,Ball.transform.position.y+distanceFromBall_y,distanceFromBall_z);
}