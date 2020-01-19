// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyAwFLEQx2DzdMbwXktnlbpFMiyxH7g3CJ4',
    authDomain: 'flearningchp.firebaseapp.com',
    projectId: 'flearningchp'
});

var db = firebase.firestore();

db.collection("categoria").onSnapshot((querySnapshot) => {
    document.querySelector('#lista_categorias').innerHTML = '';
    querySnapshot.forEach((doc) => {
        document.querySelector('#lista_categorias').innerHTML += `
            <a class="dropdown-item" href="/FLearningCHP/categoria/${doc.id}">${doc.data().nombre}</a>
        `;
    });
});


page('/FLearningCHP/', index);
page('/FLearningCHP/categoria/:categoria', categoria);
page('/FLearningCHP/materia/:materia', materia);
// page('*', notfound);
page();

function index() {

    db.collection("categoria").onSnapshot((querySnapshot) => {
        document.querySelector('main').innerHTML = '';
        document.querySelector('main').innerHTML += `<div id="contentMain" class="card-columns"></div>`;

        querySnapshot.forEach((doc) => {
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

    var catRef = db.collection("categoria").doc(ctx.params.categoria).get()
        .then(function (doc) {

            document.querySelector('main').innerHTML = `
                <div>
                    <div class="card">
                        <div class="objetfitcover">
                            <img class="card-img-top"
                                src="${doc.data().url_image}"
                                alt="">
                                <div class="card-img-overlay m-5 p-5 text-center text-light" style="background-color: rgba(0, 0, 0, 0.5); border-radius: 5px;">
                                <div class="card-title">
                                    <h3 class="text-light">${doc.data().nombre}</h3>
                                </div>
                                <div class="card-text">
                                    <small>${doc.data().descripcion}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="lista_materias" class="list-group text-dark">
                                
                    </div>
                </div>
            `;
        })
        .catch(function (error) {
            console.log(error);
        });


    db.collection("materia").where("fkid_categoria", "==", ctx.params.categoria).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                document.querySelector('#lista_materias').innerHTML += `
                <a href="/FLearningCHP/materia/${doc.id}" class="list-group-item list-group-item-action text-primary">${doc.data().nombre}</a>
                `;
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function materia(ctx) {
    document.querySelector('main').innerHTML = 'Hoal';
}

function notfound() {
    document.querySelector('main').innerHTML = 'Page not found';
}
