#pragma strict
var BallExplosion: ParticleSystem;
var lastKey : KeyCode;
var actPos : Vector3;
var moveSpeed: double;
var fastMoveSpeed: double;
var jumpForce:double;
var highJumpForce:double;
public static var isDead:boolean;

var isJumpable = false;
var resetPoint : GameObject;

function OnCollisionStay(collisionInfo : Collision){
	
	if (collisionInfo.gameObject.layer == 8){
		isJumpable = true;
	}else{
		isJumpable = false;
	}
	
	
	
}
function OnCollisionEnter(collisionInfo : Collision){
	if (collisionInfo.gameObject.layer == 9){
			print("bla");
			BallExplosion.transform.position = gameObject.transform.position;
			BallExplosion.Play();
			gameObject.renderer.enabled = false;
			isDead = true;
			yield WaitForSeconds(5.0);			
			gameObject.transform.position = resetPoint.transform.position; 
			gameObject.renderer.enabled = true;
			isDead = false;
			
		
	  	    
	  }
	
}

function OnCollisionExit(collisionInfo : Collision) {
    isJumpable = false;
}
function OnTriggerEnter (other : Collider) {
  if (other.gameObject.layer == 10)
		gameObject.transform.position = resetPoint.transform.position; 
  
  		
}

 
function Start () {
	actPos = gameObject.rigidbody.rotation.ToEuler();
	lastKey = KeyCode.F6;
	isDead = false;
}

function Update () {
	if (isDead == false){
	gameObject.rigidbody.transform.position.z = 0;

 	if (!Input.anyKey){
 	 		gameObject.rigidbody.velocity.x = 0;
 	 		
 	}else{
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
				gameObject.rigidbody.velocity.x = 17;
			}
			else {
				//gameObject.rigidbody.AddForce(Vector3(10,0,0) * Time.deltaTime,ForceMode.VelocityChange);
				gameObject.rigidbody.velocity.x = 10;
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
					gameObject.rigidbody.velocity.x = -17;
				}
				else {
					//gameObject.rigidbody.AddForce(Vector3(-10,0,0) * Time.deltaTime,ForceMode.VelocityChange);
					gameObject.rigidbody.velocity.x = -10;
				}
			}
			//print(gameObject.rigidbody.velocity);
			lastKey = KeyCode.RightArrow;
			
		}
		
		
		
		if (Input.GetKeyDown(KeyCode.Space) && isJumpable){
			if (Input.GetKey(KeyCode.LeftShift)){				
				gameObject.rigidbody.AddForce(Vector3(0,300,0),ForceMode.Force);
			}
			else{
				gameObject.rigidbody.AddForce(Vector3(0,250,0),ForceMode.Force);
			}
			
				
			}
		}
	}
	
	
	print(gameObject.rigidbody.velocity);
}