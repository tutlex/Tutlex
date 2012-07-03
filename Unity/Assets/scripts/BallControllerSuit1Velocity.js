#pragma strict


//  wenn springen nur kurz gedrückt wird
var shortJumpForce:double;
// wenn springen etwas länger gedrückt wird
var normalJumpForce:double;

// Zeit bis aus einem kleinen Sprung der stärke Sprung erstellt wird
var timeTillNormalJumpForce:double =0.05;

// Sprungkraft bei einem Sprung im Shift-Modus
var shiftJumpForce:double;

// Geschwindigkeit des Balles
var speed:double;


// Endgeschwindigkeit im Shiftmodus
var shiftSpeed:double;

// Beschleunigung des Balles pro Sekunde beim Wechsel in den Shift-Modus
var shiftSpeedDeltaIncrease:double;

//Je größer diese Zahl desto schneller findet der Richtungswechsel statt!!
var DirectionSwitchDeltaDecrease:double;

//Abnahme der Geschwindigkeit wenn mit dem Ball keine Interaktionen durchgeführt werden!
var RollOutDeltaDecrease:double;

//Private Hilfsvariablen
private var LastHorizontalMovement:double;


//springt der Ball gerade?
private var isJumping;
//darf der Ball gerade springen?
private var isJumpable;
function Start () {
	isJumping = false;	
	isJumpable = true;
	
}

function Update () {
//Hilfsvariablen
var HorizontalMovement:double;
var v_ball:float;
v_ball = gameObject.rigidbody.velocity.x;
//Eingaben des Users auslesen

//1. Horizontale Eingabe ablesen
	HorizontalMovement = Input.GetAxis("Horizontal");
	
	var JumpMovement = Input.GetAxis("Jump");
	
//1.1 Es gibt keine Horizontalen Bewegungen und der Ball ist auch nicht am Springen!
// Abbremsvorgang des Balles
	if (HorizontalMovement == 0 && isJumping == false &&v_ball!=0){
		var RollOutSpeedDecrease :float = ( Time.deltaTime * RollOutDeltaDecrease);
		
		if ( (RollOutSpeedDecrease-Mathf.Abs(v_ball))>= 0){
			//gameObject.rigidbody.AddForce(-1.0*gameObject.rigidbody.velocity.x,0,0,ForceMode.VelocityChange);	
			gameObject.rigidbody.velocity.x = 0;
			
			print ("dafuq");
			LastHorizontalMovement = 0;
					
		}else{		
			gameObject.rigidbody.AddForce((-1.0*Mathf.Sign(v_ball))*Mathf.Abs(RollOutSpeedDecrease),0,0,ForceMode.VelocityChange);
			
		}
	}
	//print (gameObject.rigidbody.velocity.x);


//2. Eingaben in Bewegung des Balls umsetzen

//2.1 wurde der Ball in die andere Richtung bewegt und vollführt nun eine Vollbremsung um in die andere Richtung zu drehen?
//    Geschwindigkeit des Bremsvorgangs muss angepasst und verschnellert werden
if (HorizontalMovement != 0){
	if ( (LastHorizontalMovement >= 0 && HorizontalMovement < 0 && v_ball != 0)
			||
		  (LastHorizontalMovement <= 0 && HorizontalMovement >0 && v_ball != 0)){
		  
		// Es ist der Fall aufgetreten das der Ball während der seitwärtsbewegung die bewegung auf die andere Seite begonnen hat
		// Es ist eine modifizierte Bremsung nötig um einen schnelleren und Spielflussfreien Wechsel zu ermöglichen
		var SpeedDecrease :float =( Time.deltaTime * DirectionSwitchDeltaDecrease);
		//würde die Bremsung bereits eine Beschleunigung auf die andere seite zur folge haben dann setze die Geschwindigkeit in dem Frame auf 0
		//ansonsten Bremse mit dem berechnetem Mittel!
		
		if ( (SpeedDecrease-Mathf.Abs(v_ball))>= 0){
			//gameObject.rigidbody.AddForce(-gameObject.rigidbody.velocity.x,0,0,ForceMode.VelocityChange);
			gameObject.rigidbody.velocity.x = 0;
			LastHorizontalMovement = 0;
		}else{
			var HorizontalRollOutSpeedDec:float = Mathf.Sign(HorizontalMovement)*SpeedDecrease;
			gameObject.rigidbody.AddForce((Mathf.Sign(HorizontalRollOutSpeedDec))*(Mathf.Abs(gameObject.rigidbody.velocity.x-Mathf.Abs(HorizontalRollOutSpeedDec))),0,0,ForceMode.VelocityChange);
			print ("bla");
		}
		
		
			    
	} else{
		//Es findet ein gewöhnlicher horizontaler Bewegungsvorgang statt
		//Jetzt muss nur noch Unterschieden werden , ob bei der Bewegung die Shift Taste gedrückt wird oder nicht!
		if (Input.GetKey(KeyCode.LeftShift) && isJumping == false){
			var HorizontalShiftSpeed:float = HorizontalMovement*shiftSpeed;
			gameObject.rigidbody.AddForce(Mathf.Sign(HorizontalShiftSpeed)*(Mathf.Abs(HorizontalShiftSpeed)-Mathf.Abs(gameObject.rigidbody.velocity.x)),0,0,ForceMode.VelocityChange);
		}else{
			var HorizontalSpeed:float = HorizontalMovement*speed;
			gameObject.rigidbody.AddForce(Mathf.Sign(HorizontalSpeed)*(Mathf.Abs(HorizontalSpeed)-Mathf.Abs(gameObject.rigidbody.velocity.x)),0,0,ForceMode.VelocityChange);
		}
		LastHorizontalMovement = HorizontalMovement;
	}
}
if (JumpMovement && isJumpable){
	
	gameObject.rigidbody.AddForce(0,normalJumpForce,0,ForceMode.Force);
	isJumpable = false;
	isJumping = true;
}

	
	
	
}
function OnCollisionEnter(collisionInfo : Collision){
	if (collisionInfo.gameObject.layer == 8){
		isJumpable = true;
		isJumping = false;
	}
}