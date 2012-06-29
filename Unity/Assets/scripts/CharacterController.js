#pragma strict


var actPos : Vector3;
function Start () {

	actPos = gameObject.rigidbody.rotation.ToEuler();
	
}

function Update () {
	if (Input.GetKey(KeyCode.LeftArrow)){
		/*actPos +=  Vector3(0,0,-200) * Time.deltaTime ;
		gameObject.rigidbody.MoveRotation(Quaternion.Euler(actPos));	
		gameObject.rigidbody.MovePosition(gameObject.rigidbody.position+Vector3(3,0,0) * Time.deltaTime);*/
		gameObject.rigidbody.AddForce(Vector3(300,0,0) * Time.deltaTime);
	}
	if (Input.GetKey(KeyCode.RightArrow)){
		/*actPos +=  Vector3(0,0,200) * Time.deltaTime ;
		gameObject.rigidbody.MoveRotation(Quaternion.Euler(actPos));	
		gameObject.rigidbody.MovePosition(gameObject.rigidbody.position+Vector3(-3,0,0) * Time.deltaTime);	
		*/
		gameObject.rigidbody.AddForce(Vector3(-300,0,0) * Time.deltaTime);
	}
	if (Input.GetKeyDown(KeyCode.UpArrow)){
		gameObject.rigidbody.AddForce(Vector3(0,400,0));
	}
	
}