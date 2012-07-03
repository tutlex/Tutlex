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
	
}

function Update () {
//Hilfsvariablen
var HorizontalMovement:double;
//Eingaben des Users auslesen

//1. Horizontale Eingabe ablesen
	HorizontalMovement = Input.GetAxis("Horizontal");
//1.1 Es gibt keine Horizontalen Bewegungen und der Ball ist auch nicht am Springen!
// Abbremsvorgang des Balles
	if (HorizontalMovement == 0 && isJumping == false && gameObject.rigidbody.velocity.x!=0){
		var RollOutSpeedDecrease :float = ( Time.deltaTime * RollOutDeltaDecrease);
		if ( (RollOutSpeedDecrease-Mathf.Abs(gameObject.rigidbody.velocity.x))> 0){
			gameObject.rigidbody.AddForce(-gameObject.rigidbody.velocity.x,0,0,ForceMode.VelocityChange);			
		}else{
			gameObject.rigidbody.AddForce(-1*Mathf.Sign(gameObject.rigidbody.velocity.x)*RollOutSpeedDecrease,0,0,ForceMode.VelocityChange);
			
		}
	}
	


//2. Eingaben in Bewegung des Balls umsetzen

//2.1 wurde der Ball in die andere Richtung bewegt und vollführt nun eine Vollbremsung um in die andere Richtung zu drehen?
//    Geschwindigkeit des Bremsvorgangs muss angepasst und verschnellert werden

if ( (LastHorizontalMovement >= 0 && HorizontalMovement < 0 && gameObject.rigidbody.velocity.x != 0)
		||
	  (LastHorizontalMovement <= 0 && HorizontalMovement >0 && gameObject.rigidbody.velocity.x != 0)){
	  
	// Es ist der Fall aufgetreten das der Ball während der seitwärtsbewegung die bewegung auf die andere Seite begonnen hat
	// Es ist eine modifizierte Bremsung nötig um einen schnelleren und Spielflussfreien Wechsel zu ermöglichen
	var SpeedDecrease :float =( Time.deltaTime * DirectionSwitchDeltaDecrease);
	//würde die Bremsung bereits eine Beschleunigung auf die andere seite zur folge haben dann setze die Geschwindigkeit in dem Frame auf 0
	//ansonsten Bremse mit dem berechnetem Mittel!
	
	if ( (SpeedDecrease-Mathf.Abs(gameObject.rigidbody.velocity.x))> 0){
		gameObject.rigidbody.AddForce(-gameObject.rigidbody.velocity.x,0,0,ForceMode.VelocityChange);
		LastHorizontalMovement = HorizontalMovement;
	}else{
		gameObject.rigidbody.AddForce(Mathf.Sign(HorizontalMovement)*SpeedDecrease,0,0,ForceMode.VelocityChange);
	
	}
	
	
		    
} else{
	//Es findet ein gewöhnlicher horizontaler Bewegungsvorgang statt
	//Jetzt muss nur noch Unterschieden werden , ob bei der Bewegung die Shift Taste gedrückt wird oder nicht!
	if (Input.GetKey(KeyCode.LeftShift) && isJumping == false){
		
		gameObject.rigidbody.AddForce(HorizontalMovement*shiftSpeed,0,0,ForceMode.VelocityChange);
	}else{
		gameObject.rigidbody.AddForce(HorizontalMovement*speed,0,0,ForceMode.VelocityChange);
	}
	LastHorizontalMovement = HorizontalMovement;
}
	print (gameObject.rigidbody.velocity.x);
	
	
}