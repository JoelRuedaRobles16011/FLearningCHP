// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyAwFLEQx2DzdMbwXktnlbpFMiyxH7g3CJ4',
    authDomain: 'flearningchp.firebaseapp.com',
    projectId: 'flearningchp'
});

var db = firebase.firestore();

document.querySelector('#lista_categorias').innerHTML = '';

db.collection("categoria").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        document.querySelector('#lista_categorias').innerHTML += `
            <a class="dropdown-item" href="/FLearningCHP/categoria/${doc.id}">${doc.data().nombre}</a>
        `;
    });
});


page('/FLearningCHP/', index);
page('/FLearningCHP/categoria/:categoria', categoria);
page('/FLearningCHP/materia/:materia', materia);
page('*', notfound);
page();

function index() {
    document.querySelector('main').innerHTML = '';
    document.querySelector('main').innerHTML += `<div id="contentMain" class="card-columns"></div>`

    db.collection("categoria").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(` => ${doc.id}`);
            document.querySelector('#contentMain').innerHTML += `
                <div class="card shadow">
                    <img src="${doc.data().url_image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4 class="card-title">${doc.data().nombre}</h4>
                        <p class="card-text">${doc.data().descripcion}</p>
                        <div class="text-right">
                            <a href="/FLearningCHP/categoria/${doc.id}" class="btn btn-success">Mostrar repositorio</a>
                        </div>                        
                    </div>
                </div>
            `;
        });
    });
}


function categoria(ctx) {
    document.querySelector('main').innerHTML = (ctx.params.categoria);
}

function materia(ctx) {
    document.querySelector('#contentMain').innerHTML = 'Hoal';
}

function notfound() {
    document.querySelector('#contentMain').innerHTML = 'Page not found';
}
