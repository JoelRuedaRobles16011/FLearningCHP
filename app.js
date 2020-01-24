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
    document.querySelector('main').innerHTML = ``;
    document.querySelector('main').innerHTML += `<div id="videoMain" class="mb-5"></div>`;

    

    document.querySelector('main').innerHTML += `<div id="contentMain" class="card-columns"></div>`;

    db.collection("categoria").onSnapshot((querySnapshot) => {
        document.querySelector('#contentMain').innerHTML = '';

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

    db.collection("presentacion").onSnapshot((querySnapshot) => {
        document.querySelector('#videoMain').innerHTML = '';

        querySnapshot.forEach((doc) => {
            document.querySelector('#videoMain').innerHTML += `
            <div class="embed-responsive embed-responsive-16by9">
                ${doc.data().frame}
            </div>
            `;
        });
    });
}


function categoria(ctx) {

    var catRef = db.collection("categoria").doc(ctx.params.categoria).get()
        .then(function (doc) {

            document.querySelector('main').innerHTML = `
            <div class="card">
                <div class="objetfitcover">
                    <img class="card-img-top"
                        src="${doc.data().url_image}"
                        alt="">
                    <div class="card-body">
                        <div class="card-title text-center">
                            <h3>${doc.data().nombre}</h3>
                            <div class="card-text">
                                <p>${doc.data().descripcion}</p>
                            </div>
                        </div>
                        <div id="lista_materias" class="list-group text-dark">

                        </div>
                    </div>
                </div>
            </div>
            `;
        })
        .catch(function (error) {
            console.log(error);
        });

        console.log(ctx.params.categoria);

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
    var matRef = db.collection("materia").doc(ctx.params.materia).get()
        .then(function (doc) {

            document.querySelector('main').innerHTML = `
            <h1>${doc.data().nombre}</h1>
            <div id="lista_temas">

            </div>
            `;
        })
        .catch(function (error) {
            console.log(error);
        });

    db.collection("tema").where("fkid_materia", "==", ctx.params.materia).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                document.querySelector('#lista_temas').innerHTML += `
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <div class="card-img">
                                <div class="embed-responsive embed-responsive-16by9">
                                    ${doc.data().frame}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title">${doc.data().num_list}.- ${doc.data().nombre}</h4>
                                <!-- <p class="card-text">${doc.data().desc}</p> -->
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function notfound() {
    document.querySelector('main').innerHTML = 'Page not found';
}
