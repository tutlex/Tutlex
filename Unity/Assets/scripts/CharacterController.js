#pragma strict

var lastKey : KeyCode;
var actPos : Vector3;
function Start () {
	actPos = gameObject.rigidbody.rotation.ToEuler();
	lastKey = KeyCode.F6;
}

function Update () {
	
	if (Input.GetKey(KeyCode.LeftArrow)){
	
		/*actPos +=  Vector3(0,0,-200) * Time.deltaTime ;
		gameObject.rigidbody.MoveRotation(Quaternion.Euler(actPos));	
		gameObject.rigidbody.MovePosition(gameObject.rigidbody.position+Vector3(3,0,0) * Time.deltaTime);*/
		if (gameObject.rigidbody.velocity.x < 0 &&  lastKey == KeyCode.RightArrow){
			gameObject.rigidbody.AddForce(Vector3(-gameObject.rigidbody.velocity.x,0,0),ForceMode.VelocityChange);
		}
				
		if (Input.GetKey(KeyCode.LeftShift)){
			
			gameObject.rigidbody.AddForce( Vector3(20,0,0) * Time.deltaTime,ForceMode.VelocityChange);
		}
		else {
			gameObject.rigidbody.AddForce(Vector3(10,0,0) * Time.deltaTime,ForceMode.VelocityChange);
		}
		print(gameObject.rigidbody.velocity);
		lastKey = KeyCode.LeftArrow;
	}
	if (Input.GetKey(KeyCode.RightArrow)){
		/*actPos +=  Vector3(0,0,200) * Time.deltaTime ;
		gameObject.rigidbody.MoveRotation(Quaternion.Euler(actPos));	
		gameObject.rigidbody.MovePosition(gameObject.rigidbody.position+Vector3(-3,0,0) * Time.deltaTime);	
		*/
		if (gameObject.rigidbody.velocity.x > 0 && lastKey == KeyCode.LeftArrow){
			gameObject.rigidbody.AddForce(Vector3(-gameObject.rigidbody.velocity.x,0,0),ForceMode.VelocityChange);
		}
		if (Input.GetKey(KeyCode.LeftShift)){
			gameObject.rigidbody.AddForce(Vector3(-20,0,0) * Time.deltaTime,ForceMode.VelocityChange);
		}
		else {
			gameObject.rigidbody.AddForce(Vector3(-10,0,0) * Time.deltaTime,ForceMode.VelocityChange);
		}
		print(gameObject.rigidbody.velocity);
		lastKey = KeyCode.RightArrow;
	}
	if (Input.GetKeyDown(KeyCode.Space)){
		gameObject.rigidbody.AddForce(Vector3(0,9,0),ForceMode.VelocityChange);
	}
	
}