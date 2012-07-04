#pragma strict

private var HorizontalMovement : float;

var MoveSpeed : float;
var MoveFastSpeed: float;
var MoveDecrease : float;

function Start () {
    
}


function Update () {
	HorizontalMovement = Input.GetAxis("Horizontal");
	if (HorizontalMovement){
		if (Input.GetKey(KeyCode.LeftShift)){
	   		rigidbody.AddForce(Vector3(HorizontalMovement,0,0)*MoveFastSpeed*Time.deltaTime);
	   	}else{
	   		rigidbody.AddForce(Vector3(HorizontalMovement,0,0)*MoveSpeed*Time.deltaTime);
	   	}
	}else{
		if(rigidbody.velocity.x){
 	    	rigidbody.AddForce(rigidbody.velocity*rigidbody.mass*(-1)*MoveDecrease*Time.deltaTime);
    }
}
print (rigidbody.velocity);
}