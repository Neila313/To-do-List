// Nos variables

var buttonAdd = document.getElementById('enter');
var buttonAssign = document.getElementById('assign');
var inputAdd = document.getElementById('userInput');
var inputAssign = document.getElementById('veilleInput');
var ulName = document.querySelector('#Listname');
var ulVeille = document.querySelector('#Listveille');
var refresh = document.getElementById('refresh');
var listes = ulName.querySelectorAll('li');

// Locale storage GET 1 pour récupérer la donnée stocker dans la première liste

let data = localStorage.getItem('form'); 
if (data) {
	ulName.innerHTML = JSON.parse(data);
}

// Locale storage GET 2 pour récupérer la donnée stocker dans la deuxième liste.

let dataV = localStorage.getItem('veille');
if (dataV) {
	ulVeille.innerHTML = JSON.parse(dataV);
}

// Création de la fonction qui va créer la liste de nom

function createListElement() {
	var liAdd = document.createElement('li');
	liAdd.appendChild(document.createTextNode(inputAdd.value));
	liAdd.className = 'nonbare';
	ulName.appendChild(liAdd);
	inputAdd.value = '';

	// Locale Storage Set Item pour la liste de nom (permet de stocker la donnée)

	ulName = document.querySelector('#Listname');
	console.log(ulName);
	localStorage.setItem('form', JSON.stringify(ulName.innerHTML));
}

// Appeler la fonction au click sur le bouton d'ajout (add)

buttonAdd.addEventListener('click', function() {
	createListElement();
});

// Fonction pour retourner le nombres de caractères écrit

function inputLenght() {
	return inputAdd.value.length;
}

// Fonction permettant d'ajouter un élément dans la liste après avoir taper sur la touche ENTER
function addListAfterKeypress(event) {
	if (inputLenght() > 0 && event.which === 13) {
		createListElement();
	}
}

// Attribution de la fonction à la variable où l'utilisateur écrit
inputAdd.addEventListener('keypress', addListAfterKeypress);

// Création de la fonction qui va créer la liste de Veille et ajout aléatoire d'un nom de la liste précédente (nom)

function createVeilleListElement() {
	var newListe = document.querySelectorAll('.nonbare');
	var liAssign = document.createElement('li');
	var newVeille = inputAssign.value;

	// Création de la fonction qui va créer la liste de Veille et ajout aléatoire d'un nom de la liste précédente (nom)

	var i = Math.floor(Math.random() * newListe.length); // index aléatoire de la liste de nom
	var randomElement = newListe[i]; // RandomElement va stocker un nom de la liste des non barés de manière aléatoire.
	randomElement.className = 'bare'; // ici on lui attribut la class bare pour que le nom soit baré. (style css)

	// Locale Storage Set Item pour la liste de nom (permet de stocker la donnée)

	ulName = document.querySelector('#Listname');
	localStorage.setItem('form', JSON.stringify(ulName.innerHTML));

	var result = document.createTextNode(newVeille + ' - ' + randomElement.textContent); // permet d'assembler les deux valeurs : nom et veille
	liAssign.appendChild(result); // élément enfant de UL comme c'est une liste
	ulVeille.appendChild(liAssign);
	inputAssign.value = ''; // utilisé pour le champs de saisie

	// Locale Storage Set Item pour la liste de veille (permet de stocker la donnée)

	ulVeille = document.querySelector('#Listveille');
	localStorage.setItem('veille', JSON.stringify(ulVeille.innerHTML));
}

// Appeler la fonction au click sur le bouton d'ajout (assign)

buttonAssign.addEventListener('click', function() {
	createVeilleListElement();
});

// Fonction pour retourner le nombres de caractères écrit

function AssignLenght() {
	return inputAssign.value.length;
}

// Fonction permettant d'ajouter un élément dans la liste après avoir taper sur la touche ENTER
function AssignListAfterKeypress(event) {
	if (AssignLenght() > 0 && event.which === 13) {
		createVeilleListElement();
	}
}

// Attribution de la fonction à la variable où l'utilisateur écrit
inputAssign.addEventListener('keypress', AssignListAfterKeypress);

// Bouton de rafraichissement pour dé-barrer les noms et ajouter un trait de séparation (hr)

refresh.addEventListener('click', function resetTout() {
	var allLi = document.querySelectorAll('.bare');
	var trait = document.createElement('hr');
	ulVeille.appendChild(trait);

	for (var j = 0; j < allLi.length; j++) {
		allLi[j].className = 'nonbare';
	}

	// Locale Storage Set Item pour la liste de nom (permet de stocker la donnée)

	ulName = document.querySelector('#Listname');
	localStorage.setItem('form', JSON.stringify(ulName.innerHTML));

	// Locale Storage Set Item pour la liste de veille (permet de stocker la donnée)

	ulVeille = document.querySelector('#Listveille');
	localStorage.setItem('veille', JSON.stringify(ulVeille.innerHTML));
});

// Bouton pour vider le LocalStorage et recommencer deux nouvelles vides, car il videra les deux listes.

function dataClear() {
	localStorage.clear();
	ulName.innerHTML = '';
	ulVeille.innerHTML = '';
}
