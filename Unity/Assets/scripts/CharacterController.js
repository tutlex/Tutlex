#pragma strict

var lastKey : KeyCode;
var actPos : Vector3;
function Start () {
	actPos = gameObject.rigidbody.rotation.ToEuler();
	lastKey = KeyCode.F6;
}

function Update () {
	
	if (Input.GetKeyUp(KeyCode.LeftArrow) || Input.GetKeyUp(KeyCode.RightArrow)){
		gameObject.rigidbody.velocity.x = 0;
	}
	if (Input.GetKey(KeyCode.LeftArrow)){
	
		/*actPos +=  Vector3(0,0,-200) * Time.deltaTime ;
		gameObject.rigidbody.MoveRotation(Quaternion.Euler(actPos));	
		gameObject.rigidbody.MovePosition(gameObject.rigidbody.position+Vector3(3,0,0) * Time.deltaTime);*/
		if (gameObject.rigidbody.velocity.x < 0 &&  lastKey == KeyCode.RightArrow){
			//gameObject.rigidbody.AddForce(Vector3(-gameObject.rigidbody.velocity.x,0,0),ForceMode.VelocityChange);
			gameObject.rigidbody.velocity.x = 0;
		}
				
		if (Input.GetKey(KeyCode.LeftShift)){
			
			//gameObject.rigidbody.AddForce( Vector3(20,0,0) * Time.deltaTime,ForceMode.VelocityChange);
			gameObject.rigidbody.velocity.x = 10;
		}
		else {
			//gameObject.rigidbody.AddForce(Vector3(10,0,0) * Time.deltaTime,ForceMode.VelocityChange);
			gameObject.rigidbody.velocity.x = 5;
		}
		//print(gameObject.rigidbody.velocity);
		lastKey = KeyCode.LeftArrow;
	}
	if (Input.GetKey(KeyCode.RightArrow)){
		/*actPos +=  Vector3(0,0,200) * Time.deltaTime ;
		gameObject.rigidbody.MoveRotation(Quaternion.Euler(actPos));	
		gameObject.rigidbody.MovePosition(gameObject.rigidbody.position+Vector3(-3,0,0) * Time.deltaTime);	
		*/
		if (gameObject.rigidbody.velocity.x > 0 && lastKey == KeyCode.LeftArrow){
			//gameObject.rigidbody.AddForce(Vector3(-gameObject.rigidbody.velocity.x,0,0),ForceMode.VelocityChange);
			gameObject.rigidbody.velocity.x = 0;
		}
		if (Input.GetKey(KeyCode.LeftArrow)){
			gameObject.rigidbody.velocity.x = 0;
		}else{
			if (Input.GetKey(KeyCode.LeftShift)){
				//gameObject.rigidbody.AddForce(Vector3(-20,0,0) * Time.deltaTime,ForceMode.VelocityChange);
				gameObject.rigidbody.velocity.x = -10;
			}
			else {
				//gameObject.rigidbody.AddForce(Vector3(-10,0,0) * Time.deltaTime,ForceMode.VelocityChange);
				gameObject.rigidbody.velocity.x = -5;
			}
		}
		//print(gameObject.rigidbody.velocity);
		lastKey = KeyCode.RightArrow;
	}
	if (Input.GetKeyDown(KeyCode.Space)){
		//print(gameObject.rigidbody.velocity);
		gameObject.rigidbody.AddForce(Vector3(0,8,0),ForceMode.VelocityChange);
	}
	print(gameObject.rigidbody.velocity);
}