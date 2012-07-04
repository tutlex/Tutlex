#pragma strict

private var HorizontalMovement : float;

var MoveSpeed : float;
var MoveFastSpeed: float;
var MoveDecrease : float;
var MaxSpeed : float;
var MaxShiftSpeed : float;
var JumpSpeed : float;
private var IsJumping : boolean;
private var IsJumpAble : boolean;

function Start () {
    
}


function Update () {
    HorizontalMovement = Input.GetAxis("Horizontal");
    if (HorizontalMovement){
        if (Input.GetKey(KeyCode.LeftShift) && Mathf.Abs(rigidbody.velocity.x) < MaxShiftSpeed){
               rigidbody.AddForce(Vector3(HorizontalMovement,0,0)*MoveFastSpeed*Time.deltaTime);
           }else{
           		if (Mathf.Abs(rigidbody.velocity.x) < MaxSpeed){
               		rigidbody.AddForce(Vector3(HorizontalMovement,0,0)*MoveSpeed*Time.deltaTime);
               	}
               	if (Mathf.Abs(rigidbody.velocity.x) > MaxSpeed){
               		rigidbody.AddForce(Vector3(HorizontalMovement,0,0)*(-1)*(Mathf.Abs(rigidbody.velocity.x) - MaxSpeed)*Time.deltaTime);
               	}
           }
        if ((HorizontalMovement > 0 && rigidbody.velocity.x < 0) || (HorizontalMovement < 0 && rigidbody.velocity.x > 0)){
        	rigidbody.AddForce(Vector3(1,0,0)*rigidbody.velocity.x*rigidbody.mass*(-1)*MoveDecrease*Time.deltaTime);
        }
    }else{
        if(rigidbody.velocity.x && IsJumpAble){
             rigidbody.AddForce(rigidbody.velocity*rigidbody.mass*(-1)*MoveDecrease*Time.deltaTime);
    	}
    }
    
    if(Input.GetAxis("Jump") && IsJumpAble){
    	rigidbody.AddForce(Vector3.up * JumpSpeed);
    	IsJumpAble = false;
   	}
   	rigidbody.position.z = 0;
}


function OnCollisionStay(collisionInfo : Collision) {
	if(collisionInfo.gameObject.tag == "Jumpable"){
		IsJumpAble = true;	
	}
}