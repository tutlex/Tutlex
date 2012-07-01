#pragma strict

function Start () {

}

function Update () {
	gameObject.transform.Rotate(0,200*Time.deltaTime,0);
}